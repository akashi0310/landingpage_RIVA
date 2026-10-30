import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isBuild = command === 'build';
  const realRoot = fs.existsSync(process.cwd()) ? fs.realpathSync(process.cwd()) : process.cwd();
  return {
    ...(isBuild ? { root: realRoot } : {}),
    base: mode === 'github-pages' ? '/landingpage_RIVA/' : '/',
    plugins: [react()],
    resolve: {
      preserveSymlinks: true
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              if (id.includes('canvas-confetti')) {
                return 'vendor-confetti';
              }
              return 'vendor-utils';
            }
          }
        }
      }
    },
    server: {
      port: 3000,
      open: false,
      host: true,
      fs: {
        allow: ['..', realRoot]
      }
    }
  };
});
