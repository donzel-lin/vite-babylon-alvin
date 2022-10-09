import { MenuItemClicked } from 'element-plus'
import { useRouter } from 'vue-router'

export const useRoutes = () => {
    const router = useRouter()
    return router.options.routes
}
