import { PersistedState } from '@/utils/persisted-state'
import type { InternalAxiosRequestConfig } from 'axios'
import { jwtDecode } from 'jwt-decode'

export function onFullfilAuthenticateRequestMiddleware(
  config: InternalAxiosRequestConfig<unknown>
) {
  const token = PersistedState.get('access_token', String())

  if (typeof token !== 'string') {
    throw new Error('Unauthorized')
  }

  const payload = jwtDecode(token)

  if (typeof payload !== 'object' || typeof payload.exp !== 'number') {
    throw new Error('Unauthorized')
  }

  if (payload.exp < Date.now()) {
    throw new Error('Unauthorized')
  }

  config.headers.Authorization = `Bearer ${token}`

  return config
}

export function onRejectAuthenticateRequestMiddleware(error: Error) {
  console.error(error)

  window.location.href = '/auth/login'
}
