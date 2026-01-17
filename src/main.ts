import { mount } from 'svelte';
import { App } from '@/components/app';
import { init, isTMA, retrieveLaunchParams, initData } from '@tma.js/sdk-svelte';

import './index.css';

if (import.meta.env.VITE_USE_MOCKS === 'enabled') {
  await import('./mocks/tg');
}

if (isTMA()) {
  init();
}

const data = retrieveLaunchParams();

console.log('tgWebAppData:', data.tgWebAppData?.hash);
console.log(initData);


const app = mount(App, {
  target: document.getElementById('app')!
});

export default app;
