<template>
  <el-scrollbar
    :class="
      mMode === 'vertical'
        ? innerMode
          ? 'scrollbar-inner-mode'
          : 'scrollbar'
        : ''
    "
    wrap-class="scrollbar-wrap-class"
  >
    <el-menu
      :default-active="activePath"
      :mode="mMode"
      :collapse="mMode === 'vertical' && state.isCollapse"
      active-text-color="var(--el-color-primary)"
      :text-color="textColor"
      :background-color="bgColor"
      :style="{ height: mMode === 'vertical' ? '100%' : '48px' }"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
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
    innerMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = store.state;
    const route = useRoute();
    const bgColor = computed(() => {
      return state.theme === "light"
        ? "var(--el-color-white)"
        : props.innerMode
        ? "var(--el-color-white)"
        : "#001428";
    });
    const textColor = computed(() => {
      return state.theme === "light"
        ? "#303133"
        : props.innerMode
        ? "#303133"
        : "#bbbbbb";
    });
    const activePath = ref(route.fullPath);
    const mMode = computed(() => {
      return props.mode;
    });
    watch(
      () => route.fullPath,
      () => {
        nextTick(() => {
          if (mMode.value === "vertical") {
            activePath.value = route.fullPath;
          } else {
            activePath.value = route.matched[0].path;
          }
        });
      },
      {
        immediate: true,
      }
    );
    return {
      mMode,
      activePath,
      state,
      bgColor,
      textColor,
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
  height: 48px;
  line-height: 0;
}
:deep(.el-sub-menu .el-menu-item) {
  height: 45px;
  line-height: 0;
}
:deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-bg-color) !important;
}
:deep(.el-menu--horizontal) {
  border-bottom: none;
}
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
  background-color: v-bind(bgColor);
}
.scrollbar-inner-mode {
  height: 100%;
  background-color: v-bind(bgColor);
}
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
</style>
