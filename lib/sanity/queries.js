import { client } from "./client";

/**
 * Posts for this site only.
 *
 * The dataset is shared with sharethedoc.com, so every query MUST filter on
 * siteId or that site's posts appear here. Note this is a strict `==`, not a
 * `coalesce` — posts written before `siteId` existed belong to Share The Doc,
 * and must never leak in the other direction. (Share The Doc's own query does
 * use coalesce, precisely so those older posts keep resolving to it.)
 */
const SITE_ID = "portfolio";

const PUBLISHED_FILTER = `_type == "blogPost"
  && isPublished == true
  && defined(slug.current)
  && siteId == "${SITE_ID}"`;

// Enough to render a card. Deliberately excludes `body` — the listing page
// would otherwise pull every post's full Portable Text over the wire.
const CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  coverImage{..., asset->{url, metadata{lqip, dimensions}}},
  "tags": tags[]->title
`;

export async function getPosts() {
  return client.fetch(
    /* groq */ `*[${PUBLISHED_FILTER}] | order(publishedAt desc){${CARD_FIELDS}}`,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getPostSlugs() {
  return client.fetch(
    /* groq */ `*[${PUBLISHED_FILTER}]{"slug": slug.current, "lastModified": coalesce(updatedAt, _updatedAt)}`,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getPost(slug) {
  return client.fetch(
    /* groq */ `*[${PUBLISHED_FILTER} && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      updatedAt,
      readingTime,
      coverImage{..., asset->{url, metadata{lqip, dimensions}}},
      "author": authorRef->{name, "slug": slug.current, bio, image{..., asset->{url}}},
      "categories": categories[]->{title, "slug": slug.current},
      "tags": tags[]->title,
      faq[]{question, answer},
      seo{metaTitle, metaDescription, ogImage{..., asset->{url}}},
      // Resolve image assets inside the body; the other custom blocks
      // (youtube, table, codeBlock, horizontalRule) hold no references, so
      // spreading them is enough.
      body[]{
        ...,
        _type == "image" => {..., asset->{url, metadata{lqip, dimensions}}}
      }
    }`,
    { slug },
    { next: { revalidate: 60 } },
  );
}
