import { useNavigate } from "react-router"
import useAuthStore from "./context/useAuth"

export default function ProtectedPage() {
  const { logout, user, isAuth } = useAuthStore()
  const navigate = useNavigate()

  if (!isAuth) {
    navigate('/login')
    return
  }

  return (
    <>
      <h1>Pagina protegida</h1>
      <p>username: {user?.name} <br />password: {user?.password}</p>
      <button onClick={logout}>Logout</button>
    </>
  )
}