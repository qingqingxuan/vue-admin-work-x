<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template v-slot:right>
        <el-button
          type="primary"
          size="mini"
          :icon="Plus"
          @click="onAddItem"
        >添加
        </el-button>
      </template>
    </TableHeader>
    <TableBody>
      <template #default>
        <el-table
          v-loading="tableLoading"
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
          row-key="menuUrl"
          :default-expand-all="true"
          :tree-props="{children: 'children'}"
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
              {{ scope.row.cacheable ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否固定"
          >
            <template #default="scope">
              {{ scope.row.affix ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="badge提示"
          >
            <template #default="scope">
              {{ parseInt(scope.row.tip) ? 'number' : scope.row.tip || '无' }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
          >
            <template v-slot="scope">
              <el-button
                type="text"
                size="mini"
                @click="onUpdateItem(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="mini"
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
          :model="menuModel"
          :rules="formRules"
          label-width="80px"
          label-position="right"
          class="padding"
        >
          <el-form-item label="上级菜单">
            <el-select
              v-model="menuModel.parentPath"
              size="small"
              placeholder="请输入菜单名称"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) of dataList"
                :key="index"
                :label="item.menuName"
                :value="item.menuUrl"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="菜单名称"
            prop="name"
          >
            <el-input
              v-model="menuModel.name"
              size="small"
              placeholder="请输入菜单名称"
            />
          </el-form-item>
          <el-form-item
            label="菜单地址"
            prop="path"
          >
            <el-input
              v-model="menuModel.path"
              size="small"
              placeholder="请输入菜单地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="重定向">
            <el-input
              v-model="menuModel.redirect"
              size="small"
              placeholder="请输入重定向地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="badge提示">
            <el-radio-group
              v-model="menuModel.badge"
              size="mini"
            >
              <el-radio-button label="">无</el-radio-button>
              <el-radio-button label="dot">圆点</el-radio-button>
              <el-radio-button label="new">new</el-radio-button>
              <el-radio-button label="number">数字</el-radio-button>
            </el-radio-group>
            <el-input-number
              v-model="menuModel.badgeNum"
              v-show="menuModel.badge === 'number'"
              size="mini"
              type=""
              class="margin-left-sm"
              :max="99"
              :min="1"
            />
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
          <el-form-item label="菜单图标">
            <ul
              class="icon-wrapper"
              v-infinite-scroll="loadIcon"
              :infinite-scroll-disabled="disableLoad"
            >
              <li
                v-for="item of icons"
                :key="item.name"
                class="icon-item"
                @click="selectIcon(item)"
              >
                <SvgIcon
                  :style="{'color': menuModel.icon === item.font_class ? 'red' : '#333'}"
                  :icon-class="item.font_class"
                ></SvgIcon>
                <div :style="{'color': menuModel.icon === item.font_class ? 'red' : '#333'}">{{ menuModel.icon === item.font_class ? '已选' : '选择' }}</div>
              </li>
              <p
                class="text-center"
                v-if="!disableLoad"
              >加载中...</p>
              <p
                class="text-center"
                v-else
              >没有更多了</p>
            </ul>
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
import Icons from "@/icons/iconfont/iconfont.json";
import { usePost, useDataTable } from "@/hooks";
import { getMenuList } from "@/api/url";
import { Plus } from "@element-plus/icons";

const menuModel = reactive<MenuModel>({
  id: uuid(),
  parentPath: "",
  path: "",
  name: "",
  redirect: "",
  badge: "",
  badgeNum: 1,
  cacheable: false,
  hidden: false,
  icon: "",
  affix: false,
});
const { tableLoading, tableConfig, dataList, handleSuccess } = useDataTable();
const count = ref(100);
const icons = shallowReactive(Icons.glyphs.slice(0, count.value));
const disableLoad = ref(false);
const dialogRef = ref<DialogType>();
const loadIcon = () => {
  setTimeout(() => {
    const tempIcons = Icons.glyphs.slice(count.value, (count.value += 100));
    icons.push(...tempIcons);
    disableLoad.value = icons.length === Icons.glyphs.length;
  }, 500);
};
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
  menuModel.redirect = "";
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
function selectIcon(item: any) {
  menuModel.icon = item.font_class;
}
onMounted(doRefresh);
</script>
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