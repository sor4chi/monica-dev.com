import 'katex/dist/katex.css'

import { SITE_BASE_URL, SITE_DESCRIPTION, SITE_NAME } from '@/config'
import MdContents from '@/components/document/MdContents'
import Line from '@/components/ui/Line'
import Tooltip from '@/components/ui/Tooltip'
import { GithubIcon, XIcon } from '@/components/ui/icons'
import { getProfile } from '@/lib/content.server'

import { styles } from './home.css'
import { styles as nameCardStyles } from './home-namecard.css'

export async function loader() {
  const profile = await getProfile()
  return {
    title: profile.data.title,
    subtitle: profile.data.subtitle,
    socials: profile.data.socials,
    html: profile.html,
  }
}

export function meta() {
  return [
    { title: SITE_NAME },
    { name: 'description', content: SITE_DESCRIPTION },
    { property: 'og:title', content: SITE_NAME },
    { property: 'og:description', content: SITE_DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: SITE_BASE_URL },
    {
      property: 'og:image',
      content: `${SITE_BASE_URL}/assets/ogp/default.png`,
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@sor4chi' },
    { name: 'twitter:title', content: SITE_NAME },
    { name: 'twitter:description', content: SITE_DESCRIPTION },
    {
      name: 'twitter:image',
      content: `${SITE_BASE_URL}/assets/ogp/default.png`,
    },
    { tagName: 'link', rel: 'canonical', href: SITE_BASE_URL },
  ]
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function Home({ loaderData }: { loaderData: LoaderData }) {
  const { title, subtitle, socials, html } = loaderData

  return (
    <div className={styles.container}>
      <div className={nameCardStyles.container}>
        <img
          src="/assets/icon.webp"
          width={64}
          height={64}
          alt="icon"
          className={nameCardStyles.image}
        />
        <div className={nameCardStyles.info}>
          <div>
            <h1 className={nameCardStyles.title}>{title}</h1>
            <p className={nameCardStyles.subtitle}>{subtitle}</p>
          </div>
          <div className={nameCardStyles.socials}>
            <Tooltip text="Github">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={nameCardStyles.socialLink}
                aria-label="Github を開く"
              >
                <GithubIcon className={nameCardStyles.social} />
              </a>
            </Tooltip>
            <Tooltip text="Twitter">
              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className={nameCardStyles.socialLink}
                aria-label="Twitter / X を開く"
              >
                <XIcon className={nameCardStyles.social} />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
      <Line />
      <MdContents html={html} />
    </div>
  )
}
