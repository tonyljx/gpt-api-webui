<template>
  <!-- 架构 消息容器(消息头像 消息item 消息action) -->
  <div class="message-user-container">
    <div class="message-avatar">
      <GptAvatar></GptAvatar>
    </div>

    <div class="message-item">
      <div class="user">
        <div class="markdown-body">
          <div v-html="HTMLmessage"></div>
        </div>
      </div>
    </div>

    <div class="message-action">
      <div class="message-action date" style="font-size: 10px">{{ date }}</div>
    </div>
  </div>
</template>



<script setup>
import { marked } from 'marked'
import GptAvatar from "@/components/chat/GptAvatar.vue";
import { computed, ref } from "vue";
// import 'github-markdown-css';


const props = defineProps({
  date: String,
  content: String,
});


const HTMLmessage = computed(() => marked(props.content))
// console.log(HTMLmessage);

</script>



<style scoped>
/* 设置消息容器的架构 */
.message-user-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-item {
  min-width: 70%;
  max-width: 100%;
  display: flex;
  flex-direction: row-reverse;
}

.user {
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  max-width: 70%;
  color: #171616;
  background-color: #c0efeb;
}

.markdown-body {
  background-color: #c0efeb;
}

.message-action .date {
  font-size: 10px;
  color: rgb(134, 127, 127);
}
</style>