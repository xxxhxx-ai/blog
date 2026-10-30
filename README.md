# lxxxhxx

一个二次元 × 科技文艺风格的个人博客：学习笔记 + 作品集。

**完全免费**：没有服务器、没有数据库、没有月费。所有内容都是 Markdown 文件，站点是构建出来的静态 HTML，托管在 GitHub Pages 上。

---

## 一、当前状态

**已经部署上线了**，不需要再配置任何东西：

| 项目 | 地址 |
|---|---|
| 网站 | https://xxxhxx-ai.github.io/blog/ |
| 仓库 | https://github.com/xxxhxx-ai/blog |
| 部署记录 | https://github.com/xxxhxx-ai/blog/actions |

工作方式是：往 `main` 分支推代码 → GitHub Actions 自动构建 → 发布到 Pages，全程 1–2 分钟。
所以你每次**改完内容提交，等 Actions 变绿，刷新网址就能看到更新**。

### 为什么网址带 /blog

仓库名是 `blog`，站点就挂在子路径下。`astro.config.mjs` 里配了 `base: '/blog'`，
另外还有一个构建后处理（`baseHref`）自动给所有站内链接补前缀——**不要手动删掉 base**，
否则全站链接会 404。

想让网址变成 `https://xxxhxx-ai.github.io`（不带 /blog）的话：

1. GitHub 仓库 Settings → 最上方 Rename 改成 `xxxhxx-ai.github.io`
2. `astro.config.mjs` 删掉 `base: '/blog'` 这一行
3. `src/data/site.ts` 的 `url` 改成 `https://xxxhxx-ai.github.io`

## 二、怎么发文章

### 方式 A：网页后台（推荐，手机也能写）

不需要装任何东西，用的是一个免费的开源 CMS：

1. 打开 <https://app.pagescms.org>
2. 用 **GitHub 账号**登录并授权
3. 选择你的博客仓库
4. 左侧会出现「文章」→ 新建 → 填标题、摘要、分类、正文
5. 点保存 → 等 1–2 分钟，网站自动更新

后台能改的东西已经不止文章了——左侧菜单里有 **文章 / 我的站点 / 友链 / 作品集 / 简历** 五个入口，
都是填表格，不用看到任何代码。

后台的字段定义在 `.pages.yml` 里，想加字段（比如封面图、外链作者）改这个文件就行。

> 这是目前唯一能同时满足「免费」+「有网页后台」的方案。代价是登录需要 GitHub 账号。

### 方式 B：GitHub 网页直接改

在仓库里进 `src/content/posts/`，点 `Add file` → `Create new file`，复制一篇现有文章的结构改一下，提交即可。

### 方式 C：本地写（最快，适合批量）

```bash
# 在 src/content/posts/ 下新建 xxx.md，然后
npm run dev
```

---

## 三、一篇文章的格式

```markdown
---
title: 文章标题
description: 一句话摘要，会显示在列表卡片上
pubDate: 2026-10-30
category: 学习笔记        # 只能填：学习笔记 / 项目作品 / 技术折腾 / 随笔
tags: ["Astro", "CSS"]
featured: false           # true 会出现在首页「值得先看的两篇」
draft: false              # true 就不会发布
index: "09"               # 卡片左上角的序号，可留空
---

正文从这里开始，用 Markdown 写。

## 二级标题会出现在右侧目录里

支持代码块、表格、图片、引用……
```

---

## 四、开启评论（免费）

评论用的是 **Giscus**：数据存在你自己的 GitHub 仓库的 Discussions 里，不需要服务器。

1. 在仓库 → `Settings` → `General` → 勾选 **Discussions**
2. 打开 <https://giscus.app>，填仓库名，按提示授权
3. 页面下方会给出两段 ID：`data-repo-id` 和 `data-category-id`
4. 打开 `src/data/site.ts`，把 `GISCUS` 那段填好：

```ts
export const GISCUS = {
  enabled: true,                          // 改成 true
  repo: '你的用户名/lxxxhxx.github.io',
  repoId: 'R_kgDOxxxxxxx',                // 从 giscus.app 复制
  category: 'Announcements',
  categoryId: 'DIC_kwDOxxxxxxxx',         // 从 giscus.app 复制
  ...
};
```

5. 提交，等部署完成，评论就能用了。

留言板用的是独立的 discussion 分类（默认叫 `Guestbook`），在 giscus.app 里换一个分类再取一次 ID 填进 `guestbookCategoryId` 即可。

---

## 五、想改哪里

| 想改什么 | 改哪个文件 |
|---|---|
| 站点名、域名、邮箱 | `src/data/site.ts` |
| 友链列表 | `src/data/friends.json`（或网页后台「友链」） |
| 我的站点 | `src/data/sites.json`（或网页后台「我的站点」） |
| 作品集 | `src/data/works.json`（或网页后台「作品集」） |
| 简历内容 | `src/data/resume.json`（或网页后台「简历」） |
| 欢迎语 | `src/pages/index.astro` → 搜 `欢迎来到我的博客` |
| 主题色、字体 | `src/styles/global.css` 顶部的 CSS 变量 |
| 分类名称/描述 | `src/lib/posts.ts` → `CATEGORIES` |
| 导航菜单 | `src/components/Header.astro` 顶部两个数组 |
| 网站地址 | `astro.config.mjs` → `site` |

