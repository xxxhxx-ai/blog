import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://xxxhxx-ai.github.io';
const BASE = '/blog';

/**
 * 部署在子路径（用户名.github.io/blog）时，Astro 只会给构建产物里的资源加前缀，
 * 手写的 <a href="/posts"> 不会自动加。这里在构建结束后统一补上，避免全站链接 404。
 */
function baseHref() {
  const bare = BASE.replace(/\/$/, '');
  const sub = bare.replace(/^\//, '');
  return {
    name: 'base-href',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        try {
          const root = fileURLToPath(dir);
          const re = new RegExp(`(href|action)="/(?!${sub}/|${sub}"|_astro)`, 'g');
          let files = 0;
          let links = 0;

          const walk = (d) => {
            for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
              const p = path.join(d, entry.name);
              if (entry.isDirectory()) walk(p);
              else if (entry.name.endsWith('.html')) {
                const src = fs.readFileSync(p, 'utf8');
                const out = src.replace(re, (_m, attr) => {
                  links++;
                  return `${attr}="${bare}/`;
                });
                if (out !== src) {
                  fs.writeFileSync(p, out);
                  files++;
                }
              }
            }
          };
          walk(root);
          console.log(`[base-href] ${files} 个页面，补全 ${links} 处站内链接`);
        } catch (e) {
          console.error('[base-href] 失败：', e.message);
          throw e;
        }
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap(), baseHref()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
