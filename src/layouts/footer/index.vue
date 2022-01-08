<template>
  <div class="footer-container">
    Copyright <i class="iconfont" style="margin: 0 5px">©</i>
    {{ setting.projectName }} 2022
  </div>
</template>

<script lang="ts">
import { useSetting } from "@/hooks";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
  setup() {
    return {
      setting: useSetting(),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.footer-container {
  height: $footerHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: var(--el-color-white);
  border-top: 1px dashed var(--el-border-color-light);
}
</style>
