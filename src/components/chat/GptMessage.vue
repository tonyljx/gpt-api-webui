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
      <div class="message-action date" style="font-size: 10px">{{ date }}</div>
    </div>
  </div>
</template>

<script setup>
import GptAvatar from "@/components/chat/GptAvatar.vue";
import { computed, watchEffect, nextTick, ref, onMounted } from "vue";
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import ClipboardJS from "clipboard";
const props = defineProps({
  date: String,
  content: String,
});

const messageRef = ref(props.content);

// const HTMLmessage = computed(() => {
//   return marked(messageRef.value,{
//     highlight: function(md){
//       return hljs.highlightAuto(md).value;
//     }
//   });
// });

watchEffect(() => {
  messageRef.value = props.content;
});

// 代码
// 挂载的时候加载clipboard
onMounted(() => {
  const clipboard = new ClipboardJS('.copy-btn', {
    target: function (trigger) {
      // console.log(trigger.parentNode);
      // console.log(trigger.parentNode.querySelector('code'));
      return trigger.parentNode.querySelector('code');
      // return trigger.parentNode.previousSibling.querySelector('code');
    }
  });
  clipboard.on('success', (e) => {
    e.trigger.innerHTML = 'Copied!';
    setTimeout(() => {
      e.trigger.innerHTML = 'Copy';
    }, 2000);
  });
})

const HTMLmessage = computed(() => {
  const renderer = new marked.Renderer();
  renderer.code = function (code, language) {
    const highlightedCode = language ? hljs.highlight(language, code).value : hljs.highlightAuto(code).value;
    const copyButton = '<button class="copy-btn">Copy</button>';
    // const codeBlock = `  <pre><code class="hljs ${language}"> <div class="copy">${copyButton}</div> ${highlightedCode}</code></pre>`;
    const codeBlock = `
             <pre>  ${copyButton} <code class="hljs ${language}"> ${highlightedCode}</code></pre>
             </div>`;
    return codeBlock;
  };
  marked.setOptions({
    renderer,
    highlight: function (code, language) {
      return language ? hljs.highlight(language, code).value : hljs.highlightAuto(code).value;
    }
  })
  return marked(messageRef.value);
});



</script>


<style scoped>
/* 设置消息容器的架构 */
.message-resp-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.resp-item {
  min-width: 70%;
  max-width: 80%;
  display: flex;
}

.resp {
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  color: #171616;
  background-color: #e4eee1;
}

.markdown-body {
  background-color: #e4eee1;
}

.message-action .date {
  font-size: 10px;
  color: rgb(134, 127, 127);
}


:deep(pre) {
  background-color: #2c3e50;
  margin: 1em 0;
  padding: 1em;
  border: 1px solid rgb(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #fff;
}

:deep(.copy-btn) {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: rgb(0, 0, 0, 0.28);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

:deep(.copied) {
  position: relative;
}
</style>