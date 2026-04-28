import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mih4ajlo.github.io',
  base: '/why-is-that-eu/',
  output: 'static',
  integrations: [sitemap()],
});
