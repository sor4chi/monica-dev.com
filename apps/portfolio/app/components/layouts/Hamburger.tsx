import { clsx } from 'clsx'

import { styles } from './Humberger.css'
import { useNavigation } from './NavigationContext'

export default function Hamburger() {
  const { isOpen, toggle } = useNavigation()

  return (
    <button
      className={clsx(styles.button, isOpen && 'is-active')}
      aria-label="ナビゲーションを開閉する"
      onClick={toggle}
    >
      <span className={styles.lines} />
      <span className={styles.lines} />
      <span className={styles.lines} />
    </button>
  )
}
