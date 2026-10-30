import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署到 GitHub Pages 时，site 必须改成你的真实地址
// 例如：https://lxxxhxx.github.io
export default defineConfig({
  site: 'https://lxxxhxx.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
