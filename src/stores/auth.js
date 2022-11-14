import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('home', {
  state: () => ({
    token: null
  }),

  getters: {
    getToken: (state) => state.token
  },

  actions: {
    async login (dataLogin) {
      return new Promise((resolve, reject) => {
        api.post('auth/login/', dataLogin).then(({ data, status }) => {
          if (status === 201) {
            localStorage.setItem('token', data.access_token)
            this.token = data.access_token
            resolve(true)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
