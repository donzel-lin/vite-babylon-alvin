import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('../views/Home.vue')
    },
    {
        name: 'About',
        path: '/about',
        component: () => import('../views/About.vue')
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})