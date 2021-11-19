<template>
  <div class="result-wrapper">
    <div class="text-center"><i class="el-icon-success icon"></i></div>
    <div class="result">
      操作成功
    </div>
    <div class="tip">
      预计两个小时到账
    </div>
    <el-card :body-style="{padding: 0}">
      <el-form
        label-width="120px"
        size="small"
        class="form-wrapper"
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
      </el-form>
    </el-card>
    <div class="flex justify-end margin-tb">
      <el-button
        size="small"
        type="warning"
        @click="preStep"
      >再转一笔</el-button>
      <el-button
        type="primary"
        size="small"
      >查看订单</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    accountInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["pre-step"],
  setup(props, { emit }) {
    function preStep() {
      emit("pre-step");
    }
    return {
      preStep,
    };
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .result-wrapper {
    width: 90%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .result-wrapper {
    width: 50%;
    margin: 0 auto;
  }
}
.form-wrapper {
  margin-top: 20px;
  padding: 10px;
}
.icon {
  color: #67c23a;
  font-size: 100px;
  margin: 30px 0;
}
.result {
  font-size: 24px;
  line-height: 1.8;
  text-align: center;
}
.tip {
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}
.action {
  margin-top: 30px;
}
</style>
