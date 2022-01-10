<template>
  <div>
    <el-card>
      <template #header>
        <div>组件表单（以下表单由BaseForm表单组件动态创建）</div>
      </template>
      <BaseForm ref="builderForm" :form-items="builderIetms">
        <template #extra>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="activeDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-time-picker
                  placeholder="选择时间"
                  v-model="activeTime"
                  style="width: 100%"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitBuildForm"
              >立即创建</el-button
            >
            <el-button @click="onResetBuildForm">重置</el-button>
          </el-form-item>
        </template>
      </BaseForm>
    </el-card>
    <el-card class="margin-top">
      <template #header>
        <div>普通表单（以下表单由el-form手动创建）</div>
      </template>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
        size="small"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入活动名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="ruleForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="onResetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { showConfirmBox } from "@/components/types";
import { ElMessage } from "element-plus";
import { isEmpty } from "lodash";
import { reactive, ref } from "vue";

const ruleForm = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const rules = {
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  date1: [
    {
      type: "date",
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "请选择时间",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "请至少选择一个活动性质",
      trigger: "change",
    },
  ],
  resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
  desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
};
const ruleFormRef = ref();
const onResetForm = () => {
  ruleFormRef.value.resetFields();
};
const onSubmitForm = () => {
  ruleFormRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success("submit!");
    } else {
      return false;
    }
  });
};
const builderIetms = reactive<Array<FormItem>>([
  {
    name: "name",
    type: "input",
    value: "",
    placeholder: "请输入活动名称",
    label: "活动名称",
    validator(item: FormItem) {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
  },
  {
    name: "area",
    type: "select",
    label: "活动区域",
    placeholder: "请选择活动区域",
    value: "",
    selectOptions: [
      {
        label: "区域一",
        value: "shanghai",
      },
      {
        label: "区域二",
        value: "beijing",
      },
    ],
    span: 4,
    validator(item: FormItem) {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
  },
  {
    name: "delivery",
    type: "switch",
    label: "即时配送",
    value: false,
    reset() {
      this.value = false;
    },
  },
  {
    name: "type",
    type: "check-group",
    label: "活动性质",
    placeholder: "请选择活动性质",
    value: [],
    checkOptions: [
      {
        label: "美食/餐厅线上活动",
        value: 1,
      },
      {
        label: "地推活动",
        value: 2,
      },
      {
        label: "线下主题活动",
        value: 3,
      },
      {
        label: "单纯品牌曝光",
        value: 4,
      },
    ],
    validator(item: FormItem) {
      if (isEmpty(item.value)) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
    reset() {
      this.value = [];
    },
  },
  {
    name: "resource",
    type: "radio-group",
    label: "活动资源",
    placeholder: "请选择活动资源",
    value: "",
    radioOptions: [
      {
        label: "线上品牌商赞助",
        value: 1,
      },
      {
        label: "线下场地免费",
        value: 2,
      },
    ],
    validator(item: FormItem) {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
  },
  {
    name: "desc",
    type: "input",
    inputType: "textarea",
    value: "",
    placeholder: "请输入活动形式",
    label: "活动形式",
    validator(item: FormItem) {
      if (!item.value) {
        ElMessage.error(item.placeholder);
        return false;
      }
      return true;
    },
  },
]);
const activeDate = ref("");
const activeTime = ref("");
const builderForm = ref();
const onSubmitBuildForm = () => {
  if (builderForm.value?.checkParams()) {
    if (!activeDate.value) {
      ElMessage.error("请选择日期");
      return;
    }
    if (!activeTime.value) {
      ElMessage.error("请选择时间");
      return;
    }
    const params = builderForm.value?.generatorParams();
    params.type = params.type.join(",");
    console.log(params);
    showConfirmBox("submit!，参数--->" + JSON.stringify(params));
  }
};
const onResetBuildForm = () => {
  builderForm.value?.resetParams();
  activeDate.value = "";
  activeTime.value = "";
};
</script>
