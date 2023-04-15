<template>
    <div class="box" :style="{width:width+'px'}"></div>
    <button @click="change">Bigger</button>
    <button @click="reset">Reset</button>

   <button @click="toggle">click</button>
    <transition name="fade">
      <h1 v-if="showTitle">你好 Vue 3</h1>
    </transition>
</template>

<script setup>
import {ref} from "vue";
let width=ref(100);
let showTitle=ref(true)
function change() {
  width.value+=100;
}
function reset() {
  width.value=100;
}
function toggle(){  showTitle.value = !showTitle.value}


</script>

<style scoped>

.box{
  background: yellowgreen;
  height: 100px;
  transition: width 1s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>