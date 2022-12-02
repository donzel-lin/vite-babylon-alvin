import { RouteRecordRaw, RouterView } from 'vue-router'
export const TestRoute: RouteRecordRaw = {
  name: 'Test',
  path: '/test',
  component: RouterView,
  meta: {
    id: 11,
    parentId: 1,
    requireAuth: true
  },
  children: [
    {
      name: 'TestHome',
      path: 'test-home',
      component: async () => await import('../../views/Test/index.vue'),
      meta: {
        id: 12,
        parentId: 11,
        requireAuth: true
      }
    }
  ]
}
