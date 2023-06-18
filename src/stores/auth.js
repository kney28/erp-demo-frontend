import { defineStore } from 'pinia'

export const useAuthStore = defineStore('home', {
  state: () => ({
    token: null,
    userName: null,
    role: null,
    companyName: null,
    logo: null
  }),

  getters: {
    getToken: (state) => state.token
  }
})
