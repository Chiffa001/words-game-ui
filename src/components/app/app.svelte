<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { Game } from '@/components/game';

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Game />
</QueryClientProvider>
