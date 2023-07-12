<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import router from "@/router";
import { UserFilled } from '@element-plus/icons-vue'
import useUserStore from '@/store/user'
import { ElNotification } from 'element-plus'
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import apiUrl from '@/api';
import axios from "axios";
import { inject } from '@vercel/analytics';


inject();
// 全局状态
const userStore = useUserStore();
const currentNav = ref("")
// 路由高亮
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  currentNav.value = to.path;
  next();
});

// 根据路由的情况来决定是否显示页脚
const route = useRoute();
const showFooter = ref(true);

watchEffect(() => {
  // console.log("useroute: 当前路径 " + route.path)
  if (route.path === '/chatpdf') {
    showFooter.value = false;
  } else {
    showFooter.value = true;
  }
});

// 检查是否登录，未登录需要先让用户登录
router.beforeEach((to, from) => {
  // console.log(to.name)

  if (to.name !== 'Home' && !userStore.userLoggedIn && to.name !== 'login') {
    ElNotification({
      title: '尚未登录',
      message: '请先登录账户',
      type: 'warning',
    })
    return { name: "login" }
  }
});

async function logout() {

  try {
    const response = await axios.get(`${apiUrl}/api/logout`);
    userStore.userLoggedIn = false;
    console.log(response.data);
    ElNotification({
      title: 'Success',
      message: "已登出账户",
      type: 'success',
    });
    router.push('/login');
  } catch (error) {
    console.error(error);
    alert("Http Error: " + error.response.status);
  }
}

const handlerCommand = async function (command) {
  console.log(command)
  if (command === 'quit') {
    await logout();
  }
}

</script>
 

<template>
  <header class="flex items-center justify-between px-10 h-20 ">
    <img src="../static/logos/logo4.png" class="logo" />
    <nav class="flex items-center gap-12 navigation">
      <router-link :class="{ 'link-active': currentNav === '/' }" class="router text-lg font-bold hover:text-teal-500"
        to="/">首页
      </router-link>

      <router-link :class="{ 'link-active': currentNav === '/file' }" class="router text-lg font-bold hover:text-teal-500"
        to="/file">上传文件
      </router-link>

      <router-link :class="{ 'link-active': currentNav === '/newchat' }"
        class="router text-lg font-bold hover:text-teal-500" to="/newchat">对话
      </router-link>


      <router-link :class="{ 'link-active': currentNav === '/chatpdf' }"
        class="router text-lg font-bold hover:text-teal-500" to="/chatpdf">PDF对话
      </router-link>


      <router-link :class="{ 'link-active': currentNav === '/admin' }"
        class="router text-lg font-bold hover:text-teal-500" to="/admin">后台管理
      </router-link>


      <router-link v-if="!userStore.userLoggedIn" :class="{ 'link-active': currentNav === '/login' }"
        class="router text-lg font-bold  cta" to="/login">登录
      </router-link>



      <el-dropdown v-else trigger="click" @command="handlerCommand">
        <span class="el-dropdown-link">
          <el-avatar :icon="UserFilled" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </nav>
  </header>

  <main>
    <router-view></router-view>
  </main>

  <footer class="footer" v-if="showFooter">
    <div class="container grid grid-cols-3 gap-6">

      <div class="logo-col">
        <a href="#" class=" block mb-3">
          <img src="../static/logos/logo4.png" class="logo" />
        </a>
        <p class=" text-base text-cool-gray-500">copyright &copy; 2023 by 蓝色码源(北京)软件科技有限公司</p>
      </div>


      <div class="address-col">
        <p class="footer-heading text-lg font-bold mb-5">联系我们</p>
        <address class="contacts not-italic flex flex-col gap-3">
          <p class="address">北京市海淀区清河街道</p>
          <p>
            <a class="footer-link" href="17701330002"> 电话: 17701330002 </a>
            <br />
            <a class="footer-link" href="mailto:852234453@qq.com">852234453@qq.com</a>
          </p>
        </address>
      </div>

      <div class="nav-col">
        <p class="text-lg font-bold mb-5">文档交互</p>
        <ul class="flex flex-col gap-3">
          <li> <a class="hover:text-" href="#">上传文件</a> </li>
          <li> <a href="#">和AI对话</a> </li>
          <li> <a href="#">和文档对话</a> </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
 


<style scoped>
* {
  font-size: 10px;
  padding: 0;
  margin: 0;
}

.container {
  max-width: 140rem;
}

main {
  margin-bottom: 2rem;
}

header {
  line-height: 1.5;
}

/* my css */
.router:hover {
  /* 我想增加下划线 但是我发现增加 border-bottom 会增加元素的大小，前端页面有一种跳跃的感觉 */
  /* border-bottom: 1px solid #14b8a6;  */
  box-shadow: 0 2px 0 0 #1FB8A6;
}

.router-link-active {
  box-shadow: 0 2px 0 0 #1FB8A6;
}

.logo {
  height: 4rem;
}

.cta:link,
.cta:visited {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;

  background-color: #9be2ee;
}

.cta:hover,
.cta:active {
  background-color: #38c5dd;
}

/* footer */
.footer {
  padding: 6.4rem 3.2rem;
  border-top: 1px solid #ddd;
}

main {
  height: 100%;
}
</style>