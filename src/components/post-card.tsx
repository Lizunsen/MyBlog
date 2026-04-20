import Link from "next/link";
import { CalendarDays, Clock3, FolderTree, Hash } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="glass-card p-5 transition-all hover:-translate-y-0.5 hover:border-blue-300/70 hover:shadow-md dark:hover:border-blue-700/70">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="meta-pill">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(post.date)}
        </span>
        <span className="meta-pill">
          <Clock3 className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
        <span className="meta-pill">
          <FolderTree className="h-3.5 w-3.5" />
          {post.category}
        </span>
      </div>
      <h2 className="mb-2 text-xl font-semibold">
        <Link className="hover:text-blue-600" href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      <p className="mb-4 text-slate-600 dark:text-slate-300">{post.summary}</p>
      <div className="flex flex-wrap gap-2">
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
    </article>
  );
}
