import { render } from 'preact';
import { App } from './app';
import { initStore } from './lib/store';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/study.css';

initStore().then(() => {
  render(<App />, document.getElementById('app')!);
});

// PWA service worker + the update checks iOS does not perform on its own.
void import('./lib/updates').then((m) => m.initUpdates());
