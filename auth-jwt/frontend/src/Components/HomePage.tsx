import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"
import { api } from "../utils/api"

type ApiProtectedResponse = {
  protected: string
} | {
  error: string
}

function HomePage () {
  const { logout } = useContext(AuthContext)
  const [portectedData, setProtectedData] = useState<null | string>(null)

  const handleClick = () => {
    api.get<ApiProtectedResponse>('/protected')
      .then(response => {
        console.warn(response)
        if ('protected' in response.data) {
          setProtectedData(response.data.protected)
        }
      })
      .catch(error => {
        console.error(error)
        logout()
      })
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleClick}>fetch protected data</button>
      {portectedData ? portectedData : null}
      <button onClick={logout}>logout</button>
    </>
  )
}

export default HomePage