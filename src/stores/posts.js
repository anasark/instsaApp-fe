import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: []
  }),
  actions: {
    async fetchPosts() {
      const { data } = await useApi().get('/posts')
      this.posts = data.data
    },
    async createPost(formData) {
      const { data } = await useApi().post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.posts.unshift(data)
    }
  }
})
