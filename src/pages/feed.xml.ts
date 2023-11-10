import { SITE_BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/config";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const blogs = await getCollection("originalBlogs");

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: SITE_BASE_URL,
    items: blogs.map(({ slug, data }) => ({
      title: data.title,
      description: data.description,
      link: `${SITE_BASE_URL}/blog/${slug}`,
      pubDate: data.publishedAt,
    })),
    customData: "<language>ja</language>",
    stylesheet: "/feed.xsl",
  });
}
