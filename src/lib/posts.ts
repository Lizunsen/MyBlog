import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  readingTime: string;
};

type Frontmatter = Omit<PostMeta, "slug" | "readingTime">;
export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugifyHeading(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      continue;
    }

    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const level = match[1] === "##" ? 2 : 3;
    const text = match[2].trim();
    toc.push({
      id: slugifyHeading(text),
      text,
      level
    });
  }

  return toc;
}

export async function getPostSlugs() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getPostMeta(slug: string): Promise<PostMeta> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    readingTime: readingTime(content).text
  };
}

export async function getAllPostsMeta() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostMeta(slug)));
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  const mdx = await compileMDX<Frontmatter>({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
      }
    }
  });

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    readingTime: readingTime(content).text,
    toc: extractToc(content),
    content: mdx.content
  };
}

export async function getTagMap() {
  const posts = await getAllPostsMeta();
  const map = new Map<string, PostMeta[]>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const current = map.get(tag) ?? [];
      current.push(post);
      map.set(tag, current);
    });
  });

  return map;
}

export async function getCategoryMap() {
  const posts = await getAllPostsMeta();
  const map = new Map<string, PostMeta[]>();

  posts.forEach((post) => {
    const current = map.get(post.category) ?? [];
    current.push(post);
    map.set(post.category, current);
  });

  return map;
}
