import './globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import { AuthLayout } from '@/components/layouts/auth-layout'
import { ForgotPasswordPage } from '@/pages/auth/forgot-password'
import { LoginPage } from '@/pages/auth/login'
import { NewPasswordPage } from '@/pages/auth/new-password'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="new-password" element={<NewPasswordPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
