<template>
    <div class="flex-col">
      <h1 class="text-3xl" >这是首页</h1>
      <button
          @click="getMessageFromBackend"
          class="mt-3 border-2 border-green-400 hover:bg-teal-300 px-3 py-2 text-lg">
        Check Login Status
      </button>

      <button
          @click="logout"
          class="ml-2 mt-3 border-2 border-green-400 hover:bg-teal-300 px-3 py-2 text-lg">
        Logout
      </button>

      <p class="mt-3 text-xl font-bold" v-if="message_available">Message: {{message}}</p>

      <p class="mt-3 text-xl font-bold" v-if="message_available">Name: {{name}}</p>

    </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import useUserStore from '@/store/user'
// 全局状态
const userStore = useUserStore();

let message = ref(null)
let name = ref(null)
let message_available = ref(false)

async function getMessageFromBackend(){
  let response  = await fetch('api/status')
  if (response.ok){
    message_available.value = true
    let res  = await response.json();
    name.value = res.name
    message.value = res.data
  }else{
    alert("Http Error: "+response.status)
  }
}

async function logout(){
  let response  = await fetch('api/logout')
  userStore.userLoggedIn=false
  if (response.ok){
    let res = await response.json();
    message_available.value = true
    // console.log("logout: "+res)
    message.value = res.data
    name.value = res.name
  }else{
    alert("Http Error: "+response.status)
  }
}

</script>