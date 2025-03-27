import { create } from 'zustand'

interface User {
  name: string,
  password: string
}

interface AuthStore {
  user: null | User
  isAuth: boolean
  login: (args: User) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  login: (args) => set((state) => ({ ...state, user: args, isAuth: true })),
  logout: () => set(state => ({ ...state, user: null, isAuth: false }))
}))

export default useAuthStore