import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import './assets/main.css'
import './index.css'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 跨域
axios.defaults.withCredentials = true;//这行代码是必须的，否则跨域会失效

//引入hightlight库
// import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
//注册组件
app.use(hljsVuePlugin)

app.use(router)
    .use(ElementPlus)
    .mount('#app')
