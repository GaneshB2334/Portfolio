import blogs from "@/lib/blogData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ganeshbastapure.vercel.app";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}
