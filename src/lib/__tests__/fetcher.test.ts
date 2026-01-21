import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tma.js/sdk-svelte', () => ({
  retrieveRawInitData: vi.fn()
}));

const mockFetch = vi.fn();

const setFetchResponse = (response: {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}) => {
  mockFetch.mockResolvedValue(response);
  globalThis.fetch = mockFetch;
};

describe('fetcher', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.unstubAllEnvs();
  });

  it('adds default headers and returns JSON for GET', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com');

    const { retrieveRawInitData } = await import('@tma.js/sdk-svelte');
    vi.mocked(retrieveRawInitData).mockReturnValue('tg-hash');

    const json = vi.fn().mockResolvedValue({ ok: true });
    setFetchResponse({ ok: true, status: 200, json });

    const { fetcher } = await import('../fetcher');
    const result = await fetcher.get({ path: '/words', body: undefined });

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/words',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-TG-HASH': 'tg-hash'
        })
      })
    );
  });

  it('omits X-TG-HASH when init data is missing', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com');

    const { retrieveRawInitData } = await import('@tma.js/sdk-svelte');
    vi.mocked(retrieveRawInitData).mockReturnValue(undefined);

    const json = vi.fn().mockResolvedValue({ ok: true });
    setFetchResponse({ ok: true, status: 200, json });

    const { fetcher } = await import('../fetcher');
    await fetcher.get({ path: '/health', body: undefined });

    const [, options] = mockFetch.mock.calls[0] ?? [];
    expect(options?.headers).not.toHaveProperty('X-TG-HASH');
  });

  it('throws on non-OK response for POST', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com');

    const { retrieveRawInitData } = await import('@tma.js/sdk-svelte');
    vi.mocked(retrieveRawInitData).mockReturnValue('tg-hash');

    setFetchResponse({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({})
    });

    const { fetcher } = await import('../fetcher');

    await expect(fetcher.post({ path: '/words', body: { text: 'test' } })).rejects.toThrow(
      'HTTP error! status: 500'
    );

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/words',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ text: 'test' })
      })
    );
  });

  it('sends a PUT request with body', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com');

    const { retrieveRawInitData } = await import('@tma.js/sdk-svelte');
    vi.mocked(retrieveRawInitData).mockReturnValue('tg-hash');

    const json = vi.fn().mockResolvedValue({ ok: true });
    setFetchResponse({ ok: true, status: 200, json });

    const { fetcher } = await import('../fetcher');
    const result = await fetcher.put({ path: '/words/1', body: { text: 'next' } });

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/words/1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ text: 'next' })
      })
    );
  });

  it('sends a DELETE request', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com');

    const { retrieveRawInitData } = await import('@tma.js/sdk-svelte');
    vi.mocked(retrieveRawInitData).mockReturnValue('tg-hash');

    const json = vi.fn().mockResolvedValue({ ok: true });
    setFetchResponse({ ok: true, status: 200, json });

    const { fetcher } = await import('../fetcher');
    const result = await fetcher.delete({ path: '/words/1', body: undefined });

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/words/1',
      expect.objectContaining({
        method: 'DELETE'
      })
    );
  });
});
