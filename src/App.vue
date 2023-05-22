<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import router from "@/router";

const currentNav = ref("")

router.beforeEach((to, from, next) => {
  console.log(to.path)
  currentNav.value = to.path;
  next();
});

</script>
 

<template>
  <header class="flex items-center justify-between px-10 h-20 ">
    <img src="../static/logo2.jpg" class="logo" />
    <nav class="flex items-center gap-12 ">
      <router-link :class="{ 'link-active': currentNav === '/' }" class="router text-lg font-bold hover:text-teal-500"
        to="/">首页 </router-link>
      <router-link :class="{ 'link-active': currentNav === '/file' }" class="router text-lg font-bold hover:text-teal-500"
        to="/file">上传文件</router-link>
      <router-link :class="{ 'link-active': currentNav === '/newchat' }"
        class="router text-lg font-bold hover:text-teal-500" to="/newchat">对话</router-link>
      <router-link :class="{ 'link-active': currentNav === '/chatpdf' }"
        class="router text-lg font-bold hover:text-teal-500" to="/chatpdf">PDF对话</router-link>
      <router-link :class="{ 'link-active': currentNav === '/md' }" class="router text-lg font-bold hover:text-teal-500"
        to="/md">Markdown格式预览</router-link>
      <router-link :class="{ 'link-active': currentNav === '/login' }"
        class="router text-lg font-bold hover:text-teal-500 cta" to="/login">登录</router-link>
    </nav>
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>
 

<style scoped>
* {
  font-size: 10px;
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

.link-active {
  box-shadow: 0 2px 0 0 #1FB8A6;
}


.logo {
  height: 4rem;
}

.cta:link,
.cta:visited {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  color: white;
  background-color: #14b8a6;
}

.cta:hover,
.cta:active {
  background-color: #0d9488;
}

main {
  height: 100%;
}
</style>