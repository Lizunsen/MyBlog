import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, FolderKanban, Hash } from "lucide-react";
import { PostToc } from "@/components/post-toc";
import { formatDate } from "@/lib/format";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  try {
    const allPosts = await getAllPostsMeta();
    const post = await getPostBySlug(slug);
    const currentIndex = allPosts.findIndex((item) => item.slug === slug);
    const previousPost = currentIndex >= 0 ? allPosts[currentIndex + 1] : undefined;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;

    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="space-y-6">
          <header className="glass-card space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="meta-pill">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="meta-pill">
                <Clock3 className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
              <Link
                className="meta-pill hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700"
                href={`/categories/${encodeURIComponent(post.category)}`}
              >
                <FolderKanban className="h-3.5 w-3.5" />
                {post.category}
              </Link>
            </div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <Link
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-blue-700"
                  href={`/tags/${encodeURIComponent(tag)}`}
                  key={tag}
                >
                  <Hash className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
          </header>
          <PostToc showDesktop={false} toc={post.toc} />
          <div className="prose prose-slate max-w-none dark:prose-invert">
            {post.content}
          </div>
          <nav className="grid gap-3 sm:grid-cols-2">
            {previousPost ? (
              <Link
                className="glass-card group p-4 hover:border-blue-300 dark:hover:border-blue-700"
                href={`/posts/${previousPost.slug}`}
              >
                <p className="mb-1 inline-flex items-center gap-1 text-xs text-slate-500">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  上一篇
                </p>
                <p className="font-medium group-hover:text-blue-600">{previousPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                className="glass-card group p-4 text-right hover:border-blue-300 dark:hover:border-blue-700"
                href={`/posts/${nextPost.slug}`}
              >
                <p className="mb-1 inline-flex items-center gap-1 text-xs text-slate-500">
                  下一篇
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
                <p className="font-medium group-hover:text-blue-600">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
        <PostToc showMobile={false} toc={post.toc} />
      </div>
    );
  } catch {
    notFound();
  }
}
