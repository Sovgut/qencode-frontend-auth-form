import { memo } from 'react'
import { useImmer } from 'use-immer'

import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Form } from '@/components/form'
import { IconGithub } from '@/components/icons/brands/github'
import { IconGoogle } from '@/components/icons/brands/google'
import { Link } from '@/components/link'
import { AuthLogo } from '@/components/logo/auth'
import { Stack } from '@/components/stack'
import { TextInput } from '@/components/text-input'
import { Typography } from '@/components/typography'
import { INPUTS_SCHEMA } from '@/pages/auth/login/constants'
import type { IInputState } from '@/types'
import { getFirstOccurrenceValidation } from '@/utils/validations'

import styles from './styles.module.css'

type InputName = 'email' | 'password'

export const LoginPage: React.FC = memo(() => {
  const [inputs, updateInputs] = useImmer<Record<InputName, IInputState>>(INPUTS_SCHEMA)

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

    if (Math.random() * 100 > 30) {
      updateInputs(INPUTS_SCHEMA)
    } else {
      updateInputs((draft) => {
        draft.email.error = 'User does not exist or invalid password'
      })
    }
  }

  const EmailHelper = () =>
    isValueHasError('email') && (
      <Typography size={12} color="danger">
        {inputs.email.error}
      </Typography>
    )

  const PasswordHelper = () => (
    <div style={{ display: 'grid', gridTemplateColumns: isValueHasError('password') ? '1fr 1fr' : '1fr' }}>
      {isValueHasError('password') && (
        <Typography size={12} color="danger">
          {inputs.password.error}
        </Typography>
      )}
      <Link align="right" weight={500} size={14} lineHeight={20} to="/auth/forgot-password">
        Forgot your password?
      </Link>
    </div>
  )

  return (
    <Stack spacing={20} direction="column">
      <div className={styles.header}>
        <AuthLogo />
        <div className={styles.title}>Log in to your account</div>
      </div>

      <Form onSubmit={onSubmit}>
        <Stack spacing={16}>
          <Button fullWidth color="neutral" variant="outlined" startDecorator={<IconGoogle />}>
            Google
          </Button>
          <Button fullWidth color="neutral" variant="outlined" startDecorator={<IconGithub />}>
            Github
          </Button>
        </Stack>

        <Divider>OR</Divider>

        <Stack direction="column" spacing={24}>
          <TextInput onChange={onInputChange('email')} type="email" placeholder="Work email" value={inputs.email.value} color={getInputColor('email')} helper={<EmailHelper />} />

          {inputs.email.value && (
            <TextInput
              onChange={onInputChange('password')}
              type="password"
              placeholder="Password"
              value={inputs.password.value}
              color={getInputColor('password')}
              helper={<PasswordHelper />}
            />
          )}
        </Stack>

        <Button type="submit" fullWidth style={{ borderRadius: '8px', fontSize: '16px', lineHeight: '21px' }}>
          Log in to Qencode
        </Button>
      </Form>

      <Typography size={14} lineHeight={20} align="center" style={{ width: '100%' }}>
        Is your company new to Qencode?{' '}
        <Link to="/auth/login" weight={500}>
          Sign up
        </Link>
      </Typography>
    </Stack>
  )
})
