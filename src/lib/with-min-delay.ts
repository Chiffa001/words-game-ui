export const withMinDelay = <TArgs extends unknown[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>,
  minDelay: number = 1000
): ((...args: TArgs) => Promise<TResult>) => {
  return async (...args: TArgs): Promise<TResult> => {
    const startTime = Date.now();

    try {
      const result = await Promise.all([
        asyncFn(...args),
        new Promise<void>((resolve) => setTimeout(resolve, minDelay))
      ]);

      return result[0];
    } catch (error) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDelay - elapsed);

      if (remaining > 0) {
        await new Promise<void>((resolve) => setTimeout(resolve, remaining));
      }

      throw error;
    }
  };
};
