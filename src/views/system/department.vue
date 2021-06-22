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
            v-for="item of tableColumns"
            :key="item.props"
            :label="item.label"
            :prop="item.prop"
            align="center"
          >
            <template
              v-if="item.prop === 'status'"
              v-slot="scope"
            >
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
            <template
              v-else-if="item.prop === 'actions'"
              v-slot="scope"
            >
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
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
        ></BaseForm>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { post } from "@/api/http";
import { getDepartmentList } from "@/api/url";
import type { BaseForm, DialogType } from "@/components/types";
import { TableSetup } from "@/mixins/TableMixin";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import _ from "lodash";
interface Department {
  parentId: number;
  id: number;
  name: string;
  depCode: string;
  order: number;
  status: number;
  children: Array<Department>;
}
const DP_CODE_FLAG = "dp_code_";
export default defineComponent({
  name: "Department",
  setup() {
    const tableColumns = reactive([
      {
        label: "部门名称",
        prop: "name",
      },
      {
        label: "部门编号",
        prop: "depCode",
      },
      {
        label: "排序",
        prop: "order",
      },
      {
        label: "状态",
        prop: "status",
      },
      {
        label: "操作",
        prop: "actions",
      },
    ]);
    const dialog = ref<DialogType>();
    const baseForm = ref<BaseForm>();
    const tableSetup = TableSetup();
    const parentFormItem = {
      label: "上级部门",
      type: "select",
      name: "parentId",
      value: "",
      placeholder: "请选择上级部门",
      selectOptions: {},
      reset() {
        this.value = "";
      },
    };
    const depCodeFormItem = {
      label: "部门编号",
      type: "input",
      name: "depCode",
      value: "",
      maxLength: 10,
      disabled: false,
      inputType: "text",
      placeholder: "请输入部门编号",
      validator: (item: any) => {
        if (!item.value) {
          ElMessage.error(item.placeholder);
          return false;
        }
        return true;
      },
      reset() {
        this.value = "";
        this.disabled = false;
      },
    };
    const formItems = reactive([
      parentFormItem,
      {
        label: "部门名称",
        type: "input",
        name: "name",
        value: "",
        maxLength: 50,
        inputType: "text",
        placeholder: "请输入部门名称",
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
      depCodeFormItem,
      {
        label: "部门状态",
        type: "radio-group",
        name: "status",
        value: 1,
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
        reset() {
          this.value = 1;
        },
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
      depCodeFormItem.disabled = true;
      dialog.value
        ?.show({ showSubmitLoading: true })
        .then((component: DialogType) => {
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
    const doRefresh = () => {
      post({
        url: getDepartmentList,
      }).then(tableSetup.handleSuccess);
    };
    onMounted(doRefresh);
    function filterItems(srcArray: Array<Department>, filterItem: Department) {
      for (let index = 0; index < srcArray.length; index++) {
        const element = srcArray[index];
        if (element.id === filterItem.id) {
          if (!_.isEmpty(element.children)) {
            ElMessage.error("当前部门下有子部门，不能删除");
            return;
          }
          srcArray.splice(index, 1);
          return;
        } else {
          if (!_.isEmpty(element.children)) {
            filterItems(element.children, filterItem);
          }
        }
      }
    }
    const onDeleteItem = (item: any) => {
      ElMessageBox.confirm("确定要删除此信息，删除后不可恢复？", "提示")
        .then(() => {
          filterItems(tableSetup.dataList, item);
        })
        .catch(console.log);
    };
    const onAddItem = () => {
      formItems.forEach((it: any) => it.reset());
      dialog.value?.show({ showSubmitLoading: true }).then(() => {
        ElMessage.success(
          "模拟添加成功，添加参数为：" +
            JSON.stringify(baseForm.value?.generatorParams())
        );
        dialog.value?.closeSubmitLoading();
        dialog.value?.close();
      });
    };
    parentFormItem.selectOptions = computed(() => {
      return tableSetup.dataList.map((it: any) => {
        return {
          label: it.name,
          value: it.id,
        };
      });
    });
    return {
      tableColumns,
      formItems,
      onUpdateItem,
      dialog,
      baseForm,
      ...tableSetup,
      onDeleteItem,
      onAddItem,
    };
  },
});
</script>
