import clsx from 'clsx'
import { memo, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

import { TextInputRevealPassword } from '@/components/text-input/components/reveal-password'
import type { TextInputColor } from '@/components/text-input/types'

import styles from './styles.module.css'

interface ITextInput {
  value: string
  type?: 'text' | 'email' | 'password'
  color?: TextInputColor
  placeholder?: string
  helper?: React.ReactNode

  onChange?: (value: string) => void
}

export const TextInput: React.FC<ITextInput> = memo(({ type, placeholder, color, value, helper, onChange }) => {
  const [inputType, setType] = useState(type ?? 'text')

  const inputRef = useRef<HTMLInputElement>(null)
  const inputClassNames = clsx(styles.input, {
    [styles.isPassword]: type === 'password',
    [styles[color ?? 'neutral']]: true,
  })

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value ?? String())
  }

  function onToggleRevealingPassword(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation()

    setType((prevType) => (prevType === 'text' ? 'password' : 'text'))
  }

  return (
    <div className={styles.component}>
      <input className={inputClassNames} onChange={onInputChange} ref={inputRef} type={inputType} placeholder={placeholder} value={value} />

      <TextInputRevealPassword isVisible={type === 'password'} onClick={onToggleRevealingPassword} />
      {helper}
    </div>
  )
})
