<script lang="ts">
  import { type NavTabId, tabs } from '@/constants/nav-items';
  import { activeNavTabId } from '@/stores/nav';
  import { NavBar } from '@chiffa001/tg-svelte-ui';

  const setActiveItemId = (id: string) => {
    activeNavTabId.set(id as NavTabId);
  };
</script>

<NavBar {tabs} activeId={$activeNavTabId} {setActiveItemId} />
