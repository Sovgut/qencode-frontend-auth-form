import type { AxiosResponse } from 'axios'

export function onFullfiledUnauthorizedResponseMiddleware(
  config: AxiosResponse
): AxiosResponse | never {
  if (config.status === 401) {
    throw new Error('Unauthorized')
  }

  return config
}

export function onRejectedUnauthorizedResponseMiddleware(error: Error): void {
  console.error(error)

  window.location.href = '/auth/login'
}
