import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Star, Telescope } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { getAllPostsMeta } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const latestPosts = posts.slice(0, 8);
  const featuredPosts = posts.slice(0, 2);
  const totalPosts = posts.length;
  const totalTags = new Set(posts.flatMap((post) => post.tags)).size;

  return (
    <div className="space-y-8">
      <section className="glass-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative space-y-4">
          <p className="meta-pill w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            持续输出 · 工程实践 · 学习复盘
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">记录技术成长与实践</h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">
            这里会持续更新学习总结、项目实现细节与问题排查过程，帮助自己复盘，也希望能给他人带来启发。
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="meta-pill">
              <Flame className="h-3.5 w-3.5" />
              文章 {totalPosts}
            </span>
            <span className="meta-pill">
              <Telescope className="h-3.5 w-3.5" />
              标签 {totalTags}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
            <Star className="h-5 w-5 text-amber-500" />
            精选文章
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <article className="glass-card p-5" key={`featured-${post.slug}`}>
              <p className="mb-2 text-xs text-slate-500">{post.category}</p>
              <h3 className="mb-2 text-lg font-semibold">
                <Link className="hover:text-blue-600" href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{post.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
            <Flame className="h-5 w-5 text-orange-500" />
            最新文章
          </h2>
          <Link
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            href="/archives"
          >
            查看归档
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
