import { codeToHtml } from "shiki";

/**
 * Syntax-highlight the code blocks in a Portable Text body.
 *
 * Done here rather than inside the Portable Text renderer because Shiki's API
 * is async and @portabletext/react's component renderers are synchronous. The
 * page is a server component, so this runs at build/revalidate time and the
 * highlighter itself never reaches the browser — the client only receives
 * finished HTML.
 */

// Shiki throws on an unknown language id, and the Studio's language field is
// free text. Map the ones likely to be typed, and fall back to no highlighting.
const ALIASES = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  terminal: "bash",
  js: "javascript",
  ts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  py: "python",
  rs: "rust",
  yml: "yaml",
  text: "plaintext",
  txt: "plaintext",
  "": "plaintext",
};

export async function highlightBody(body = []) {
  return Promise.all(
    body.map(async (block) => {
      if (block?._type !== "codeBlock" || !block?.code) return block;

      const raw = (block.language || "").toLowerCase().trim();
      const lang = ALIASES[raw] ?? raw ?? "plaintext";

      try {
        const html = await codeToHtml(block.code, {
          lang,
          // VS Code's own default dark theme, so the colours match what the
          // reader sees in their editor.
          theme: "dark-plus",
        });
        return { ...block, html };
      } catch {
        // Unknown language: render it unhighlighted rather than failing the
        // whole page.
        return block;
      }
    }),
  );
}
