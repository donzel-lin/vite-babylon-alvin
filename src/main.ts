import { router } from './router/index'
import { createApp } from 'vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

import './style.css'
import 'normalize.css/normalize.css'
import App from './App.vue'
import './router/permission'

import ElementPlus from 'element-plus'

// babylonjs需要的算法
import earcut from 'earcut'
window.earcut = earcut
createApp(App)
    .use(pinia)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
