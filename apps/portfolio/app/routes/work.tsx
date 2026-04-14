import { Link } from "react-router";

import { SITE_BASE_URL, SITE_NAME } from "@/config";
import { getWorks } from "@/lib/content.server";

import { styles } from "./work.css";

export async function loader() {
  const works = getWorks()
    .sort((a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime())
    .map((work) => ({
      slug: work.slug,
      title: work.data.title,
      description: work.data.description,
    }));
  return { works };
}

export function meta() {
  const title = `Works | ${SITE_NAME}`;
  return [
    { title },
    { property: "og:title", content: title },
    { property: "og:url", content: `${SITE_BASE_URL}/work` },
    { property: "og:image", content: `${SITE_BASE_URL}/assets/ogp/default.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { tagName: "link", rel: "canonical", href: `${SITE_BASE_URL}/work` },
  ];
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Work({ loaderData }: { loaderData: LoaderData }) {
  const { works } = loaderData;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Works</h1>
      <p className={styles.description}>
        My works. Web applications, libraries, tools, and more.
      </p>
      <div className={styles.grid}>
        {works.map(({ slug, title, description }, i) => (
          <Link
            key={slug}
            to={`/work/${slug}`}
            className={styles.item}
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <img
              width={320}
              height={168}
              src={`/assets/works/${slug}/hero-640.webp`}
              alt={title}
              className={styles.thumbnail}
            />
            <span className={styles.content}>
              <strong className={styles.itemTitle}>{title}</strong>
              <p className={styles.itemDescription}>{description}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
