import { validateEmail, validatePassword } from '@/utils/validations'

export const INPUTS_SCHEMA = {
  email: {
    value: String(),
    error: String(),
    validations: [
      {
        test: (value: string) => value.length > 0,
        error: 'Please enter your email.',
      },
      {
        test: validateEmail,
        error: 'This is not a correct email.',
      },
    ],
  },
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
}
