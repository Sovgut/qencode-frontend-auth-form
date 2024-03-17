import clsx from 'clsx'
import { memo, type PropsWithChildren } from 'react'

import type { StackDirection, StackItems, StackJustify } from '@/components/stack/types'

import styles from './styles.module.css'

interface IStack {
  items?: StackItems
  justify?: StackJustify
  direction?: StackDirection
  spacing?: number
}

export const Stack: React.FC<PropsWithChildren<IStack>> = memo(({ children, items, justify, direction, spacing }) => {
  const stackItems = items ?? 'start'
  const stackJustify = justify ?? 'start'
  const stackDirection = direction ?? 'row'
  const stackSpacing = spacing ?? 0

  const classNames = clsx(styles.component, {
    [styles[`items-${stackItems}`]]: true,
    [styles[`justify-${stackJustify}`]]: true,
    [styles[`direction-${stackDirection}`]]: true,
  })

  return (
    <div className={classNames} style={{ gap: `${stackSpacing}px` }}>
      {children}
    </div>
  )
})
