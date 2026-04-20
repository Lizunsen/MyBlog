"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ListTree } from "lucide-react";
import type { TocItem } from "@/lib/posts";

type PostTocProps = {
  toc: TocItem[];
  showMobile?: boolean;
  showDesktop?: boolean;
};

export function PostToc({ toc, showMobile = true, showDesktop = true }: PostTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const ids = useMemo(() => toc.map((item) => item.id), [toc]);

  useEffect(() => {
    if (!ids.length) {
      return;
    }

    const observers = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .map((el) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveId(el.id);
            }
          },
          { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 }
        );
        observer.observe(el);
        return observer;
      });

    if (!activeId) {
      setActiveId(ids[0]);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [ids, activeId]);

  if (!toc.length) {
    return null;
  }

  return (
    <>
      {showMobile ? (
        <div className="glass-card lg:hidden">
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            <span className="inline-flex items-center gap-2">
              <ListTree className="h-4 w-4 text-blue-600" />
              文章目录
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileOpen ? (
            <nav className="space-y-1.5 border-t border-slate-200/70 px-3 py-2 dark:border-slate-800">
              {toc.map((item) => (
                <Link
                  className={`toc-link block rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 ${
                    activeId === item.id ? "toc-link--active text-blue-600 dark:text-blue-300" : ""
                  } ${item.level === 3 ? "ml-3" : ""}`}
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      ) : null}
      {showDesktop ? (
        <aside className="glass-card sticky top-24 hidden max-h-[70vh] overflow-auto p-4 lg:block">
          <h2 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
            <ListTree className="h-4 w-4 text-blue-600" />
            文章目录
          </h2>
          <nav className="space-y-1.5">
            {toc.map((item) => (
              <Link
                className={`toc-link block rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 ${
                  activeId === item.id ? "toc-link--active text-blue-600 dark:text-blue-300" : ""
                } ${item.level === 3 ? "ml-3" : ""}`}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </aside>
      ) : null}
    </>
  );
}
