import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getCategoryMap } from "@/lib/posts";

type Params = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  const map = await getCategoryMap();
  return Array.from(map.keys()).map((category) => ({ category }));
}

export default async function CategoryDetailPage({ params }: Params) {
  const { category: decodedCategory } = await params;
  const map = await getCategoryMap();
  const posts = map.get(decodedCategory);

  if (!posts) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{decodedCategory}</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
