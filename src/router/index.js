import { createRouter,createWebHashHistory  } from 'vue-router'
import Home from '../pages/Home.vue' 
import About from '../pages/About.vue'
import Beishan from "@/pages/Beishan.vue";
import Chat from "@/pages/ChatGPT/Chat.vue";
import ChatGpt from "@/pages/ChatGPT/ChatGpt.vue";
import NewChat from "@/pages/ChatGPT/NewChat.vue";
import MarkDownPage from "@/pages/MarkDown.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/beishan',
        name: 'Beishan',
        component: Beishan,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    },
    {
        path: '/chatgpt',
        name: 'ChatGPT',
        component: ChatGpt,
    },
    {
        path: '/newchat',
        name: 'newChat',
        component: NewChat,
    },
    {
        path: '/md',
        name: 'md',
        component: MarkDownPage,
    }
]

const router= createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;