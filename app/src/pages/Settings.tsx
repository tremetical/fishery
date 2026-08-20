import type { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { getTheme, setTheme, THEMES, type Theme } from '../lib/theme';

export function SettingsPage(): JSX.Element {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  const pick = (t: Theme) => {
    setTheme(t);
    setThemeState(t);
  };

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
        <div class="panel-title">About</div>
        <p class="small dim">
          Preflight is a personal study aid. It is <b>not</b> a substitute for
          the current FAR/AIM, the Airplane Flying Handbook, the PHAK, or your
          CFI — regulations and procedures change, and this app can be wrong.
          Verify anything you plan to rely on. Fly the airplane first.
        </p>
        <p class="tiny faint mt">
          Everything is stored on this device only. No account, no server, no
          telemetry.
        </p>
      </section>
    </div>
  );
}
