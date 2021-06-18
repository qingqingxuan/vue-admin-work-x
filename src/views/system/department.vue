<template>
  <div class="main-container">
    <TableHeader ref="tableHeader">
      <template #right>
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
          row-key="id"
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
            label="部门名称"
            prop="name"
          />
          <el-table-column
            align="center"
            label="部门编号"
            prop="depCode"
          />
          <el-table-column
            align="center"
            label="排序"
            prop="order"
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
                type="text"
                @click="onUpdateItem(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="onDeleteItem(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <Dialog ref="dialog">
      <template #content>
        <BaseForm :form-items="formItems"></BaseForm>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Dialog from "@/components/common/Dialog.vue";
import TableMixin from "@/mixins/TableMixin";
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
const DP_CODE_FLAG = "dp_code_";
export default defineComponent({
  name: "Department",
  mixins: [TableMixin],
  mounted() {
    this.doRefresh();
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getDepartmentList,
      }).then((res) => {
        this.handleSuccess({ data: res.data });
      });
    },
    onAddItem() {
      (this.$refs.dialog as any)
        .show({ showSubmitLoading: true })
        .then((res: any) => {
          res.close();
        });
    },
  },
  setup() {
    const dialog = ref<InstanceType<typeof Dialog>>();
    const formItems = reactive([
      {
        label: "部门名称",
        type: "input",
        name: "name",
        value: "",
        maxLength: 50,
        inputType: "text",
        placeholder: "请输入部门名称",
        validator: (value: any) => {
          if (!value) {
            ElMessage.error(value.placeholder);
            return false;
          }
          return true;
        },
      },
      {
        label: "部门编号",
        type: "input",
        name: "depCode",
        value: "",
        maxLength: 10,
        inputType: "text",
        placeholder: "请输入部门编号",
        validator: (value: any) => {
          if (!value) {
            ElMessage.error(value.placeholder);
            return false;
          }
          return true;
        },
      },
      {
        label: "部门状态",
        type: "radio-group",
        name: "status",
        value: "",
        radioOptions: [
          {
            label: "正常",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ],
      },
    ]);
    const onUpdateItem = (item: any) => {
      formItems.forEach((it) => {
        const propName = item[it.name];
        if (propName) {
          if (it.name === "depCode") {
            it.value = propName.replace(DP_CODE_FLAG, "");
          } else {
            it.value = propName;
          }
        }
      });
      dialog.value?.show().then((component: typeof Dialog) => {
        formItems.forEach((it) => {
          const propName = item[it.name];
          if (propName) {
            if (it.name === "depCode") {
              item[it.name] = DP_CODE_FLAG + it.value;
            } else {
              item[it.name] = it.value;
            }
          }
        });
        component.close();
      });
    };
    return {
      formItems,
      onUpdateItem,
      dialog,
    };
  },
});
</script>
