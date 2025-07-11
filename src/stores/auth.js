import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      const { data } = await useApi().post('/auth/login', credentials)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    async register(userData) {
      const { data } = await useApi().post('/auth/register', userData)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    async fetchUser() {
      const { data } = await useApi().get('/auth/user')
      this.user = data
    },
    logout() {
      useApi().post('/auth/logout')
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
