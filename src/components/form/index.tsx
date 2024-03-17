import { memo, type FormEvent, type PropsWithChildren } from 'react'

import styles from './styles.module.css'

interface IForm {
  onSubmit?: () => void
}

export const Form: React.FC<PropsWithChildren<IForm>> = memo(({ children, onSubmit }) => {
  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit?.()
  }

  return (
    <form onSubmit={onFormSubmit} className={styles.component}>
      {children}
    </form>
  )
})
