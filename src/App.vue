<script setup>
import { ref, computed } from 'vue';
import HelloWorld from './components/others/HelloWorld.vue'
import TheWelcome from './components/others/TheWelcome.vue'
import ChatGpt from "@/pages/ChatGPT/ChatGpt.vue";
</script>
 

<template>
  <div id="router" class="p-2 w-full bg-gray-800 text-white">
    <router-link class="pr-5" to="/">首页  </router-link>
    <router-link class="pr-5" to="/file">上传文件</router-link>
    <router-link class="pr-5" to="/newchat">对话</router-link>
    <router-link to="/chatpdf">PDF对话</router-link>
    <router-link class="ml-auto pr-5" to="/md">Markdown格式预览</router-link>
    <router-link class="pr-5" to="/login">登录</router-link>
  </div>
  
  <main>
    <router-view></router-view>
  </main>

</template>
 

<style scoped>
header {
  line-height: 1.5;
}


/*我写的css*/
#router{
  display: flex;
  justify-content: space-around;
  font-size: large;
}

main{
  height: 100%;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

</style>