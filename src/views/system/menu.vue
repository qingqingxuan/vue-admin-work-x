<template>
  <div class="main-container">
    <TableBody>
      <template #tableConfig>
        <TableConfig
          v-model:border="tableConfig.border"
          v-model:stripe="tableConfig.stripe"
          @refresh="doRefresh"
        >
          <template #actions>
            <el-button
              type="primary"
              size="small"
              icon="PlusIcon"
              @click="onAddItem"
            >添加
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
          row-key="menuUrl"
          :tree-props="{ children: 'children' }"
        >
          <el-table-column
            align="center"
            label="序号"
            fixed="left"
            width="150"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="菜单名称"
            prop="menuName"
          />
          <el-table-column
            align="center"
            label="菜单地址"
            prop="menuUrl"
          />
          <el-table-column
            align="center"
            label="图标"
            prop="menuUrl"
          >
            <template #default="scope">
              <el-icon
                v-if="scope.row.icon"
                size="20"
                style="font-size: 16px"
                color="var(--el-color-primary)"
              >
                <component :is="scope.row.icon" />
              </el-icon>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否缓存"
          >
            <template #default="scope">
              <el-tag
                :type="scope.row.cacheable ? '' : 'danger'"
                size="small"
              >{{ scope.row.cacheable ? "是" : "否" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否固定"
          >
            <template #default="scope">
              <el-tag
                :type="scope.row.affix ? '' : 'danger'"
                size="small"
              >{{ scope.row.affix ? "是" : "否" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="badge提示"
          >
            <template #default="scope">
              <div class="menu-badge__wrapper">
                <el-badge
                  :value="
                    parseInt(scope.row.tip)
                      ? parseInt(scope.row.tip)
                      : scope.row.tip
                  "
                  :is-dot="scope.row.tip === 'dot'"
                >
                </el-badge>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="200"
            label="操作"
            fixed="right"
          >
            <template v-slot="scope">
              <el-button
                plain
                type="primary"
                size="small"
                @click="onUpdateItem(scope.row)"
              >编辑</el-button>
              <el-button
                plain
                type="danger"
                size="small"
                @click="onDeleteItem(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <Dialog ref="dialogRef">
      <template #content>
        <el-form
          class="base-form-container"
          :model="menuModel"
          label-width="80px"
          label-position="right"
        >
          <el-form-item label="上级菜单">
            <TreeSelector
              v-model:value="menuModel.parentPath"
              placeholder="请选择上级菜单"
              :data="dataList"
              :dataFields="{
                label: 'menuName',
                value: 'menuUrl',
                children: 'children',
              }"
            />
          </el-form-item>
          <el-form-item
            label="菜单名称"
            prop="name"
          >
            <el-input
              v-model="menuModel.name"
              placeholder="请输入菜单名称"
            />
          </el-form-item>
          <el-form-item
            label="菜单地址"
            prop="path"
          >
            <el-input
              v-model="menuModel.path"
              placeholder="请输入菜单地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="外链地址">
            <el-input
              v-model="menuModel.outLink"
              placeholder="请输入外链地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="badge提示">
            <el-radio-group
              v-model="menuModel.badge"
              size="small"
            >
              <el-radio-button label="">无</el-radio-button>
              <el-radio-button label="dot">圆点</el-radio-button>
              <el-radio-button label="new">new</el-radio-button>
              <el-radio-button label="number">数字</el-radio-button>
            </el-radio-group>
            <el-input-number
              v-model="menuModel.badgeNum"
              v-show="menuModel.badge === 'number'"
              class="margin-left-sm"
              :max="99"
              :min="1"
            />
          </el-form-item>
          <el-form-item label="菜单图标">
            <IconSelector v-model:value="menuModel.icon" />
          </el-form-item>
          <el-form-item label="是否缓存">
            <el-switch v-model="menuModel.cacheable" />
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-switch v-model="menuModel.hidden" />
          </el-form-item>
          <el-form-item label="是否固定">
            <el-switch v-model="menuModel.affix" />
          </el-form-item>
        </el-form>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { DialogType } from "@/components/types";
import { uuid } from "@/utils";
import { onMounted, reactive, ref, shallowReactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { usePost, useDataTable } from "@/hooks";
import { getMenuList } from "@/api/url";
import { Plus } from "@element-plus/icons";

const menuModel = reactive<MenuModel>({
  id: uuid(),
  parentPath: "",
  path: "",
  name: "",
  outLink: "",
  badge: "",
  badgeNum: 1,
  cacheable: false,
  hidden: false,
  icon: "",
  affix: false,
});
const { tableLoading, tableConfig, dataList, handleSuccess } = useDataTable();
const disableLoad = ref(false);
const dialogRef = ref<DialogType>();
const menuList = ref([]);
const post = usePost();
function doRefresh() {
  post({
    url: getMenuList,
    data: {},
  })
    .then(handleSuccess)
    .catch(console.log);
}
function onAddItem() {
  menuModel.id = uuid();
  menuModel.parentPath = "";
  menuModel.path = "";
  menuModel.name = "";
  menuModel.outLink = "";
  menuModel.badge = "";
  menuModel.badgeNum = 1;
  menuModel.cacheable = false;
  menuModel.hidden = false;
  menuModel.icon = "";
  menuModel.affix = false;
  dialogRef.value?.show(() => {
    ElMessageBox.confirm(
      "模拟数据添加成功，参数为：\n" + JSON.stringify(menuModel)
    );
    dialogRef.value?.close();
  });
}
function onUpdateItem(item: any) {
  menuModel.id = uuid();
  menuModel.parentPath = item.parentPath;
  menuModel.path = item.menuUrl;
  menuModel.name = item.menuName;
  menuModel.badge = parseInt(item.tip) ? "number" : item.tip;
  menuModel.badgeNum = parseInt(item.tip);
  menuModel.icon = item.icon || "";
  dialogRef.value?.show(() => {
    ElMessageBox.confirm(
      "模拟数据修改成功，参数为：" + JSON.stringify(menuModel)
    );
    dialogRef.value?.close();
  });
}
function onDeleteItem(item: any) {
  ElMessageBox.confirm("是否要删除此数据？").then(() => {
    ElMessageBox.confirm("模拟删除成功，参数为：" + JSON.stringify(item));
  });
}
onMounted(doRefresh);
</script>
<style>
.menu-badge__wrapper sup {
  top: inherit;
}
</style>
<style lang="scss" scoped>
.icon-wrapper {
  list-style: none;
  border: 1px solid #f5f5f5;
  overflow: hidden;
  padding: 0;
  .icon-item {
    float: left;
    width: 25%;
    font-size: 26px;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    cursor: pointer;
    & > div {
      font-size: 12px;
    }
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
