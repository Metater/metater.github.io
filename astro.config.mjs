import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://metater.net',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});

