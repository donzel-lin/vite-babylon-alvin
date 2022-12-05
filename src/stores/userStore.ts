import { defineStore } from 'pinia'
import { setItem, getItem } from '../utils/Storage'
import { TOKEN } from '@/utils/constans'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: getItem<string>(TOKEN)
  }),
  actions: {
    setUser (token: string) {
      this.token = token
      setItem(TOKEN, token)
    }
  },
  getters: {
    isLogin: state => !(state.token === '')
  }
})
