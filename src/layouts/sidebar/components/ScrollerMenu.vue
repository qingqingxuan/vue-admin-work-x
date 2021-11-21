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
      :text-color="state.theme === 'light' ? '#303133' : '#ffffff'"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
    const state = store.state
    const bgColor = ref(state.theme === 'light' ? 'var(--el-color-white)' : 'var(--el-color-black)')
    watch(() => state.theme, (newVal) => {
      bgColor.value = newVal === 'light' ? 'var(--el-color-white)' : 'var(--el-color-black)'
    })
    return {
      state,
      bgColor
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
:deep(.el-menu){
  --el-menu-hover-text-color: var(--el-color-primary) !important;
  --el-menu-hover-background-color: var(--el-color-primary-light-8) !important;
}
:deep(.el-menu-item:hover){
  background-color: transparent;
  color: var(--el-menu-hover-text-color) !important;
}
:deep(.el-sub-menu__title:hover){
  background-color: transparent;
  color: var(--el-menu-hover-text-color) !important;
}
:deep(.el-sub-menu .el-menu-item) {
  height: 45px;
  line-height: 45px;
}
:deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-background-color) !important;
}
:deep(.el-menu-item *){
  vertical-align: middle !important;
}
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
  background-color: v-bind(bgColor);
}
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
</style>
