<template>
  <div>
    <div
      v-for="(item, index) of tempData"
      :key="index"
      class="message-item flex"
    >
      <div class="icon">
        <el-icon>
          <MessageIcon />
        </el-icon>
      </div>
      <div class="flex flex-direction content">
        <div class="title">{{ item.title }}</div>
        <div class="sub-title">{{ item.subTitle }}</div>
      </div>
    </div>
    <div class="more flex justify-around align-center">
      <span @click="onClickMore">查看更多</span>
      <span>清空消息</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowReactive, toRef } from "vue";
import { showSuccessMessage } from "../types";

export default defineComponent({
  name: "PopoverMessageContent",
  setup() {
    const tempData = shallowReactive([
      {
        icon: "",
        title: "计划审核通知",
        subTitle: "上线计划已经审核通过，请立即准备上线事宜",
      },
      {
        icon: "",
        title: "动态评论",
        subTitle: "马小小：随便写的一些评论消息",
      },
      {
        icon: "",
        title: "任务消息",
        subTitle: "下午来开会，快点，快点",
      },
    ]);
    function onClickMore() {
      showSuccessMessage("点击了更多");
    }
    return {
      tempData,
      onClickMore,
    };
  },
});
</script>
<style lang="scss" scoped>
.message-item {
  padding: 10px 5px;
  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    color: white;
    background-color: rgb(192, 47, 47);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    margin-left: 10px;
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .sub-title {
      font-size: 12px;
      margin-top: 5px;
    }
  }
  &:hover {
    background-color: #f7f7f7;
  }
}
.more {
  border-top: 1px solid #f7f7f7;
  padding-top: 10px;
  cursor: pointer;
}
.message-item + .message-item {
  border-top: 1px solid #f7f7f7;
}
</style>
