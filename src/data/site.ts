/**
 * 站点配置 —— 改这里就能改全局信息
 * 上线前必改：url / giscus
 */
export const SITE = {
  name: 'lxxxhxx',
  author: 'lxxxhxx',
  tagline: '学习笔记与作品集',
  description: 'lxxxhxx 的学习笔记、做过的项目，和一些还没想明白的问题。',
  url: 'https://lxxxhxx.github.io',
  email: 'hello@example.com',
  startYear: 2026,
};

/**
 * 评论系统：Giscus（免费，基于 GitHub Discussions）
 * 启用步骤见项目根目录 README.md
 */
export const GISCUS = {
  enabled: false,
  repo: 'your-github-name/lxxxhxx.github.io',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  /** 留言板用独立的 discussion 分类，和文章评论分开 */
  guestbookCategory: 'Guestbook',
  guestbookCategoryId: '',
};

/** 友链 */
export const FRIENDS = [
  { name: 'Astro', url: 'https://astro.build', desc: '本站使用的静态站点框架', avatar: 'A' },
  { name: 'MDN', url: 'https://developer.mozilla.org', desc: '前端查文档最快的地方', avatar: 'M' },
  { name: 'GitHub', url: 'https://github.com', desc: '代码住在这里', avatar: 'G' },
  { name: '你的朋友', url: '#', desc: '把这里换成你朋友的博客', avatar: '友' },
];

/** 我的其它站点 —— 首页「我的站点」入口 */
export const MY_SITES = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    desc: '代码与项目仓库',
    code: 'GH',
    tag: '代码',
  },
  {
    name: 'Bilibili',
    url: 'https://space.bilibili.com',
    desc: '偶尔发点视频',
    code: 'BL',
    tag: '视频',
  },
  {
    name: '小红书',
    url: 'https://www.xiaohongshu.com',
    desc: '随手记的碎片',
    code: 'XHS',
    tag: '生活',
  },
  {
    name: '邮箱',
    url: 'mailto:hello@example.com',
    desc: '有事可以直接写邮件',
    code: 'MAIL',
    tag: '联系',
  },
];

/** 作品集 */
export const WORKS = [
  {
    title: '校园二手书交易小程序',
    year: '2026',
    role: '独立开发',
    stack: ['微信小程序', '云开发'],
    desc: '一个学期内 218 人注册、成交 143 本书的校内二手书平台。没做支付，只做撮合。',
    href: '/posts/campus-book-miniapp',
    status: '已上线',
    tone: 1 as const,
  },
  {
    title: '会呼吸的星空',
    year: '2026',
    role: '实验',
    stack: ['CSS', '生成艺术'],
    desc: '3.2KB，零图片、零框架、零依赖，只有一片会随时间明暗起伏的星空。',
    href: '/posts/css-starry-sky',
    status: '已完成',
    tone: 0 as const,
  },
  {
    title: '个人博客（就是这里）',
    year: '2026',
    role: '设计 + 开发',
    stack: ['Astro', 'TypeScript', 'CSS'],
    desc: '从结构、视觉到内容全部自己做的一个站。深色主题、双主题切换、RSS、全文搜索。',
    href: '/about',
    status: '持续更新',
    tone: 2 as const,
  },
  {
    title: '待补充的作品',
    year: '—',
    role: '—',
    stack: [],
    desc: '这里留给下一个还没开始的项目。把 src/data/site.ts 里的这一项替换掉就行。',
    href: '#',
    status: '占位',
    tone: 3 as const,
  },
];

/** 简历数据 */
export const RESUME = {
  name: 'lxxxhxx',
  title: '学生 / 独立开发者',
  location: '中国',
  summary:
    '喜欢把想法做成能跑的东西。比起堆功能，更在意一个东西是否真的被用起来。目前主要在做前端与小程序，也在学着把设计做得更耐看。',
  skills: [
    { group: '前端', items: ['HTML / CSS', 'JavaScript', 'TypeScript', 'Astro', 'React'] },
    { group: '移动端', items: ['微信小程序', '云开发'] },
    { group: '工具', items: ['Git', 'Figma', 'VS Code', 'Vite'] },
    { group: '正在学', items: ['Node.js', '数据库设计', '排版与视觉'] },
  ],
  timeline: [
    {
      period: '2026 — 现在',
      title: '个人博客与作品集',
      desc: '独立完成本站的设计、开发与内容体系，从零建立起一套可长期维护的写作流程。',
    },
    {
      period: '2026',
      title: '校园二手书交易小程序',
      desc: '独立完成需求调研、产品设计与开发上线。6 周内交付，服务 200+ 校内用户。',
    },
    {
      period: '2025 — 2026',
      title: '课程项目若干',
      desc: '参与多个课程小组项目，主要负责界面实现与前端交互部分。',
    },
  ],
  contact: [
    { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
    { label: 'GitHub', value: 'github.com', href: 'https://github.com' },
  ],
};
