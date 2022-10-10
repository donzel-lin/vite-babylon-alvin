import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: ''
  }),
  actions: {
    setUser (token: string) {
      this.token = token
    }
  },
  getters: {
    isLogin: state => !(state.token === '')
  }
})
