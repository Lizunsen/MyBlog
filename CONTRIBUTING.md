# Contributing Guide

This project is a file-driven personal tech blog built with **Next.js + MDX**.
Most day-to-day work is adding/editing files under `content/posts`.

## Quick Start

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Production build check:

```bash
npm run build
```

## Writing Posts

### Create a New Post

Use the scaffold command:

```bash
npm run new:post -- "文章标题"
```

It creates a template file under `content/posts/*.mdx`.

### Frontmatter Rules

Each post must include:

- **title**: string
- **date**: `YYYY-MM-DD`
- **summary**: short summary shown in lists
- **category**: single category string
- **tags**: list of tags

Example:

```md
---
title: "React 性能优化实战记录"
date: "2026-04-20"
summary: "从渲染、缓存、列表和网络层总结前端性能优化实践。"
category: "前端工程"
tags:
  - "React"
  - "性能优化"
---
```

### Slug (URL) Rule

The URL slug is the **filename** (without `.mdx`).

- Changing filename == changing URL
- If you must rename, consider leaving a note or adding a redirect later

## Categories & Tags

You do not create categories/tags separately.

- New `category` values auto-appear on the categories pages
- New `tags` values auto-appear on the tags pages

## Git Workflow (Auto Deploy)

This repo is connected to **Vercel Git Integration**.

### Publish Changes

```bash
git add .
git commit -m "publish: <short message>"
git push
```

After pushing to the production branch (usually `main`), Vercel will:

- build the project
- deploy to Production automatically

### Suggested Commit Message Style

- `publish: ...` for new/updated posts
- `ui: ...` for UI changes
- `fix: ...` for bug fixes
- `chore: ...` for tooling changes

## Troubleshooting

### `npm` not recognized (Windows)

If your terminal can't find `npm`, use the absolute path:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

### Port 3000 in use

Next.js will automatically switch to another port (e.g. 3001).
Follow the URL shown in the terminal output.

## Project Structure (What to Edit)

- **Posts**: `content/posts/*.mdx`
- **Home**: `src/app/page.tsx`
- **Post page**: `src/app/posts/[slug]/page.tsx`
- **Components**: `src/components/*`
- **Global styles**: `src/app/globals.css`

