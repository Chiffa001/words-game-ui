<script lang="ts">
  import { type ComponentProps } from 'svelte';
  import { NavBar } from '@chiffa001/tg-svelte-ui';
  import RocketIcon from '@/icons/rocket-icon.svelte';

  const tabs: ComponentProps<typeof NavBar>['tabs'] = [
    { id: 'one', text: 'one', icon: RocketIcon },
    { id: 'two', text: 'two', icon: RocketIcon },
    { id: 'three', text: 'three', icon: RocketIcon }
  ];
</script>

<NavBar {tabs} activeId="two" />
