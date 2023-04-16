<script setup>
import { ref, computed } from 'vue';
import HelloWorld from './components/others/HelloWorld.vue'
import TheWelcome from './components/others/TheWelcome.vue'
import ChatGpt from "@/pages/ChatGPT/ChatGpt.vue";
</script>
 

<template>
  <div id="router">
    <router-link to="/">首页  </router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/newchat">newChat</router-link>
    <router-link to="/md">Markdown格式预览</router-link>
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
  justify-content: space-between;
  font-size: large;
}

main{
  height: 100%;
}

</style>