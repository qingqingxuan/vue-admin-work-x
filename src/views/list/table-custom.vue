<template>
  <div class="main-container">
    <TableBody>
      <template #tableConfig>
        <TableConfig
          v-model:border="tableConfig.border"
          v-model:stripe="tableConfig.stripe"
          v-model:tableColumns="tableProps"
          @refresh="doRefresh"
        >
          <template #actions>
            <el-button type="primary" size="mini" icon="PlusIcon"
              >添加
            </el-button>
            <el-button type="danger" size="mini" icon="DeleteIcon"
              >删除
            </el-button>
          </template>
        </TableConfig>
      </template>
      <template #default>
        <el-table
          v-loading="tableLoading"
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column align="center" label="序号" width="80">
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) of tableProps"
            :key="index"
            align="center"
            :prop="item.prop"
            :label="item.title"
          >
            <template #default="scope">
              <div
                v-if="item.prop === 'gender'"
                class="gender-container flex justify-center align-center"
              >
                <img
                  class="gender-icon"
                  :src="
                    scope.row.gender === 0
                      ? require('@/assets/icon_sex_man.png')
                      : require('@/assets/icon_sex_woman.png')
                  "
                />
                <span>{{ scope.row.gender === 0 ? "男" : "女" }}</span>
              </div>
              <div v-else-if="item.prop === 'vip'" class="avatar-container">
                <el-image
                  :src="require('@/assets/img_avatar_default.png')"
                  class="avatar"
                  :class="{ 'avatar-vip': scope.row.vip === 1 }"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
              <div v-else>{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template v-slot="scope">
              <el-button type="text" @click="onDeleteItem(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #footer>
        <TableFooter
          ref="tableFooter"
          @refresh="doRefresh"
          @pageChanged="doRefresh"
        />
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { showConfirmBox, showErrorMessage } from "@/components/types";
import { useDataTable, usePost } from "@/hooks";
import { getTableList } from "@/api/url";
import type { TableFooter } from "@/components/types";
import _ from "lodash";

const {
  handleSuccess,
  selectRows,
  dataList,
  tableConfig,
  tableLoading,
  handleSelectionChange,
} = useDataTable();
const post = usePost();

const tableProps = ref([
  {
    title: "姓名",
    prop: "nickName",
    checked: true,
  },
  {
    title: "头像",
    prop: "vip",
    checked: true,
  },
  {
    title: "性别",
    prop: "gender",
    checked: true,
  },
  {
    title: "地址",
    prop: "address",
    checked: true,
  },
]);
const userModel = reactive({
  address: "",
  avatar: "",
  gender: 1,
  id: 1,
  lastLoginIp: "",
  lastLoginTime: "",
  nickName: "",
  status: 0,
  vip: 1,
});
const tableFooter = ref<TableFooter>();
function doRefresh() {
  post({
    url: getTableList,
    data: tableFooter.value?.withPageInfoData(),
  })
    .then(handleSuccess)
    .then((res: any) => {
      tableFooter.value?.setTotalSize(res.totalSize);
    })
    .catch(console.log);
}
function onDeleteItem(item: any) {
  if (item) {
    showConfirmBox("是否要删除此数据，删除后不恢复？").then(() => {
      showConfirmBox("模拟删除成功，参数为：" + item.id);
    });
  } else {
    if (!_.isEmpty(selectRows)) {
      showConfirmBox("是否要删除此数据项，删除后不恢复？").then(() => {
        showConfirmBox(
          "模拟删除成功，参数为：" +
            JSON.stringify({
              ids: selectRows.map((it: any) => it.id).join(","),
            })
        );
      });
    } else {
      showErrorMessage("请选择要删除的数据项");
    }
  }
}
onMounted(doRefresh);
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
    height: 100%;
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
