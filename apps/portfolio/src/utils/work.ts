import { SITE_SOURCE_URL } from "@/config";

export const getWorkSourceUrl = (slug: string) => {
	return `${SITE_SOURCE_URL}/src/content/works/${slug}.md`;
};
