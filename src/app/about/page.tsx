export default function AboutPage() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <h1>关于我</h1>
      <p>
        你好，我是一名持续学习中的开发者。这个博客用于记录技术实现过程、原理学习笔记和踩坑总结。
      </p>
      <h2>关注方向</h2>
      <ul>
        <li>前端工程化与性能优化</li>
        <li>全栈开发与系统设计</li>
        <li>开发效率工具和自动化实践</li>
      </ul>
      <h2>写作原则</h2>
      <ul>
        <li>尽量可复现：给出上下文、关键步骤和代码</li>
        <li>聚焦实战：记录真实问题和取舍过程</li>
        <li>长期更新：持续迭代过往文章内容</li>
      </ul>
    </div>
  );
}
