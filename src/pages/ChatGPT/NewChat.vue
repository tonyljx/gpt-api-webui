<template>
  <div class=" w-screen flex">


    <div class="system  ">
      <!--    <TheUpload></TheUpload>-->
      <button class="bg-red-200 hover:bg-red-300 rounded-md  w-10/12 h-12 text-lg font-bold mt-5 self-center">
        新建对话
      </button>

      <ul class="text-center font-bold mt-2 ">
        <li class="mt-2 rounded-md border-2 border-gray-400 px-3 py-2 text-gray-700
         hover:text-gray-400 hover:border-green-400 ">
          聊天记录1
        </li>
        <li class="mt-2 rounded-md border-2 border-gray-400 px-3 py-2 text-gray-700
        hover:text-gray-400 hover:border-green-400">
          聊天记录2
        </li>
        <li class="mt-2 rounded-md border-2 border-gray-400 px-3 py-2 text-gray-700
        hover:text-gray-400 hover:border-green-400">
          聊天记录3
        </li>
      </ul>

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
        <el-input type="textarea" placeholder="input here... press Enter to send Message" v-model="newMessage"
          @keydown.enter.prevent @keyup.enter="submitMessage_fetch" @keyup.enter.shift="handleShiftEnter"
          :suffix-icon="Position">
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
import useUserStore from '@/store/user'
import { ElMessage } from "element-plus";
import router from "@/router";
import { ElNotification } from 'element-plus'

// 全局状态
const userStore = useUserStore();
const sendMessageCnt = ref(0);
const disabledInput = ref(false);

const date = "2023年04月09日15:38:07";


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

const messages = ref([
  {
    "message": "请问你是谁?"
    ,
    "type": "user",
    "date": "2023年04月09日15:51:40",
  },
  {
    "message": "我是GPT,一个人工智能模型,请问有什么可以帮助你的?",
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
  console.log(userStore.userLoggedIn)
  if (userStore.userLoggedIn === false) {
    ElMessage({
      message: '尚未登录, 即将跳转',
      type: 'success',
    })
    router.push('/login');
    return;
  }

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

  await fetchEventSource('/api/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
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
.system {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 1rem;
  margin-right: 1rem;
  border: 2px solid #9ca3af;
}

.prompt {
  width: 90%;
  /* height: 300px; */
}

.chat-box-container {
  /* 两列的设置 */
  flex-grow: 3;
  /* border: 1px solid rgba(0,0,0,0.26); */
  padding: 1em;
  margin-right: 1em;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.chat-box-content-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1em;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

/* config */

.chat-box-footer {
  display: flex;
  gap: 10px;
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