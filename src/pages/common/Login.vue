
<template>
  <div class="login flex  ">

    <!--    <img src="./login2.jpg" class="flex-1 object-cover md:h-auto md:w-1/2 p-6   ">-->

    <div class="flex flex-col   items-center justify-center  ">

      <form class="flex flex-col justify-center items-center  ">

        <h1 class="mb-4 text-xl font-semibold 
        text-gray-700 dark:text-gray-200 text-center">
          登录
        </h1>

        <label class="block text-sm m-2" for="username">
          <span class="text-gray-700 dark:text-gray-400 text-1xl">账号</span>
        </label>

        <input class="block w-6/12 mt-1 text-sm rounded
          border-gray-200 focus:border-red-300 focus:shadow-outline-red
          " placeholder="user" type="text" id="username" name="username" required v-model="username" />

        <label class="block text-sm m-2" for="password">
          <span class="text-gray-700 dark:text-gray-400 text-1xl">密码</span>
        </label>

        <input class="block w-6/12 mt-1 text-sm rounded
          border-gray-200 dark:border-gray-600 dark:bg-gray-700
          focus:border-red-300 focus:outline-none focus:shadow-outline-red
           form-input mb-8" placeholder="***" type="password" id="password" name="password" required
          v-model="password" />

        <button type="submit" class="inline-block w-6/12 h-10 rounded-md
            bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
          text-white text-base font-bold" @click.prevent="submitUserMessage">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage, ElNotification } from 'element-plus'
import useUserStore from '@/store/user'
// 全局状态
const userStore = useUserStore();

const router = useRouter();
const username = ref("");
const password = ref("");

function submitUserMessage() {
  // console.log(username.value+" "+password.value);
  axios.post('/api/login', {
    username: username.value,
    password: password.value,
  })
    .then(function (response) {
      // console.log(response);
      if (response.status == 200) {
        // console.log(router);
        ElMessage({
          message: '登陆成功: Welcome ' + username.value,
          type: 'success',
        })
        router.push('/');
        userStore.userLoggedIn = true;
      } else {
        ElMessage.error('登录失败')
        username.value = '';
        password.value = '';
      }
    })
    .catch(function (error) {
      ElMessage.error('登录失败')
      console.log(error);
      username.value = '';
      password.value = '';
    });
}
</script>

<style scoped>
.login {
  transform: translate(0, -10%);
}
</style>