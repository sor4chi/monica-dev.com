import { styles } from './Tooltip.css'

interface Props {
  text: string
  children: React.ReactNode
}

export default function Tooltip({ text, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.target}>{children}</div>
      <div className={styles.tooltip}>{text}</div>
    </div>
  )
}
