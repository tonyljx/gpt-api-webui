<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
          <el-menu-item index="0">LOGO</el-menu-item>

          <div class="flex-grow" />
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-sub-menu>
        </el-menu>

      </el-header>
      <el-main>内容待补充</el-main>
    </el-container>
  </div>

</template>

<script setup>
    import {ref} from "vue";

    const activeIndex = ref('1');
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>