<template>
  <div class="container ">

    <div class="file-previewer" v-if="store.fileUrl">
      <embed id="myPdf" :src="store.fileUrl" type="application/pdf" width="100%">
    </div>

    <div class="chat-box-container " :class="{ 'col-span-2': !store.fileUrl }">

      <div class="chat-box-content-container">
        <div v-for="(   message, index   ) in    messages   " :key="index">
          <UserMessage :date="message.date" v-if="message.type === 'user'" :content="message.content">
          </UserMessage>

          <GptMessage :date="message.date" :content="message.content" v-else>

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
import { ref, onMounted } from "vue";
import { nextTick } from "vue";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { store } from "@/store";
import { Promotion } from '@element-plus/icons-vue'
import axios from "axios";
import apiUrl from '@/api'
import myAxios from "@/api/axios";
// 全局状态
// const userStore = useUserStore();



const messages = ref([
  {
    "content": "我是PDF问答助手,请问有什么疑问?",
    "type": "chatgpt",
    "date": "2023年04月09日15:52:37",
  }
]);
const newMessage = ref("");

onMounted(
  () => {
    // 请求后端接口
    myAxios.post('/api/pdf/history', {
      fileid: store.fileId
    })
      .then(function (responses) {
        // 数据转换
        for (const message of responses.data) {
          const historyMessage = {}
          if (message["type"] === 0) {
            historyMessage["type"] = "user"
          } else {
            historyMessage["type"] = "gpt"
          }
          historyMessage["date"] = message["create_time"]
          historyMessage["content"] = message["content"]
          messages.value.push(historyMessage)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
        scrollToBottom();
      });
  }
)



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
  if (newMessage.value.trim() === '') {
    return;
  }
  // 生成用户信息
  const Message = {
    "content": newMessage.value,
    "type": "user",
    "date": new Date().toLocaleString('zh-CN', options),
  }
  messages.value.push(Message);

  // 把消息滑动到最下方
  scrollToBottom();
  // console.log("发送消息: ", newMessage.value);
  const message = newMessage.value;
  newMessage.value = "";
  const GPTMessage = {
    "content": '',
    "type": "chatgpt",
    "date": new Date().toLocaleString('zh-CN', options),
  };
  messages.value.push(GPTMessage);

  await fetchEventSource(`${apiUrl}/api/pdf/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({
      filename: store.fileName,
      query: message,
      fileid: store.fileId
    }),
    async onopen(response) {
      if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
      } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        console.log('请求错误')
        throw new Error(response.status)
      } else {
        console.log('其他错误')
      }
    },
    onmessage(event) {
      let length = messages.value.length;
      // console.log("收到数据: " + event.data)
      messages.value[length - 1].content += JSON.parse(event.data);
      scrollToBottom();
    },
    onerror(err) {
      messages.value[length - 1].content += "服务器报错,请稍后尝试";
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
  height: 100vh;
  padding: 2.4rem 4.8rem;
}

.file-previewer {
  height: 90vh;
}


#myPdf {
  width: 100%;
  height: 90vh;
}

.chat-box-container {
  position: relative;
  overflow-y: auto;
}

.chat-box-content-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1em;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  height: 85%;
}

.chat-box-footer {
  position: absolute;
  width: 50%;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
}

/* config */


textarea {
  border: 1px solid rgba(0, 0, 0, 0.26);
}
</style>