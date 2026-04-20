import Link from "next/link";
import { BookOpenText, FolderKanban, House, Search, Tag, UserCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "首页", icon: House },
  { href: "/archives", label: "归档", icon: BookOpenText },
  { href: "/categories", label: "分类", icon: FolderKanban },
  { href: "/tags", label: "标签", icon: Tag },
  { href: "/search", label: "搜索", icon: Search },
  { href: "/about", label: "关于", icon: UserCircle2 }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link className="inline-flex items-center gap-2 text-lg font-semibold" href="/">
          <span className="rounded-lg bg-blue-600/10 p-1.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
            <BookOpenText className="h-4 w-4" />
          </span>
          <span>My Tech Blog</span>
        </Link>
        <nav className="flex items-center gap-2 text-xs md:gap-3 md:text-sm">
          {navItems.map((item) => (
            <Link
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              href={item.href}
              key={item.href}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
