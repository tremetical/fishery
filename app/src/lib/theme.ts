export type Theme = 'dark' | 'day' | 'night';

const KEY = 'preflight.theme';

export function getTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === 'day' || t === 'night' ? t : 'dark';
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable; theme just won't persist */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg')
      .trim();
    meta.setAttribute('content', bg || '#0a0d12');
  }
}

export const THEMES: { id: Theme; label: string; hint: string }[] = [
  { id: 'dark', label: 'Dark', hint: 'Default panel lighting' },
  { id: 'day', label: 'Day', hint: 'Sectional-paper light theme' },
  { id: 'night', label: 'Night', hint: 'Red-on-black. Preserves night vision before dawn flights' },
];
