<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader
          :can-collapsed="
            likeSearchModel.conditionItems &&
            likeSearchModel.conditionItems.length !== 0
          "
          :search-model="likeSearchModel.conditionItems"
          :default-collapsed-state="true"
          title="表格查询"
          @doSearch="doSearch"
          @resetSearch="resetSearch"
        />
      </template>
      <template #tableConfig>
        <TableConfig
          v-model:border="tableConfig.border"
          v-model:stripe="tableConfig.stripe"
          @refresh="doRefresh"
        >
          <template #actions>
            <el-button type="primary" size="small" icon="PlusIcon"
              >添加
            </el-button>
            <el-button type="danger" size="small" icon="DeleteIcon"
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
          :height="tableConfig.height"
        >
          <el-table-column align="center" label="序号" width="80">
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" prop="nickName" />
          <el-table-column align="center" label="头像">
            <template v-slot="scope">
              <div class="avatar-container">
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
            </template>
          </el-table-column>
          <el-table-column align="center" label="性别" prop="gender">
            <template v-slot="scope">
              <div class="gender-container flex justify-center align-center">
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
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="地址" prop="address" />
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
import { getTableList, getUserList } from "@/api/url";
import { useDataTable, useLikeSearch, usePost } from "@/hooks";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import type { TableFooter } from "@/components/types";
const tableFooter = ref<TableFooter>();
const { likeSearchModel, getSearchParams, resetSearch } = useLikeSearch();
const {
  handleSuccess,
  dataList,
  tableConfig,
  tableLoading,
  useHeight,
  offTableCollapseTransition,
} = useDataTable();
const post = usePost();
likeSearchModel.extraParams = () => ({
  ...tableFooter.value?.withPageInfoData(),
});
likeSearchModel.conditionItems = reactive([
  {
    name: "name",
    label: "用户姓名",
    value: "",
    type: "input",
    placeholder: "请输入用户姓名",
    span: 8,
  },
  {
    name: "sex",
    label: "用户姓别",
    value: "",
    type: "select",
    placeholder: "请选择用户姓别",
    selectOptions: [
      {
        label: "男",
        value: 0,
      },
      {
        label: "女",
        value: 1,
      },
    ],
    span: 8,
  },
]);
const doSearch = () => {
  const params = getSearchParams();
  ElMessageBox.alert(`模拟模糊搜索成功，搜索参数为：${JSON.stringify(params)}`);
};
function doRefresh() {
  post({
    url: getUserList,
    data: {
      ...tableFooter.value?.withPageInfoData(),
      ...getSearchParams(),
    },
  })
    .then(handleSuccess)
    .then((res: any) => {
      tableFooter.value?.setTotalSize(res.totalSize);
    })
    .catch(console.log);
}
onMounted(() => {
  doRefresh();
  useHeight();
});
onBeforeMount(offTableCollapseTransition);
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
