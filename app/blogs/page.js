import blogs from "@/lib/blogData";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs | Ganesh Bastapure",
  description:
    "Blog posts by Ganesh Bastapure. No posts are published yet.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs | Ganesh Bastapure",
    description: "Blog posts by Ganesh Bastapure. No posts are published yet.",
    url: "/blogs",
    type: "website",
  },
};

export default function BlogsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blogs#blog`,
    name: "Ganesh Bastapure Blog",
    url: `${siteUrl}/blogs`,
    author: {
      "@type": "Person",
      name: "Ganesh Bastapure",
      url: siteUrl,
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      datePublished: blog.date,
      author: {
        "@type": "Person",
        name: "Ganesh Bastapure",
      },
      url: `${siteUrl}/blogs/${blog.slug}`,
      keywords: blog.tags.join(", "),
    })),
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-white"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        <section className="py-20">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
            Blogs
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            No posts yet.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            Blog posts will appear here once published.
          </p>
        </section>

        <section className="grid gap-3 pb-20">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
            <article
              key={blog.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-medium text-white/35">
                    {new Date(blog.date).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    / {blog.readTime}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                    {blog.title}
                  </h2>
                </div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:border-white hover:text-white"
                  aria-label={`Read ${blog.title}`}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
                {blog.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-white/45 sm:p-6">
              No blog posts have been published yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
