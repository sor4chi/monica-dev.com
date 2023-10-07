import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const works = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
  }),
});

export const collections = { works };
