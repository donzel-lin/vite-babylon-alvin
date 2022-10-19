import { Router } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { login } from '../api/user/user'
export const useLogin = (router: Router): any => {
  return {
    login: async () => await loginFn(router),
    logout: () => logout(router)
  }
}

const loginFn = async (router: Router): Promise<void> => {
  // const res = await login()
  // console.log(res, 'res')
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
