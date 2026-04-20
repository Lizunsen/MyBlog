import Link from "next/link";
import { Hash, Tags } from "lucide-react";
import { getTagMap } from "@/lib/posts";

export default async function TagsPage() {
  const tagMap = await getTagMap();
  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="space-y-6">
      <h1 className="inline-flex items-center gap-2 text-3xl font-bold">
        <Tags className="h-7 w-7 text-blue-600" />
        标签
      </h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map(([tag, posts]) => (
          <Link
            className="glass-card inline-flex items-center justify-between gap-2 px-4 py-3 text-sm hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-blue-700"
            href={`/tags/${encodeURIComponent(tag)}`}
            key={tag}
          >
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Hash className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              {tag}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              {posts.length}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
