import clsx from 'clsx'
import { memo, type CSSProperties, type MouseEvent, type MouseEventHandler, type PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import type { ButtonColor, ButtonVariant } from '@/components/button/types'

import styles from './styles.module.css'

interface IButton {
  startDecorator?: React.ReactElement
  variant?: ButtonVariant
  color?: ButtonColor
  fullWidth?: boolean
  style?: CSSProperties
  href?: string
  type?: 'submit' | 'reset' | 'button'

  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button: React.FC<PropsWithChildren<IButton>> = memo(({ children, startDecorator, color, variant, fullWidth, href, type, style, onClick }) => {
  const navigate = useNavigate()

  const buttonColor = color ?? 'primary'
  const buttonVariant = variant ?? 'solid'
  const buttonType = type ?? 'button'

  const classNames = clsx(styles.component, {
    [styles[buttonColor]]: true,
    [styles[buttonVariant]]: true,
    [styles.fullWidth]: fullWidth,
  })

  function onButtonClick(event: MouseEvent<HTMLButtonElement>) {
    if (href) {
      return navigate(href)
    }

    onClick?.(event)
  }

  return (
    <button type={buttonType} className={classNames} onClick={onButtonClick} style={style}>
      {startDecorator}
      {children}
    </button>
  )
})
