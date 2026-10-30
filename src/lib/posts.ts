import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** 全部分类元数据 —— 首页的分类入口卡片直接读这里 */
export const CATEGORIES = [
  {
    name: '学习笔记' as const,
    slug: 'note',
    code: 'NOTE',
    desc: '学到的东西，用自己的话重写一遍。不写下来就等于没学会。',
    tone: 0 as const,
  },
  {
    name: '项目作品' as const,
    slug: 'work',
    code: 'WORK',
    desc: '做过的东西，连同踩过的坑和最后的取舍一起记录。',
    tone: 1 as const,
  },
  {
    name: '技术折腾' as const,
    slug: 'tech',
    code: 'TECH',
    desc: '调一个样式、试一个方案，过程比结果更值得留下。',
    tone: 2 as const,
  },
  {
    name: '随笔' as const,
    slug: 'essay',
    code: 'ESSAY',
    desc: '没什么用但舍不得删的想法，和一点不成熟的感受。',
    tone: 3 as const,
  },
];

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function wordCount(body: string | undefined): number {
  if (!body) return 0;
  // 去掉代码块与标记符号后粗估
  const clean = body.replace(/```[\s\S]*?```/g, '').replace(/[#>*`\-\[\]()]/g, '');
  return clean.replace(/\s/g, '').length;
}

export function readingMinutes(body: string | undefined): number {
  return Math.max(1, Math.round(wordCount(body) / 350));
}

export function fmtDate(d: Date): string {
  const x = new Date(d);
  return `${x.getFullYear()}.${String(x.getMonth() + 1).padStart(2, '0')}.${String(x.getDate()).padStart(2, '0')}`;
}

export function isoDate(d: Date): string {
  return new Date(d).toISOString().slice(0, 10);
}

export function categoryCount(posts: Post[]) {
  const map = new Map<string, number>();
  posts.forEach((p) => map.set(p.data.category, (map.get(p.data.category) ?? 0) + 1));
  return map;
}

export function tagList(posts: Post[]) {
  const map = new Map<string, number>();
  posts.forEach((p) => p.data.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)));
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/** 按年月分组，用于归档页 */
export function groupByYear(posts: Post[]) {
  const map = new Map<number, Post[]>();
  posts.forEach((p) => {
    const y = new Date(p.data.pubDate).getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  });
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

/** Astro 5 的 glob loader 里，entry.id 就是去掉扩展名的相对路径 */
export function postUrl(post: Post): string {
  return `/posts/${post.id.replace(/\.md$/, '')}`;
}

/** 分类中文名 → URL slug */
export function categorySlug(name: string): string {
  return CATEGORIES.find((c) => c.name === name)?.slug ?? 'note';
}

/** 标签 → URL（需要编码中文） */
export function tagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}`;
}
