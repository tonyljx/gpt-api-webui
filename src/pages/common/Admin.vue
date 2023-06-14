<template>
  <div class="container">
    <nav>
      <el-col>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>待添加</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </nav>

    <el-table :data="userData" stripe class="table">
      <el-table-column fixed sortable prop="id" label="用户ID" width="100" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column prop="status_name" label="用户状态" width="100" />
      <el-table-column prop="role_name" label="用户角色" />
      <el-table-column prop="is_delete" label="是否删除" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default>
          <el-button type="primary" size="small" @click="handleDetail">查看详情</el-button>
          <el-button size="small" type="danger" @click="handleDeactivate">封禁用户</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>

import {
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import myAxios from "@/api/axios";
const userData = ref([])
import { ElMessageBox } from 'element-plus'

onMounted(() => {
  myAxios.post(`/api/users/get`, {
    admin_id: 3
  })
    .then(function (response) {
      if (response.isAxiosError) {
        // 响应状态码不在 200-299 范围内
        console.error('请求失败：', response.status);
      } else {
        console.log(response.data)
        userData.value = mapUsers(response.data?.users);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
})

function mapUsers(users) {
  return users.map(function (user) {
    // 根据 user_role 属性进行判断
    if (user.user_role === 0) {
      user.role_name = '普通用户';
    } else if (user.user_role === 1) {
      user.role_name = '管理员';
    } else {
      user.role_name = '未知角色';
    }

    // 根据 status 属性进行判断
    if (user.status === 0 || user.status === null) {
      user.status_name = '注册';
    } else if (user.status === 1) {
      user.status_name = '正常';
    } else if (user.status === 2) {
      user.status_name = '封禁';
    } else {
      user.status_name = '未知状态';
    }

    // 根据 is_delete 属性进行判断
    if (user.is_delete === 0) {
      user.is_deleted = false;
    } else if (user.is_delete === 1) {
      user.is_deleted = true;
    } else {
      user.is_deleted = null;
    }

    return user;
  });
}

// todo
function handleDetail() {
  ElMessageBox.alert('正在升级该功能', '查看详情', {
    confirmButtonText: '确认',
  })
}

// todo
function handleDeactivate() {
  ElMessageBox.alert('正在升级该功能', '封禁', {
    confirmButtonText: '确认',
  })
}

</script>

<style scoped>
.container {
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 6fr;
  column-gap: 2rem;
  padding: 2.4rem;
}

.table {
  margin: 2.4rem 2.4 rem;
}
</style>