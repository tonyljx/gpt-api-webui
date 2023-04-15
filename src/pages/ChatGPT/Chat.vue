 
<template>
    <div class="parent-container">
        <div class="left-column">
            
        <p>hello</p>

        </div>
        <div class="right-column">

          <el-slider v-model="size" />

          <el-space wrap :size="size">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>中英翻译</span>
<!--                  <el-button class="button" text>选取</el-button>-->
                  <button class="choose-button">选取</button>
                </div>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>

            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>中英翻译</span>
<!--                  <el-button class="button"  color="green" text>选取</el-button>-->
                </div>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>


          </el-space>

        </div>

    </div>
</template>

 
<script setup>
 import {ref} from 'vue'
 const size = ref(20);

//  增加背景选取后阴影变化


</script>

<style scoped>
.parent-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 16px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /*width: 480px;*/
  width: 250px;
  background: rgba(255,222,82,0.71);
}

.choose-button{
  font-size: 15px;
  border-radius: 10px;
  background: lightcyan;
  cursor: pointer;
}

.choose-button:hover{
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
}



</style>