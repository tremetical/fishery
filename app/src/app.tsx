import type { JSX } from 'preact';
import { useRoute, navigate } from './lib/router';
import {
  IconPlane,
  IconCards,
  IconRadio,
  IconExam,
  IconChart,
  IconGear,
  IconBack,
} from './components/icons';
import { HomePage } from './pages/Home';
import { ToolAirspacePage } from './pages/ToolAirspace';
import { ToolMetarPage } from './pages/ToolMetar';
import { ToolWbPage } from './pages/ToolWb';
import { StudyPage } from './pages/Study';
import { RadioPage } from './pages/Radio';
import { ExamPage } from './pages/Exam';
import { ProgressPage } from './pages/Progress';
import { SettingsPage } from './pages/Settings';

const NAV = [
  { path: '', label: 'Today', icon: IconPlane },
  { path: 'study', label: 'Study', icon: IconCards },
  { path: 'radio', label: 'Radio', icon: IconRadio },
  { path: 'exam', label: 'Exam', icon: IconExam },
  { path: 'progress', label: 'Progress', icon: IconChart },
];

/**
 * Full-screen routes (study session, exam sim, tools) render without the
 * bottom nav so grading buttons sit in the thumb zone instead.
 */
export function App(): JSX.Element {
  const route = useRoute();
  const top = route.parts[0] ?? '';

  let page: JSX.Element;
  let title: JSX.Element | string = 'PREFLIGHT';
  let showNav = true;
  let backTo: string | null = null;

  switch (top) {
    case '':
      page = <HomePage />;
      break;
    case 'study':
    case 'session':
      page = <StudyPage route={route} />;
      title = 'STUDY';
      showNav = top === 'study' && route.parts.length <= 2;
      break;
    case 'radio':
      page = <RadioPage route={route} />;
      title = 'RADIO';
      showNav = route.parts.length <= 1;
      break;
    case 'exam':
      page = <ExamPage route={route} />;
      title = 'EXAM';
      showNav = route.parts.length <= 1;
      break;
    case 'progress':
      page = <ProgressPage />;
      title = 'PROGRESS';
      break;
    case 'tools': {
      const tool = route.parts[1];
      if (tool === 'airspace') {
        page = <ToolAirspacePage />;
        title = 'AIRSPACE';
      } else if (tool === 'metar') {
        page = <ToolMetarPage />;
        title = 'WEATHER';
      } else if (tool === 'wb') {
        page = <ToolWbPage />;
        title = 'WEIGHT & BALANCE';
      } else {
        page = <HomePage />;
      }
      showNav = false;
      break;
    }
    case 'settings':
      page = <SettingsPage />;
      title = 'SETTINGS';
      backTo = '';
      break;
    default:
      page = <HomePage />;
  }

  const active = NAV.find((n) => n.path === top)?.path;

  return (
    <div class="shell">
      <header class="topbar">
        {backTo !== null ? (
          <button
            class="iconbtn"
            aria-label="Back"
            onClick={() => navigate(backTo!)}
          >
            <IconBack />
          </button>
        ) : (
          <div class="topbar-title">{title}</div>
        )}
        {backTo !== null && <div class="topbar-title">{title}</div>}
        <button
          class="iconbtn"
          aria-label="Settings"
          onClick={() => navigate('settings')}
        >
          <IconGear />
        </button>
      </header>

      <main class="shell-main">{page}</main>

      {showNav && (
        <nav class="bottomnav" aria-label="Main">
          <div class="bottomnav-inner">
            {NAV.map((n) => (
              <button
                key={n.path}
                class={`navitem ${active === n.path ? 'active' : ''}`}
                aria-current={active === n.path ? 'page' : undefined}
                onClick={() => navigate(n.path)}
              >
                <n.icon />
                {n.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
