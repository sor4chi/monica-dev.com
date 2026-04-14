import { SITE_SOURCE_URL } from "@/config";

export const getBlogSourceUrl = (slug: string) =>
  `${SITE_SOURCE_URL}/src/content/blogs/${slug}.md`;
