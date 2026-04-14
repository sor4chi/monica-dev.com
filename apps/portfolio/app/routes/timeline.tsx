import { clsx } from "clsx";

import { SITE_BASE_URL, SITE_NAME } from "@/config";
import MdContents from "@/components/document/MdContents";
import { getTimelinesWithContent } from "@/lib/content.server";

import { styles } from "./timeline.css";

export async function loader() {
  const timelines = await getTimelinesWithContent();
  const sorted = timelines
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((t) => ({
      slug: t.slug,
      title: t.data.title,
      date: t.data.date.toISOString(),
      icon: t.data.icon,
      link: t.data.link,
      html: t.html,
    }));
  return { timelines: sorted };
}

export function meta() {
  const title = `Timelines | ${SITE_NAME}`;
  return [
    { title },
    { property: "og:title", content: title },
    { property: "og:url", content: `${SITE_BASE_URL}/timeline` },
    { property: "og:image", content: `${SITE_BASE_URL}/assets/ogp/default.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { tagName: "link", rel: "canonical", href: `${SITE_BASE_URL}/timeline` },
  ];
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Timeline({
  loaderData,
}: {
  loaderData: LoaderData;
}) {
  const { timelines } = loaderData;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Timelines</h1>
      <p className={styles.description}>
        Career, achievements, and other personal histories.
      </p>
      <table className={styles.timelineTable}>
        <tbody>
          {timelines.map((timeline) => (
            <tr key={timeline.slug} className={styles.row}>
              <td className={clsx(styles.dateCol, styles.col)}>
                <time
                  dateTime={timeline.date}
                  className={clsx(styles.date, styles.desktopDate)}
                >
                  {formatDate(timeline.date)}
                </time>
              </td>
              <td className={clsx(styles.iconCol, styles.col)}>
                <div className={styles.pointContainer}>
                  {timeline.icon ? (
                    <a
                      href={timeline.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                    >
                      <img
                        width={48}
                        height={48}
                        src={timeline.icon}
                        alt={timeline.title}
                        className={styles.icon}
                      />
                    </a>
                  ) : (
                    <span className={styles.dot} />
                  )}
                </div>
                <span className={styles.line} />
              </td>
              <td className={styles.col}>
                <span className={styles.titleWrapper}>
                  <strong className={styles.itemTitle}>
                    {timeline.title}
                  </strong>
                  <time
                    dateTime={timeline.date}
                    className={clsx(styles.date, styles.mobileDate)}
                  >
                    {formatDate(timeline.date)}
                  </time>
                </span>
                {timeline.html && (
                  <div className={styles.contentArea}>
                    <MdContents html={timeline.html} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
