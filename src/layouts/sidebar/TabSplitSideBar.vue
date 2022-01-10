<template>
  <div
    class="vaw-tab-split-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <div class="tab-split-tab-wrapper">
      <Logo class="tab-split-logo-wrapper" :show-title="false" />
      <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrap-class">
        <div class="tab-split-content-wrapper">
          <div
            v-for="item of tabs"
            :key="item.path"
            class="label-item-wrapper"
            :class="{ 'vaw-tab-split-item-is-active': item.active }"
            @click="changeTab(item)"
          >
            <el-icon>
              <component
                :is="item.meta ? item.meta.icon || MenuIcon : MenuIcon"
              />
            </el-icon>
            <span class="label">{{
              item.meta ? item.meta.title : item.name
            }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tab-split-menu-wrapper">
      <Logo class="tab-split-logo-wrapper" :show-logo="false" />
      <ScrollerMenu>
        <template #default>
          <SideBarItem
            v-for="item of routes"
            :key="item.path"
            :full-path="getFullPath(item)"
            :item="getItem(item)"
          />
        </template>
      </ScrollerMenu>
    </div>
  </div>
</template>

<script>
import store from "../store";
import path from "path";
import { isExternal } from "../utils";
import { Menu as MenuIcon } from "@element-plus/icons";
export default {
  name: "TabSplitSideBar",
  props: {
    showLogo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      state: store.state,
      currentTab: null,
      basePath: null,
      tabs: null,
      routes: [],
      MenuIcon,
      bgColor:
        store.state.theme === "light" ? "var(--el-color-white)" : "#021a32",
      labelColor: store.state.theme === "light" ? "#333333" : "#bbbbbb",
    };
  },
  watch: {
    currentTab(newVal) {
      this.routes = newVal.children;
      this.basePath = newVal.path;
    },
    // 监听路由，改变当前选择的 tab
    $route(newVal) {
      if (this.noChange) {
        this.noChange = false;
        return;
      }
      this.doChangeTab(newVal);
    },
    "state.theme"(newVal) {
      this.bgColor = newVal === "light" ? "var(--el-color-white)" : "#021a32";
      this.labelColor = newVal === "light" ? "#333333" : "#bbbbbb";
    },
  },
  mounted() {
    this.tabs = store.getSplitTabs().map((it, index) => {
      return {
        ...it,
        active: index === 0,
      };
    });
    this.doChangeTab(this.$route);
  },
  methods: {
    getItem(item) {
      item.children = item.children || [];
      return item;
    },
    getFullPath(item) {
      if (isExternal(item.path)) return item.path;
      return path.resolve(this.basePath, item.path);
    },
    doChangeTab(route) {
      const matchedRoutes = route.matched;
      if (matchedRoutes && matchedRoutes.length > 0) {
        this.tabs.forEach((it) => {
          if (it.path === matchedRoutes[0].path) {
            it.active = true;
            this.basePath = it.path;
            if (it.children) {
              this.routes = it.children;
            }
          } else {
            it.active = false;
          }
        });
      }
    },
    // inited 标志是否要查找第一个元素
    changeTab(item, inited = true) {
      this.tabs.forEach((it) => {
        it.active = it.path === item.path;
      });
      this.currentTab = item || null;
      if (inited) {
        this.findPath(this.currentTab, this.currentTab.path);
      }
    },
    findPath(tab, fullPath) {
      const firstItem = tab.children[0];
      if (firstItem.children && firstItem.children.length > 0) {
        this.findPath(firstItem, path.resolve(fullPath, firstItem.path));
      } else {
        if (isExternal(firstItem.path)) {
          window.open(firstItem.path);
        } else {
          this.noChange = true;
          this.$router.push({ path: path.resolve(fullPath, firstItem.path) });
        }
      }
    },
  },
};
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
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
  background-color: v-bind(bgColor);
}
.vaw-tab-split-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  z-index: 99;
  .tab-split-tab-wrapper {
    position: relative;
    top: 0;
    left: 0;
    width: $tabSplitMenuWidth;
    min-width: $tabSplitMenuWidth;
    max-width: $tabSplitMenuWidth;
    overflow: hidden;
    height: 100%;
    .tab-split-logo-wrapper {
      max-width: $tabSplitMenuWidth;
      min-width: $tabSplitMenuWidth;
    }
    .tab-split-content-wrapper {
      position: relative;
      @mixin after {
        content: "";
        position: absolute;
        left: 5px;
        top: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 3px;
        z-index: -1;
        background-color: var(--el-color-primary-light-2);
      }
      .label-item-wrapper {
        position: relative;
        min-height: $logoHeight * 1.2;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 1;
        color: v-bind(labelColor);
        & > i {
          font-size: 16px;
        }
        & > span {
          font-size: 12px;
          line-height: 14px;
          width: 80%;
          margin: 0 auto;
          margin-top: 5px;
          text-align: center;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover:not(.vaw-tab-split-item-is-active) {
          cursor: pointer;
          color: var(--el-color-primary);
        }
        &:hover {
          cursor: pointer;
        }
      }
      .vaw-tab-split-item-is-active {
        color: var(--el-color-white);
      }
      .vaw-tab-split-item-is-active::after {
        @include after;
      }
    }
  }
  .tab-split-menu-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: $tabSplitMenuWidth;
    overflow-x: hidden;
  }
  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
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
  overflow-x: hidden !important;
  border-right: none !important;
}
::deep(.el-menu--collapse .el-sub-menu__title span) {
  display: none !important;
}
::deep(.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none !important;
}
</style>
