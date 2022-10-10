import { useRouter, RouteRecordRaw } from 'vue-router'
export const useRoutes = (): readonly RouteRecordRaw[] => {
  const router = useRouter()
  return router.options.routes
}
