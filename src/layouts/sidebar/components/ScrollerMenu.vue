<template>
  <el-scrollbar
    class="scrollbar"
    wrap-class="scrollbar-wrap-class"
  >
    <el-menu
      :default-active="$route.fullPath"
      mode="vertical"
      :collapse="state.isCollapse"
      active-text-color="var(--el-color-primary)"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../../store";
export default defineComponent({
  name: "ScrollerMenu",
  props: {
    routes: {
      type: Array,
      require: true,
      default: () => {
        return [];
      },
    },
    fullPath: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {
      state: store.state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
}
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
</style>
