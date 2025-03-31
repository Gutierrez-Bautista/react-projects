interface UserData {
  name: string
  password: string
}

export interface AuthStore {
  user: UserData & { isAuth: boolean },
  token: null | string
  error: null | string
}

export const authContextDefault: AuthStore = {
  user: {
    name: '',
    password: '',
    isAuth: false
  },
  token: null,
  error: null
}

type ActionI = {
  type: 'LOGIN' | 'REFRESH_TOKEN'
  payload: AuthStore
} | {
  type: 'LOGOUT'
} | {
  type: 'SET_ERROR',
  payload: {
    message: string
  }
}

export function authReducer(state: AuthStore, action: ActionI) {
  const { type } = action

  switch (type) {
    case 'LOGIN': {
      const { payload } = action

      return payload
    }
    case 'LOGOUT': {
      return authContextDefault
    }
    case 'SET_ERROR': {
      const { payload } = action
      const { message } = payload
      return { ...authContextDefault, error: message }
    }
  }

  return state
}