<template>
  <div class="w-screen h-screen flex flex-col items-center">

    <h2 class="mt-3 text-2xl font-bold">文档上传</h2>

    <!--    <input class="" type="file" @change="handleFileChange" ref="fileInput">-->
    <label class="mt-6 w-8/12 flex flex-col items-center px-6 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer
               hover:outline-red hover:shadow-indigo-300 hover:outline-blue " v-loading="loading" @dragover.prevent
      @drop="handleFileChange">
      <img class="w-8" src="../../assets/upload-file.svg" />
      <span class="mt-2 text-base leading-normal" v-if="fileName">{{ fileName }}</span>
      <span class="mt-2 text-base leading-normal font-semibold" v-else>选择一个文件上传</span>

      <input type='file' accept=".pdf,.csv,.xls,.xlsx,.ppt,.pptx,.doc,.docx" class="hidden" @change="handleFileChange"
        ref="fileInput" @dragover.prevent @drop="handleFileChange" />
    </label>

    <button class="mt-6 mb-6 bg-teal-300  duration-300 
                hover:bg-teal-500 hover:text-white rounded-md
                px-3 py-3 rounded-md  text-base font-bold" @click="handleUploadClick">
      Upload
    </button>

    <p v-if="uploadStatus">{{ uploadStatus }}</p>


    <!-- <section class="flex w-8/12 ">
      <a href="https://www.baidu.com" target="_blank">
        <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transform
        hover:-translate-y-1 transition duration-300 cursor-pointer
        hover:bg-white mr-6">
          <div class="px-6 py-4 ">
            <h2 class="font-bold text-xl mb-2">Feature</h2>
            <p class="text-gray-700 text-base">支持PDF、OFFICE全家桶解析</p>
          </div>
        </div>
      </a>

      <a href="https://www.baidu.com" target="_blank">
        <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transform
        hover:-translate-y-1 transition duration-300 cursor-pointer
        ">
          <div class="px-6 py-4 ">
            <h2 class="font-bold text-xl mb-2">Feature</h2>
            <p class="text-gray-700 text-base">支持解析</p>
          </div>
        </div>
      </a>
    </section> -->

    <div class="w-8/12 mt-10">
      <el-table :data="filterfileList" stripe>

        <el-table-column label="文件名">
          <template #default="scope">
            <el-tag>{{ scope.row.file_name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="上传日期">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Operations" align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleFileClick(scope.row)">和PDF对话</el-button>
            <el-button size="small" @click="handleFileDelete" type="danger">删除该索引</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>



  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import myAxios from "@/api/axios";
import { useRouter } from "vue-router";
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { h } from 'vue'
import { store } from "@/store";
import { Timer } from '@element-plus/icons-vue'

const router = useRouter();
const fileName = ref(null)
const fileInput = ref(null)
const uploadStatus = ref(null)
const loading = ref(false)

const fileList = ref([])
const search = ref('')
const filterfileList = computed(() =>
  fileList.value.filter(
    (data) =>
      !search.value ||
      data.file_name.includes(search.value)
  )
)

// 挂载时请求接口， 获取 s文件
onMounted(() => {
  myAxios.get(`/api/files/list`)
    .then(function (response) {
      if (response.isAxiosError) {
        // 响应状态码不在 200-299 范围内
        console.error('请求失败：', response.status);
      } else {
        fileList.value = response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
})

// 上传文件变动时候的处理方式
const handleFileChange = () => {
  const file = fileInput.value.files[0]
  // do something with the file
  console.log(file)
  fileName.value = file ? file.name : ''

  // URL 存储
  // 使用URL来处理
  const URL = window.URL || window.webkitURL;
  const pdfUrl = URL.createObjectURL(file);
  store.setFileUrl(pdfUrl);
  console.log(pdfUrl)
}

// 上传文件的处理方式
const handleUploadClick = async () => {

  const file = fileInput.value.files[0]
  const formData = new FormData()
  formData.append('file', file)
  loading.value = true
  try {
    const response = await myAxios.post(`/api/files/upload`, formData);

    if (!response.isAxiosError) {
      const res = response.data;
      uploadStatus.value = ElNotification({
        title: '上传结果',
        message: h('i', { style: 'color: teal' }, res.name + "上传成功"),
      });
      store.setFileName(res.name);
      store.setFileId(res.fileid)
      router.push('/chatpdf');
    } else {
      uploadStatus.value = 'Upload Failed';
    }
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
    uploadStatus.value = 'Upload Failed';
  }
}

function handleFileClick(data) {
  // console.log(data)
  store.setFileName(data.file_name)
  store.setFileId(data.fileid)
  console.log(`store设置file_id ${data.fileid} 设置file_name ${data.file_name} `)
  // router.push('/chatpdf');
  ElMessage({
    message: '准备调准到PDF对话页面',
    type: 'success',
  })
  router.push('/chatpdf')
}

function handleFileDelete() {
  ElMessageBox.alert('暂不支持删除,请联系管理员进行操作', '删除文件索引', {
    confirmButtonText: '确认',
  })
}

function showStatus() {
  myAxios.get(`/api/status`)
    .then(function (response) {
      console.log(response.data)
    })
}


</script>
