
import { router } from './index'
import { useUserStore } from '../stores/userStore'
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    const store = useUserStore()
    const isLogin = store.isLogin
    console.log(store.isLogin,to.meta.requireAuth,  'store')
    if(!!to.meta.requireAuth && !isLogin) {
        next('/login')
        return
    }
    next()
})