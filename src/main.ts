import { router } from './router/index'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import earcut from 'earcut'
window.earcut = earcut
createApp(App).use(router).mount('#app')
