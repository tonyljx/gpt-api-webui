<script setup>
import { ref, computed } from 'vue';
import HelloWorld from './components/others/HelloWorld.vue'
import TheWelcome from './components/others/TheWelcome.vue'
import ChatGpt from "@/pages/ChatGPT/ChatGpt.vue";
</script>
 

<template>
  <header class="flex items-center justify-between px-10 h-20">
    <img src="../static/logo2.jpg" class="logo" />
    <nav class="flex items-center gap-12 ">
      <router-link class="text-lg font-bold hover:text-teal-500" to="/">首页 </router-link>
      <router-link class="text-lg font-bold hover:text-teal-500" to="/file">上传文件</router-link>
      <router-link class="text-lg font-bold hover:text-teal-500" to="/newchat">对话</router-link>
      <router-link class="text-lg font-bold hover:text-teal-500" to="/chatpdf">PDF对话</router-link>
      <router-link class="text-lg font-bold hover:text-teal-500" to="/md">Markdown格式预览</router-link>
      <router-link class="text-lg font-bold hover:text-teal-500 cta" to="/login">登录</router-link>
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

/*我写的css*/
#router {
  display: flex;
  justify-content: space-around;
  font-size: large;
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