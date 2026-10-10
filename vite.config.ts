import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/landingpage_RIVA/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
}));
