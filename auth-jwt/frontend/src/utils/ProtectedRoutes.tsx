import {Outlet, Navigate} from 'react-router'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoutes () {
  const { auth } = useAuth()

  return auth.user.isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes