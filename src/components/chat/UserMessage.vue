<template>
  <!-- 架构 消息容器(消息头像 消息item 消息action) -->
  <div class="message-user-container">
    <div class="message-avatar">
      <GptAvatar></GptAvatar>
    </div>

    <div class="message-item">
      <div class="user-markdown-body">
        <slot></slot>
      </div>
    </div>

    <div class="message-action">
      <div class="message-action date" style="font-size: 10px">{{date}}</div>
    </div>
  </div>
</template>



<script setup>

import GptAvatar from "@/components/chat/GptAvatar.vue";

defineProps(["date"])


</script>



<style scoped>

/* 设置消息容器的架构 */
.message-user-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-item{
  min-width: 70%;
  max-width: 100%;
  display: flex;
  flex-direction: row-reverse;
}

.user-markdown-body{
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  max-width: 70%;
  color: #171616;
  background-color: #a3e38e;
}

.message-action .date{
  font-size: 10px;
  color: rgb(134, 127, 127);
}

</style>