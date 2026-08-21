import type { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { getTheme, setTheme, THEMES, type Theme } from '../lib/theme';
import { store, useStore } from '../lib/store';
import { exportBackup, importBackup } from '../lib/backup';
import { storageMode } from '../lib/db';
import { checkForUpdate, hardRefresh } from '../lib/updates';
import {
  AI_MODELS,
  getAiKey,
  getAiModel,
  getAiProject,
  normalizeProjectUrl,
  setAiKey,
  setAiModel,
  setAiProject,
  type AiModelId,
} from '../lib/ai';

export function SettingsPage(): JSX.Element {
  useStore();
  const [theme, setThemeState] = useState<Theme>(getTheme);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [checking, setChecking] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  const pick = (t: Theme) => {
    setTheme(t);
    setThemeState(t);
  };

  const doExport = async () => {
    setBusy(true);
    try {
      await exportBackup();
      setMsg('Backup exported.');
    } catch (e) {
      setMsg(`Export failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const doImport = async (file: File) => {
    if (
      !window.confirm(
        'Importing a backup REPLACES all study data on this device. Continue?',
      )
    )
      return;
    setBusy(true);
    try {
      await importBackup(await file.text());
    } catch (e) {
      setMsg(`Import failed: ${(e as Error).message}`);
      setBusy(false);
    }
  };

  const s = store.settings;

  return (
    <div class="stack">
      <section class="panel">
        <div class="panel-title">Lighting</div>
        <div class="stack">
          {THEMES.map((t) => (
            <button
              key={t.id}
              class="tile"
              style={theme === t.id ? 'border-color: var(--accent)' : ''}
              onClick={() => pick(t.id)}
            >
              <div class="tile-body">
                <div class="tile-title">{t.label}</div>
                <div class="tile-sub">{t.hint}</div>
              </div>
              {theme === t.id && <span class="badge badge-due">ON</span>}
            </button>
          ))}
        </div>
      </section>

      <section class="panel">
        <div class="panel-title">Study</div>
        <div class="rowline" style="min-height: var(--tap)">
          <div>
            <div>New cards per day</div>
            <div class="tiny dim">Across all decks</div>
          </div>
          <Stepper
            value={s.newPerDay}
            min={0}
            max={50}
            step={5}
            onChange={(v) => store.setSettings({ newPerDay: v })}
          />
        </div>
        <hr class="hr" />
        <div class="rowline" style="min-height: var(--tap)">
          <div>
            <div>Session length</div>
            <div class="tiny dim">Cards per quick session</div>
          </div>
          <Stepper
            value={s.sessionCap}
            min={5}
            max={60}
            step={5}
            onChange={(v) => store.setSettings({ sessionCap: v })}
          />
        </div>
      </section>

      <section class="panel">
        <div class="panel-title">Your data</div>
        <p class="small dim">
          Everything lives on this device. Export a backup now and then —
          especially before clearing browser data or switching phones.
        </p>
        <div class="grid2 mt">
          <button class="btn" disabled={busy} onClick={doExport}>
            Export backup
          </button>
          <button
            class="btn"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            Import backup
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style="display:none"
          onChange={(e) => {
            const f = (e.target as HTMLInputElement).files?.[0];
            if (f) void doImport(f);
            (e.target as HTMLInputElement).value = '';
          }}
        />
        <p class="tiny faint mt">
          {storageMode() === 'memory'
            ? '⚠︎ This browser refused persistent storage — data lives in memory only and is lost on reload. Use the installed app or a normal browser tab.'
            : `Durable storage: ${
                store.persisted
                  ? 'granted — the browser has promised not to evict this app’s data.'
                  : 'not granted — install the app to your home screen to make eviction much less likely, and keep backups.'
              }`}
        </p>
        {msg && <p class="small mt">{msg}</p>}
      </section>

      <AiTutorSection />

      <section class="panel">
        <div class="panel-title">About</div>
        <p class="small dim">
          Preflight is a personal study aid. It is <b>not</b> a substitute for
          the current FAR/AIM, the Airplane Flying Handbook, the PHAK, or your
          CFI — regulations and procedures change, and this app can be wrong.
          Verify anything you plan to rely on. Fly the airplane first.
        </p>
        <p class="tiny faint mt">
          No account, no server, no telemetry. Cards flagged{' '}
          <span class="badge badge-leech">UNVERIFIED</span> contain references
          the author could not fully confirm — treat those with extra
          suspicion.
        </p>
        <p class="tiny faint mt mono">
          Build {typeof __BUILD_STAMP__ === 'string' ? __BUILD_STAMP__ : 'dev'}
        </p>
        <div class="grid2 mt">
          <button
            class="btn"
            disabled={checking}
            onClick={() => {
              setChecking(true);
              setUpdateMsg('Checking…');
              void checkForUpdate()
                .then((r) => {
                  setUpdateMsg(
                    r === 'updated'
                      ? 'Update found — reloading…'
                      : r === 'current'
                        ? 'Already on the newest build.'
                        : 'Could not check right now.',
                  );
                })
                .finally(() => setChecking(false));
            }}
          >
            Check for updates
          </button>
          <button
            class="btn"
            disabled={checking}
            onClick={() => {
              if (
                window.confirm(
                  'Force-reload the app from the network? Your study history is NOT affected.',
                )
              )
                void hardRefresh();
            }}
          >
            Force reload
          </button>
        </div>
        {updateMsg && <p class="small mt">{updateMsg}</p>}
      </section>
    </div>
  );
}

function AiTutorSection(): JSX.Element {
  const [saved, setSaved] = useState<boolean | null>(null);
  const [draft, setDraft] = useState('');
  const [projectDraft, setProjectDraft] = useState('');
  const [projectNote, setProjectNote] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [model, setModelState] = useState<AiModelId>('claude-opus-5');
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    void getAiKey().then((k) => setSaved(!!k));
    void getAiModel().then(setModelState);
    void getAiProject().then((p) => {
      setProjectDraft(p ?? '');
      setPinned(p);
    });
  }, []);

  const save = async () => {
    const key = draft.trim();
    if (!key) return;
    await setAiKey(key);
    setDraft('');
    setSaved(true);
    setNote('Key saved on this device.');
  };

  const clear = async () => {
    await setAiKey(null);
    setSaved(false);
    setNote('Key removed.');
  };

  return (
    <section class="panel">
      <div class="panel-title">AI tutor</div>
      <p class="small dim">
        The ✨ Explain button hands your card to Claude along with a summary
        of what you keep getting wrong, so it knows where you're at.
      </p>
      <p class="tiny faint mt">
        Note: a Claude Pro/Max subscription covers claude.ai and the Claude
        app, but <b>not</b> the developer API — Anthropic bills those
        separately, and there's no way for an outside app like this one to
        spend your subscription. So the free path below opens the real Claude
        app on your account; the API key path is a separate, optional expense.
      </p>

      <hr class="hr" />
      <div class="tiny dim" style="text-transform: uppercase; letter-spacing: 0.05em">
        Free — uses your Claude account
      </div>
      <p class="small dim mt">
        Pin a Claude <b>Project</b> and every question lands in that one
        project instead of a brand-new chat, so the context builds up over
        time. Optional — skip it and questions still work.
      </p>
      <ol class="small dim" style="margin: 8px 0 0; padding-left: 20px; line-height: 1.6">
        <li>
          Open{' '}
          <a href="https://claude.ai/projects" target="_blank" rel="noopener">
            claude.ai/projects
          </a>{' '}
          <b>in Safari</b> (not the Claude app) and sign in.
        </li>
        <li>Tap <b>+ New project</b> and name it “Ground school”.</li>
        <li>
          Tap Safari's address bar, then <b>Copy</b> — the link looks like
          claude.ai/project/…
        </li>
        <li>Paste it below and tap Pin.</li>
      </ol>
      <div class="mt" style="display:flex; gap:8px">
        <input
          type="url"
          inputmode="url"
          placeholder="https://claude.ai/project/…"
          autocomplete="off"
          style="flex:1"
          value={projectDraft}
          onInput={(e) => setProjectDraft((e.target as HTMLInputElement).value)}
        />
        <button
          class="btn"
          disabled={!projectDraft.trim() && !pinned}
          onClick={() => {
            const v = projectDraft.trim();
            if (!v) {
              void setAiProject(null);
              setPinned(null);
              setProjectNote('Unpinned — questions open a new chat.');
              return;
            }
            const url = normalizeProjectUrl(v);
            if (!url) {
              setProjectNote(
                "That doesn't look like a project link. It should look like claude.ai/project/… — see the steps above.",
              );
              return;
            }
            void setAiProject(url);
            setProjectDraft(url);
            setPinned(url);
            setProjectNote('Pinned. Questions now land in that project.');
          }}
        >
          {!projectDraft.trim() && pinned ? 'Unpin' : 'Pin'}
        </button>
      </div>
      {projectNote && <p class="small mt">{projectNote}</p>}

      <hr class="hr" />
      <div class="tiny dim" style="text-transform: uppercase; letter-spacing: 0.05em">
        Optional — chat inside this app
      </div>
      <p class="small dim mt">
        An Anthropic API key adds a tutor chat right here, without leaving the
        card. Billed by usage, typically a fraction of a cent per question.
      </p>
      {saved ? (
        <div class="rowline mt" style="min-height: var(--tap)">
          <div>
            <div>API key</div>
            <div class="tiny dim mono">sk-ant-…&nbsp;· saved</div>
          </div>
          <button class="btn" onClick={() => void clear()}>
            Remove
          </button>
        </div>
      ) : (
        <div class="mt" style="display:flex; gap:8px">
          <input
            type="password"
            placeholder="sk-ant-…"
            autocomplete="off"
            style="flex:1"
            value={draft}
            onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
          />
          <button
            class="btn btn-primary"
            disabled={!draft.trim()}
            onClick={() => void save()}
          >
            Save
          </button>
        </div>
      )}
      {saved && (
        <>
          <hr class="hr" />
          <div class="stack">
            <div class="tiny dim" style="text-transform: uppercase; letter-spacing: 0.05em">
              Model
            </div>
            {AI_MODELS.map((m) => (
              <button
                key={m.id}
                class="tile"
                style={
                  (model === m.id ? 'border-color: var(--accent);' : '') +
                  'min-height: 52px'
                }
                onClick={() => {
                  setModelState(m.id);
                  void setAiModel(m.id);
                }}
              >
                <div class="tile-body">
                  <div class="tile-title">{m.label}</div>
                  <div class="tile-sub">{m.hint}</div>
                </div>
                {model === m.id && <span class="badge badge-due">ON</span>}
              </button>
            ))}
          </div>
        </>
      )}
      {note && <p class="small mt">{note}</p>}
      <p class="tiny faint mt">
        Get a key at console.anthropic.com (usage is pay-as-you-go, billed by
        Anthropic). The key is stored only on this device and is never
        included in backups. Card text and your questions are sent to
        Anthropic only when you ask the tutor something.
      </p>
    </section>
  );
}

function Stepper(props: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}): JSX.Element {
  const { value, min, max, step, onChange } = props;
  return (
    <div style="display:flex; align-items:center; gap: 6px">
      <button
        class="btn"
        style="min-width: var(--tap); padding: 0"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        −
      </button>
      <span class="mono" style="min-width: 2.2em; text-align: center">
        {value}
      </span>
      <button
        class="btn"
        style="min-width: var(--tap); padding: 0"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
      >
        +
      </button>
    </div>
  );
}
