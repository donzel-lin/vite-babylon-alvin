import { router } from './router/index'
import { createApp } from 'vue'

import { createPinia } from 'pinia'

import './style.css'
import 'normalize.css/normalize.css'
import App from './App.vue'
import './router/permission'

import ElementPlus from 'element-plus'

import Trim from './plugins/directives/Trim'

// babylonjs需要的算法
import earcut from 'earcut'
const pinia = createPinia()
window.earcut = earcut
createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .directive('trim', Trim)
  .mount('#app')
