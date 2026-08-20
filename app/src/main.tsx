import { render } from 'preact';
import { App } from './app';
import { initStore } from './lib/store';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

initStore().then(() => {
  render(<App />, document.getElementById('app')!);
});

// PWA service worker (vite-plugin-pwa virtual module). Guarded so the app
// still runs where SW registration is unavailable (dev, some webviews).
if ('serviceWorker' in navigator) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => registerSW({ immediate: true }))
    .catch(() => {
      /* not fatal: app works, just not installable/offline-cached */
    });
}
