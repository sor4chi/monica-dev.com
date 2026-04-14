import "katex/dist/katex.css";

import { clsx } from "clsx";

import { SITE_BASE_URL, SITE_NAME } from "@/config";
import FooterNav from "@/components/document/FooterNav";
import Header from "@/components/document/Header";
import MdContents from "@/components/document/MdContents";
import Share from "@/components/document/Share";
import Toc from "@/components/document/Toc";
import Line from "@/components/ui/Line";
import Link from "@/components/ui/Link";
import { getBlogBySlug, getBlogs } from "@/lib/content.server";
import { getBlogSourceUrl } from "@/utils/blog";

import { styles } from "./blog-detail.css";

export async function loader({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  const allBlogs = getBlogs().sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
  const idx = allBlogs.findIndex((b) => b.slug === params.slug);

  const prev = allBlogs[idx + 1] ?? null;
  const next = allBlogs[idx - 1] ?? null;

  return {
    slug: blog.slug,
    title: blog.data.title,
    description: blog.data.description,
    publishedAt: blog.data.publishedAt.toISOString(),
    updatedAt: blog.data.updatedAt?.toISOString(),
    authors: blog.data.authors,
    noindex: blog.data.noindex,
    html: blog.html,
    headings: blog.headings,
    prev: prev
      ? { title: prev.data.title, link: `/blog/${prev.slug}` }
      : null,
    next: next
      ? { title: next.data.title, link: `/blog/${next.slug}` }
      : null,
  };
}

export function meta({
  data,
}: {
  data: Awaited<ReturnType<typeof loader>>;
}) {
  const title = `${data.title} | ${SITE_NAME}`;
  return [
    { title },
    { name: "description", content: data.description },
    { name: "robots", content: data.noindex ? "noindex" : "index,follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: data.description },
    { property: "og:url", content: `${SITE_BASE_URL}/blog/${data.slug}` },
    {
      property: "og:image",
      content: `${SITE_BASE_URL}/assets/ogp/blogs/${data.slug}.png`,
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: data.description },
    {
      name: "twitter:image",
      content: `${SITE_BASE_URL}/assets/ogp/blogs/${data.slug}.png`,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `${SITE_BASE_URL}/blog/${data.slug}`,
    },
  ];
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function BlogDetail({
  loaderData,
}: {
  loaderData: LoaderData;
}) {
  const {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    authors,
    html,
    headings,
    prev,
    next,
  } = loaderData;

  const shareTitle = `${title} | Blogs - ${SITE_NAME}`;
  const source = getBlogSourceUrl(slug);
  const pathname = `/blog/${slug}`;

  return (
    <div className={styles.container}>
      <aside className={clsx(styles.aside, styles.leftAside)}>
        <Link href="/blog">← Back</Link>
        <div className={styles.leftContainer}>
          <Toc headings={headings} />
          <div className={styles.notPC}>
            <Line />
            <Share
              title={shareTitle}
              pathname={pathname}
              source={source}
              flex
            />
          </div>
        </div>
      </aside>

      <article id="article" className={styles.article}>
        <span className={styles.backLink}>
          <Link href="/blog">← Back</Link>
        </span>
        <Header
          title={title}
          createdAt={publishedAt}
          updatedAt={updatedAt}
          authors={authors}
        />
        <MdContents html={html} />
        <div className={styles.onlySP}>
          <Share
            title={shareTitle}
            pathname={pathname}
            source={source}
            flex
          />
        </div>
        <Line />
        <FooterNav
          prev={prev ?? undefined}
          next={next ?? undefined}
        />
      </article>

      <aside className={clsx(styles.aside, styles.rightAside)}>
        <Share title={shareTitle} pathname={pathname} source={source} />
      </aside>
    </div>
  );
}
