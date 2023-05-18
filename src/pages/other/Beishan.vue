<script setup>

import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

let tableItem = {
    date: "2023-05-20", // 日期
    name: "蔡佳音", // 姓名
    phone: "13128900696", // 电话
    address: "北京市海淀区清河街道" // 地址
}

let tableData = ref(Array.from({ length: 20 })
    .fill(tableItem))

tableData.value =  tableData.value.map((x, i) => {
        return { id: i + 1, ...x };
});


let menus = [
    {
        text: "服务管理",
        icon: "house",
        subMenus: [{ text: "服务信息" }, { text: "新增" }] // 子菜单列表
    },
    {
        text: "产品管理",
        icon: "el-icon-menu",
        subMenus: [{ text: "产品信息" }]
    },
    {
        text: "日志信息",
        icon: "el-icon-message"
    }
]

menus = menus.map((x, i) => {
    return {
        ...x,
        // 子菜单就拼接${父菜单index}-${子菜单index}
        subMenus: (x.subMenus || []).map((y, j) => {
            return { ...y, index: `${i}-${j}` };
        }),
        // 父菜单就把 index 加上好了
        index: `${i}`
    };
});


function addTableItem(item = {}) {
    // 添加到列表中，同时自增 id
    tableData.value.push({ ...item, id: this.tableData.length + 1 });
}

function deleteTableItem(id) {
    // console.log("删除: "+id);
    // 查找到对应的索引，然后删除
    const index = tableData.value.findIndex(x => x.id === id);
    // console.log(typeof(tableData.value));
    tableData.value.splice(index, 1);
}

// 移动一个数据
function moveTableItem(id, direction) {
    const dataLength = this.tableData.length;
    // 查找到对应的索引，然后取出，再插入
    const index = this.tableData.findIndex(x => x.id === id);
    switch (direction) {
        // 上移
        case "up":
            if (index > 0) {
                // 第一个不进行上移
                const item = this.tableData.splice(index, 1)[0];
                tableData.value.splice(index - 1, 0, item);
            }
            break;
        // 下移
        case "down":
            if (index < dataLength - 1) {
                // 最后一个不进行下移
                const item = this.tableData.splice(index, 1)[0];
                tableData.value.splice(index + 1, 0, item);
            }
            break;
    }
}

</script>

<template>
    <el-container class="layout-container-demo">
        <el-aside width="200px">
            <el-scrollbar>
                <!-- 顺便调整了下颜色 -->
                <el-menu :default-openeds="['0', '1']" class="el-menu-vertical-demo" background-color="#545c64"
                    text-color="#fff" active-text-color="#ffd04b" >
                    <!-- 遍历生成父菜单选项 -->
                    <template v-for="menu in menus">
                        <!-- 有子菜单的时候，就用 el-submenu，再绑个序号 index -->
                        <el-sub-menu v-if="menu.subMenus && menu.subMenus.length" :index="menu.index" :key="menu.index">
                            <template #title>
                                <span slot="title">{{ menu.text }}</span>
                            </template>
                            <el-menu-item-group>
                                <!-- 子菜单也要遍历，同时绑上子菜单名称 text，也要绑个序号 index -->
                                <el-menu-item v-for="subMenu in menu.subMenus" :key="subMenu.index"
                                    :index="subMenu.index">{{ subMenu.text }}</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <!-- 没子菜单的时候，就用 el-menu-item，也要绑个序号 index -->
                        <el-menu-item v-else :index="menu.index">
                            <span>{{ menu.text }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>


            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>Tom</span>
                </div>
            </el-header>

            <el-main>
                <el-scrollbar>
                    <el-table :data="tableData">
                        <el-table-column prop="id" label="index" width="140" />
                        <el-table-column prop="date" label="Date" width="140" />
                        <el-table-column prop="name" label="Name" width="120" />
                        <el-table-column prop="phone" label="Phone" width="120" />
                        <el-table-column prop="address" label="Address" />

                        <!-- 该列固定在右侧，表头名称操作 -->
                        <el-table-column fixed="right" label="操作" width="300" v-slot="scope" >
                            <!-- 添加了个删除按钮，绑定了前面定义的删除事件 deleteTableItem，传入参数 id -->
                            <el-button @click="deleteTableItem(scope.row.id)" type="danger" size="small">删除</el-button>
                            <!-- 分别添加了上移和下移按钮，绑定了前面定义的移动事件 moveTableItem，传入参数 id 和移动方向 -->
                            <el-button @click="moveTableItem(scope.row.id, 'up')" size="small">上移</el-button>
                            <el-button @click="moveTableItem(scope.row.id, 'down')" size="small">下移</el-button>
                        </el-table-column>


                    </el-table>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
  
 
  
<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>
  