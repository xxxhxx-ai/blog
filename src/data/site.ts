/**
 * 站点配置
 * - SITE / GISCUS 是站点级设置，改这里
 * - 站点列表、友链、作品、简历已抽成 JSON，可在网页后台（Pages CMS）编辑
 */
import sitesData from './sites.json';
import friendsData from './friends.json';
import worksData from './works.json';
import resumeData from './resume.json';

export const SITE = {
  name: 'lxxxhxx',
  author: 'lxxxhxx',
  tagline: '学习笔记与作品集',
  description: 'lxxxhxx 的学习笔记、做过的项目，和一些还没想明白的问题。',
  url: 'https://xxxhxx-ai.github.io/blog',
  email: 'hello@example.com',
  startYear: 2026,
};

/**
 * 评论系统：Giscus（免费，基于 GitHub Discussions）
 * 启用步骤见项目根目录 README.md
 */
export const GISCUS = {
  enabled: false,
  repo: 'xxxhxx-ai/blog',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  /** 留言板用独立的 discussion 分类，和文章评论分开 */
  guestbookCategory: 'Guestbook',
  guestbookCategoryId: '',
};

/** 我的其它站点 —— 首页「我的站点」入口 */
export const MY_SITES = sitesData.items;

/** 友链 */
export const FRIENDS = friendsData.items;

/** 作品集 */
export const WORKS = worksData.items;

/** 简历 */
export const RESUME = resumeData;
