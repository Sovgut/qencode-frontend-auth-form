import { validatePassword } from '@/utils/validations'

export const INPUTS_SCHEMA = {
  password: {
    value: String(),
    error: String(),
    validations: [
      {
        test: (value: string) => value.length > 0,
        error: 'Please enter your password.',
      },
      {
        test: validatePassword,
        error: 'Password must have at least 8 characters length.',
      },
    ],
  },
  confirmPassword: {
    value: String(),
    error: String(),
    validations: [
      {
        test: (value: string) => value.length > 0,
        error: 'Please enter your password.',
      },
      {
        test: validatePassword,
        error: 'Password must have at least 8 characters length.',
      },
      {
        test: (value: string, state: any) => value === state.password.value,
        error: 'Passwords should be equal.',
      },
    ],
  },
}
