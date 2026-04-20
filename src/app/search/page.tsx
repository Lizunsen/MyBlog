"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import posts from "@/lib/search-index.json";
import { formatDate } from "@/lib/format";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) {
      return posts;
    }

    return posts.filter((post) => {
      const haystack = `${post.title} ${post.summary} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [keyword]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">搜索</h1>
      <input
        className="w-full rounded-lg border bg-transparent px-4 py-2 outline-none focus:border-blue-500"
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="输入标题、标签、分类关键字..."
        value={keyword}
      />
      <div className="space-y-3">
        {results.map((post) => (
          <article className="rounded-lg border p-4" key={post.slug}>
            <h2 className="text-lg font-semibold">
              <Link className="hover:text-blue-600" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="mb-2 text-sm text-slate-500">
              {formatDate(post.date)} · {post.category}
            </p>
            <p className="text-slate-600 dark:text-slate-300">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
