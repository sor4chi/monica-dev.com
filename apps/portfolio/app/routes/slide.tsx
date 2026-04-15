import { SITE_BASE_URL, SITE_NAME } from '@/config'
import { getSlides } from '@/lib/content.server'

import { styles } from './slide.css'

export async function loader() {
  const slides = getSlides()
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .map((slide) => ({
      title: slide.data.title,
      url: slide.data.url,
      thumbnail: slide.data.thumbnail,
      event: slide.data.event,
    }))
  return { slides }
}

export function meta() {
  const title = `Slide | ${SITE_NAME}`
  return [
    { title },
    { property: 'og:title', content: title },
    { property: 'og:url', content: `${SITE_BASE_URL}/slide` },
    {
      property: 'og:image',
      content: `${SITE_BASE_URL}/assets/ogp/default.png`,
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { tagName: 'link', rel: 'canonical', href: `${SITE_BASE_URL}/slide` },
  ]
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function Slide({ loaderData }: { loaderData: LoaderData }) {
  const { slides } = loaderData

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Slides</h1>
      <p className={styles.description}>Slides from conferences and meetups.</p>
      <div className={styles.grid}>
        {slides.map(({ url, title, thumbnail, event }, i) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <img
              width={320}
              height={168}
              src={thumbnail}
              alt={title}
              className={styles.thumbnail}
            />
            <div className={styles.content}>
              <span className={styles.event}>{event}</span>
              <span className={styles.itemTitle}>{title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
