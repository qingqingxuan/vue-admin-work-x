<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template v-slot:right>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="onAddItem"
        >添加
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
        >
          <el-table-column
            align="center"
            label="序号"
            fixed="left"
            width="80"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="角色名称"
            prop="name"
          />
          <el-table-column
            align="center"
            label="角色编号"
            prop="roleCode"
          />
          <el-table-column
            align="center"
            label="角色描述"
            prop="description"
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="createTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="操作"
          >
            <template v-slot="scope">
              <el-button
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                type="text"
                size="mini"
                @click="onUpdateItem(scope.row)"
              >编辑</el-button>
              <el-button
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                type="text"
                size="mini"
                @click="onDeleteItem(scope.row)"
              >删除</el-button>
              <el-button
                type="text"
                size="mini"
                @click="showMenu(scope.row)"
              >菜单权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <Dialog ref="dialog">
      <template #content>
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
        />
      </template>
    </Dialog>
    <Dialog
      ref="menuDialog"
      title="菜单权限"
    >
      <template #content>
        <el-tree
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

<script lang="ts">
import type { BaseForm, DialogType } from "@/components/types";
import TableMixin from "@/mixins/TableMixin";
import { defineComponent } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
const ROLE_CODE_FLAG = "ROLE_";
export default defineComponent({
  name: "Role",
  mixins: [TableMixin],
  data() {
    return {
      roleModel: {
        id: 0,
        name: "",
        roleCode: "",
        description: "",
        createTime: "",
      },
      menuData: [] as Array<any>,
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      defaultCheckedKeys: [] as Array<any>,
      defaultExpandedKeys: [] as Array<any>,
      formItems: [
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
      ],
    };
  },
  mounted() {
    this.doRefresh();
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getRoleList,
        data: {},
      })
        .then(this.handleSuccess)
        .catch(console.log);
    },
    showMenu(item: RoleModel) {
      this.$post({
        url: this.$urlPath.getAllMenuByRoleId,
        data: {
          roleId: item.id,
        },
      })
        .then((res) => {
          this.menuData = res.data;
          this.defaultCheckedKeys = [];
          this.defaultExpandedKeys = [];
          this.handleRoleMenusSelected(this.menuData);
          (this.$refs.menuDialog as DialogType)
            .show()
            .then((component: DialogType) => {
              ElMessage.success("模拟菜单修改成功");
              component.close();
            });
        })
        .catch(console.log);
    },
    onAddItem() {
      this.formItems.forEach((it: FormItem) => it.reset && it.reset());
      (this.$refs.dialog as any)
        .show({ showSubmitLoading: true })
        .then((component: DialogType) => {
          ElMessageBox.confirm(
            "角色模拟添加成功，参数为：" +
              JSON.stringify(
                (this.$refs.baseForm as BaseForm).generatorParams(),
              ),
          );
          component.close();
        });
    },
    onUpdateItem(item: RoleModel) {
      this.formItems.forEach((it: FormItem) => {
        const typeName = it.name;
        if (typeName) {
          const typeValue = item[typeName];
          if (typeValue) {
            it.value = item[typeName];
          }
        }
      });
      (this.$refs.dialog as any)
        .show({ showSubmitLoading: true })
        .then((component: DialogType) => {
          ElMessageBox.confirm(
            "角色模拟修改成功，参数为：" +
              JSON.stringify(
                (this.$refs.baseForm as BaseForm).generatorParams(),
              ),
          );
          component.close();
        });
    },
    onDeleteItem(item: RoleModel) {
      ElMessageBox.confirm("是否要删除此信息，删除后不可恢复？", "提示").then(
        () => {
          ElMessageBox.confirm(
            "角色模拟删除成功，参数为：" +
              JSON.stringify({
                id: item.id,
              }),
          );
        },
      );
    },
    handleRoleMenusSelected(menus: Array<any>) {
      menus.forEach((it: any) => {
        if (it.isSelect) {
          this.defaultCheckedKeys.push(it.menuUrl);
        }
        if (it.children) {
          this.defaultExpandedKeys.push(it.menuUrl);
          this.handleRoleMenusSelected(it.children);
        }
      });
    },
  },
});
</script>
