import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import './index.css'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


//引入hightlight库
// highlight 的样式，依赖包，组件
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
//注册组件
app.use(hljsVuePlugin)

app.use(router)
    .use(ElementPlus)
    .mount('#app')
