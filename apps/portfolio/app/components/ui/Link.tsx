import { clsx } from 'clsx'
import { Link as RRLink } from 'react-router'

import { styles } from './Link.css'

interface Props {
  href: string
  newTab?: boolean
  exClass?: string
  ariaLabel?: string
  prefetch?: 'none' | 'intent' | 'render' | 'viewport'
  children?: React.ReactNode
}

export default function Link({
  href,
  newTab,
  exClass,
  ariaLabel,
  prefetch = 'intent',
  children,
}: Props) {
  const isExternal = href.startsWith('http') || href.startsWith('//')

  if (isExternal || newTab) {
    return (
      <a
        className={clsx(styles.link, exClass)}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <RRLink
      className={clsx(styles.link, exClass)}
      to={href}
      prefetch={prefetch}
      aria-label={ariaLabel}
    >
      {children}
    </RRLink>
  )
}
