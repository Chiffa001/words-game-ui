import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { withMinDelay } from '../with-min-delay';

describe('withMinDelay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('waits at least the minimum delay on resolve', async () => {
    const asyncFn = vi.fn().mockResolvedValue('ok');
    const wrapped = withMinDelay(asyncFn, 500);

    let settled = false;
    const promise = wrapped().then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(499);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await promise;

    expect(settled).toBe(true);
  });

  it('waits at least the minimum delay on reject', async () => {
    const asyncFn = vi.fn().mockRejectedValue(new Error('boom'));
    const wrapped = withMinDelay(asyncFn, 500);

    let settled = false;
    const promise = wrapped().catch((error) => {
      settled = true;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('boom');
    });

    await vi.advanceTimersByTimeAsync(400);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(100);
    await promise;

    expect(settled).toBe(true);
  });
});
