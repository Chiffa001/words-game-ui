import { App } from '@/components/app';
import { init, isTMA } from '@tma.js/sdk-svelte';
import { mount } from 'svelte';

import './index.css';

if (isTMA()) {
  init();
}

const app = mount(App, {
  target: document.getElementById('app')!
});

export default app;
