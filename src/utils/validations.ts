import type { IInputState } from '@/types'

/**
 * The email should be a valid email format.
 */
export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

/**
 * The password fields should be at least 8 characters long.
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8
}

export function getFirstOccurrenceValidation<SchemaKeys = string>(schema: Record<string, IInputState>): { name: SchemaKeys; state: IInputState } | void {
  for (const name in schema) {
    if (!schema[name]) continue

    for (const validation of schema[name].validations) {
      if (!validation.test(schema[name].value, schema)) {
        const state: IInputState = {
          ...schema[name],
          error: validation.error,
        }

        return { name: name as SchemaKeys, state }
      }
    }
  }
}
