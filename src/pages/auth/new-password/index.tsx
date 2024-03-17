import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmer } from 'use-immer'

import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { AuthLogo } from '@/components/logo/auth'
import { Stack } from '@/components/stack'
import { TextInput } from '@/components/text-input'
import { Typography } from '@/components/typography'
import { INPUTS_SCHEMA } from '@/pages/auth/new-password/constants'
import type { IInputState } from '@/types'
import { getFirstOccurrenceValidation } from '@/utils/validations'

import styles from './styles.module.css'

type InputName = 'password' | 'confirmPassword'

export const NewPasswordPage: React.FC = memo(() => {
  const [inputs, updateInputs] = useImmer<Record<InputName, IInputState>>(INPUTS_SCHEMA)
  const navigate = useNavigate()

  function onInputChange(name: InputName) {
    return function (value: string) {
      updateInputs((draft) => {
        draft[name].value = value
        draft[name].error = String()
      })
    }
  }

  function isValueHasError(name: InputName): boolean {
    return !!inputs[name].error
  }

  function getInputColor(name: InputName): 'neutral' | 'danger' {
    return isValueHasError(name) ? 'danger' : 'neutral'
  }

  function onSubmit() {
    const error = getFirstOccurrenceValidation<InputName>(inputs)

    if (error) {
      return updateInputs((draft) => {
        draft[error.name] = error.state
      })
    }

    /**
     * @todo API request...
     */
    updateInputs(INPUTS_SCHEMA)
    navigate('/auth/login')
  }

  const PasswordHelper = () =>
    isValueHasError('password') && (
      <Typography size={12} color="danger">
        {inputs.password.error}
      </Typography>
    )

  const ConfirmPasswordHelper = () =>
    isValueHasError('confirmPassword') && (
      <Typography size={12} color="danger">
        {inputs.confirmPassword.error}
      </Typography>
    )

  return (
    <Stack spacing={20} direction="column">
      <div className={styles.header}>
        <AuthLogo />
        <div className={styles.title}>Create new Password?</div>
      </div>

      <Form onSubmit={onSubmit}>
        <Stack direction="column" spacing={24}>
          <TextInput
            onChange={onInputChange('password')}
            type="password"
            placeholder="Enter your password"
            value={inputs.password.value}
            color={getInputColor('password')}
            helper={<PasswordHelper />}
          />

          <TextInput
            onChange={onInputChange('confirmPassword')}
            type="password"
            placeholder="Enter your confirmPassword"
            value={inputs.confirmPassword.value}
            color={getInputColor('confirmPassword')}
            helper={<ConfirmPasswordHelper />}
          />
        </Stack>

        <Button type="submit" fullWidth style={{ borderRadius: '8px', fontSize: '16px', lineHeight: '21px' }}>
          Reset Password
        </Button>
      </Form>
    </Stack>
  )
})
