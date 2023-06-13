<template>
  <div class="flex">

    <div class="chat-box-container  ">

      <div class="chat-box-content-container">
        <div v-for="(message, index) in messages" :key="index">
          <UserMessage :date="message.date" v-if="message.type === 'user'" :content="message.content">
          </UserMessage>

          <GptMessage :date="message.date" :content="message.content" v-else>

          </GptMessage>
        </div>
      </div>

      <div class="chat-box-footer">
        <el-input placeholder="input here... press Enter to send Message" v-model="newMessage" @keydown.enter.prevent
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
import { Promotion } from '@element-plus/icons-vue'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import useUserStore from '@/store/user'
import axios from "axios";
import apiUrl from '@/api'
import myAxios from "@/api/axios";


// 全局状态
const userStore = useUserStore();
const sendMessageCnt = ref(0);
const disabledInput = ref(false);

const messages = ref([
  {
    "content": "你是谁?",
    "type": "user",
    "date": "2023年04月09日15:52:37",
  },
  {
    "content": "我是GPT,一个人工智能模型,请问有什么可以帮助你的?",
    "type": "chatgpt",
    "date": "2023年04月09日15:52:37",
  }
]);

onMounted(
  () => {
    // 请求后端接口
    myAxios.get(`/api/chat/history`)
      .then(function (responses) {
        // console.log(responses)
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
  const message = newMessage.value;
  newMessage.value = "";

  const GPTMessage = {
    "content": '',
    "type": "chatgpt",
    "date": new Date().toLocaleString('zh-CN', options),
  };

  messages.value.push(GPTMessage);

  await fetchEventSource(`${apiUrl}/api/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: message
    }),
    async onopen(response) {
      if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
        // everything's good
        console.log('everything\'s good')
      } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        console.log('请求错误')
        throw new Error(response.status)
      } else {
        console.log('其他错误')
      }
    },
    onmessage(event) {
      let length = messages.value.length;
      console.log("收到数据: " + event.data)
      messages.value[length - 1].content += JSON.parse(event.data);
      scrollToBottom();
    },
    onerror(err) {
      messages.value[length - 1].content += "遇到报错,请稍后尝试";
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
.system {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 1rem;
  margin-right: 1rem;

}

.prompt {
  width: 90%;
  /* height: 300px; */
}

.chat-box-container {
  /* 两列的设置 */
  /* border: 1px solid rgba(0,0,0,0.26); */
  flex-grow: 2;
  padding: 2.4rem 4.8rem;
  display: flex;
  flex-direction: column;
  height: 93vh;
  max-width: 140rem;
  position: relative;
  border-left: 2px solid #ddd;
}

.chat-box-content-container {
  min-width: 50rem;
  overflow-y: auto;
  margin-bottom: 1em;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

/* config */

.chat-box-footer {
  position: absolute;
  bottom: 2rem;
  width: 50rem;
  display: flex;
  gap: 10px;
  align-self: center;
}

.chat-box-footer input {
  flex: 1;
}

textarea {
  border: 1px solid rgba(0, 0, 0, 0.26);
}

.config {
  flex-grow: 1;
}
</style>