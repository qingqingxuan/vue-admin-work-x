<template>
  <div class="main-container flex flex-direction">
    <el-card
      :body-style="{ padding: '15px' }"
      shadow="hover"
    >
      <el-link :underline="false">请填写会议基本信息</el-link>
    </el-card>
    <el-card
      :body-style="{ padding: '10px' }"
      shadow="nerve"
      class="margin-top-xs flex-sub"
    >
      <div class="form-wrapper padding-top">
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
          :config="formConfig"
        >
          <template #extra>
            <el-form-item
              label="与会人员："
              class="form-item"
            >
              <el-select
                v-model="joinMemeber.value"
                multiple
                placeholder="请选择与会人员"
                style="width: 100%"
              >
                <el-option
                  v-for="item in joinMemeber.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="备注："
              class="form-item"
            >
              <el-input
                v-model="remark.value"
                placeholder="请输入备注信息（选填）"
                type="textarea"
                :rows="3"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <div class="text-center">
                <el-button
                  type="primary"
                  size="small"
                  :loading="submitLoading"
                  @click="submit"
                >提交</el-button>
              </div>
            </el-form-item>
          </template>
        </BaseForm>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { reactive, ref, shallowReactive } from "vue";

const formConfig = {
  labelWidth: 100,
  size: "default",
  labelPosition: "right",
};
const formItems = reactive([
  {
    label: "会议名称：",
    type: "input",
    name: "name",
    value: "",
    maxLength: 50,
    inputType: "text",
    placeholder: "请输入会议名称",
    validator: ({ value = "", placeholder = "" }) => {
      if (!value) {
        ElMessage.error(placeholder);
        return false;
      }
      return true;
    },
  },
  {
    label: "会议类型：",
    type: "radio-group",
    name: "meetType",
    associatedOption: "address",
    value: 0,
    radioOptions: [
      {
        label: "普通",
        value: 0,
      },
      {
        label: "紧急",
        value: 1,
      },
    ],
    onChange: (value = 0, assName = "") => {
      // const assObj = this.formItems.find(
      //   (it: any) => it.name === assName,
      // );
      // this.$set(assObj, "hidden", value === 1);
    },
  },
  {
    label: "会议内容：",
    type: "input",
    name: "content",
    value: "",
    maxLength: 10,
    inputType: "text",
    placeholder: "请输入会议内容",
    validator: ({ value = "", placeholder = "" }) => {
      if (!value) {
        ElMessage.error(placeholder);
        return false;
      }
      return true;
    },
  },
  {
    label: "起止时间：",
    type: "date-range",
    name: "startEndTime",
    placeholder: "请选择会议起止时间",
    value: "",
    validator: ({ value = "", placeholder = "" }) => {
      if (!value) {
        ElMessage.error(placeholder);
        return false;
      }
      return true;
    },
  },
  {
    label: "起止地点：",
    type: "select",
    name: "address",
    value: "",
    placeholder: "请选择会议地点",
    selectOptions: [
      {
        label: "会议一室",
        value: 1,
      },
      {
        label: "会议二室",
        value: 2,
      },
      {
        label: "会议三室",
        value: 3,
      },
      {
        label: "会议四室",
        value: 4,
      },
    ],
    validator: ({ value = "", placeholder = "" }) => {
      if (!value) {
        ElMessage.error(placeholder);
        return false;
      }
      return true;
    },
  },
]);
const joinMemeber = shallowReactive({
  value: "",
  options: [
    {
      label: "张三",
      value: "zhangsan",
    },
    {
      label: "李四",
      value: "lisi",
    },
    {
      label: "江小鱼",
      value: "jiangxiaoyu",
    },
    {
      label: "花无缺",
      value: "huawuque",
    },
    {
      label: "燕南天",
      value: "yannantian",
    },
  ],
});
const remark = ref("");
const submitLoading = ref(false);
const baseForm = ref();
function submit() {
  if (baseForm.value?.checkParams()) {
    if (!joinMemeber.value) {
      ElMessage.error("请选择与会人员");
      return false;
    }
    submitLoading.value = true;
    setTimeout(() => {
      ElMessage.success("保存成功");
      submitLoading.value = false;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .form-wrapper {
    width: 100%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .form-wrapper {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
