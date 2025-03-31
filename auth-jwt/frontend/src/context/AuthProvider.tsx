import { ReactNode, useLayoutEffect, useReducer } from "react"
import { authContextDefault, authReducer } from "../reducers/auth"
import { api } from "../utils/api"
import { AuthContext } from "./auth"

type ApiLoginResponse = {
  user: {
    name: string
    password: string
  }
  accessToken: string
} | {
  error: string
}

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authContextDefault)

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(config => {
      if (state.token) {
        config.headers.Authorization = `bearer ${state.token}`
      }

      return config
    })

    return () => {api.interceptors.request.eject(authInterceptor)}
  }, [state])

  useLayoutEffect(() => {
    api.interceptors.response.use(response => response, error => {
      if (error.response) {
        const res = error.response
        console.warn(res)

        if (res.status === 403 || res.status === 401) {
          if (res.data.error === 'SessionExpired') {
            alert('Session expired, please login again')
          }
        }

        if (res.status === 404) {
          dispatch({
            type: 'SET_ERROR',
            payload: {
              message: 'NotFound'
            }
          })
        }

        return Promise.reject(error)
      }
    })
  }, [])

  const login = async ({ name, password }: {name: string, password: string}) => {
    const response = await api.post<ApiLoginResponse>('/login', {
      name: name,
      password: password
    })

    try {
      if ('error' in response.data) {
        throw new Error(response.data.error);
      }

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...response.data.user,
            isAuth: true
          },
          token: response.data.accessToken,
          error: null
        }
      })
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          'message': 'Username & Password are require'
        }
      })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const printAuth = () => {
    console.log(state)
  }

  return (
    <AuthContext.Provider value={{
      auth: state,
      login,
      logout,
      printAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}