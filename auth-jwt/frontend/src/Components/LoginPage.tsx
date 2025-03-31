import { useNavigate } from "react-router"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useAuth } from "../hooks/useAuth"

function LoginPage () {
  const { auth, login } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)
  const loginFrom = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (auth.user.isAuth) {
      navigate('/home')
    }

    setError(auth.error)
  }, [auth, navigate])

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    if (!loginFrom.current) return;

    const formData = new FormData(loginFrom.current)
    const name = formData.get('name')
    const password = formData.get('password')

    if (typeof name === 'string' && typeof password === 'string') {
      login({
        name,
        password
      })
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit} ref={loginFrom}>
        <input type="text" name="name" placeholder='autname' />
        <input type="password" name='password' placeholder='password' />
        <button>Login</button>
      </form>
      <button onClick={() => navigate('/home')}>Go to Home</button>

      {error ? `Usuario o contrasena incorrecto` : null}
    </>
  )
}

export default LoginPage