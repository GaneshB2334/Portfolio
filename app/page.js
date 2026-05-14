"use client";

import ChatUI from "@/components/ChatUI";
import blogs from "@/lib/blogData";
import projects from "@/lib/projectData";
import {
  ArrowUpRight,
  Bot,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const highlights = [
  { label: "Built", value: "PDF editor" },
  { label: "Built", value: "Email campaign platform" },
  { label: "Built", value: "Realtime chat app" },
];

const builtItems = [
  "PDF editor",
  "Email campaign hub",
  "Realtime chat application",
  "Document sharing platform",
  "Movie recommendation app",
  "Responsive dashboards",
];

const experience = [
  {
    role: "Software Development Engineer",
    company: "Krushna53",
    period: "May 2026 - Present",
    text: "Building multiple projects much more things in the pipeline...",
  },
  {
    role: "Software Development Engineer Intern",
    company: "Navarna Bharat",
    period: "May 2025 - Dec 2025",
    text: "Built a campaign management platform for political parties to run digital campaigns, manage volunteers, and track campaign performance.",
  },
  {
    role: "Software Development Engineer Intern",
    company: "Peerbuddy",
    period: "Sep 2025 - March 2025",
    text: "Building product interfaces, shipping user-facing features, and improving mentor-mentee workflows across the platform.",
  },
];

function scrollToSection(section) {
  document.getElementById(section.toLowerCase())?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [missingCodeProject, setMissingCodeProject] = useState("");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const featuredProjects = projects.map((project, index) => ({
    ...project,
    eyebrow: ["PDF editor", "Campaigns", "Messaging", "Sharing", "Discovery"][
      index
    ],
  }));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Ganesh Bastapure",
        url: siteUrl,
        jobTitle: "Software Development Engineer",
        email: "mailto:bastapureganesh21@gmail.com",
        sameAs: [
          "https://github.com/ganeshB2334",
          "https://linkedin.com/in/ganeshbastapure",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Ganesh Bastapure Portfolio",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Selected portfolio projects",
        itemListElement: featuredProjects.map((project, index) => ({
          "@type": "CreativeWork",
          position: index + 1,
          name: project.title,
          description: project.description,
          url: project.Link,
          ...(project.gitHub ? { codeRepository: project.gitHub } : {}),
        })),
      },
      {
        "@type": "Blog",
        "@id": `${siteUrl}/blogs#blog`,
        name: "Ganesh Bastapure Blog",
        url: `${siteUrl}/blogs`,
        blogPost: blogs.map((blog) => ({
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.excerpt,
          datePublished: blog.date,
          url: `${siteUrl}/blogs/${blog.slug}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        id="hero"
        className="mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.28em] text-white/45">
            Ganesh Bastapure
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
            Software engineer.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            I have built a PDF editor, email campaign tools, realtime chat,
            document sharing, movie recommendations, dashboards, and product
            workflows for users.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("work")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/80"
            >
              View work
              <ArrowUpRight size={17} />
            </button>
            <Link
              href="https://linkedin.com/in/ganeshbastapure"
              target="_blank"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-white"
            >
              <Linkedin size={17} />
              Connect on LinkedIn
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.value} className="border-t border-white/10 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="work"
        className="border-t border-white/10 px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
                Selected work
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Things I have built.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/65">
              A short list of products and workflows I have worked on, with
              links to view the live versions and source code.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-white"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  {project.eyebrow}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                  {project.title}
                </h3>
                <p className="mt-2 min-h-10 text-xs leading-5 text-white/50">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={project.Link}
                    target="_blank"
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-black transition hover:bg-white/80"
                  >
                    Live
                    <ArrowUpRight size={13} />
                  </Link>
                  {project.gitHub ? (
                    <Link
                      href={project.gitHub}
                      target="_blank"
                      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-semibold text-white transition hover:border-white"
                    >
                      <Github size={13} />
                      Code
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMissingCodeProject(project.title)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-semibold text-white transition hover:border-white"
                    >
                      <Github size={13} />
                      Code
                    </button>
                  )}
                </div>
                {missingCodeProject === project.title && (
                  <p className="mt-3 text-xs leading-5 text-white/45">
                    Source code is not available for this project.
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="built"
        className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
              Built
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Work focused on usable product flows.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {builtItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
                Experience
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Experience building product interfaces.
              </h2>
            </div>
            <div className="space-y-4">
              {experience.map((item) => (
                <article
                  key={`${item.role}-${item.period}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em]">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-white/45">
                        {item.company}
                      </p>
                    </div>
                    <p className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white/45">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/55">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="blogs"
        className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
                Blogs
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                No posts yet.
              </h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white"
            >
              View all blogs
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {blogs.length > 0 ? (
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.slug}
                  className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <p className="text-xs font-medium text-white/35">
                    {new Date(blog.date).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    / {blog.readTime}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/50">
                    {blog.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition hover:text-white/70"
                  >
                    Read post
                    <ArrowUpRight size={13} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-white/45">
              Blog posts will appear here once published.
            </div>
          )}
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/35">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Get in touch.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:bastapureganesh21@gmail.com"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/80"
            >
              <Mail size={17} />
              Email
            </Link>
            <Link
              href="https://linkedin.com/in/ganeshbastapure"
              target="_blank"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white"
            >
              <Linkedin size={17} />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/ganeshB2334"
              target="_blank"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white"
            >
              <Github size={17} />
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/80"
      >
        <Bot size={18} />
        Ask AI
      </button>

      {isChatOpen && <ChatUI setIsChatOpen={setIsChatOpen} />}
    </main>
  );
}
