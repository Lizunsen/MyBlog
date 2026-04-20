# Personal Tech Blog

A deployable personal technical blog built with Next.js, MDX, and Tailwind CSS.

## Features

- MDX-based articles in `content/posts`
- Home, post detail, archives, categories, tags, search, about pages
- Dark/light theme toggle
- SEO basics (`sitemap.xml`, `robots.txt`)
- Ready for deployment on Vercel

## Local Development

1. Install Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Content Authoring

Create a new file in `content/posts/*.mdx`:

```md
---
title: "文章标题"
date: "2026-04-20"
summary: "摘要"
category: "分类"
tags:
  - "标签1"
  - "标签2"
---

## 内容
```

## Deployment (Vercel)

1. Push this project to GitHub.
2. Import repository into Vercel.
3. Set env var `NEXT_PUBLIC_SITE_URL` to your site domain.
4. Deploy.

## Quick Create Post

Create a new post template file automatically:

```bash
npm run new:post -- "你的文章标题"
```

Example:

```bash
npm run new:post -- "React 性能优化实战记录"
```

The command will:

- generate `content/posts/<slug>.mdx`
- fill title and today's date
- avoid overwriting by appending suffix when duplicated

## Auto Deploy (Git)

This project can be connected to Vercel Git Integration.
After that, every `git push` to the production branch will trigger an automatic deployment.

## Optional Enhancements

- Integrate comments (Giscus)
- Use generated JSON index for dynamic search
- Add RSS feed and newsletter
