
<template>
  <!--    <img src="./login2.jpg" class="flex-1 object-cover md:h-auto md:w-1/2 p-6   ">-->
  <div class="login w-screen  h-screen  ">
    <div class="container">

      <h1 class="mb-4 text-xl font-semibold 
        text-gray-700">
        登录账号, 解锁第二大脑🚀
      </h1>

      <el-tabs v-model="activeName" class="tabs" :stretch="true">
        <el-tab-pane label="登录" name="first">
          <form class="login-form shadow-lg ">
            <div>
              <label class="block text-sm m-2" for="username">
                <span class="text-gray-700 font-bold  text-1xl">账号</span>
              </label>

              <input class="login-input  block w-full text-sm rounded
border-gray-200  
" placeholder="user" type="text" id="username" name="username" required v-model="username" />
            </div>

            <div>
              <label class="block text-sm m-2" for="password">
                <span class="text-gray-700 font-bold text-1xl">密码</span>
              </label>

              <input class="login-input block w-full  text-sm rounded
                      border-gray-200  
                      focus:outline-none focus:shadow-outline-red
                  form-input  " placeholder="***" type="password" id="password" name="password" required
                v-model="password" />
            </div>

            <button type="submit" class="inline-block mt-3 w-full h-10 rounded-md
bg-blue-500  hover:bg-blue-600
text-white text-base font-bold" @click.prevent="submitUserMessage">
              Login
            </button>
          </form>
        </el-tab-pane>

        <el-tab-pane label="注册-暂未开放" name="second">
          <form class="login-form shadow-lg ">

            <div>
              <label class="block text-sm m-2" for="username">
                <span class="text-gray-700  font-bold  text-1xl">账号</span>
              </label>

              <input class="login-input block w-full text-sm rounded
border-gray-200  
" placeholder="user" type="text" id="reg-username" name="username" required v-model="username" />
            </div>

            <div>
              <label class="block text-sm m-2" for="password">
                <span class="text-gray-700 font-bold text-1xl">密码</span>
              </label>

              <input class="login-input block w-full  text-sm rounded
border-gray-200  
focus:outline-none focus:shadow-outline-red
form-input  " placeholder="***" type="password" id="reg-password" name="password" required v-model="password" />
            </div>

            <div>
              <label class="block text-sm m-2" for="password">
                <span class="text-gray-700 font-bold text-1xl">再次输入密码</span>
              </label>

              <input class="login-input block w-full  text-sm rounded
                      border-gray-200  
                      focus:outline-none focus:shadow-outline-red
                  form-input " placeholder="***" type="password" id="reg-rp-password" name="password" required
                v-model="password" />
            </div>


            <button type="submit" class="inline-block w-full h-10 rounded-md
bg-blue-500  hover:bg-blue-600 mt-3
text-white text-base font-bold" @click.prevent="submitUserMessage">
              Register
            </button>
          </form>

        </el-tab-pane>

      </el-tabs>
    </div>


  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 140rem;
}

/* .tabs {
  max-width: 45rem;
} */

.login-form {
  display: block;
  border: 2px solid #dee2e6;
  padding: 1.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 23rem;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.login-input {
  padding: 0.8rem 1rem;
  height: 2.4rem;
}

.login-input:focus {
  display: block;
  box-shadow: 0 0 0 3px #bac8ff;
  outline: none;
  /* 这是去掉蓝色边框的关键 */
}
</style>

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

const activeName = ref('first')

// yupi -验证 development 还是 production
console.log("判断环境: " + process.env.NODE_ENV)
console.log(import.meta.env.MODE)
console.log(import.meta.env.VITE_APP_API_URL)

function submitUserMessage() {
  axios.get(`${import.meta.env.VITE_APP_API_DEV_URL}`)
    .then(function (response) {
      console.log(response)
    })

  axios.post('/api/login', {
    name: username.value,
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
