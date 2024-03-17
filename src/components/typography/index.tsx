import { memo, type CSSProperties, type PropsWithChildren } from 'react'

import clsx from 'clsx'
import styles from './styles.module.css'

interface ITypography {
  weight?: number
  lineHeight?: number
  color?: 'neutral' | 'danger'
  size?: number
  align?: 'left' | 'center' | 'right'
  style?: CSSProperties
}

export const Typography: React.FC<PropsWithChildren<ITypography>> = memo(({ children, weight, lineHeight, align, color, size, style }) => {
  const classNames = clsx(styles.component, { [styles[color ?? 'neutral']]: true })
  let typographyStyle: CSSProperties = {}

  if (style) {
    typographyStyle = { ...style }
  }

  if (weight) {
    typographyStyle.fontWeight = weight
  }

  if (size) {
    typographyStyle.fontSize = `${size}px`
  }

  if (lineHeight) {
    typographyStyle.lineHeight = `${lineHeight}px`
  }

  if (align) {
    typographyStyle.textAlign = align
  }

  return (
    <div className={classNames} style={typographyStyle}>
      {children}
    </div>
  )
})
