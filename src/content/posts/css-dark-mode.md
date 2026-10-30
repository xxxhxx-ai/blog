---
title: CSS 变量做双主题切换的三种写法
description: 从最笨的 class 切换，到 data 属性 + 变量继承，再到能跟随系统偏好的完整方案。
pubDate: 2026-10-22
category: 技术折腾
tags: ["CSS", "主题", "前端"]
index: "02"
---

深色/浅色双主题，看起来是个小功能，真做起来有三种差别很大的实现路径。我把它们都写了一遍，记录在这里。

## 写法一：给 body 加 class

最直觉的做法：

```css
body.light { --bg: #fff; --text: #111; }
body.dark  { --bg: #000; --text: #eee; }
```

切换时用 JS 改 `document.body.className`。

**问题**：所有变量都挂在一个巨大的选择器下，层级很深，后期改不动。而且首屏会闪一下白——因为 HTML 解析完成前，JS 还没跑。

## 写法二：挂在 html 的 data 属性上

```css
:root[data-theme="dark"]  { --bg: #07080d; --text: #e8ebf7; }
:root[data-theme="light"] { --bg: #f7f5f1; --text: #1d1a26; }
```

这个博客用的就是这种。好处是：

- 变量定义在根元素，任何组件都能读到
- 选择器只有一个，覆盖清楚
- HTML 上就能直接写 `<html data-theme="light">`，服务端渲染时就定好了

## 写法三：跟随系统 + 用户手动覆盖

真正完整的方案要处理三态：**跟随系统 / 强制浅色 / 强制深色**。

```js
const saved = localStorage.getItem('theme');   // 'light' | 'dark' | null
const prefersLight = !window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = saved ?? (prefersLight ? 'light' : 'dark');
document.documentElement.dataset.theme = theme;
```

关键有两点：

**这段脚本必须内联在 `<head>` 里，且要在样式之前执行。** 放到 `defer` 或者底部都会导致闪烁。

**要监听系统变化。** 用户没手动选过的时候，系统切换了主题，页面也应该跟着变：

```js
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    }
  });
```

## 一个容易被忘的细节

`color-scheme` 这个 CSS 属性一定要设：

```css
:root[data-theme="dark"]  { color-scheme: dark; }
:root[data-theme="light"] { color-scheme: light; }
```

不设的话，滚动条、表单控件、默认输入框在深色主题下会保持亮色，非常突兀。这个属性只需要一行，但效果很明显。

## 小结

| 写法 | 闪烁风险 | 可维护性 | 是否跟随系统 |
|---|---|---|---|
| class | 高 | 低 | 难 |
| data 属性 | 低 | 高 | 可以 |
| 完整方案 | 无 | 高 | 是 |

直接上第三种就行，代码量并不大。
