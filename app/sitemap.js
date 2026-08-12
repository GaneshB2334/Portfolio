import { getPostSlugs } from "@/lib/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ganeshbastapure.vercel.app";

// Regenerated on the same cadence as the blog pages, so a newly published post
// reaches the sitemap without a redeploy.
export const revalidate = 60;

export default async function sitemap() {
  const posts = await getPostSlugs();

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
    ...posts.map((post) => ({
      url: `${siteUrl}/blogs/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}
