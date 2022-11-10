import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ProductRoute } from './products/index'
import { StyleRoute } from './styles/index'
import { SocketRoute } from './socket/index'
const routes: RouteRecordRaw[] = [
  {
    name: 'Admin',
    path: '/',
    component: async () => await import('../views/Layout/BaseLayout.vue'),
    meta: {
      id: 1,
      parentId: null,
      requireAuth: true
    },
    children: [
      {
        name: 'Home',
        path: 'home',
        component: async () => await import('../views/Home.vue'),
        meta: {
          id: 2,
          parentId: 1,
          requireAuth: true
        }
      },
      {
        name: 'Topo',
        path: 'topo',
        component: async () => await import('../views/pages/Topo.vue'),
        meta: {
          id: 3,
          parentId: 1,
          requireAuth: true
        }
      },
      {
        name: 'Form',
        path: 'form',
        component: async () => await import('../views/pages/FormValidate.vue'),
        meta: {
          id: 6,
          parentId: 1,
          requireAuth: true
        }
      },
      {
        name: 'About',
        path: '/about',
        component: async () => await import('../views/About.vue'),
        meta: {
          id: 4,
          parentId: 1,
          requireAuth: true
        }
      },
      {
        name: 'Test',
        path: '/test',
        component: import('../views/pages/Test.vue'),
        meta: {
          id: '23'
        }
      },
      {
        name: 'Echart',
        path: '/chart',
        component: import('../views/pages/Echarts.vue'),
        meta: {
          id: '24'
        }
      },
      ProductRoute,
      StyleRoute,
      SocketRoute
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: async () => await import('../views/Login/Login.vue'),
    meta: {
      id: 5,
      parentId: null,
      requireAuth: false
    }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
