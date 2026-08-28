import { getImage } from "astro:assets";
import { type CollectionEntry, getCollection } from "astro:content";

import { parseDate } from "@/lib/dates";
import {
  POST_IMAGE_FORMAT,
  POST_IMAGE_PRESETS,
  POST_IMAGE_QUALITY,
  type PostImageVariant,
} from "@/lib/images";

export type ResponsiveImageData = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
};

export type PostCardData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  thumbnail?: CollectionEntry<"posts">["data"]["thumbnail"];
  development: boolean;
};

export type ResponsivePostCardData = Omit<PostCardData, "thumbnail"> & {
  thumbnail?: ResponsiveImageData;
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

export async function optimizePostImages(
  posts: PostCardData[],
  variant: PostImageVariant,
): Promise<ResponsivePostCardData[]> {
  const preset = POST_IMAGE_PRESETS[variant];

  return Promise.all(
    posts.map(async (post) => {
      const { thumbnail, ...postWithoutThumbnail } = post;

      if (!thumbnail) {
        return postWithoutThumbnail;
      }

      const image = await getImage({
        src: thumbnail,
        format: POST_IMAGE_FORMAT,
        quality: POST_IMAGE_QUALITY,
        ...preset,
      });

      return {
        ...postWithoutThumbnail,
        thumbnail: {
          src: image.src,
          srcSet: image.srcSet.attribute,
          sizes: preset.sizes,
          width: Number(image.attributes.width),
          height: Number(image.attributes.height),
        },
      };
    }),
  );
}

export function getCategoriesFromPosts(posts: Pick<PostCardData, "category">[]): string[] {
  return [...new Set(posts.map((post) => post.category))].sort();
}
