import Image from "next/image";
import Link from "next/link";
import CodeBlock from "./CodeBlock";

/**
 * Renderers for the Portable Text blocks the Studio can produce.
 *
 * Styling deliberately mirrors the existing blog pages (near-black background,
 * white at reduced opacity, tight tracking) rather than introducing a second
 * visual language. Anything not listed here falls back to the library default.
 */

function extractYoutubeId(url) {
  if (!url) return null;
  // Handles watch?v=, youtu.be/, /embed/ and /shorts/ forms.
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

export const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?.url;
      if (!url) return null;
      const { width, height } = value.asset.metadata?.dimensions ?? {
        width: 1200,
        height: 800,
      };
      return (
        <figure className="my-10">
          <Image
            src={url}
            alt={value.alt || ""}
            width={width}
            height={height}
            className="rounded-2xl border border-white/10"
            placeholder={value.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={value.asset.metadata?.lqip}
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {value.caption ? (
            <figcaption className="mt-3 text-center text-xs text-white/35">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    youtube: ({ value }) => {
      const id = extractYoutubeId(value?.url);
      if (!id) return null;
      return (
        <div className="my-10 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={value?.title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    },

    table: ({ value }) => {
      const rows = value?.rows ?? [];
      if (rows.length === 0) return null;
      const [head, ...body] = rows;
      return (
        // Wide tables scroll inside their own container so the article itself
        // never scrolls sideways on a phone.
        <div className="my-10 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {(head?.cells ?? []).map((cell, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-white/80">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={row?._key ?? r} className="border-b border-white/5 last:border-0">
                  {(row?.cells ?? []).map((cell, c) => (
                    <td key={c} className="px-4 py-3 text-white/55">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    codeBlock: ({ value }) => (
      <CodeBlock
        language={value?.language}
        code={value?.code ?? ""}
        html={value?.html}
      />
    ),

    horizontalRule: () => <hr className="my-12 border-white/10" />,
  },

  block: {
    normal: ({ children }) => (
      <p className="mb-7 text-base leading-8 text-white/65">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 mb-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-2xl font-semibold tracking-[-0.03em] text-white">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-white/25 pl-5 text-base italic leading-8 text-white/55">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-7 list-disc space-y-2 pl-6 text-base leading-8 text-white/65 marker:text-white/30">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-7 list-decimal space-y-2 pl-6 text-base leading-8 text-white/65 marker:text-white/30">
        {children}
      </ol>
    ),
  },

  marks: {
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.9em] text-white/85">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            // noreferrer alongside noopener: the target must not receive this
            // page's URL, and older browsers only honour the former.
            rel="noopener noreferrer"
            className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
        >
          {children}
        </Link>
      );
    },
  },
};
