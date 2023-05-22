<template>
  <div class="flex-col hidden">
    <h1 class="text-3xl">这是首页</h1>
    <button @click="getMessageFromBackend" class="mt-3 border-2 border-green-400 hover:bg-teal-300 px-3 py-2 text-lg">
      Check Login Status
    </button>

    <button @click="logout" class="ml-2 mt-3 border-2 border-green-400 hover:bg-teal-300 px-3 py-2 text-lg">
      Logout
    </button>
    <p class="mt-3 text-xl font-bold" v-if="message_available">Message: {{ message }}</p>
    <p class="mt-3 text-xl font-bold" v-if="message_available">Name: {{ name }}</p>
  </div>

  <section class="section-hero">
    <div class="hero">
      <div class="hero-text-box">
        <h1 class="heading-primary">
          基于人工智能的AI文档助理
        </h1>
        <p class="hero-description">
          利用AI驱动的文档交互，我们为初创公司提供创新解决方案。通过结合人工智能技术和高效的文档处理，我们的产品实现自动化、智能化的文档管理和交流，助力您的业务高效运转
        </p>
        <a href="#" class="btn btn--full mr-5 ">Start Communicating</a>
        <a href="#" class="btn btn--outline mb-5"> Learn More</a>

        <div class="mt-3">
          <h2 class="text-2xl font-bold mb-6">支持的文件类型</h2>
          <div class="flex   justify-between gap-2">
            <div class="text-xl font-semibold flex  gap-2">
              PDF
              <img class=" w-8" src="../../assets/pdf.svg" />
            </div>

            <div class="text-xl font-semibold flex gap-2">
              Excel
              <img class=" w-8" src="../../assets/excel.svg" />
            </div>
            <div class="text-xl font-semibold flex gap-2">
              Word
              <img class=" w-8" src="../../assets/word.svg" />
            </div>
            <div class="text-xl font-semibold  flex gap-2">
              PPT
              <img class=" w-8" src="../../assets/ppt.svg" />
            </div>
            <div class="text-xl font-semibold">
              正在完善中...
            </div>
          </div>
        </div>

      </div>

      <div class="hero-img-box">
        <img class="hero-img rounded-lg" src="@/../static/docs.jpeg" />
      </div>

    </div>


  </section>
</template>

<style scoped >
.section-hero {
  padding: 4.8rem 0 9.6rem 0;
}

.hero {
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 3.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem
}

.heading-primary {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.05;
  color: #333;
  letter-spacing: -0.5px;
  margin-bottom: 3.2rem;
}

.hero-description {
  font-size: 2rem;
  line-height: 1.6;
  margin-bottom: 4.8rem;
}

.hero-img {
  width: 100%;
}


.btn:link,
.btn:visited {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8em 1.6rem;
  border-radius: 10px;
  display: inline-block;
  cursor: pointer;
  /* transition 放在 原来的属性上 */
  transition: all 0.3s ease-in-out;
}

.btn--full:link,
.btn--full:visited {
  background-color: #06b6d4;
  color: #fff;
}

.btn--full:hover,
.btn--full:active {
  background-color: #0891b2;
  color: #fff;
}

.btn--outline:link,
.btn--outline:visited {
  background-color: #fff;
  color: #555;
}

.btn--outline:hover,
.btn--outline:active {
  background-color: #bae6fd;
  /* border: 3px solid #fff; */

  /* 加阴影 */
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.1); */
  /* 达到和border一样的效果 */
  box-shadow: inset 0 0 0 3px #fff;
}
</style>


<script setup>

import { onMounted, ref } from "vue";
import useUserStore from '@/store/user'
// 全局状态
const userStore = useUserStore();

let message = ref(null)
let name = ref(null)
let message_available = ref(false)

async function getMessageFromBackend() {
  let response = await fetch('api/status')
  if (response.ok) {
    message_available.value = true
    let res = await response.json();
    name.value = res.name
    message.value = res.data
  } else {
    alert("Http Error: " + response.status)
  }
}

async function logout() {
  let response = await fetch('api/logout')
  userStore.userLoggedIn = false
  if (response.ok) {
    let res = await response.json();
    message_available.value = true
    // console.log("logout: "+res)
    message.value = res.data
    name.value = res.name
  } else {
    alert("Http Error: " + response.status)
  }
}

</script>