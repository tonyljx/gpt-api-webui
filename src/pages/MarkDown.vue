<template>
  <div class="main">
    <textarea v-model="markdown"></textarea>
    <div  id="render-md" v-html="render_html"></div>
  </div>
<!--  <button @click="info">click me</button>-->
</template>

<script setup>
import {marked} from "marked";
import {computed, onMounted, ref, watch} from "vue";
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

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
  background-color: #2c3e50;
  margin: 1em 0;
  padding: 1em;
  border: 1px solid rgb(0,0,0,0.25);
  border-radius: 10px;
  color: #fff;
}

.copy-btn {
  //position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
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