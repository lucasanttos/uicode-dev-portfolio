import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = blogPosts.map((post) => ({
    url: `https://uicode.site/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://uicode.site",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...blogRoutes,
  ];
}