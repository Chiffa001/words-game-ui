import { createQuery } from '@tanstack/svelte-query';
import { retrieveLaunchParams } from '@tma.js/sdk-svelte';
import { initApp } from '@/api';
import { withMinDelay } from '@/lib/with-min-delay';

export const useInitData = () => {
  const params = retrieveLaunchParams();

  const initAppWithMinDelay = withMinDelay(initApp, 1200);

  return createQuery(() => ({
    queryKey: ['init', params.tgWebAppData],
    queryFn: initAppWithMinDelay,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  }));
};
