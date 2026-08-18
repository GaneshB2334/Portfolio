import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import { highlightBody } from "@/lib/highlight";
import { getPost, getPostSlugs } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const revalidate = 60;

// Pre-render the posts that exist at build time; anything published later is
// still served, generated on first request and then cached.
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const blog = await getPost(params.slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const title = blog.seo?.metaTitle || blog.title;
  const description = blog.seo?.metaDescription || blog.excerpt;
  const ogImage = blog.seo?.ogImage?.asset?.url || blog.coverImage?.asset?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blogs/${blog.slug}`,
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt || blog.publishedAt,
      authors: [blog.author?.name || "Ganesh Bastapure"],
      ...(blog.tags?.length ? { tags: blog.tags } : {}),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const blog = await getPost(params.slug);

  if (!blog) {
    notFound();
  }

  const authorName = blog.author?.name || "Ganesh Bastapure";
  const body = await highlightBody(blog.body ?? []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    mainEntityOfPage: `${siteUrl}/blogs/${blog.slug}`,
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: authorName,
    },
    ...(blog.coverImage?.asset?.url ? { image: blog.coverImage.asset.url } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
  };

  // Emitted as a second block so the questions are eligible for the FAQ rich
  // result independently of the article itself.
  const faqSchema = blog.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blog.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <article className="mx-auto max-w-5xl">
        <Link
          href="/blogs"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-white"
        >
          <ArrowLeft size={16} />
          Blogs
        </Link>

        <header className="border-b border-white/10 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
            {new Date(blog.publishedAt).toLocaleDateString("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {blog.readingTime ? ` / ${blog.readingTime} min read` : ""}
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            {blog.title}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/55 sm:text-lg">
            {blog.excerpt}
          </p>
          <p className="mt-6 text-sm text-white/40">
            By {blog.author?.name || "Ganesh Bastapure"}
            {blog.updatedAt && blog.updatedAt !== blog.publishedAt
              ? ` · Updated ${new Date(blog.updatedAt).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`
              : ""}
          </p>
          {blog.tags?.length ? (
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
          ) : null}
        </header>

        {blog.coverImage?.asset?.url ? (
          <Image
            src={blog.coverImage.asset.url}
            alt={blog.coverImage.alt || blog.title}
            width={blog.coverImage.asset.metadata?.dimensions?.width ?? 1200}
            height={blog.coverImage.asset.metadata?.dimensions?.height ?? 800}
            className="mt-12 rounded-2xl border border-white/10"
            placeholder={blog.coverImage.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={blog.coverImage.asset.metadata?.lqip}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        ) : null}

        <div className="py-12">
          <PortableText value={body} components={portableTextComponents} />
        </div>

        <div className="border-t border-white/10 py-10">
          <Link
            href="/blogs"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white"
          >
            <ArrowLeft size={16} />
            All posts
          </Link>
        </div>

        {blog.faq?.length ? (
          <section className="border-t border-white/10 py-12">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              Frequently asked
            </h2>
            <dl className="mt-8 space-y-6">
              {blog.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
                >
                  <dt className="text-lg font-semibold tracking-[-0.02em]">
                    {item.question}
                  </dt>
                  <dd className="mt-3 text-sm leading-7 text-white/55">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </article>
    </main>
  );
}
