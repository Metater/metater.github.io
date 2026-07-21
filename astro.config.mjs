import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://metater.net',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    server: {
      proxy: {
        '/api/steam-current-players': {
          target: 'https://metater.net',
          changeOrigin: true
        }
      }
    }
  },
  build: {
    format: 'directory'
  }
});
