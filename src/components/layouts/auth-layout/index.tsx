import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './styles.module.css'

export const AuthLayout: React.FC = memo(() => {
  return (
    <div className={styles.component}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
})
