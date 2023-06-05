import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/common/Home.vue'
import About from '../pages/other/About.vue'
import Beishan from "@/pages/other/Beishan.vue";
import Chat from "@/pages/ChatGPT/Chat.vue";
import ChatGpt from "@/pages/ChatGPT/ChatGpt.vue";
import NewChat from "@/pages/ChatGPT/NewChat.vue";
import MarkDownPage from "@/pages/common/MarkDown.vue";
import Login from "@/pages/common/Login.vue";
import Upload from "@/pages/common/Upload.vue";
import ChatWithPDF from "@/pages/ChatGPT/ChatWithPDF.vue";
import PDFReader from "@/pages/ChatGPT/PDFReader.vue";
import Admin from "@/pages/common/Admin.vue";
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
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/file',
        name: 'file',
        component: Upload,
    },
    {
        path: '/chatpdf',
        name: 'chatpdf',
        component: ChatWithPDF
    },
    {
        path: '/admin',
        name: "admin",
        component: Admin
    }
    // {
    //     path: '/pdfreader',
    //     name: 'pdfreader',
    //     component: PDFReader
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;