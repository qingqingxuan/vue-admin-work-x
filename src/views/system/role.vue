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
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                type="text"
                size="mini"
                @click="showMenu(scope.row)"
              >菜单权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <!-- <Dialog ref="dialog">
      <template>
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
        />
      </template>
    </Dialog>
    <Dialog
      ref="menuDialog"
      title="菜单权限"
      :submit-button="true"
    >
      <template>
        <el-tree
          :data="menuData"
          show-checkbox
          node-key="menuUrl"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
        />
      </template>
    </Dialog> -->
  </div>
</template>

<script lang="ts">
import TableMixin from "@/mixins/TableMixin";
import { currentDate, uuid } from "@/utils";
import { defineComponent } from "@vue/runtime-core";
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
      menuData: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      defaultCheckedKeys: [],
      defaultExpandedKeys: [],
    };
  },
  computed: {
    // formItems() {
    //   return formBuilder()
    //     .formItem({
    //       label: "角色名称",
    //       type: "input",
    //       name: "name",
    //       value: this.roleModel.name,
    //       maxLength: 50,
    //       inputType: "text",
    //       placeholder: "请输入角色名称",
    //       validator: ({ value, placeholder }) => {
    //         if (!value) {
    //           this.$errorMsg(placeholder);
    //           return false;
    //         }
    //         return true;
    //       },
    //     })
    //     .formItem({
    //       label: "角色编号",
    //       type: "input",
    //       name: "roleCode",
    //       value: this.roleModel.roleCode,
    //       maxLength: 20,
    //       inputType: "text",
    //       placeholder: "请输入角色编号",
    //       validator: ({ value, placeholder }) => {
    //         if (!value) {
    //           this.$errorMsg(placeholder);
    //           return false;
    //         }
    //         return true;
    //       },
    //     })
    //     .formItem({
    //       label: "角色描述",
    //       type: "input",
    //       name: "description",
    //       value: this.roleModel.description,
    //       maxLength: 50,
    //       inputType: "text",
    //       placeholder: "请输入角色描述",
    //       validator: ({ value, placeholder }) => {
    //         if (!value) {
    //           this.$errorMsg(placeholder);
    //           return false;
    //         }
    //         return true;
    //       },
    //     })
    //     .build().formItems;
    // },
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
    showMenu(item: any) {
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
          // this.handleRoleMenusSelected(this.menuData);
          // this.$refs.menuDialog.show({
          //   onConfirmCallback: (cb) => {
          //     cb && cb();
          //     this.$successMsg("模拟菜单修改成功");
          //     this.$refs.menuDialog.close();
          //   },
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // handleRoleMenusSelected(menus) {
    //   menus.forEach((it) => {
    //     if (it.isSelect) {
    //       this.defaultCheckedKeys.push(it.menuUrl);
    //     }
    //     if (it.children) {
    //       this.defaultExpandedKeys.push(it.menuUrl);
    //       this.handleRoleMenusSelected(it.children);
    //     }
    //   });
    // },
  },
});
</script>
