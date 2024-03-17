import { memo } from 'react'

import styles from './styles.module.css'

interface IDivider {
  children?: string
}

export const Divider: React.FC<IDivider> = memo(({ children }) => {
  const content = children && <div className={styles.text}>{children}</div>

  return (
    <div className={styles.component}>
      {content}
      <div className={styles.line} />
    </div>
  )
})
