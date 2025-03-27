import { Navigate, Outlet } from "react-router"
import useAuthStore from "./context/useAuth"

export default function ProtectedRoutes () {
  const {isAuth} = useAuthStore()

  return isAuth ? <Outlet /> : <Navigate to='/login' />
}