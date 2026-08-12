import HomeClient from "@/components/HomeClient";
import { getPosts } from "@/lib/sanity/queries";

// The homepage tree is interactive ("use client"), so the Sanity fetch happens
// here instead and the posts are handed down as a prop. Doing it this way keeps
// the blog cards and their BlogPosting JSON-LD server-rendered, which a
// client-side fetch would not.
export const revalidate = 60;

export default async function Page() {
  const blogs = await getPosts();
  return <HomeClient blogs={blogs} />;
}
