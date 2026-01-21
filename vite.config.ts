import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte(), mkcert()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    clearMocks: true,
    restoreMocks: true
  }
});
