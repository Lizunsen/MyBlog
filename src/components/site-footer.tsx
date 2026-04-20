export function SiteFooter() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-4xl space-y-2 px-4 text-sm text-slate-500 dark:text-slate-400">
        <p>Built with Next.js + MDX. Keep shipping, keep learning.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="meta-pill" id="busuanzi_container_site_uv">
            总访客数:
            <strong className="font-semibold text-slate-700 dark:text-slate-200">
              <span id="busuanzi_value_site_uv" />
            </strong>
          </span>
          <span className="meta-pill" id="busuanzi_container_site_pv">
            总访问量:
            <strong className="font-semibold text-slate-700 dark:text-slate-200">
              <span id="busuanzi_value_site_pv" />
            </strong>
          </span>
          <span className="meta-pill" id="busuanzi_container_page_pv">
            本页阅读:
            <strong className="font-semibold text-slate-700 dark:text-slate-200">
              <span id="busuanzi_value_page_pv" />
            </strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
