import { defineCollection, z } from "astro:content";

const originalBlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

const externalBlogSchema = z.object({
  title: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
});

const blogs = defineCollection({
  schema: z.union([originalBlogSchema, externalBlogSchema]),
});

const works = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
  }),
});

const timelines = defineCollection({
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    link: z.string().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = { works, timelines, blogs };
