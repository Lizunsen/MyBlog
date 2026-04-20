import fs from "node:fs/promises";
import path from "node:path";

function formatDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function slugify(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function ensureUniqueFilePath(baseDir, slug) {
  let candidate = slug;
  let index = 1;

  while (true) {
    const fullPath = path.join(baseDir, `${candidate}.mdx`);
    try {
      await fs.access(fullPath);
      candidate = `${slug}-${index}`;
      index += 1;
    } catch {
      return { fullPath, finalSlug: candidate };
    }
  }
}

async function main() {
  const titleArg = process.argv.slice(2).join(" ").trim();
  const date = formatDate();
  const title = titleArg || `新文章 ${date}`;
  const rawSlug = slugify(title) || `post-${date}`;

  const postsDir = path.join(process.cwd(), "content", "posts");
  await fs.mkdir(postsDir, { recursive: true });

  const { fullPath, finalSlug } = await ensureUniqueFilePath(postsDir, rawSlug);

  const template = `---
title: "${title}"
date: "${date}"
summary: "请填写摘要"
category: "未分类"
tags:
  - "待整理"
---

## 背景

## 目标

## 实现

## 总结
`;

  await fs.writeFile(fullPath, template, "utf8");

  console.log(`Created: content/posts/${finalSlug}.mdx`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
