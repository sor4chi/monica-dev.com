import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

import { SITE_BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/config";

export async function GET() {
  const blogs = await getCollection("blogs");

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: SITE_BASE_URL,
    items: blogs.map(({ slug, data }) => ({
      title: data.title,
      description: data.description,
      link: `${SITE_BASE_URL}/blog/${slug}`,
      pubDate: data.publishedAt,
      enclosure: {
        url: `${SITE_BASE_URL}/assets/ogp/blogs/${slug}.png`,
        type: "image/png",
        length: 1,
      },
    })),
    customData: "<language>ja</language>",
    stylesheet: "/feed.xsl",
  });
}