### 换掉 Q 版少女头像

四个角色图在 `src/assets/chibi/`：

| 文件 | 角色 | 用在哪（tone） |
|---|---|---|
| `girl-0-purple.png` | 紫发双马尾 · 圈圈眼 | 0 |
| `girl-1-cream.png` | 奶金发 · 猫耳发箍 | 3 |
| `girl-2-pink.png` | 粉发丸子头 · 星星发夹 | 2 |
| `girl-3-mint.png` | 薄荷短发 · 眨眼 | 1 |

直接用同名图片覆盖就能换掉，建议 **正方形、纯白或浅色背景**，人物居中——组件会按圆角方形裁切，构图偏了会被切到脸。

想调整某个页面用哪个角色，改对应文件里的 `tone` 值：

```astro
<ChibiArt size={132} tone={2} />
```

另外 `src/components/ChibiGirl.astro` 是早期的矢量版本，已经不用了，留着只作备用。

### 换掉首页主视觉

首页右侧那个会动的角色是 `src/assets/hero/girl-full.png`——**透明背景的 PNG**，直接覆盖同名文件就能换。

要求：竖构图（约 3:4）、**背景必须透明**。如果给你的图是白底，用任意抠图工具去掉背景即可；背景不透明的话，深色主题下会显示成一个白方块。

动效写在 `src/components/HeroArt.astro` 里，共五层，可以单独关掉某一层：

| 效果 | 在哪里 | 改什么 |
|---|---|---|
| 上下浮动 | `.figure-float` | `figureFloat` 动画的 `-11px` |
| 呼吸缩放 | `.girl-img` | `breathe` 动画的 `1.018` |
| 光环旋转 | `.ring-a` / `.ring-b` | `spinSlow` 的时长（62s / 96s） |
| 上升粒子 | `.sparks span` | 数量在文件顶部的 `sparks` 数组 |
| 扫描线 | `.scan` | `sweep` 动画 |

鼠标移到图上会有一点视差跟随；系统开启「减少动态效果」时，所有动画会自动停止。

---

## 六、本地开发（可选）

需要 Node.js 18 以上。

```bash
npm install      # 第一次
npm run dev      # 本地预览，改代码自动刷新
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

---

## 七、常见问题

**Q：仓库名不是 `用户名.github.io`，页面样式全乱了？**

打开 `astro.config.mjs`，改成：

```js
export default defineConfig({
  site: 'https://用户名.github.io',
  base: '/仓库名',
  ...
});
```

同时把 `src/data/site.ts` 里的 `url` 也改掉。

**Q：国内打开慢 / 打不开？**

GitHub Pages 在国内访问不稳定。免费方案里可以换 **Cloudflare Pages**（同样免费，通常更快）：
新建 Cloudflare Pages 项目 → 连接这个仓库 → 构建命令 `npm run build`，输出目录 `dist`。

**Q：图片放哪？**

放到 `public/uploads/`，文章里用 `/uploads/文件名.jpg` 引用。用 Pages CMS 后台传图会自动放进去。

**Q：想加自定义域名？**

域名要花钱（约 70 元/年），这是唯一的非免费项。买了之后在仓库 `Settings → Pages → Custom domain` 填上，再改 `astro.config.mjs` 的 `site`。

**Q：备案号在哪改？**

`src/components/Footer.astro` 底部。用 GitHub Pages / Cloudflare 不需要备案，那行可以删掉。

---

## 目录结构

```
src/
├── components/     组件（少女插画、卡片、页头、评论…）
├── content/posts/  所有文章，一篇一个 .md
├── data/site.ts    站点信息、友链、作品、简历
├── layouts/        页面骨架
├── lib/posts.ts    文章读取与分类逻辑
├── pages/          每个文件对应一个页面路由
└── styles/         全局样式与主题变量
public/             静态资源（图标、图片）
.pages.yml          网页后台的字段定义
```

---

## 技术说明

- **Astro** 静态输出，默认不发送 JavaScript
- **站内跳转不刷新整页**：用了 View Transitions（`ClientRouter`），点击导航和文章卡片时是淡入淡出过渡，滚动位置自动回顶，体验接近原生应用
- **没有分页**：文章一次性列在 `/posts`，从上往下滑，点哪篇进哪篇。文章多到几十篇以上时，可以再考虑加「加载更多」
- 双主题（深/浅），跟随系统偏好，也可手动切换；`?theme=light` 可以强制指定
- 响应式，移动端可用；带 `prefers-reduced-motion` 支持
- RSS、sitemap、站内搜索（构建期生成索引）、文章目录、代码高亮
- 无第三方追踪脚本

### 如果你不想要「不刷新」的效果

删掉 `src/layouts/BaseLayout.astro` 里的这一行即可恢复成普通的整页跳转：

```astro
<ClientRouter />
```
