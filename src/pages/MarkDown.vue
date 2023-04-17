<template>
  <div class="main">
    <textarea v-model="markdown"></textarea>
    <div  id="render-md" v-html="HTMLmessage"></div>
  </div>
<!--  <button @click="info">click me</button>-->
</template>

<script setup>
import {marked} from "marked";
import {computed, onMounted, ref, watch} from "vue";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import ClipboardJS from "clipboard";

// c1实现
// marked.setOptions({
//   highlight: function(code){
//     return hljs.highlightAuto(code).value
//   }
// })

const markdown = ref(
    "# Hello, world!\n" +
    "```python\n" +
    "def quick_sort(arr):\n" +
    "    if len(arr) <= 1:\n" +
    "        return arr\n" +
    "    else:\n" +
    "        pivot = arr[0]\n" +
    "        left = []\n" +
    "        right = []\n" +
    "        for i in range(1, len(arr)):\n" +
    "            if arr[i] < pivot:\n" +
    "                left.append(arr[i])\n" +
    "            else:\n" +
    "                right.append(arr[i])\n" +
    "        return quick_sort(left) + [pivot] + quick_sort(right)\n" +
    "```\n"+
    "**12+34=46**");


// 使用 marked 和 highlight.js 进行文本渲染和代码高亮
const render_html = computed(() => {

  return marked(markdown.value,{
    highlight: function(md){
      return hljs.highlightAuto(md).value;
    }
  });
  return html
})


// 挂载的时候加载clipboard
onMounted(()=>{
  const clipboard = new ClipboardJS('.copy-btn', {
    target: function(trigger) {
      console.log(trigger.parentNode);
      console.log(trigger.parentNode.querySelector('code'));
      return trigger.parentNode.querySelector('code');
      // return trigger.parentNode.previousSibling.querySelector('code');
    },
    onCopy: function(e){
      e.trigger.setSelectionRange(0,0);
    }
  });
  clipboard.on('success', (e) => {
    e.trigger.innerHTML = 'Copied!';
    setTimeout(() => {
      e.trigger.innerHTML = 'Copy';
    }, 2000);
  });
})

// console.log(markdown.value);

const HTMLmessage = computed(() => {
  const renderer =  new marked.Renderer();
  renderer.code = function(code, language) {
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
    highlight: function(code, language) {
      return language ? hljs.highlight(language, code).value : hljs.highlightAuto(code).value;
    }
  })
  return marked(markdown.value);
});




function info(){
  console.log("button...");
}


</script>


<style scoped>

.main{
  display: flex;
  width: 100vw;
  height: 100vh;
}
.main > * {
  flex: 1;
  resize: none;
}
textarea{
  padding: 1em;
  margin-right: 1em;
  border: 2px solid rgb(0,0,0,0.25);
}


code {
  position: relative;
  font-size: .875em;
  font-weight: 600;
}

:deep(pre) {
  //background-color: #2c3e50;
  margin: 1em 0;
  padding: 1em;
  border: 1px solid rgb(0,0,0,0.25);
  border-radius: 10px;
  color: #fff;
  position: relative;
}

:deep(.copy-btn) {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: rgb(0,0,0,0.28);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
:deep(.copied){
  position: relative;
}

.copied {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ccc;
  border-radius: 5px;
  padding: 5px 10px;
}

#render-md{
  overflow: auto;
}

</style>