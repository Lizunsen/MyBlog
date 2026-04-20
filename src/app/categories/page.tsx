import Link from "next/link";
import { FolderOpenDot, Layers } from "lucide-react";
import { getCategoryMap } from "@/lib/posts";

export default async function CategoriesPage() {
  const categoryMap = await getCategoryMap();
  const categories = Array.from(categoryMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0], "zh-CN")
  );

  return (
    <div className="space-y-6">
      <h1 className="inline-flex items-center gap-2 text-3xl font-bold">
        <FolderOpenDot className="h-7 w-7 text-blue-600" />
        分类
      </h1>
      <div className="grid gap-3 md:grid-cols-2">
        {categories.map(([name, posts]) => (
          <Link
            className="glass-card group p-4 hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-blue-700"
            href={`/categories/${encodeURIComponent(name)}`}
            key={name}
          >
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-300">
              <Layers className="h-4 w-4" />
              内容分组
            </div>
            <div className="font-medium group-hover:text-blue-600">{name}</div>
            <div className="text-sm text-slate-500">{posts.length} 篇文章</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
