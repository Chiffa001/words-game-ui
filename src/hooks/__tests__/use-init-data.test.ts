import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/svelte-query', () => ({
  createQuery: vi.fn()
}));

vi.mock('@tma.js/sdk-svelte', () => ({
  retrieveLaunchParams: vi.fn()
}));

vi.mock('@/api', () => ({
  initApp: vi.fn()
}));

vi.mock('@/lib/with-min-delay', () => ({
  withMinDelay: vi.fn()
}));

describe('useInitData', () => {
  it('configures createQuery with init options and min delay', async () => {
    vi.resetModules();

    const { createQuery } = await import('@tanstack/svelte-query');
    const { retrieveLaunchParams } = await import('@tma.js/sdk-svelte');
    const { initApp } = await import('@/api');
    const { withMinDelay } = await import('@/lib/with-min-delay');

    const initData = { tgWebAppData: 'payload' };
    vi.mocked(retrieveLaunchParams).mockReturnValue(initData as never);

    const delayedInit = vi.fn();
    vi.mocked(withMinDelay).mockReturnValue(delayedInit as never);

    vi.mocked(createQuery).mockReturnValue('query-result' as never);

    const { useInitData } = await import('../use-init-data');
    const result = useInitData();

    expect(result).toBe('query-result');
    expect(withMinDelay).toHaveBeenCalledWith(initApp, 1200);
    expect(createQuery).toHaveBeenCalledWith(expect.any(Function));

    const optionsFactory = vi.mocked(createQuery).mock.calls[0]?.[0];
    const options = optionsFactory?.();

    expect(retrieveLaunchParams).toHaveBeenCalledTimes(1);
    expect(options).toEqual(
      expect.objectContaining({
        queryKey: ['init', 'payload'],
        queryFn: delayedInit,
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
      })
    );
  });
});
