import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte(), mkcert()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  }
});
