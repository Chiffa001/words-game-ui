import { writable } from 'svelte/store';

import type { NavTabId } from '@/constants/nav-items';

export const activeNavTabId = writable<NavTabId>('main');
