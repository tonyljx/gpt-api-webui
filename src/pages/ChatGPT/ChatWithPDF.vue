<template>

  <div class="system bg-gradient-to-r from-green-100 to-teal-100">
      <!--    <TheUpload></TheUpload>-->
      <button
          class="  px-2 py-3 bg-red-200 hover:bg-red-300 rounded-md  w-10/12   text-lg font-bold mt-5 self-center">
        {{store.fileName}}
      </button>
      <hr class=" mt-3 border-t border-black border-dotted border-red-500 ">

  </div>


  <div class="chat-box-container">

    <div class="chat-box-content-container">
      <div v-for="(message,index) in messages" :key="index">
        <UserMessage
            :date="message.date"
            v-if="message.type==='user'"
            :message="message.message"
        >
        </UserMessage>

        <GptMessage :date="message.date" :message="message.message" v-else>

        </GptMessage>
      </div>
    </div>

    <div class="chat-box-footer">
      <el-input
          type="textarea"
          placeholder="input here... press Enter to send Message"
          v-model="newMessage"
          @keydown.enter.prevent
          @keyup.enter="submitMessage_fetch"
          @keyup.enter.shift="handleShiftEnter"
          :suffix-icon="Position"
      >
      </el-input>
    </div>

  </div>

</template>


<script setup>
import UserMessage from "@/components/chat/UserMessage.vue";
import GptMessage from "@/components/chat/GptMessage.vue";
import {onMounted, ref} from "vue";
import {nextTick} from "vue";
import {Position} from '@element-plus/icons-vue'
import {fetchEventSource} from '@microsoft/fetch-event-source';
import axios from 'axios';
import {store} from "@/store";
import router from "@/router";
import {ElMessage, ElNotification} from "element-plus";
import useUserStore from '@/store/user'
// 全局状态
const userStore = useUserStore();
onMounted(
    ()=> {
      if (!userStore.userLoggedIn) {
        ElNotification({
          title: 'Info',
          message: '尚未登录,准备转向登录页面',
          type: 'info',
        })
        setTimeout(
            ()=>{
              router.push('/login');
            },2000
        )
      }
    }
)

const sendMessageCnt=ref(0);
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

  // 非流式输出
  const response = await fetch('/api/pdf/ask',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: store.fileName,
      query: message,
    }),
  })

  if (response.ok){
    const result = await response.json()
    let length = messages.value.length;
    messages.value[length-1].message += result.data;
    scrollToBottom();
  }

  // await fetchEventSource('/api/pdf/ask', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     filename: store.fileName,
  //     query: message,
  //   }),
  //   onmessage(event) {
  //     let length = messages.value.length;
  //     console.log(event)
  //     console.log("收到数据: "+event.data)
  //     messages.value[length-1].message += JSON.parse(event.data);
  //     scrollToBottom();
  //   }
  // });

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
  margin-right: 1em;
  border-radius: 4px;
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