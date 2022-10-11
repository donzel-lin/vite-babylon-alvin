
import { router } from './index'
import { useUserStore } from '../stores/userStore'
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const store = useUserStore()
  const isLogin = store.isLogin
  if ((Boolean(to.meta.requireAuth)) && !isLogin) {
    next('/login')
    return
  }
  next()
})
