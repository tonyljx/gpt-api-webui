<template>

  <div class="system">
    <!--    <textarea class="prompt" placeholder="hello world"></textarea>-->
    <TheUpload></TheUpload>
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

      <el-button
          @click="submitMessage_fetch"
          type="primary"
          icon="ChatLineRound"
          size="large"
      >
        Chat
      </el-button>

    </div>

  </div>

</template>


<script setup>
import UserMessage from "@/components/chat/UserMessage.vue";
import GptMessage from "@/components/chat/GptMessage.vue";
import {onMounted, reactive, ref} from "vue";
import {nextTick} from "vue";
import {Position} from '@element-plus/icons-vue'
import TheUpload from "@/components/Utils/TheUpload.vue";
import {fetchEventSource} from '@microsoft/fetch-event-source';
import axios from 'axios';

const date = "2023年04月09日15:38:07";

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
      messages: [{role: 'user', content: message}]
    }),
    onmessage(event) {
      let length = messages.value.length;
      messages.value[length-1].message += JSON.parse(event.data);
      scrollToBottom();
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
  border: 1px solid rgba(0, 0, 0, 0.25);
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