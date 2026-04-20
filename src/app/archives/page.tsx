import { PostCard } from "@/components/post-card";
import { getAllPostsMeta } from "@/lib/posts";

export default async function ArchivesPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">归档</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
