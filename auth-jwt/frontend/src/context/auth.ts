import { createContext } from 'react'
import { AuthStore } from '../reducers/auth'

interface ContextI {
  auth: AuthStore
  login: ({ name, password }: { name: string, password: string }) => void
  logout: () => void
  printAuth?: () => void
}

export const AuthContext = createContext<ContextI>({
  auth: {
    user: {
      name: '',
      password: '',
      isAuth: false
    },
    token: null,
    error: null
  },
  login({ name, password }) {
    console.log(name, password)
  },
  logout() {
    console.log('logout')
  },
})
