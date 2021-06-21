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
          row-key="menuUrl"
          :tree-props="{children: 'children'}"
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
            label="创建时间"
            prop="createTime"
            width="160px"
          >
            <template v-slot="scope">
              <div>{{ scope.row.createTime || '--' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
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
    <Dialog ref="dialog">
      <template #content>
        <el-form
          ref="baseForm"
          :model="menuModel"
          :rules="formRules"
          label-width="80px"
          label-position="right"
          class="padding"
        >
          <el-form-item label="上级菜单">
            <el-select
              v-model="menuModel.parentItem"
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
            prop="url"
          >
            <el-input
              v-model="menuModel.url"
              size="small"
              placeholder="请输入菜单地址"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { DialogType } from "@/components/types";
import TableMixin from "@/mixins/TableMixin";
import { uuid } from "@/utils";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "Menu",
  mixins: [TableMixin],
  data() {
    return {
      menuModel: {
        id: uuid(),
        name: "",
        parentItem: "",
        url: "",
        createTime: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入菜单地址", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.doRefresh();
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getMenuList,
        data: {},
      })
        .then(this.handleSuccess)
        .catch(console.log);
    },
    onAddItem() {
      (this.$refs.dialog as DialogType).show({ showSubmitLoading: true });
    },
  },
});
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 8px;
}
</style>

