/*
 * Keeping an installed PWA current.
 *
 * `registerSW({immediate: true})` alone only checks for a new build when the
 * page cold-starts. iOS freezes a standalone home-screen app and *resumes*
 * it instead of cold-starting, so a phone can sit on a weeks-old build no
 * matter how many times the icon is tapped. These helpers add the checks
 * iOS never performs on its own, plus a manual escape hatch.
 *
 * Nothing here touches IndexedDB, so study history always survives.
 */

type Refresh = (reload?: boolean) => Promise<void>;

let updateSW: Refresh | null = null;
let registration: ServiceWorkerRegistration | null = null;

export async function initUpdates(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    const { registerSW } = await import('virtual:pwa-register');
    updateSW = registerSW({
      immediate: true,
      onRegisteredSW(_swUrl, r) {
        registration = r ?? null;
        if (!r) return;
        const check = (): void => {
          if (navigator.onLine) void r.update().catch(() => {});
        };
        // A resume from the background is the moment that matters on iOS.
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') check();
        });
        window.addEventListener('focus', check);
        window.setInterval(check, 30 * 60 * 1000);
        check();
      },
    }) as Refresh;
  } catch {
    /* not fatal: the app still runs, just without offline caching */
  }
}

export type UpdateCheck = 'updated' | 'current' | 'unavailable';

/** Manual "check now". Returns whether a newer build was found. */
export async function checkForUpdate(): Promise<UpdateCheck> {
  if (!('serviceWorker' in navigator)) return 'unavailable';
  const r =
    registration ?? (await navigator.serviceWorker.getRegistration()) ?? null;
  if (!r) return 'unavailable';
  try {
    await r.update();
  } catch {
    return 'unavailable';
  }
  if (r.installing || r.waiting) {
    // Let the new worker take over, then reload into it.
    void updateSW?.(true).catch(() => window.location.reload());
    return 'updated';
  }
  return 'current';
}

/**
 * Last resort when a service worker is wedged on an old build: drop the
 * worker and its asset caches and reload from the network. Study data lives
 * in IndexedDB and is deliberately left alone.
 */
export async function hardRefresh(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister().catch(() => false)));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k).catch(() => false)));
    }
  } finally {
    window.location.reload();
  }
}
