import { fetcher } from '@/lib/fetcher';
import { retrieveLaunchParams } from '@tma.js/sdk-svelte';

export const initApp = async () => {
  const params = retrieveLaunchParams();

  return fetcher.post<
    { tgId: string; name: string },
    ReturnType<typeof retrieveLaunchParams>['tgWebAppData']
  >({ path: '/auth/init', body: params.tgWebAppData });
};
