import blogs from "@/lib/blogData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const blog = blogs.find((item) => item.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `/blogs/${blog.slug}`,
      type: "article",
      publishedTime: blog.date,
      authors: ["Ganesh Bastapure"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export default function BlogDetailPage({ params }) {
  const blog = blogs.find((item) => item.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.date,
    dateModified: blog.date,
    mainEntityOfPage: `${siteUrl}/blogs/${blog.slug}`,
    author: {
      "@type": "Person",
      name: "Ganesh Bastapure",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Ganesh Bastapure",
    },
    keywords: blog.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="mx-auto max-w-3xl">
        <Link
          href="/blogs"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-white"
        >
          <ArrowLeft size={16} />
          Blogs
        </Link>

        <header className="border-b border-white/10 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
            {new Date(blog.date).toLocaleDateString("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            / {blog.readTime}
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            {blog.title}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/55 sm:text-lg">
            {blog.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-7 py-12">
          {blog.content.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-white/65">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
