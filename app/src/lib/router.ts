import { useEffect, useState } from 'preact/hooks';

/**
 * Minimal hash router. Hash routing (#/study/airspace) rather than history
 * routing so the app works from any static host subpath and never needs a
 * server rewrite — important for offline/PWA on GitHub Pages.
 */

export interface Route {
  /** path segments, e.g. #/study/airspace -> ['study', 'airspace'] */
  parts: string[];
  path: string;
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const path = raw.split('?')[0];
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  return { parts, path };
}

const listeners = new Set<() => void>();
window.addEventListener('hashchange', () => listeners.forEach((l) => l()));

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const update = () => setRoute(parse());
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);
  return route;
}

export function navigate(to: string, replace = false): void {
  const hash = '#/' + to.replace(/^#?\/?/, '');
  if (replace) {
    window.location.replace(hash);
  } else {
    window.location.hash = hash;
  }
}

export function back(fallback = ''): void {
  if (window.history.length > 1) window.history.back();
  else navigate(fallback);
}
