<template>
  <!-- <div class="flex-col hidden">
    <h1 class="text-3xl">这是首页</h1>
    <button @click="getMessageFromBackend" class="mt-3 border-2 border-green-400 hover:bg-teal-300 px-3 py-2 text-lg">
      Check Login Status
    </button>

    <button @click="logout" class="ml-2 mt-3 border-2 border-green-400 hover:bg-teal-300 px-3 py-2 text-lg">
      Logout
    </button>
    <p class="mt-3 text-xl font-bold" v-if="message_available">Message: {{ message }}</p>
    <p class="mt-3 text-xl font-bold" v-if="message_available">Name: {{ name }}</p>
  </div> -->
  <section class="section-hero">
    <div class="hero">
      <div class="hero-text-box">
        <h1 class="heading-primary">
          基于人工智能的AI文档助理
        </h1>
        <p class="hero-description">
          利用AI驱动的文档交互，我们为初创公司提供创新解决方案。通过结合人工智能技术和高效的文档处理，我们的产品实现自动化、智能化的文档管理和交流，助力您的业务高效运转
        </p>
        <a href="#" class="btn btn--full mr-5 ">开始交互🏷</a>
        <a href="#" class="btn btn--outline mb-8">了解更多</a>

        <div class="mt-10">
          <h2 class="text-2xl font-bold mb-10">支持的文件类型</h2>

          <div class="flex gap-5">

            <div class="text-xl font-semibold flex  gap-2">
              <img class=" w-8" src="../../assets/pdf.svg" />
              PDF
            </div>
          </div>
        </div>


        <div class="mt-10">
          <h2 class="text-2xl font-bold mb-10">正在开发支持的文件类型</h2>

          <div class="flex gap-8">
            <!-- <div class="text-xl font-semibold flex gap-2">
              <img class=" w-8" src="../../assets/excel.svg" />
              Excel
            </div> -->

            <div class="text-xl font-semibold flex gap-2">
              <img class="w-8" src="../../assets/word.svg" />
              Word
            </div>

            <div class="text-xl font-semibold  flex gap-2">
              <img class="w-8" src="../../assets/ppt.svg" />
              PPT
            </div>

            <div class="text-xl font-semibold  flex gap-2">
              <img class="w-8" src="../../assets/txt.svg" />
              TXT
            </div>
          </div>
        </div>

      </div>

      <div class="hero-img-box">
        <img class="hero-img rounded-lg" src="@/../static/teaser2.png" />
      </div>

    </div>
  </section>

  <section class="section-how ">
    <div class="container">
      <span class="block text-xl font-bold text-teal-400 tracking-wide mb-2">工作流程</span>
      <h2 class=" text-4xl  text-gray-600 font-bold mb-16">
        和文档对话的三个步骤
      </h2>
    </div>

    <div class="container grid  grid-cols-2 items-center  gap-6">
      <!-- step -1 -->
      <div class="step-text-box">
        <p class="step-number">01</p>
        <h3 class="heading-tertiary">
          上传你所需要对话的文件
        </h3>
        <p class="step-description">
          通过简单的步骤将您的私有文档上传到我们的产品中。您可以选择单个文件或批量上传多个文件，包括各种格式（如.docx、.pdf等）。上传后，产品将开始处理您的文档并建立索引，以便后续的交互和搜索功能。
        </p>
      </div>

      <div class="step-img-box">
        <img class="step-img" src="../../assets/mj/step1-3.png" />
      </div>

      <!-- step02 -->
      <div class="step-img-box">
        <img class="step-img" src="../../assets/mj/step2-3.png" />
      </div>

      <div class="step-text-box">
        <p class="step-number">02</p>
        <h3 class="heading-tertiary">
          建立索引
        </h3>
        <p class="step-description">
          将您的私有文档导入到我们的产品中，它将自动建立索引，提取关键信息，并为每个文档创建一个唯一的标识符。这样，您可以轻松地组织和查找您的文档。
        </p>
      </div>

      <!-- step03 -->
      <div class="step-text-box">
        <p class="step-number">03</p>
        <h3 class="heading-tertiary">
          与文档互动
        </h3>
        <p class="step-description">
          我们的产品不仅仅是一个文档管理工具，它还提供了一种全面的解决方案，帮助您更好地利用和分析您的文档。通过利用AI的能力，您可以发现隐藏在大量文档中的洞察力，并更高效地利用这些信息，从而提升工作效率和决策质量。
        </p>
      </div>

      <div class="step-img-box">
        <img class="step-img" src="../../assets/mj/step3-3.png" />
      </div>

    </div>

  </section>

  <section class="section-feature">
    <div class="container grid grid-cols-3 gap-8  ">
      <h2 class=" font-bold text-3xl   col-span-3  text-center "> 产品特点 </h2>

      <div class="feature flex flex-col items-center gap-3">
        <el-icon color="#a5d8ff" size="3rem">
          <MostlyCloudy />
        </el-icon>
        <h3 class="  font-medium text-xl  ">公私混部署</h3>
        <p class=" font-medium  text-lg text-gray-400 leading-8">私有部署模型针对隐私数据,保障安全性; 公有模型针对数据不敏感的问题提供补充。</p>
      </div>

      <div class="feature flex flex-col items-center gap-3">
        <el-icon color="#4dabf7" size="3rem">
          <Document />
        </el-icon>
        <h3 class="  font-medium text-xl  ">多文档类型支持</h3>
        <p class=" font-medium  text-lg text-gray-400 leading-8 ">系统支持PDF,WORD,TXT等主要文本格式, 后续支持EXCEL等公司常用文件
          格式的支持
        </p>
      </div>

      <div class="feature flex flex-col items-center gap-3">
        <el-icon color="#91a7ff" size="3rem">
          <DataAnalysis />
        </el-icon>

        <h3 class="  font-medium text-xl  ">AI智能</h3>
        <p class=" font-medium  text-lg text-gray-400 leading-8">基于AI大模型的能力,提供对问答的问答,协助快速熟悉文档</p>
      </div>
    </div>

  </section>


  <section class="section-cta">

    <div class="container grid grid-cols-2 gap-x-10">

      <img class="rounded" src="../../assets/cta.jpeg" />

      <div class=" flex flex-col gap-3">
        <h2 class=" text-4xl font-bold">Subscribe</h2>
        <p class=" font-mono text-xl font-normal text-gray-400"></p>
        <div class="flex gap-2">
          <el-input v-model="email" placeholder="输入您的邮箱地址" clearable />
          <el-button type="primary" :loading="emailLoading" plain @click="send_email">提交</el-button>
        </div>
        <p class=" text-base italic font-bold">输入您的邮箱,以便接收我们最新的产品通知</p>
      </div>
    </div>

  </section>
