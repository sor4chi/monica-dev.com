import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		authors: z.array(z.string()).optional(),
	}),
});

const externalBlogs = defineCollection({
	schema: z.object({
		title: z.string(),
		publishedAt: z.coerce.date(),
		url: z.string(),
	}),
});

const works = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.coerce.date(),
		authors: z.array(z.string()).optional(),
	}),
});

const slides = defineCollection({
	schema: z.object({
		title: z.string(),
		url: z.string(),
		thumbnail: z.string(),
		publishedAt: z.coerce.date(),
		event: z.string(),
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

export const collections = {
	works,
	timelines,
	blogs,
	externalBlogs,
	slides,
};
