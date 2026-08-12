import { createClient } from "@sanity/client";

// This dataset is shared with sharethedoc.com — the two sites are separated by
// the `siteId` field on each post, not by project or dataset. See queries.js.
//
// The project id and dataset are not secrets (they are visible in any request
// the browser makes), so they are inlined rather than pushed into env vars.
// That keeps a fresh clone or a new Vercel deployment working with no setup.
// NEXT_PUBLIC_* still overrides them if this ever needs to point elsewhere.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "nwvmwzoo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-08-01",
  // Server-side rendering hits the API directly, so a freshly published post
  // appears immediately instead of after the CDN's cache window.
  useCdn: false,
});
