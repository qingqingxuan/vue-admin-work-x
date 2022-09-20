<template>
  <div
    class="vaw-header-layout"
    :style="bgColor"
  >
    <div class="logo-wrapper">
      <Logo :always-show="true" />
    </div>
    <div class="menu-wrapper">
      <ScrollerMenu mode="horizontal">
        <template #default>
          <SideBarItem
            v-for="item of routes"
            :key="item.path"
            :full-path="item.path"
            :item="item"
            @top-item-click="topItemClick"
          />
        </template>
      </ScrollerMenu>
    </div>
    <div class="right-wrapper">
      <div v-if="state.device !== 'mobile'">
        <ActionItems />
      </div>
      <div class="avatar-wrapper">
        <VAWAvatar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "../store";
import { computed, defineComponent, ref, watch } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
export default defineComponent({
  name: "VAWHeader",
  setup() {
    const router = useRouter();
    const state = store.state;
    const routes = computed(() => {
      return store.getTopLevelItems();
    });
    const bgColor = ref({
      backgroundColor:
        state.theme === "light" ? "var(--el-color-white)" : "#001428",
      color: state.theme === "light" ? "inherit" : "var(--el-color-white)",
    });
    watch(
      () => state.theme,
      (newVal) => {
        bgColor.value = {
          backgroundColor:
            state.theme === "light" ? "var(--el-color-white)" : "#001428",
          color: state.theme === "light" ? "inherit" : "var(--el-color-white)",
        };
      }
    );
    function handlePath(routes: RouteRecordRaw[]) {
      for (let index = 0; index < routes.length; index++) {
        const it = routes[index];
        if (it.children && it.children.length > 0) {
          handlePath(it.children);
        } else {
          router.push(it.path);
        }
        break;
      }
    }
    function topItemClick(item: any) {
      handlePath(item.items);
    }
    return {
      bgColor,
      routes,
      state,
      topItemClick,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.vaw-header-layout {
  height: $logoHeight;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .logo-wrapper {
    width: $menuWidth;
  }
  .menu-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .right-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .avatar-wrapper {
    padding-right: 15px;
  }
}
</style>
