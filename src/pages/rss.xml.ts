import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_CONFIG } from "@/constants";
import { parseDate } from "@/lib/dates";

export async function GET(context: APIContext) {
  const sortedPosts = (await getCollection("posts")).sort(
    (postA, postB) =>
      parseDate(postB.data.createdAt).getTime() - parseDate(postA.data.createdAt).getTime(),
  );

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.domain,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: parseDate(post.data.createdAt),
      description: post.data.description,
      link: `/posts/${post.data.slug}/`,
    })),
  });
}
