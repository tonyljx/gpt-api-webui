<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import router from "@/router";
import { UserFilled } from '@element-plus/icons-vue'
import useUserStore from '@/store/user'
import { ElNotification } from 'element-plus'
// 全局状态
const userStore = useUserStore();

const currentNav = ref("")
const currentLoginStatus = ref(null)

// 路由高亮
router.beforeEach((to, from, next) => {
  console.log(to.path)
  currentNav.value = to.path;
  next();
});

async function logout() {
  let response = await fetch('api/logout')
  userStore.userLoggedIn = false
  if (response.ok) {
    let res = await response.json();
    console.log(res)
    ElNotification({
      title: 'Success',
      message: "已登出账户",
      type: 'success',
    })
  } else {
    alert("Http Error: " + response.status)
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
    <img src="../static/logos/logo3.png" class="logo" />
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

  <footer class="footer">
    <div class="container grid grid-cols-3 gap-6">

      <div class="logo-col">
        <a href="#" class=" block mb-3">
          <img src="../static/logos/logo2.png" class="logo" />
        </a>
        <p class=" text-base text-cool-gray-500">copyright &copy; 2023 by 新音科技有限公司</p>
      </div>


      <div class="address-col">
        <p class="footer-heading text-lg font-bold mb-5">联系我们</p>
        <address class="contacts not-italic flex flex-col gap-3">
          <p class="address">北京市海淀区清河街道</p>
          <p>
            <a class="footer-link" href="415-201-6370"> to be added </a>
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
}

.container {
  max-width: 140rem;
  padding: 0 3.2rem;
  margin: 0 auto;
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
  padding: 6.4rem 0;
  border-top: 1px solid #ddd;
}

main {
  height: 100%;
}
</style>