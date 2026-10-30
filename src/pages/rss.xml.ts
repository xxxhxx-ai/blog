import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { SITE } from '../data/site';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(p.data.pubDate),
      link: `${base}${postUrl(p)}`,
      categories: [p.data.category, ...p.data.tags],
      author: SITE.author,
    })),
    customData: `<language>zh-CN</language><copyright>© ${new Date().getFullYear()} ${SITE.author}</copyright>`,
  });
}
