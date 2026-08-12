"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Code block with a copy button.
 *
 * Client component because the clipboard API only exists in the browser. It is
 * imported by PortableTextComponents, which is otherwise rendered from a server
 * component — this is the only interactive island in an article.
 */
export default function CodeBlock({ language, code = "", html }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  // A pending timeout that fires after navigation would set state on an
  // unmounted component.
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fails on http:// origins and when the user denies permission. Silent
      // by design: the code is on screen and still selectable by hand.
    }
  }, [code]);

  return (
    <div className="group relative my-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          // Announces the state change for screen readers, which otherwise get
          // no feedback that the copy happened.
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-white/45 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>
      {html ? (
        // Pre-highlighted by Shiki on the server (see lib/highlight.js).
        // `shiki-code` in globals.css strips Shiki's own background so the
        // container's styling shows through, and restores horizontal scroll.
        <div
          className="shiki-code overflow-x-auto p-4 text-sm leading-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-sm leading-6">
          <code className="text-white/75">{code}</code>
        </pre>
      )}
    </div>
  );
}
