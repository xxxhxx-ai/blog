import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { SITE } from '../data/site';

/**
 * 纯标准 RSS 输出，不加 XML 样式表 ——
 * 浏览器正在废弃 XSLT，加了反而会弹警告，订阅者用阅读器读也用不到样式。
 * 给访客看的订阅指引放在 /subscribe 页面。
 *
 * site 用带子路径的完整地址（含 /blog），channel 的 <link> 才正确；
 * item 的 link 传完整绝对地址，避免以 / 开头被当成根路径而丢掉 /blog。
 */
export async function GET(_context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(p.data.pubDate),
      link: `${SITE.url}${postUrl(p)}`,
      categories: [p.data.category, ...p.data.tags],
      author: SITE.author,
    })),
    customData: `<language>zh-CN</language><copyright>© ${new Date().getFullYear()} ${SITE.author}</copyright>`,
  });
}
