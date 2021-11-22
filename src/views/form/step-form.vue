<template>
  <div class="main-container">
    <el-card
      :body-style="{padding: '5px'}"
      shadow="hover"
    >
      <el-steps
        :active="activeStep"
        align-center
        finish-status="success"
        class="steps-wrapper"
      >
        <el-step title="填写转账信息" />
        <el-step title="确认转账信息" />
        <el-step title="完成" />
      </el-steps>
    </el-card>
    <el-card
      :body-style="{padding: '5px'}"
      shadow="hover"
      class="margin-top-xs"
    >
      <div class="title text-center padding">
        <el-link
          type="primary"
          :underline="false"
          class="text-xxl"
        >{{ activeStep === 1 || activeStep === 2 ? '请填写转账信息' : '转账结果' }}</el-link>
      </div>
      <AccountInfo
        v-if="activeStep === 1"
        @next-step="next"
      />
      <PasswordInfo
        v-if="activeStep === 2"
        :account-info="accountInfo"
        @next-step="activeStep++"
        @pre-step="activeStep--"
      />
      <ResultInfo
        v-if="activeStep === 3"
        :account-info="accountInfo"
        @pre-step="activeStep = 1"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import AccountInfo from "./components/AccountInfo.vue";
import PasswordInfo from "./components/PasswordInfo.vue";
import ResultInfo from "./components/ResultInfo.vue";

const activeStep = ref(1);
const accountInfo = reactive({
  account: "",
  otherAccount: "",
  receiveName: "",
  money: 0,
  type: 0,
});

function next(temp: any) {
  console.log(temp);
  if (activeStep.value === 1) {
    accountInfo.account = temp.account;
    accountInfo.otherAccount = temp.otherAccount;
    accountInfo.receiveName = temp.receiveName;
    accountInfo.money = temp.money;
    accountInfo.type = temp.type;
    activeStep.value += 1;
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-step__title) {
  font-size: 14px;
}
@media screen and (max-width: 768px) {
  .steps-wrapper {
    width: 100%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .steps-wrapper {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
