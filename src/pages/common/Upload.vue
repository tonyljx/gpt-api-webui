<template>
  <div class="w-full h-full flex flex-col items-center
    bg-gradient-to-r from-pink-200 to-teal-100">

    <h2 class="mt-3 text-5xl font-bold">Chat With Any PDF</h2>

<!--    <input class="" type="file" @change="handleFileChange" ref="fileInput">-->
    <label class="mt-6 w-8/12 flex flex-col items-center px-6 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer
               hover:outline-red hover:shadow-indigo-300 hover:outline-blue "
           v-loading="loading"
    >
      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
        <path fill-rule="evenodd" d="M9 2a2.828 2.828 0 00-2 1L1 8v9a2 2 0 002 2h14a2 2 0 002-2V8l-6-5a2.828 2.828 0 00-2-1V1a1 1 0 00-1-1 1 1 0 00-1 1v1H9V1a1 1 0 00-1-1 1 1 0 00-1 1v1H5a1 1 0 00-1 1v1zM2 8h16v9H2V8zm9-4a1 1 0 011 1v3.586l1.293-1.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L11 8.414V12a1 1 0 01-2 0V5a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
      <span class="mt-2 text-base leading-normal" v-if="fileName" >{{fileName}}</span>
      <span class="mt-2 text-base leading-normal font-semibold" v-else >选择一个文件上传</span>
      <input type='file' accept=".pdf,.csv,.xls,.xlsx,.ppt,.pptx,.doc,.docx"  class="hidden" @change="handleFileChange" ref="fileInput"/>
    </label>

    <button class="mt-6 mb-6 bg-teal-300
                hover:bg-red-300
                px-3 py-3 rounded-md  text-lg font-bold"
            @click="handleUploadClick">
      Upload
    </button>

    <p v-if="uploadStatus">{{ uploadStatus }}</p>

    <section class="flex w-8/12 ">
      <a href="https://www.baidu.com"  target="_blank">
        <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transform
        hover:-translate-y-1 transition duration-300 cursor-pointer
        hover:bg-white mr-6">
          <div class="px-6 py-4 " >
            <h2 class="font-bold text-xl mb-2">Feature</h2>
            <p class="text-gray-700 text-base">支持PDF、OFFICE全家桶解析</p>
          </div>
        </div>
      </a>

      <a href="https://www.baidu.com"  target="_blank">
        <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transform
        hover:-translate-y-1 transition duration-300 cursor-pointer
        "
        >
          <div class="px-6 py-4 " >
            <h2 class="font-bold text-xl mb-2">Feature</h2>
            <p class="text-gray-700 text-base">支持解析</p>
          </div>
        </div>
      </a>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import {useRouter} from "vue-router";
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import { h } from 'vue'
// 存储状态，方便chatwithpdf获取
import {store} from "@/store";
// 声明一个变量，存储文件上传时候的名字

const router = useRouter();
const fileName = ref(null)
const fileInput = ref(null)
const uploadStatus = ref(null)
const loading = ref(false)


const handleFileChange = () => {
  const file = fileInput.value.files[0]
  // do something with the file
  console.log(file)
  fileName.value = file? file.name : ''
}

const handleUploadClick = async () => {

  const response = await  fetch('/api/status')
  if (response.ok){
    const res = await response.json()
    if (!res.name){
      ElMessage({
        message: '尚未登录,即将跳转到登录页面',
        type: 'warning',
        showClose: true,
      })
      router.push('/login')
      return
    }
  }

  const file = fileInput.value.files[0]
  const formData = new FormData()
  formData.append('file', file)
  loading.value = true
  // fetch
  try {
    const response = await fetch("/upload", {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const res = await response.json()
      if (res.status === "success"){
        uploadStatus.value =
            ElNotification({
              title: '上传结果',
              message: h('i', { style: 'color: teal' }, res.name+"上传成功"),
            })
        store.setFileName(res.name)
        router.push('/chatpdf')

      }else{
        uploadStatus.value = 'Upload Failed'
      }
    } else {
      uploadStatus.value = 'Upload Failed'
    }
    loading.value = false

  } catch (error) {
    console.error(error)
    uploadStatus.value = 'Upload Failed'
  }

  // axios
  // try {
  //   const response = await axios.post('/upload', formData);
  //
  //   if (response.status === 200) {
  //     uploadStatus.value = response.data;
  //   } else {
  //     uploadStatus.value = 'Upload Failed';
  //   }
  // } catch (error) {
  //   console.error(error);
  //   uploadStatus.value = 'Upload Failed';
  // }
}
</script>
