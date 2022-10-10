import { Router } from 'vue-router'
import { useUserStore } from '../stores/userStore'

export const useLogin = (router: Router): any => {
  return {
    login: () => login(router),
    logout: () => logout(router)
  }
}

const login = (router: Router): void => {
  const user = useUserStore()
  user.setUser('token-token-token')
  void router.push({
    name: 'Home'
  })
}

const logout = (router: Router): void => {
  const user = useUserStore()
  user.setUser('')
}
