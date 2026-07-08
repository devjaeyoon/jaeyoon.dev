import { type CollectionEntry, getCollection } from "astro:content";

import { parseDate } from "@/lib/dates";

export type PostCardData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  thumbnail?: CollectionEntry<"posts">["data"]["thumbnail"];
  development: boolean;
};

export function toPostCardData(post: CollectionEntry<"posts">): PostCardData {
  return {
    slug: post.data.slug,
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    createdAt: post.data.createdAt,
    thumbnail: post.data.thumbnail,
    development: post.data.development ?? false,
  };
}

export async function getPostEntries(): Promise<CollectionEntry<"posts">[]> {
  return getCollection("posts");
}

export async function getPostCards(): Promise<PostCardData[]> {
  const posts = await getPostEntries();

  return posts
    .map(toPostCardData)
    .sort((a, b) => parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime());
}

export function getCategoriesFromPosts(posts: PostCardData[]): string[] {
  return [...new Set(posts.map((post) => post.category))].sort();
}

export async function getPostBySlug(slug: string): Promise<CollectionEntry<"posts"> | undefined> {
  const posts = await getPostEntries();

  return posts.find((post) => post.data.slug === slug);
}
