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
          row-key="id"
          :tree-props="{ children: 'children' }"
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
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            align="center"
          >
            <template
              v-if="item.prop === 'actions'"
              #default="scope"
            >
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
    <Dialog
      ref="dialog"
      :title="dialogTitle"
    >
      <template #content>
        <BaseForm
          class="padding-left padding-right"
          ref="baseForm"
          :form-items="formItems"
        >
          <template #prefix>
            <el-form-item :label="parentFormItem.label">
              <TreeSelector
                v-model:value="parentFormItem.value"
                placeholder="请选择上级部门"
                :data="dataList"
                :dataFields="{
                  label: 'name',
                  value: 'id',
                }"
              />
            </el-form-item>
          </template>
        </BaseForm>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { post } from "@/api/http";
import { getDepartmentList } from "@/api/url";
import type { BaseFormType, DialogType } from "@/components/types";
import { computed, h, onMounted, reactive, ref } from "vue";
import { ElInput, ElMessage, ElMessageBox } from "element-plus";
import _ from "lodash";
import { useDataTable } from "@/hooks";
import { FormRenderItem } from "@/components/common/FormRender";
const DP_CODE_FLAG = "dp_code_";

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
    label: "操作",
    prop: "actions",
  },
]);
const dialog = ref<DialogType>();
const baseForm = ref();
const dialogTitle = ref("添加部门");
const { tableConfig, tableLoading, dataList, handleSuccess } =
  useDataTable<DepartmentModelType>();
const parentFormItem = reactive({
  label: "上级部门",
  name: "parentId",
  value: 0,
  placeholder: "请选择上级部门",
  selectOptions: {},
  reset() {
    this.value = 0;
  },
});
const depCodeFormItem: FormRenderItem = {
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
  render: (formItem) => {
    return h(
      ElInput,
      {
        modelValue: formItem.value,
        "onUpdate:modelValue": (newVal) => {
          formItem.value = newVal;
        },
        placeholder: formItem.placeholder,
      },
      {
        prepend: () => {
          return h("span", DP_CODE_FLAG);
        },
      }
    );
  },
};
const formItems = reactive<FormItem[]>([
  {
    label: "部门名称",
    type: "input",
    name: "name",
    value: ref(""),
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
]);
const onUpdateItem = (item: DepartmentModelType) => {
  dialogTitle.value = "编辑部门";
  formItems.forEach((it) => {
    const propName = (item as any)[it.name];
    if (propName) {
      if (it.name === "depCode") {
        it.value = propName.replace(DP_CODE_FLAG, "");
      } else {
        it.value = propName;
      }
    }
  });
  parentFormItem.value = item.parentId;

  depCodeFormItem.disabled = true;
  dialog.value?.show(() => {
    if (!baseForm.value?.checkParams()) {
      return;
    }
    (dialog.value as any).loading = true;
    setTimeout(() => {
      ElMessage.success(
        "模拟修改成功，添加参数为：" +
          JSON.stringify(baseForm.value?.generatorParams())
      );
      dialog.value?.close();
    }, 3000);
  });
};
const doRefresh = () => {
  post({
    url: getDepartmentList,
  }).then(handleSuccess);
};
function filterItems(
  srcArray: Array<DepartmentModelType>,
  filterItem: DepartmentModelType
) {
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
      if (dataList.value) {
        filterItems(dataList.value, item);
      }
    })
    .catch(console.log);
};
const onAddItem = () => {
  dialogTitle.value = "添加部门";
  formItems.forEach((it: any) => it.reset());
  parentFormItem.value = 0;
  dialog.value?.show(() => {
    if (!baseForm.value?.checkParams()) {
      return;
    }
    (dialog.value as any).loading = true;
    const formParams = baseForm.value?.generatorParams();
    formParams.parentId = parentFormItem.value;
    setTimeout(() => {
      ElMessage.success(
        "模拟添加成功，添加参数为：" + JSON.stringify(formParams)
      );
      dialog.value?.close();
    }, 1000);
  });
};
parentFormItem.selectOptions = computed(() => {
  return dataList.value?.map((it: any) => {
    return {
      label: it.name,
      value: it.id,
    };
  });
});
onMounted(doRefresh);
</script>
