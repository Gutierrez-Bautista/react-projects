import axios from "axios"
import { API_URL } from "./consts"

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: (status) => status >= 200 && status < 400,
})
