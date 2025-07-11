import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      const { data } = await useApi().post('/auth/login', credentials)
      this.user = data.data.user
      this.token = data.data.token
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    async register(userData) {
      const { data } = await useApi().post('/auth/register', userData)
      this.token = data.data.token
      this.user = data.data.user
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user));
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
      localStorage.removeItem('user')
    }
  }
})
