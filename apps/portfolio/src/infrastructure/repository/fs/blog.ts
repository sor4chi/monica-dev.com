import fs from "node:fs/promises";
import path from "node:path";
import type { IBlogRepository } from "@/domain/repository/blog";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "../portfolio-legacy/src/content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");

const FrontMatterSchema = z.object({
	title: z.string(),
	description: z.string(),
	publishedAt: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	authors: z.array(z.string()).optional(),
	noindex: z.boolean().optional(),
});

export class FSBlogRepository implements IBlogRepository {
	private parseMarkdown(content: string) {
		const { data, content: markdownContent } = matter(content);

		const validMatter = FrontMatterSchema.parse(data);

		return {
			data: validMatter,
			content: markdownContent,
		};
	}

	async getBlogs() {
		const files = await fs.readdir(BLOG_DIR);
		const blogs = await Promise.all(
			files.map(async (file) => {
				const content = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
				const { data } = this.parseMarkdown(content);
				return {
					slug: file.replace(".md", ""),
					title: data.title,
					description: data.description,
					publishedAt: data.publishedAt,
				};
			}),
		);
		return blogs;
	}

	async getBlogDetail(slug: string) {
		const content = await fs.readFile(
			path.join(BLOG_DIR, `${slug}.md`),
			"utf-8",
		);
		const { data, content: markdownContent } = this.parseMarkdown(content);

		return {
			slug,
			title: data.title,
			description: data.description,
			publishedAt: data.publishedAt,
			updatedAt: data.updatedAt,
			authors: data.authors,
			noindex: data.noindex,
			content: markdownContent,
		};
	}
}
