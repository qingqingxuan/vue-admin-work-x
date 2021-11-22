<template>
  <el-card>
    <el-row class="icon-parent">
      <el-col
        :xs="6"
        :md="3"
        :sm="3"
        :lg="3"
        :xl="3"
        v-for="item of iconArray"
        :key="item"
      >
        <div class="icon-wrapper flex flex-direction justify-center align-center">
          <el-icon size="20">
            <component :is="item + 'Icon'" />
          </el-icon>
          <div class="text-xs margin-top text-center">{{item}}</div>
          <div
            class="copy text-center"
            @click="onCopy(item)"
          >
            复制
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import * as ElIcons from "@element-plus/icons";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "ElementPlus",
  setup() {
    const loading = ref(false);
    const iconArray = Object.keys(ElIcons);
    const onCopy = (item: string) => {
      ElMessage.success("已选择: " + item + "Icon");
    };
    return {
      loading,
      iconArray,
      onCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-parent {
  border-top: 1px solid #f7f7f7;
  border-left: 1px solid #f7f7f7;
  .icon-wrapper {
    position: relative;
    height: 100px;
    border-right: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    overflow: hidden;
    padding-bottom: 0;
    transition: padding-bottom 0.2s ease-in-out;
    &:hover {
      color: var(--el-color-primary);
      box-shadow: 0 0 10px #f0f0f0;
      padding-bottom: 22px;
      transition: padding-bottom 0.2s ease-in-out;
      .copy {
        cursor: pointer;
        transform: translateY(0);
        transition: transform 0.2s ease-in-out;
      }
    }
    .copy {
      position: absolute;
      background-color: #409eff;
      padding: 5px 0;
      color: #fff;
      font-size: 12px;
      bottom: 0;
      left: 0;
      right: 0;
      transform: translateY(100%);
      transition: transform 0.2s ease-in-out;
    }
  }
}
</style>
