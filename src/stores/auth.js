import { defineStore } from 'pinia'

export const useAuthStore = defineStore('home', {
  state: () => ({
    token: null,
    userName: null,
    rol: null,
    companyName: null,
    logo: null,
    permissions: null
  }),

  getters: {
    getToken: (state) => state.token,
    getPermissions: (state) => state.permissions,
    getRol: (state) => state.rol
  }
})
