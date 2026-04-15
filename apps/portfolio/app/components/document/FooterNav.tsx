import Link from '@/components/ui/Link'

import { styles } from './FooterNav.css'

interface Navigation {
  link: string
  title: string
}

interface Props {
  prev?: Navigation
  next?: Navigation
}

export default function FooterNav({ prev, next }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.navPrev}>
        {prev && <Link href={prev.link}>← {prev.title}</Link>}
      </div>
      <div className={styles.navNext}>
        {next && <Link href={next.link}>{next.title} →</Link>}
      </div>
    </div>
  )
}
