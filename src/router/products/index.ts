import { RouteRecordRaw, RouterView } from 'vue-router'
export const ProductRoute: RouteRecordRaw = {
  name: 'Product',
  path: '/product',
  component: RouterView,
  meta: {
    id: 6,
    parentId: null,
    requireAuth: true
  },
  children: [
    {
      name: 'ProductList',
      path: 'product-list',
      component: async () => await import('../../views/Product/ProductList.vue'),
      meta: {
        id: 7,
        parentId: 6,
        requireAuth: true
      }
    },
    {
      name: 'ProductAttr',
      path: 'product-attr',
      component: async () => await import('../../views/Product/ProductAttr.vue'),
      meta: {
        id: 8,
        parentId: 6,
        requireAuth: true
      }
    }
  ]
}
