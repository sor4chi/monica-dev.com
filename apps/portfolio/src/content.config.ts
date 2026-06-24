import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    authors: z.array(z.string()).optional(),
    noindex: z.boolean().optional(),
  }),
});

const externalBlogs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/externalBlogs" }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    url: z.string(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
    authors: z.array(z.string()).optional(),
  }),
});

const slides = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/slides" }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    thumbnail: z.string(),
    publishedAt: z.coerce.date(),
    event: z.string(),
  }),
});

const timelines = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/timelines" }),
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    link: z.string().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  works,
  timelines,
  blogs,
  externalBlogs,
  slides,
};
