<template>
  <div class="message-resp-container">
    <div class="message-avatar">
      <GptAvatar></GptAvatar>
    </div>

    <div class="resp-item">
      <div class="resp">
        <div class="markdown-body" v-html="HTMLmessage"></div>
      </div>
    </div>
    <div class="message-action">
      <div class="message-action date" style="font-size: 10px">{{date}}</div>
    </div>
  </div>
</template>

<script setup>
import GptAvatar from "@/components/chat/GptAvatar.vue";
import {computed,watchEffect,nextTick,ref} from "vue";
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
const props = defineProps({
  date: String,
  message: String,
});

const messageRef = ref(props.message);

const HTMLmessage = computed(() => {
  // console.log("子组件收到信息了: "+messageRef.value)
  return marked(messageRef.value,{
    highlight: function(md){
      return hljs.highlightAuto(md).value;
    }
  });
});

watchEffect(() => {
  messageRef.value = props.message;
});
// console.log("GPT组件的信息: ",HTMLmessage);
</script>

<style scoped>
/* 设置消息容器的架构 */
.message-resp-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.resp-item{
  min-width: 70%;
  max-width: 80%;
  display: flex;
}

.resp{
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  color: #171616;
  background-color: #e4eee1;
}

.markdown-body{
  background-color: #e4eee1;
}

.message-action .date{
  font-size: 10px;
  color: rgb(134, 127, 127);
}


:deep(pre) {
  background-color: #2c3e50;
  margin: 1em 0;
  padding: 1em;
  border: 1px solid rgb(0,0,0,0.25);
  border-radius: 10px;
  color: #fff;
}


</style>