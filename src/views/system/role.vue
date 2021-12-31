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
              size="mini"
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
        >
          <el-table-column align="center" label="序号" fixed="left" width="80">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="角色名称" prop="name" />
          <el-table-column align="center" label="角色编号" prop="roleCode" />
          <el-table-column align="center" label="角色描述" prop="description" />
          <el-table-column align="center" label="创建时间" prop="createTime" />
          <el-table-column align="center" label="操作" width="300px">
            <template #default="scope">
              <el-button
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                plain
                type="primary"
                size="mini"
                @click="onUpdateItem(scope.row)"
                >编辑</el-button
              >
              <el-button
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                plain
                type="danger"
                size="mini"
                @click="onDeleteItem(scope.row)"
                >删除</el-button
              >
              <el-button
                plain
                type="warning"
                size="mini"
                @click="showMenu(scope.row)"
                >菜单权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <Dialog ref="dialogRef">
      <template #content>
        <BaseForm ref="baseFormRef" :form-items="formItems" />
      </template>
    </Dialog>
    <Dialog ref="menuDialogRef" title="菜单权限">
      <template #content>
        <el-tree
          ref="tree"
          :data="menuData"
          show-checkbox
          node-key="menuUrl"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { DialogType } from "@/components/types";
import { onMounted, reactive, ref, shallowReactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { usePost } from "@/hooks";
import { getMenuListByRoleId, getRoleList } from "@/api/url";
import { useDataTable } from "@/hooks";
import { Plus } from "@element-plus/icons";
const ROLE_CODE_FLAG = "ROLE_";
const roleModel = reactive({
  id: 0,
  name: "",
  roleCode: "",
  description: "",
  createTime: "",
});
const menuData = shallowReactive<Array<any>>([]);
const defaultProps = {
  children: "children",
  label: "menuName",
};
const defaultCheckedKeys = shallowReactive<Array<any>>([]);
const defaultExpandedKeys = shallowReactive<Array<any>>([]);
const formItems = reactive([
  {
    label: "角色名称",
    type: "input",
    name: "name",
    value: "",
    maxLength: 50,
    inputType: "text",
    placeholder: "请输入角色名称",
    validator: (item: any) => {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
    reset() {
      this.value = "";
    },
  },
  {
    label: "角色编号",
    type: "input",
    name: "roleCode",
    value: "",
    maxLength: 20,
    inputType: "text",
    placeholder: "请输入角色编号",
    validator: (item: any) => {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
    reset() {
      this.value = "";
    },
  },
  {
    label: "角色描述",
    type: "input",
    name: "description",
    value: "",
    maxLength: 50,
    inputType: "text",
    placeholder: "请输入角色描述",
    validator: (item: any) => {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
    reset() {
      this.value = "";
    },
  },
]);
const menuDialogRef = ref<DialogType>();
const dialogRef = ref<DialogType>();
const baseFormRef = ref();
const tree = ref();
const post = usePost();
const { handleSuccess, dataList, tableLoading, tableConfig } = useDataTable();
function doRefresh() {
  post({
    url: getRoleList,
    data: {},
  })
    .then(handleSuccess)
    .catch(console.log);
}
function showMenu(item: RoleModel) {
  menuData.length = 0;
  defaultCheckedKeys.length = 0;
  defaultExpandedKeys.length = 0;
  post({
    url: getMenuListByRoleId,
    data: {
      roleId: item.id,
    },
  })
    .then((res) => {
      menuData.push(...res.data);
      handleRoleMenusSelected(menuData);
      menuDialogRef.value?.show(() => {
        ElMessage.success(
          "模拟菜单修改成功，数据为：" +
            JSON.stringify(tree.value.getCheckedKeys())
        );
        menuDialogRef.value?.close();
      });
    })
    .catch(console.log);
}
function onAddItem() {
  formItems.forEach((it: FormItem) => it.reset && it.reset());
  dialogRef.value?.show(() => {
    ElMessageBox.confirm(
      "角色模拟添加成功，参数为：" +
        JSON.stringify(baseFormRef.value?.generatorParams())
    );
    dialogRef.value?.close();
  });
}
function onUpdateItem(item: RoleModel) {
  formItems.forEach((it: FormItem) => {
    const typeName = it.name;
    if (typeName) {
      const typeValue = item[typeName];
      if (typeValue) {
        it.value = item[typeName];
      }
    }
  });
  dialogRef.value?.show(() => {
    ElMessageBox.confirm(
      "角色模拟修改成功，参数为：" +
        JSON.stringify(baseFormRef.value?.generatorParams())
    );
    dialogRef.value?.close();
  });
}
function onDeleteItem(item: RoleModel) {
  ElMessageBox.confirm("是否要删除此信息，删除后不可恢复？", "提示").then(
    () => {
      ElMessageBox.confirm(
        "角色模拟删除成功，参数为：" +
          JSON.stringify({
            id: item.id,
          })
      );
    }
  );
}
function handleRoleMenusSelected(menus: Array<any>) {
  menus.forEach((it: any) => {
    defaultCheckedKeys.push(it.menuUrl);
    if (it.children) {
      defaultExpandedKeys.push(it.menuUrl);
      handleRoleMenusSelected(it.children);
    }
  });
}
onMounted(doRefresh);
</script>
