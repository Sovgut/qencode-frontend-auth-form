import { memo, type CSSProperties, type PropsWithChildren } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Typography } from '@/components/typography'

import styles from './styles.module.css'

interface ILink {
  to: string
  weight?: number
  lineHeight?: number
  size?: number
  align?: 'left' | 'center' | 'right'
  style?: CSSProperties
}

export const Link: React.FC<PropsWithChildren<ILink>> = memo(({ children, to, weight, lineHeight, align, size, style }) => {
  return (
    <Typography weight={weight} lineHeight={lineHeight} size={size} align={align} style={style}>
      <ReactRouterLink className={styles.component} to={to}>
        {children}
      </ReactRouterLink>
    </Typography>
  )
})
