<template>
  <div>
    <el-form
      ref="stepOneForm"
      :model="accountInfo"
      :rules="accountInfoRule"
      status-icon
      label-width="120px"
      class="form-wrapper"
      size="small"
    >
      <el-form-item label="付款账户：">
        <el-select
          v-model="accountInfo.account"
          placeholder="请输入付款账户"
          style="width: 100%"
        >
          <el-option
            label="vue-admin-work@work.com"
            :value="accountInfo.account"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="收款账户："
        prop="otherAccount"
      >
        <el-input
          v-model="accountInfo.otherAccount"
          placeholder="请输入收款账户"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="accountInfo.type"
              placeholder="请选择"
            >
              <el-option
                v-for="item of accountInfo.types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="收款人姓名："
        prop="receiveName"
      >
        <el-input
          v-model="accountInfo.receiveName"
          placeholder="请输入收款人姓名"
        />
      </el-form-item>
      <el-form-item
        label="转账金额："
        prop="money"
      >
        <el-input
          v-model="accountInfo.money"
          placeholder="请输入转账金额"
        >
          <template v-slot:prepend>
            <span>￥</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="flex justify-end margin-tb">
        <el-button
          size="small"
          @click="clearStepOneInfo"
        >重置</el-button>
        <el-button
          type="primary"
          size="small"
          @click="nextStep"
        >下一步</el-button>
      </el-form-item>
    </el-form>
    <el-divider class="margin" />
    <el-card
      class="tip-wrapper margin-left margin-right"
      :body-style="{padding: 0}"
    >
      <div class="text-bold text-lg">说明</div>
      <div class="margin-tb">转账到微信</div>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      <div class="margin-tb">
        转账到支付宝
      </div>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ElForm } from "element-plus";

export default defineComponent({
  name: "AccountInfo",
  data() {
    return {
      accountInfo: {
        account: "vue-admin-work@work.com",
        otherAccount: "qingqingxuanzhaowen",
        receiveName: "qingqingxuan",
        money: 100,
        type: 0,
        types: [
          {
            label: "微信",
            value: 0,
          },
          {
            label: "支付宝",
            value: 1,
          },
        ],
      },
      accountInfoRule: {
        otherAccount: [
          { required: true, message: "请输入收款账户", trigger: "blur" },
        ],
        receiveName: [
          { required: true, message: "请输入收款人姓名", trigger: "blur" },
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
      },
    };
  },
  methods: {
    clearStepOneInfo() {
      this.accountInfo.otherAccount = "";
      this.accountInfo.type = 0;
      this.accountInfo.receiveName = "";
      this.accountInfo.money = 0;
    },
    nextStep() {
      (this.$refs.stepOneForm as InstanceType<typeof ElForm>).validate(
        (valid) => {
          if (valid) {
            this.$emit("next-step", this.accountInfo);
          }
        },
      );
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .input-with-select .el-input-group__prepend {
  width: 90px;
}
.tip-wrapper {
  padding: 10px;
}
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
