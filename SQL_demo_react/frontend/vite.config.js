// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:8000',
        rewrite: (path) => path.replace(/^\/users/, ''),
      },
    },
  },
});
