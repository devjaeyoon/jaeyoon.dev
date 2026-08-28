import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_CONFIG } from "@/constants";
import { comparePostDatesDescending, parsePostDate } from "@/lib/dates";

export async function GET(context: APIContext) {
  const sortedPosts = (await getCollection("posts")).sort((postA, postB) =>
    comparePostDatesDescending(postA.data.createdAt, postB.data.createdAt),
  );

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.domain,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: parsePostDate(post.data.createdAt),
      description: post.data.description,
      link: `/posts/${post.data.slug}/`,
    })),
  });
}
