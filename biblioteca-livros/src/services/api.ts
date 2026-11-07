import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
})

// Antes de cada requisição: anexa o token, se existir
api.interceptors.request.use((config) => {
  const { token } = useAuth.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Depois de cada resposta: se o token for recusado, desloga e volta ao login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url
    if (status === 401 && url !== '/auth/login') {
      useAuth.getState().logout()
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)