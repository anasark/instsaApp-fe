import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const useApi = () => {
  const authStore = useAuthStore()
  
  const api = axios.create({
    baseURL: import.meta.env.VITE_BE_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  
  api.interceptors.request.use(config => {
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  })
  
  return api
}
