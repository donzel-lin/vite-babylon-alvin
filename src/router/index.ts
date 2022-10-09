import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: 'Admin',
        path: '/',
        component: () => import('../views/Layout/BaseLayout.vue'),
        meta: {
            id: 1,
            parentId: null,
            requireAuth: true
        },
        children: [
            {
                name: 'Home',
                path: 'home',
                component: () => import('../views/Home.vue'),
                meta: {
                    id: 2,
                    parentId: 1,
                    requireAuth: true
                }
            },
            {
                name: 'Topo',
                path: 'topo',
                component: () => import('../views/pages/Topo.vue'),
                meta: {
                    id: 3,
                    parentId: 1,
                    requireAuth: true
                }
            },
            {
                name: 'About',
                path: '/about',
                component: () => import('../views/About.vue'),
                meta: {
                    id: 4,
                    parentId: 1,
                    requireAuth: true
                }
            },
        ]
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../views/Login/Login.vue'),
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
