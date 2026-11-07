//deixa passar quem tem token e manda os demais de volta ao login:
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

export default function PrivateRoute() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}