import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getTagMap } from "@/lib/posts";

type Params = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  const map = await getTagMap();
  return Array.from(map.keys()).map((tag) => ({ tag }));
}

export default async function TagDetailPage({ params }: Params) {
  const { tag: decodedTag } = await params;
  const map = await getTagMap();
  const posts = map.get(decodedTag);

  if (!posts) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">#{decodedTag}</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
