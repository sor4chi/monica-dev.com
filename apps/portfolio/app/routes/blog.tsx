import { clsx } from "clsx";
import { Link } from "react-router";

import { SITE_BASE_URL, SITE_NAME } from "@/config";
import UILink from "@/components/ui/Link";
import Line from "@/components/ui/Line";
import { RSSIcon } from "@/components/ui/icons";
import { getBlogs, getExternalBlogs } from "@/lib/content.server";

import { styles } from "./blog.css";

const ICON_MAP = new Map<string, string>([
  ["zenn.dev", "https://static.zenn.studio/images/logo-transparent.png"],
  [
    "qiita.com",
    "https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico",
  ],
]);

function getDomain(url: string) {
  const { hostname } = new URL(url);
  return hostname.replace(/^www\./, "");
}

export async function loader() {
  const originalBlogs = getBlogs();
  const externalBlogs = getExternalBlogs();

  const blogs = [
    ...originalBlogs.map((b) => ({
      slug: b.slug,
      title: b.data.title,
      publishedAt: b.data.publishedAt.toISOString(),
      url: undefined as string | undefined,
    })),
    ...externalBlogs.map((b) => ({
      slug: b.slug,
      title: b.data.title,
      publishedAt: b.data.publishedAt.toISOString(),
      url: b.data.url,
    })),
  ];

  const grouped: Record<string, typeof blogs> = {};
  for (const blog of blogs) {
    const year = new Date(blog.publishedAt).getFullYear().toString();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(blog);
  }

  const sorted = Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(
      ([year, items]) =>
        [
          year,
          items.sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime(),
          ),
        ] as const,
    );

  return { sortedGroupedBlogs: sorted };
}

export function meta() {
  const title = `Blog | ${SITE_NAME}`;
  return [
    { title },
    { property: "og:title", content: title },
    { property: "og:url", content: `${SITE_BASE_URL}/blog` },
    { property: "og:image", content: `${SITE_BASE_URL}/assets/ogp/default.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { tagName: "link", rel: "canonical", href: `${SITE_BASE_URL}/blog` },
  ];
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Blog({ loaderData }: { loaderData: LoaderData }) {
  const { sortedGroupedBlogs } = loaderData;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blogs</h1>
      <p className={styles.description}>
        writes about technology and thoughts
      </p>
      {sortedGroupedBlogs.map(([year, blogs], i) => (
        <section
          key={year}
          className={styles.section}
          style={{ animationDelay: `${0.1 * i}s` }}
        >
          <div className={styles.listContainer}>
            <h2
              className={clsx(
                styles.listTitle,
                i === 0 && styles.hideOnSP,
              )}
            >
              {year}
            </h2>
            <ul className={styles.list}>
              {blogs.map((blog) => (
                <li key={blog.slug}>
                  {blog.url ? (
                    <a href={blog.url} className={styles.item}>
                      <span className={styles.domainMobile}>
                        {ICON_MAP.has(getDomain(blog.url)) && (
                          <img
                            src={ICON_MAP.get(getDomain(blog.url))}
                            alt={getDomain(blog.url)}
                            width={16}
                            height={16}
                          />
                        )}
                      </span>
                      <h3 className={styles.itemTitle}>{blog.title}</h3>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.arrow}
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                      <span className={styles.domainDesktop}>
                        {ICON_MAP.has(getDomain(blog.url)) && (
                          <img
                            src={ICON_MAP.get(getDomain(blog.url))}
                            alt={getDomain(blog.url)}
                            width={16}
                            height={16}
                          />
                        )}
                        {getDomain(blog.url)}
                      </span>
                    </a>
                  ) : (
                    <Link to={`/blog/${blog.slug}`} className={styles.item}>
                      <h3 className={styles.itemTitle}>{blog.title}</h3>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {i < sortedGroupedBlogs.length - 1 && <Line />}
        </section>
      ))}
      <div className={styles.footer}>
        <UILink href="/feed.xml" exClass={styles.footerLink}>
          <RSSIcon /> Get Feed
        </UILink>
      </div>
    </div>
  );
}
