<template>
  <div
    class="vaw-inner-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <ScrollerMenu :inner-mode="true">
      <template #default>
        <SideBarItem
          v-for="item of routes"
          :key="item.path"
          :full-path="item.path"
          :item="item"
        />
      </template>
    </ScrollerMenu>
    <div class="inner-humbuger">
      <Humburger />
    </div>
  </div>
</template>

<script lang="ts">
import store from "../store";
import { defineComponent, ref, watch, nextTick } from "vue";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "InnerSideBar",
  setup() {
    const state = store.state;
    const route = useRoute();
    const router = useRouter();
    const routes = ref<RouteRecordRaw[]>([]);
    watch(
      () => route.fullPath,
      () => {
        nextTick(() => {
          const path = route.matched[0].path;
          const tempRoutes = store.state.permissionRoutes.find(
            (it) => it.path === path
          );
          routes.value = tempRoutes?.children || [];
        });
      },
      {
        immediate: true,
      }
    );
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
.vaw-inner-side-bar-wrapper {
  position: absolute;
  top: $logoHeight;
  left: 0;
  overflow-x: hidden;
  bottom: 0;
  box-sizing: border-box;
  z-index: 99;
  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
  }
}
.inner-humbuger {
  position: absolute;
  right: 10px;
  bottom: 5%;
  width: 30px;
  height: 30px;
  background-color: var(--el-color-primary-light-5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:hover {
    color: #fff;
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
