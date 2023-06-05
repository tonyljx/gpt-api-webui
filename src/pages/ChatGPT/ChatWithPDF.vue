<template>
  <div class="container ">

    <div class="file-previewer">
      <!-- <iframe id="myPdf" src="./meituan_course.pdf"></iframe> -->
      <!-- src="./meituan_course.pdf#page=2" -->
      <embed id="myPdf" :src="store.fileUrl" type="application/pdf" width="100%">
    </div>

    <div class="chat-box-container">

      <div class="chat-box-content-container">
        <div v-for="(message, index) in messages" :key="index">
          <UserMessage :date="message.date" v-if="message.type === 'user'" :message="message.message">
          </UserMessage>

          <GptMessage :date="message.date" :message="message.message" v-else>

          </GptMessage>
        </div>
      </div>

      <div class="chat-box-footer">
        <el-input placeholder="在这里输入你的问题,按Enter提交" v-model="newMessage" @keydown.enter.prevent
          @keyup.enter="submitMessage_fetch" @keyup.enter.shift="handleShiftEnter" :suffix-icon="Promotion">
        </el-input>

      </div>

    </div>

  </div>
</template>


<script setup>
import UserMessage from "@/components/chat/UserMessage.vue";
import GptMessage from "@/components/chat/GptMessage.vue";
import { onMounted, ref } from "vue";
import { nextTick } from "vue";
import { Position } from '@element-plus/icons-vue'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import axios from 'axios';
import { store } from "@/store";
import router from "@/router";
import { ElMessage, ElNotification } from "element-plus";
import useUserStore from '@/store/user'
import { Promotion } from '@element-plus/icons-vue'
// 全局状态
// const userStore = useUserStore();


// onMounted(
//   () => {
//     if (!userStore.userLoggedIn) {
//       ElNotification({
//         title: 'Info',
//         message: '尚未登录,准备转向登录页面',
//         type: 'info',
//       })
//       setTimeout(
//         () => {
//           router.push('/login');
//         }, 2000
//       )
//     }
//   }
// )
const pdfFileUrl = store.fileUrl;
const sendMessageCnt = ref(0);
const disabledInput = ref(false);
const date = "2023年04月09日15:38:07";
const messages = ref([
  {
    "message": "我是PDF问答助手,请问有什么疑问?",
    "type": "chatgpt",
    "date": "2023年04月09日15:52:37",
  }
]);
const newMessage = ref("");

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Shanghai" // 指定时区为北京时间
};

async function submitMessage_fetch() {
  // console.log("submit Messgae: "+newMessage.value);
  if (newMessage.value.trim() === '') {
    return;
  }
  // 生成用户信息
  const Message = {
    "message": newMessage.value,
    "type": "user",
    "date": new Date().toLocaleString('zh-CN', options),
  }

  messages.value.push(Message);

  // 把消息滑动到最下方
  scrollToBottom();

  console.log("发送消息: ", newMessage.value);
  const message = newMessage.value;
  newMessage.value = "";

  const GPTMessage = {
    "message": '',
    "type": "chatgpt",
    "date": new Date().toLocaleString('zh-CN', options),
  };

  messages.value.push(GPTMessage);


  await fetchEventSource('/api/pdf/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: store.fileName,
      query: message,
    }),
    async onopen(response) {
      if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
        // everything's good
        // console.log('everything\'s good')
      } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        console.log('请求错误')
        throw new Error(response.status)
      } else {
        console.log('其他错误')
      }
    },
    onmessage(event) {
      let length = messages.value.length;
      console.log(event)
      console.log("收到数据: " + event.data)
      messages.value[length - 1].message += JSON.parse(event.data);
      scrollToBottom();
    },
    onerror(err) {
      throw err;
    }
  });

}

// 原生实现
function scrollToBottom() {
  nextTick(
    () => {
      const messageContainer = document.querySelector('.chat-box-content-container');
      messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
  );
}

function handleShiftEnter() {
  newMessage.value += '\n';
}

</script>


<style scoped>
.container {
  max-width: 85rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}


#myPdf {
  width: 100%;
  height: 90vh;
}

.chat-box-container {
  position: relative;
}

.chat-box-content-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1em;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

.chat-box-footer {
  position: absolute;
  width: 90%;
  bottom: 2rem;
  right: 1rem;
}

/* config */



textarea {
  border: 1px solid rgba(0, 0, 0, 0.26);
}
</style>