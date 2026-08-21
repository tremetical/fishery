import type { JSX } from 'preact';
import type { Route } from '../lib/router';
import { navigate } from '../lib/router';
import { SUBJECTS, DECKS, decksFor, deckById, subjectById } from '../content';
import { store, useStore, buildSession } from '../lib/store';
import { SessionView } from '../components/SessionView';

export function StudyPage(props: { route: Route }): JSX.Element {
  useStore();
  const { parts } = props.route;

  // #/session/... — full-screen study sessions. Keyed by the full path so
  // hopping between two sessions (e.g. via browser history) mounts a fresh
  // view instead of reusing reveal state — the no-leak rule again.
  if (parts[0] === 'session') {
    const scope = parts[1];
    if (scope === 'all') {
      return (
        <SessionView
          key={props.route.path}
          title="All subjects"
          build={() => buildSession(DECKS)}
          exitTo=""
        />
      );
    }
    if (scope === 'subject') {
      const subject = subjectById(parts[2] ?? '');
      if (subject)
        return (
          <SessionView
            key={props.route.path}
            title={subject.title}
            build={() => buildSession(decksFor(subject.id))}
            exitTo={`study/${subject.id}`}
          />
        );
    }
    if (scope === 'deck') {
      const deck = deckById(parts[2] ?? '');
      if (deck)
        return (
          <SessionView
            key={props.route.path}
            title={deck.title}
            build={() => buildSession([deck])}
            exitTo={`study/${deck.subject}`}
          />
        );
    }
    return <div class="panel">Unknown session scope.</div>;
  }

  // #/study/:subject
  const subject = subjectById(parts[1] ?? '');
  if (subject) return <SubjectPage subjectId={subject.id} />;

  // #/study — subject grid
  return (
    <div class="stack">
      {SUBJECTS.map((s) => {
        const decks = decksFor(s.id);
        const counts = decks.map((d) => store.deckCounts(d));
        const due = counts.reduce((n, c) => n + c.due, 0);
        const fresh = counts.reduce((n, c) => n + c.newCards, 0);
        const total = counts.reduce((n, c) => n + c.total, 0);
        return (
          <button key={s.id} class="tile" onClick={() => navigate(`study/${s.id}`)}>
            <div class="tile-icon" style="background: var(--surface-2)">
              <span class="emoji">{s.icon}</span>
            </div>
            <div class="tile-body">
              <div class="tile-title">{s.title}</div>
              <div class="tile-sub">
                {total > 0 ? s.blurb : `${s.blurb} — content coming soon.`}
              </div>
            </div>
            <div class="tile-end">
              {due > 0 && <span class="badge badge-due">{due} due</span>}
              {fresh > 0 && <span class="badge badge-new">{fresh} new</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SubjectPage(props: { subjectId: string }): JSX.Element {
  const subject = subjectById(props.subjectId)!;
  const decks = decksFor(subject.id);
  const totalDue = decks.reduce((n, d) => n + store.deckCounts(d).due, 0);
  const totalNew = decks.reduce((n, d) => n + store.deckCounts(d).newCards, 0);

  return (
    <div class="stack">
      <h1 class="page-h">
        <span class="emoji">{subject.icon}</span> {subject.title}
        <span class="sub">{subject.blurb}</span>
      </h1>

      {decks.length > 0 && (
        <button
          class="btn btn-primary btn-block btn-big"
          disabled={totalDue + totalNew === 0}
          onClick={() => navigate(`session/subject/${subject.id}`)}
        >
          Study {subject.title}
          {totalDue + totalNew > 0 ? ` (${totalDue} due · ${totalNew} new)` : ' — all caught up'}
        </button>
      )}

      {subject.tools?.map((t) => (
        <button key={t.route} class="tile" onClick={() => navigate(t.route)}>
          <div class="tile-icon" style="background: var(--info-soft)">
            <span class="emoji">🛠️</span>
          </div>
          <div class="tile-body">
            <div class="tile-title">{t.label}</div>
            <div class="tile-sub">{t.hint}</div>
          </div>
        </button>
      ))}

      {decks.length === 0 && (
        <div class="panel center dim small" style="padding: 28px">
          Cards for this subject arrive in a later stage.
        </div>
      )}

      {decks.map((d) => {
        const c = store.deckCounts(d);
        return (
          <button key={d.id} class="tile" onClick={() => navigate(`session/deck/${d.id}`)}>
            <div class="tile-body">
              <div class="tile-title">{d.title}</div>
              <div class="tile-sub">{d.description}</div>
              <div class="tile-sub mono">
                {c.total} cards · {c.total - c.newCards} seen
                {c.leeches > 0 ? ` · ${c.leeches} trouble` : ''}
              </div>
            </div>
            <div class="tile-end">
              {c.due > 0 && <span class="badge badge-due">{c.due} due</span>}
              {c.newCards > 0 && <span class="badge badge-new">{c.newCards} new</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
