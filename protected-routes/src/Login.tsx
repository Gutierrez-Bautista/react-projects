import { FormEvent, useEffect, useRef } from "react"
import useAuthStore from "./context/useAuth"
import { useNavigate } from "react-router"

export default function LoginPage () {
  const { login, isAuth } = useAuthStore()
  const navigate = useNavigate()

  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const handleLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (!usernameInput.current || !passwordInput.current) return;

    login({name: usernameInput.current.value, password: passwordInput.current.value})
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/protected')
    }
  }, [isAuth, navigate])

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="username" ref={usernameInput}/>
        <input type="text" placeholder="password" ref={passwordInput}/>
        <button>Login</button>
      </form>
    </>
  )
}