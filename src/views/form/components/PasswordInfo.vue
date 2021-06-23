<template>
  <el-form
    ref="stepTwoForm"
    status-icon
    :model="passwordModel"
    :rules="passwordRule"
    label-width="120px"
    class="form-wrapper"
    size="small"
  >
    <el-form-item label="付款账户：">
      <span>{{ accountInfo.account }}</span>
    </el-form-item>
    <el-form-item label="收款账户：">
      <span>{{ accountInfo.otherAccount }}</span>
    </el-form-item>
    <el-form-item label="收款人姓名：">
      <span>
        {{ accountInfo.receiveName }}
      </span>
    </el-form-item>
    <el-form-item label="转账金额：">
      <span>
        {{ '￥' + Number(accountInfo.money).toFixed(2) }}
      </span>
    </el-form-item>
    <el-form-item
      label="支付密码"
      prop="payPassword"
    >
      <el-input
        v-model="passwordModel.payPassword"
        placeholder="请输入支付密码"
      />
    </el-form-item>
    <div class="flex justify-end margin-tb">
      <el-button
        size="small"
        type="warning"
        @click="preStep"
      >上一步</el-button>
      <el-button
        @click="nextStep"
        size="small"
        type="primary"
        :loading="loadingStatus"
      >下一步</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ElForm } from "element-plus";

export default defineComponent({
  name: "PasswordInfo",
  emits: ["pre-step", "next-step"],
  props: {
    accountInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      passwordModel: {
        payPassword: "",
      },
      passwordRule: {
        payPassword: [
          { required: true, message: "请输入支付密码", trigger: "blur" },
        ],
      },
      loadingStatus: false,
    };
  },
  methods: {
    preStep() {
      this.loadingStatus = false;
      this.passwordModel.payPassword = "";
      this.$emit("pre-step");
    },
    nextStep() {
      (this.$refs.stepTwoForm as InstanceType<typeof ElForm>).validate(
        (valid) => {
          if (valid) {
            this.loadingStatus = true;
            setTimeout(() => {
              this.$emit("next-step");
              this.loadingStatus = false;
            }, 3000);
          }
        },
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .form-wrapper {
    width: 90%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .form-wrapper {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
