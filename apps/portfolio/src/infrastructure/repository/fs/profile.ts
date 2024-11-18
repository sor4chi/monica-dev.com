import fs from "node:fs/promises";
import path from "node:path";
import type { IProfileRepository } from "@/domain/repository/profile";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "../portfolio-legacy/src/content");
const PROFILE_FILE = path.join(CONTENT_DIR, "profile/introduce.md");

const FrontMatterSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	socials: z.object({
		github: z.string().url(),
		x: z.string().url(),
	}),
});

export class FSProfileRepository implements IProfileRepository {
	private parseMarkdown(content: string) {
		const { data, content: markdownContent } = matter(content);

		const validMatter = FrontMatterSchema.parse(data);

		return {
			data: validMatter,
			content: markdownContent,
		};
	}

	async getProfile() {
		const content = await fs.readFile(PROFILE_FILE, "utf-8");
		const { data, content: markdownContent } = this.parseMarkdown(content);

		return {
			...data,
			content: markdownContent,
		};
	}
}
