/*
 * AI tutor integration. Two tiers:
 *
 * 1. No setup: hand off to claude.ai with a prefilled teaching prompt —
 *    uses the student's existing Claude account, nothing stored here.
 * 2. In-app chat: direct browser calls to the Anthropic API with a
 *    user-supplied key (stored in IndexedDB on this device only, and
 *    deliberately excluded from backup exports). The SDK is dynamically
 *    imported so the offline bundle stays lean.
 *
 * A local on-device LLM was considered and rejected: models small enough
 * for a phone hallucinate regulations confidently, which is the one
 * failure mode this app must not have.
 */

import { idb } from './db';

export interface ExplainContext {
  /** What the user is looking at, e.g. "Flashcard — Radio calls" */
  label: string;
  /** The material itself: card front/back/why, or question + answer */
  body: string;
}

export const AI_MODELS = [
  { id: 'claude-opus-5', label: 'Best (Opus 5)', hint: 'Sharpest explanations' },
  { id: 'claude-sonnet-5', label: 'Balanced (Sonnet 5)', hint: 'Fast and strong' },
  { id: 'claude-haiku-4-5', label: 'Cheapest (Haiku 4.5)', hint: 'Quick and thrifty' },
] as const;

export type AiModelId = (typeof AI_MODELS)[number]['id'];

let cachedKey: string | null | undefined;
let cachedModel: AiModelId | undefined;

export async function getAiKey(): Promise<string | null> {
  if (cachedKey === undefined)
    cachedKey = (await idb.get<string>('kv', 'aiKey')) ?? null;
  return cachedKey;
}

export async function setAiKey(key: string | null): Promise<void> {
  cachedKey = key;
  if (key) await idb.put('kv', key, 'aiKey');
  else await idb.del('kv', 'aiKey');
}

export async function getAiModel(): Promise<AiModelId> {
  if (cachedModel === undefined)
    cachedModel = (await idb.get<AiModelId>('kv', 'aiModel')) ?? 'claude-opus-5';
  return cachedModel;
}

export async function setAiModel(model: AiModelId): Promise<void> {
  cachedModel = model;
  await idb.put('kv', model, 'aiModel');
}

const SYSTEM_PROMPT = `You are a patient ground-school tutor inside "Preflight", a study app for a student pilot working toward a US Private Pilot certificate (FAA, Part 61). They fly around Puget Sound (KTIW area).

The student is looking at study material, provided below. Answer their questions about it.

Rules:
- Plain English first, then the aviation term. Break jargon into pieces (e.g. explain a radio call phrase by phrase).
- Keep answers short — this is a phone screen. A few sentences, or a short list. No headers.
- Be accurate. Cite FAR/AIM sections only when you are confident they are right; if unsure, say you're unsure rather than guessing. Their CFI and the current FAR/AIM are the final authorities.
- If the question drifts far from flight training, gently steer back.`;

export function buildPrompt(ctx: ExplainContext): string {
  return `${ctx.label}:\n\n${ctx.body}`;
}

/** Prefilled claude.ai handoff for the zero-setup tier. */
export function claudeWebUrl(ctx: ExplainContext): string {
  const q =
    `I'm a student pilot studying for the FAA private pilot written exam. ` +
    `Explain this study material to me in plain English, piece by piece, and let me ask follow-ups:\n\n${buildPrompt(ctx)}`;
  return `https://claude.ai/new?q=${encodeURIComponent(q)}`;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

/**
 * Stream a tutor reply. Calls the Anthropic API directly from the browser
 * with the user's own key. Throws with a human-readable message on failure.
 */
export async function streamExplain(
  ctx: ExplainContext,
  history: ChatMessage[],
  onDelta: (text: string) => void,
): Promise<string> {
  const [key, model] = await Promise.all([getAiKey(), getAiModel()]);
  if (!key) throw new Error('No API key set. Add one in Settings → AI tutor.');
  if (!navigator.onLine)
    throw new Error('The AI tutor needs an internet connection.');

  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });

  const messages = history.map((m) => ({
    role: m.role,
    content: m.text,
  }));
  // The study material rides in the first user turn so the whole thread
  // stays grounded on what's on screen.
  if (messages.length > 0 && messages[0].role === 'user') {
    messages[0] = {
      role: 'user',
      content: `Here is what I'm studying —\n\n${buildPrompt(ctx)}\n\nMy question: ${messages[0].content}`,
    };
  }

  try {
    const stream = client.beta.messages.stream({
      model,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages,
      // Short factual explanations: low effort keeps replies snappy and
      // cheap. (Not supported on Haiku 4.5.)
      ...(model === 'claude-haiku-4-5'
        ? {}
        : { output_config: { effort: 'low' as const } }),
      // On Opus 5, route the rare policy decline to a fallback model
      // server-side instead of returning nothing.
      ...(model === 'claude-opus-5'
        ? {
            betas: ['server-side-fallback-2026-07-01' as const],
            fallbacks: 'default' as const,
          }
        : {}),
    });

    let full = '';
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        full += event.delta.text;
        onDelta(full);
      }
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal' && full.trim() === '') {
      throw new Error('The model declined that request — try rephrasing.');
    }
    return full;
  } catch (e) {
    const err = e as { status?: number; message?: string };
    if (err.status === 401)
      throw new Error('That API key was rejected — check it in Settings.');
    if (err.status === 429)
      throw new Error('Rate limited — wait a moment and try again.');
    if (err.status === 400 && /credit/i.test(err.message ?? ''))
      throw new Error('Your Anthropic account is out of credit.');
    if (e instanceof Error && e.message) throw e;
    throw new Error('Could not reach the AI service.');
  }
}
