import { describe, expect, it } from 'vitest';
import {
  claudeWebUrl,
  handoffText,
  normalizeProjectUrl,
  type ExplainContext,
} from './ai';

const ctx: ExplainContext = {
  label: 'Flashcard',
  body: 'Q: Transponder codes?\nA: 1200 VFR · 7500 hijack · 7600 lost comms · 7700 emergency.',
};

function qOf(url: string): string {
  return decodeURIComponent(new URL(url).searchParams.get('q') ?? '');
}

describe('claudeWebUrl', () => {
  it('falls back to a new chat when no project is pinned', () => {
    expect(claudeWebUrl(ctx)).toMatch(/^https:\/\/claude\.ai\/new\?q=/);
    expect(claudeWebUrl(ctx, null)).toMatch(/^https:\/\/claude\.ai\/new\?q=/);
    expect(claudeWebUrl(ctx, '   ')).toMatch(/^https:\/\/claude\.ai\/new\?q=/);
  });

  it('aims at a pinned project so chats accumulate in one place', () => {
    const url = claudeWebUrl(ctx, 'https://claude.ai/project/abc-123');
    expect(url).toMatch(/^https:\/\/claude\.ai\/project\/abc-123\?q=/);
  });

  it('tolerates a pasted link with a trailing slash or existing query', () => {
    for (const pasted of [
      'https://claude.ai/project/abc-123/',
      'https://claude.ai/project/abc-123?foo=1',
      '  https://claude.ai/project/abc-123  ',
    ])
      expect(claudeWebUrl(ctx, pasted)).toMatch(
        /^https:\/\/claude\.ai\/project\/abc-123\?q=/,
      );
  });

  it('ignores anything that is not a claude.ai project link', () => {
    // Note: a plain-http claude.ai project link is upgraded to https by
    // normalizeProjectUrl rather than dropped — covered in its own suite.
    // A stray paste must never redirect the student off to another host.
    for (const bad of [
      'https://evil.example.com/project/abc',
      'https://claude.ai.evil.com/project/abc',
      'https://claude.ai/chat/abc',
      'not a url',
    ])
      expect(claudeWebUrl(ctx, bad)).toMatch(/^https:\/\/claude\.ai\/new\?q=/);
  });

  it('carries the study material in the prompt', () => {
    const q = qOf(claudeWebUrl(ctx));
    expect(q).toContain('student pilot');
    expect(q).toContain('7600 lost comms');
  });

  it('keeps the URL short enough for any browser', () => {
    const huge: ExplainContext = { label: 'Flashcard', body: 'x'.repeat(9000) };
    expect(handoffText(huge).length).toBeLessThanOrEqual(1800);
    expect(claudeWebUrl(huge).length).toBeLessThan(8000);
  });
});

describe('normalizeProjectUrl', () => {
  const ID = 'https://claude.ai/project/abc-123';

  it('accepts the shapes a phone actually copies', () => {
    for (const pasted of [
      'https://claude.ai/project/abc-123',
      'https://claude.ai/project/abc-123/',
      'https://claude.ai/project/abc-123?foo=1',
      'https://claude.ai/project/abc-123#top',
      'https://www.claude.ai/project/abc-123',
      'claude.ai/project/abc-123',
      'http://claude.ai/project/abc-123',
      '  https://claude.ai/project/abc-123  ',
      'abc-123456789',
    ])
      expect(normalizeProjectUrl(pasted)).toMatch(/^https:\/\/claude\.ai\/project\//);
    expect(normalizeProjectUrl('https://claude.ai/project/abc-123/')).toBe(ID);
  });

  it('rejects anything that would send study material off-host', () => {
    for (const bad of [
      '',
      '   ',
      'https://evil.example.com/project/abc-123',
      'https://claude.ai.evil.com/project/abc-123',
      'https://evilclaude.ai/project/abc-123',
      'https://claude.ai/chat/abc-123',
      'https://claude.ai/project/abc-123/extra',
      'just some words',
    ])
      expect(normalizeProjectUrl(bad)).toBeNull();
  });
});
