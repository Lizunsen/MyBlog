import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const posts = await getAllPostsMeta();

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/archives`, lastModified: new Date() },
    { url: `${siteUrl}/categories`, lastModified: new Date() },
    { url: `${siteUrl}/tags`, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    ...postRoutes
  ];
}
