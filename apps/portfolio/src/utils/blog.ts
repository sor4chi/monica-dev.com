import { SITE_SOURCE_URL } from "@/config";

export const getBlogSourceUrl = (slug: string) => {
	return `${SITE_SOURCE_URL}/src/content/blogs/${slug}.md`;
};
