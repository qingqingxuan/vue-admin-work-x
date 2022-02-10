<template>
  <el-scrollbar
    :class="mMode === 'vertical' ? 'scrollbar' : ''"
    wrap-class="scrollbar-wrap-class"
  >
    <el-menu
      :default-active="activePath"
      :mode="mMode"
      :collapse="state.isCollapse"
      active-text-color="var(--el-color-primary)"
      :text-color="state.theme === 'light' ? '#303133' : '#bbbbbb'"
      :background-color="bgColor"
      :style="{ height: mMode === 'vertical' ? '100%' : '48px' }"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
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
    mode: {
      type: String,
      default: "vertical",
    },
  },
  setup(props) {
    const state = store.state;
    const route = useRoute();
    const bgColor = ref(
      state.theme === "light" ? "var(--el-color-white)" : "#001428"
    );
    const activePath = ref(route.fullPath);
    const mMode = computed(() => {
      return props.mode;
    });
    watch(
      () => route.fullPath,
      () => {
        nextTick(() => {
          activePath.value = route.fullPath;
        });
      }
    );
    watch(
      () => state.theme,
      (newVal) => {
        bgColor.value =
          newVal === "light" ? "var(--el-color-white)" : "#001428";
      }
    );
    return {
      mMode,
      activePath,
      state,
      bgColor,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
:deep(.el-menu-item) {
  display: flex;
  align-items: center;
}
:deep(.el-menu-item:hover) {
  background-color: transparent;
  color: var(--el-menu-hover-text-color) !important;
}
:deep(.el-sub-menu__title:hover) {
  background-color: transparent;
  color: var(--el-menu-hover-text-color) !important;
}
:deep(.el-menu .el-menu-item) {
  height: 45px;
  line-height: 0;
}
:deep(.el-sub-menu .el-menu-item) {
  height: 45px;
  line-height: 0;
}
:deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-background-color) !important;
}
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
  background-color: v-bind(bgColor);
}
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
</style>
