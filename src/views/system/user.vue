<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template v-slot:right>
        <el-button
          type="danger"
          size="mini"
          :icon="Delete"
          @click="onDeleteItems"
        >删除
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #default>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            align="center"
            label="序号"
            width="80"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="nickName"
          />
          <el-table-column
            align="center"
            label="头像"
          >
            <template v-slot="scope">
              <div class="avatar-container">
                <el-image
                  :src="require('@/assets/img_avatar_01.jpeg')"
                  class="avatar"
                  :class="{'avatar-vip' : scope.row.vip === 1}"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="性别"
            prop="gender"
          >
            <template v-slot="scope">
              <div class="gender-container flex justify-center align-center">
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="地址"
            prop="address"
          />
          <el-table-column
            align="center"
            label="上次登录时间"
            prop="lastLoginTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="上次登录IP"
            prop="lastLoginIp"
            width="130px"
          />
          <el-table-column
            align="center"
            label="状态"
          >
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template v-slot="scope">
              <el-button
                type="text"
                @click="onDeleteItem(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <TableFooter
      ref="tableFooter"
      @refresh="doRefresh"
      @pageChanged="doRefresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDataTable, usePost } from "@/hooks";
import { onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getTableList } from "@/api/url";
import type { TableFooter } from "@/components/types";
import { Delete } from "@element-plus/icons";

const post = usePost();
const {
  dataList,
  tableLoading,
  tableConfig,
  handleSuccess,
  handleSelectionChange,
} = useDataTable();
const tableFooter = ref<TableFooter>();
onMounted(doRefresh);

function doRefresh() {
  post({
    url: getTableList,
    data: tableFooter.value?.withPageInfoData(),
  })
    .then((res) => {
      return handleSuccess(res);
    })
    .then((res: any) => {
      tableFooter.value?.setTotalSize(res.totalSize);
    })
    .catch((error) => {
      console.log(error);
    });
}
function onDeleteItems() {
  ElMessageBox.confirm("确定要删除这些数据吗？", "提示")
    .then(() => {
      ElMessage.success("数据模拟删除成功");
    })
    .catch(console.log);
}
function onDeleteItem(item: any) {
  ElMessageBox.confirm("确定要删除此数据吗？", "提示")
    .then(() => {
      dataList.splice(dataList.indexOf(item), 1);
    })
    .catch(console.log);
}
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
    border-radius: 50%;
  }
  .avatar-vip {
    border: 2px solid #cece1e;
  }
  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}
.gender-container {
  .gender-icon {
    width: 20px;
  }
}
</style>