</template>

<style scoped >
/* 居中容器 */
.container {
  max-width: 120rem;
  padding: 0 3.2rem;
  margin: 0 auto;
}

/* section hero */
.section-hero {
  padding: 4.8rem 0 9.6rem 0;
  height: 85vh;
}

.hero {
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 3.2rem;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  height: 100vh;
  /* align-items: center; */
}

.heading-primary {
  font-size: 2.5rem;
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
  background-color: #cdf0f6;
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

/* step */
.step-number {
  font-size: 8.6rem;
  font-weight: 600;
  color: #adb5bd;
  margin-bottom: 1.2rem;
}

.heading-primary,
.heading-secondary,
.heading-tertiary {
  font-weight: 700;
  line-height: 1.05;
  color: #333;
}

.heading-primary {
  font-size: 3rem;
  letter-spacing: -0.5px;
  margin-bottom: 3.2rem;
}

.heading-secondary {
  font-size: 2.5rem;
  line-height: 1.2;
  color: #333;
  margin-bottom: 9.6rem;
}

.heading-tertiary {
  font-size: 2rem;
  line-height: 1.2;
  margin-bottom: 3.2rem;
}

.step-description {
  font-size: 1.2rem;
  line-height: 1.8;
}

.step-img {
  width: 85%;
  height: 85%;
  border-radius: 10px;
}

/* section how */
.section-how {
  margin-top: 10rem;
}

/* section feature */
.section-feature {
  padding: 2.4rem 4.8rem;
  margin-top: 5rem;
}


/* section-cta */
.section-cta {
  margin: 6rem 0;
}
</style>


<script setup>

import { onMounted, ref } from "vue";
import useUserStore from '@/store/user'
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'


// 全局状态
const email = ref("")
const emailLoading = ref(false)


function send_email() {
  emailLoading.value = true;
  axios.post('/api/mail/subscribe', {
    email: email.value
  })
    .then(function (response) {
      console.log(response);
      ElMessageBox.alert('邮箱订阅成功', '订阅状态', {
        // if you want to disable its autofocus
        // autofocus: false,
      })
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      emailLoading.value = false;
    })
}

</script>