import { type NavBar } from '@chiffa001/tg-svelte-ui';
import { type ComponentProps } from 'svelte';

import RocketIcon from '@/icons/rocket-icon.svelte';

export const tabs = [
  { id: 'main', text: 'main', icon: RocketIcon },
  { id: 'history', text: 'history', icon: RocketIcon }
] as const satisfies ComponentProps<typeof NavBar>['tabs'];

export type NavTabId = (typeof tabs)[number]['id'];
