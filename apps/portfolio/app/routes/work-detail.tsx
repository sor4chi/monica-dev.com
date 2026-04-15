import 'katex/dist/katex.css'

import { clsx } from 'clsx'

import { SITE_BASE_URL, SITE_NAME } from '@/config'
import FooterNav from '@/components/document/FooterNav'
import Header from '@/components/document/Header'
import MdContents from '@/components/document/MdContents'
import Share from '@/components/document/Share'
import Toc from '@/components/document/Toc'
import Line from '@/components/ui/Line'
import Link from '@/components/ui/Link'
import { getWorkBySlug, getWorks } from '@/lib/content.server'
import { getWorkSourceUrl } from '@/utils/work'

import { styles } from './work-detail.css'

export async function loader({ params }: { params: { slug: string } }) {
  const work = await getWorkBySlug(params.slug)
  const allWorks = getWorks().sort(
    (a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime(),
  )
  const idx = allWorks.findIndex((w) => w.slug === params.slug)

  const prev = allWorks[idx + 1] ?? null
  const next = allWorks[idx - 1] ?? null

  return {
    slug: work.slug,
    title: work.data.title,
    description: work.data.description,
    createdAt: work.data.createdAt.toISOString(),
    authors: work.data.authors,
    html: work.html,
    headings: work.headings,
    prev: prev ? { title: prev.data.title, link: `/work/${prev.slug}` } : null,
    next: next ? { title: next.data.title, link: `/work/${next.slug}` } : null,
  }
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  const title = `${data.title} | ${SITE_NAME}`
  return [
    { title },
    { name: 'description', content: data.description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: data.description },
    { property: 'og:url', content: `${SITE_BASE_URL}/work/${data.slug}` },
    {
      property: 'og:image',
      content: `${SITE_BASE_URL}/assets/ogp/works/${data.slug}.png`,
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: data.description },
    {
      name: 'twitter:image',
      content: `${SITE_BASE_URL}/assets/ogp/works/${data.slug}.png`,
    },
    {
      tagName: 'link',
      rel: 'canonical',
      href: `${SITE_BASE_URL}/work/${data.slug}`,
    },
  ]
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function WorkDetail({ loaderData }: { loaderData: LoaderData }) {
  const { slug, title, createdAt, authors, html, headings, prev, next } =
    loaderData

  const shareTitle = `${title} | Works - ${SITE_NAME}`
  const source = getWorkSourceUrl(slug)
  const pathname = `/work/${slug}`

  return (
    <div className={styles.container}>
      <aside className={clsx(styles.aside, styles.leftAside)}>
        <Link href="/work">← Back</Link>
        <div>
          {headings.length > 0 && <Toc headings={headings} />}
          <div className={styles.notPC}>
            {headings.length > 0 && <Line />}
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
          <Link href="/work">← Back</Link>
        </span>
        <Header title={title} createdAt={createdAt} authors={authors} />
        <img
          width={800}
          height={420}
          src={`/assets/works/${slug}/hero-800.webp`}
          alt={title}
          className={styles.heroImage}
          loading="eager"
        />
        <MdContents html={html} />
        <div className={styles.onlySP}>
          <Share title={shareTitle} pathname={pathname} source={source} flex />
        </div>
        <Line />
        <FooterNav prev={prev ?? undefined} next={next ?? undefined} />
      </article>

      <aside className={clsx(styles.aside, styles.rightAside)}>
        <Share title={shareTitle} pathname={pathname} source={source} />
      </aside>
    </div>
  )
}
