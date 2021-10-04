import { h, render } from 'preact';
import { setup } from 'goober';
import { isSameDay } from 'date-fns';

import App from './App';

setup(h);

const lastCacheClear = new Date(window.localStorage.getItem('br:last-clear') || 0);
if (!isSameDay(lastCacheClear, new Date())) {
  window.localStorage.removeItem('br:plan');
  window.localStorage.setItem('br:last-clear', new Date().toISOString());
}

if (!window.localStorage.getItem('br:plan') && window.location.pathname !== '/') {
  window.location.href = '/';
}

render(<App />, document.getElementById('root'));
