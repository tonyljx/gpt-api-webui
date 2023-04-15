
<template>

  <main class="main-page">
    <section class="chat-page">
      <div class="message-container" >
        <div :class="dialog.classType" v-for="dialog in datas">
          <div class="message-content">{{dialog.content}}</div>
          <div class="chatbox-arrow"></div>
        </div>
      </div>

      <input type="text" class="chatbox"  v-model="inputData" @keyup.enter="sendMessage" >
      <button @click="sendMessage" :disabled=" !inputData.length>0 " >发送</button>
    </section>

    <section class="prompt-page">
      <div>this is a prompt</div>
    </section>
  </main>


</template>

<script setup>
import {ref} from "vue";

const inputData=ref('');

const datas = ref([
  {
    content: "I ask a question",
    classType: 'ask'
  },
  {
    content: "GPT answer a question",
    classType: 'answer'
  },
]);

function sendMessage() {
  const newMessage= {
    content: inputData.value,
    classType: 'ask',
  }
  datas.value.push(newMessage);
  inputData.value='';
}

</script>


<style scoped>

/*父容器设置成flex 子容器设置flex和flex-basis 使得内容是50% 50%的展示 */
.main-page{
  display: flex;

}

.chat-page{
  flex: 1;
  flex-basis: 0;
  margin-right: 1em;
  background-color: #F0F0F0;
}

.prompt-page{
  flex: 1;
  flex-basis: 0;
}

/* 设置内容是左右分割的 */
.message-container{
  display: flex;
  flex-direction: column;
}

.ask{
  align-self: flex-end;
  /*outline: 0.5em solid #95d475;*/
  /*padding: 0; */
  background-color: #95d475;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.answer{
  align-self: flex-start;
  /*outline: 0.5em solid #333333;*/
  /*box-shadow: inset 0 0 10px #333333;*/
  background-color: #333333;
  border-radius: 3px ;
  padding: 10px;
}

.ask .message-content{
  background-color: #95d475;

}

.answer .message-content{
  background-color: #333333;
  color: #FFFFFF;
}

.answer:before,.answer:after {
  content: "";
  display: block;
  position: absolute;
  width:0;
  height: 0;
  border: 6px solid transparent;
  border-right-color: #333333;
  left: -11px;
  transform: translateY(-50%);
  top: 50%;
}

.ask:before,.ask:after {
  content: "";
  display: block;
  position: absolute;
  width:0;
  height: 0;
  border: 6px solid transparent;
  border-left-color: #95d475;
  transform: translateY(-50%);
  right: -10px;
  top: 50%;
}


/*输入输出*/
input{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  width: 12rem;
  padding: 1rem 1em;
  margin-right: 1rem;
}

/* 从vue-udemy 借鉴 */
button{
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 1rem;
  border-radius: 12px;
  margin: 1rem;
  width: 8rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

</style>