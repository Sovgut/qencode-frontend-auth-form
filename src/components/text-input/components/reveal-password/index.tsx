import { memo, type MouseEventHandler } from 'react'

import { IconEye } from '@/components/icons/eye'

import styles from './styles.module.css'

interface ITextInputRevealPassword {
  isVisible: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const TextInputRevealPassword: React.FC<ITextInputRevealPassword> = memo(({ isVisible, onClick }) => {
  if (!isVisible) return

  return (
    <div onClick={onClick} className={styles.component}>
      <IconEye />
    </div>
  )
})
