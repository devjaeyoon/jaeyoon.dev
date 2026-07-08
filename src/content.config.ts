import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content" }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      thumbnail: image().optional(),
      category: z.string(),
      createdAt: z.string(),
      updatedAt: z.string().nullable().optional(),
      development: z.boolean().nullable().optional().default(false),
    }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./about" }),
  schema: z.object({
    category: z.string(),
  }),
});

export const collections = { posts, about };
