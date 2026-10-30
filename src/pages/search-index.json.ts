import type { APIRoute } from 'astro';
import { getPosts, postUrl, wordCount } from '../lib/posts';

/** 构建期生成搜索索引，前端直接 fetch 这个 JSON */
export const GET: APIRoute = async () => {
  const posts = await getPosts();

  const index = posts.map((p) => ({
    url: postUrl(p),
    title: p.data.title,
    desc: p.data.description,
    category: p.data.category,
    tags: p.data.tags,
    date: new Date(p.data.pubDate).toISOString().slice(0, 10),
    words: wordCount(p.body),
    // 去掉 Markdown 记号，保留可读文本
    text: (p.body ?? '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/[#>*_`\-\[\]()!]/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 1200),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
