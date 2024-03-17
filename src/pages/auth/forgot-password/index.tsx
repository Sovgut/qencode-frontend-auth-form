import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmer } from 'use-immer'

import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { AuthLogo } from '@/components/logo/auth'
import { Stack } from '@/components/stack'
import { TextInput } from '@/components/text-input'
import { Typography } from '@/components/typography'
import { INPUTS_SCHEMA } from '@/pages/auth/forgot-password/constants'
import type { IInputState } from '@/types'
import { getFirstOccurrenceValidation } from '@/utils/validations'

import styles from './styles.module.css'

type InputName = 'email'

export const ForgotPasswordPage: React.FC = memo(() => {
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
    navigate('/auth/new-password')
  }

  const EmailHelper = () =>
    isValueHasError('email') && (
      <Typography size={12} color="danger">
        {inputs.email.error}
      </Typography>
    )

  return (
    <Stack spacing={20} direction="column">
      <div className={styles.header}>
        <AuthLogo />
        <div className={styles.title}>Forgot Password?</div>
      </div>

      <Form onSubmit={onSubmit}>
        <Stack direction="column" spacing={24}>
          <TextInput
            onChange={onInputChange('email')}
            type="email"
            placeholder="Enter your email"
            value={inputs.email.value}
            color={getInputColor('email')}
            helper={<EmailHelper />}
          />
        </Stack>

        <Stack direction="column" spacing={20}>
          <Button type="submit" fullWidth style={{ borderRadius: '8px', fontSize: '16px', lineHeight: '21px' }}>
            Send
          </Button>
          <Button href="/auth/login" variant="outlined" color="neutral" fullWidth style={{ borderRadius: '8px', fontSize: '16px', lineHeight: '21px' }}>
            Cancel
          </Button>
        </Stack>
      </Form>
    </Stack>
  )
})
