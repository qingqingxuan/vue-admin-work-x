<template>
  <div
    class="vaw-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <transition name="logo">
      <Logo v-if="showLogo" />
    </transition>
    <ScrollerMenu>
      <template #default>
        <SideBarItem
          v-for="item of routes"
          :key="item.path"
          :full-path="item.path"
          :item="item"
        />
      </template>
    </ScrollerMenu>
    <div class="mobile-shadow"></div>
  </div>
</template>

<script lang="ts">
import store from "../store";
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SideBar",
  props: {
    showLogo: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const state = store.state;
    const routes = computed(() => {
      return state.permissionRoutes.filter((it) => !!it.name);
    });
    return {
      state,
      routes,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.open-status {
  width: $menuWidth;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
  transition: all $transitionTime;
}
.close-status {
  width: $minMenuWidth;
  box-shadow: none;
  transition: all $transitionTime;
}
.vaw-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  z-index: 99;
  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
  }
  .scrollbar {
    height: calc(100% - #{$logoHeight}) !important;
  }
}
.is-mobile {
  .open-status {
    width: $menuWidth;
    transform: translateX(0);
    transition: transform $transitionTime;
  }
  .close-status {
    width: $menuWidth;
    transform: translateX(-$menuWidth);
    transition: transform $transitionTime;
    box-shadow: none;
  }
}
</style>
<style lang="scss">
@import "../styles/variables.scss";
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
.el-menu {
  --el-menu-hover-text-color: var(--el-color-primary) !important;
  --el-menu-hover-bg-color: var(--el-color-primary-light-8) !important;
  border-right: none !important;
  overflow: hidden;
}
.el-menu-item:hover {
  color: var(--el-menu-active-color);
  background-color: transparent;
}
.el-menu-item.is-active {
  color: var(--el-menu-active-color);
  background-color: var(--el-color-primary-light-8);
}
::deep(.el-menu--collapse .el-sub-menu__title span) {
  display: none !important;
}
::deep(.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none !important;
}
</style>
