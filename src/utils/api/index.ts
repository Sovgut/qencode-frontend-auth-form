import axios from 'axios'

import {
  onFullfilAuthenticateRequestMiddleware,
  onRejectAuthenticateRequestMiddleware,
} from '@/utils/api/middlewares/authenticate'
import {
  onFullfiledUnauthorizedResponseMiddleware,
  onRejectedUnauthorizedResponseMiddleware,
} from '@/utils/api/middlewares/unauthorized'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  onFullfilAuthenticateRequestMiddleware,
  onRejectAuthenticateRequestMiddleware
)

api.interceptors.response.use(
  onFullfiledUnauthorizedResponseMiddleware,
  onRejectedUnauthorizedResponseMiddleware
)
