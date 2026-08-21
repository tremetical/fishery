import type { JSX } from 'preact';

/* Hand-drawn 24x24 stroke icons; inherit currentColor so themes recolor them. */

const base = { viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export const IconPlane = (): JSX.Element => (
  <svg {...base}>
    <path d="M10.5 13.5 3 11l1.5-1.5L11 10l4.5-4.5c.8-.8 2-.8 2.5-.3s.5 1.7-.3 2.5L13.2 12l.5 6.5L12 20l-2.5-6" />
    <path d="M5.5 18.5 8 16" />
  </svg>
);

export const IconCards = (): JSX.Element => (
  <svg {...base}>
    <rect x="4" y="7" width="14" height="12" rx="2" />
    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4H19a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-1.3 1.5" />
    <path d="M8 12h6" />
  </svg>
);

export const IconRadio = (): JSX.Element => (
  <svg {...base}>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="3" y="13" width="4.5" height="6.5" rx="1.6" />
    <rect x="16.5" y="13" width="4.5" height="6.5" rx="1.6" />
  </svg>
);

export const IconExam = (): JSX.Element => (
  <svg {...base}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4.5V3h6v1.5" />
    <path d="m8.5 11 1.6 1.6L13.5 9" />
    <path d="M8.5 16.5h7" />
  </svg>
);

export const IconChart = (): JSX.Element => (
  <svg {...base}>
    <path d="M4 4v15.5h16" />
    <path d="m7 14 3.5-4 3 2.5L18 7" />
  </svg>
);

/*
 * A toothed cog, not a spoked circle. The earlier version — a small circle
 * with eight straight radial lines — read as a brightness/sun control, and
 * people could not find Settings at all.
 */
export const IconGear = (): JSX.Element => (
  <svg {...base}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M10.6 2.8h2.8l.35 2.3 1.9.79 1.85-1.4 1.98 1.98-1.4 1.85.79 1.9 2.3.35v2.8l-2.3.35-.79 1.9 1.4 1.85-1.98 1.98-1.85-1.4-1.9.79-.35 2.3h-2.8l-.35-2.3-1.9-.79-1.85 1.4-1.98-1.98 1.4-1.85-.79-1.9-2.3-.35v-2.8l2.3-.35.79-1.9-1.4-1.85 1.98-1.98 1.85 1.4 1.9-.79z" />
  </svg>
);

export const IconBack = (): JSX.Element => (
  <svg {...base}>
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </svg>
);

export const IconSpeaker = (): JSX.Element => (
  <svg {...base}>
    <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z" />
    <path d="M15 9a4.2 4.2 0 0 1 0 6M17.5 6.5a8 8 0 0 1 0 11" />
  </svg>
);

export const IconMic = (): JSX.Element => (
  <svg {...base}>
    <rect x="9.2" y="3.5" width="5.6" height="10" rx="2.8" />
    <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21M9 21h6" />
  </svg>
);
