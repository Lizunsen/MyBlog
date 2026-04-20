import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-10 text-center">
      <h1 className="text-3xl font-bold">页面不存在</h1>
      <p className="text-slate-600 dark:text-slate-300">你访问的内容可能已被移动或删除。</p>
      <Link className="inline-block rounded-md border px-4 py-2 hover:border-blue-400" href="/">
        返回首页
      </Link>
    </div>
  );
}
