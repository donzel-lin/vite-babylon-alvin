import { RouteRecordRaw, RouterView } from 'vue-router'
export const StyleRoute: RouteRecordRaw = {
  name: 'Style',
  path: '/style',
  component: RouterView,
  meta: {
    id: 9,
    parentId: null,
    requireAuth: true
  },
  children: [
    {
      name: 'StyleHome',
      path: 'style-home',
      component: async () => await import('../../views/Style/StyleHome.vue'),
      meta: {
        id: 10,
        parentId: 9,
        requireAuth: true
      }
    }
  ]
}
