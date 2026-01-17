<script lang="ts">
  import { PhoneMask, LoaderContainer as LoadScreen } from '@chiffa001/tg-svelte-ui';
  import { ErrorScreen } from '@/screens/error-screen';
  import { MainScreen } from '@/screens/main-screen';
  import { useInitData } from '@/hooks';

  const initDataQuery = useInitData();
</script>

<PhoneMask>
  {#if initDataQuery.isLoading}
    <LoadScreen />
  {:else if initDataQuery.isError}
    <ErrorScreen />
  {:else}
    <MainScreen />
  {/if}
</PhoneMask>
