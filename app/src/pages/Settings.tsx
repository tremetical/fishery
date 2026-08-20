import type { JSX } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { getTheme, setTheme, THEMES, type Theme } from '../lib/theme';
import { store, useStore } from '../lib/store';
import { exportBackup, importBackup } from '../lib/backup';
import { storageMode } from '../lib/db';

export function SettingsPage(): JSX.Element {
  useStore();
  const [theme, setThemeState] = useState<Theme>(getTheme);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
      </section>
    </div>
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
