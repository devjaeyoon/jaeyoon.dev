import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { postDateSchema } from "@/lib/dates";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content" }),
  schema: ({ image }) =>
    z.object({
      slug: z
        .string()
        .regex(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Slug must use lowercase letters, numbers, and hyphens",
        ),
      title: z.string(),
      description: z.string(),
      thumbnail: image().optional(),
      category: z.string(),
      createdAt: postDateSchema,
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
