<template>
  <div class="vaw-tab-bar-container">
    <el-tabs
      id="tagViewTab"
      v-model="currentTab"
      type="card"
      @tab-click="clickTab"
      @tab-remove="removeTab"
      @contextmenu.prevent="onContextMenu(currentTab, $event)"
    >
      <el-tab-pane
        v-for="item of state.visitedView"
        :key="item.path"
        :label="item.meta ? item.meta.title : item.name"
        :name="item.fullPath"
        :closable="!isAffix(item)"
      />
    </el-tabs>
    <ul
      v-show="showContextMenu"
      class="contex-menu-wrapper"
      :style="contextMenuStyle"
    >
      <li>
        <el-button
          icon="RefreshIcon"
          :underline="false"
          type="text"
          @click="refreshRoute"
        >刷新页面</el-button>
      </li>
      <li :disabled="showLeftMenu">
        <el-button
          :disabled="showLeftMenu"
          icon="BackIcon"
          type="text"
          @click="closeLeft"
        >关闭左侧</el-button>
      </li>
      <li :disabled="showRightMenu">
        <el-button
          :disabled="showRightMenu"
          icon="RightIcon"
          type="text"
          @click="closeRight"
        >关闭右侧</el-button>
      </li>
      <li>
        <el-button
          icon="CircleCloseIcon"
          type="text"
          @click="closeAll"
        >关闭所有</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../store";
import path from "path";
import qs from "qs";
export default {
  name: "TabBar",
  data() {
    return {
      currentTab: this.$route.fullPath,
      contextMenuStyle: {
        left: 0,
        top: 0,
      },
      showContextMenu: false,
      selectRoute: null,
      showLeftMenu: true,
      showRightMenu: true,
      state: store.state,
    };
  },
  watch: {
    $route(newVal) {
      if (["404", "500", "403", "not-found", "Login"].includes(newVal.name) || newVal.path === '/404') {
        this.currentTab = "";
        return;
      }
      if (newVal.path.startsWith("/redirect")) {
        return;
      }
      if (newVal.meta.noShowTabbar) {
        this.currentTab = "";
        return;
      }
      store.addVisitedView(newVal).then((route) => {
        this.currentTab = route.fullPath;
      });
    },
    showContextMenu(val) {
      if (val) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.initRoute();
  },
  methods: {
    initRoute() {
      const affixedRoutes = this.findAffixedRoutes(
        this.state.permissionRoutes,
        "/"
      );
      affixedRoutes.forEach((it) => {
        store.addVisitedView(it);
      });
      if (
        ["404", "500", "403", "not-found", "Login"].includes(this.$route.name)
      ) {
        this.currentTab = "";
        return;
      }
      if (this.$route.meta.noShowTabbar) {
        this.currentTab = "";
        return;
      }
      store.addVisitedView(this.$route).then((route) => {
        this.currentTab = route.fullPath;
      });
    },
    findAffixedRoutes(routes, basePath) {
      const temp = [];
      routes.forEach((it) => {
        if (!it.hidden && it.meta && it.meta.affix) {
          temp.push({
            name: it.name,
            fullPath: path.resolve(basePath, it.path),
            path: it.path,
            meta: it.meta,
          });
        }
        if (it.children && it.children.length > 0) {
          temp.push(
            ...this.findAffixedRoutes(
              it.children,
              path.resolve(basePath, it.path)
            )
          );
        }
      });
      return temp;
    },
    isAffix(route) {
      return route.meta && route.meta.affix;
    },
    onContextMenu(item, ctx) {
      const { clientX } = ctx;
      const { x } = this.$el.getBoundingClientRect();
      const parentElementRect = document
        .getElementById("tagViewTab")
        .getElementsByClassName("el-tabs__nav is-top")[0]
        .getBoundingClientRect();
      if (clientX < parentElementRect.x) {
        return;
      }
      if (clientX > parentElementRect.x + parentElementRect.width) {
        return;
      }
      this.selectRoute = null;
      this.selectRoute = this.state.visitedView.find((it) => {
        const { x, width } = document
          .getElementById("tab-" + it.fullPath)
          .getBoundingClientRect();
        if (x < clientX && clientX < x + width) {
          return it;
        }
      });
      if (this.selectRoute) {
        this.showLeftMenu = this.isLeftLast(this.selectRoute);
        this.showRightMenu = this.isRightLast(this.selectRoute);
        const screenWidth = document.body.clientWidth;
        this.contextMenuStyle.left =
          (clientX + 130 > screenWidth
            ? clientX - 130 - x - 15
            : clientX - x + 15) + "px";
        this.contextMenuStyle.top = "15px";
        this.showContextMenu = true;
      }
    },
    clickTab(route) {
      const query = route.props.name.split("?")[1];
      this.$router.push({ path: route.props.name, query: qs.parse(query) });
    },
    removeTab(name) {
      const findItem = this.state.visitedView.find(
        (it) => it.fullPath === name
      );
      if (findItem) {
        store.removeVisitedView(findItem).then((_) => {
          if (this.currentTab === name) {
            this.currentTab =
              this.state.visitedView[
                this.state.visitedView.length - 1
              ].fullPath;
            this.$router.push(this.currentTab);
          }
        });
      }
    },
    // context menu actions
    isLeftLast(tempRoute) {
      return this.state.visitedView.indexOf(tempRoute) === 0;
    },
    isRightLast(tempRoute) {
      return (
        this.state.visitedView.indexOf(tempRoute) ===
        this.state.visitedView.length - 1
      );
    },
    refreshRoute() {
      this.$router.replace({ path: "/redirect" + this.$route.path });
    },
    closeLeft() {
      store.closeLeftVisitedView(this.selectRoute).then((_) => {
        if (this.$route.fullPath !== this.selectRoute.fullPath) {
          this.$router.push(
            this.state.visitedView[this.state.visitedView.length - 1].fullPath
          );
        }
      });
    },
    closeRight() {
      store.closeRightVisitedView(this.selectRoute).then((_) => {
        if (this.$route.fullPath !== this.selectRoute.fullPath) {
          this.$router.push(
            this.state.visitedView[this.state.visitedView.length - 1].fullPath
          );
        }
      });
    },
    closeAll() {
      store.closeAllVisitedView(this.selectRoute).then((_) => {
        this.$router.push(
          this.state.visitedView[this.state.visitedView.length - 1].fullPath
        );
      });
    },
    closeMenu() {
      this.showContextMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.vaw-tab-bar-container {
  position: relative;
  height: $tabHeight;
  line-height: $tabHeight;
  box-sizing: border-box;
  white-space: nowrap;
  background-color: var(--el-color-white);
  box-shadow: 0px 5px 10px #dddddd;
  .contex-menu-wrapper {
    position: absolute;
    width: 130px;
    z-index: 999;
    list-style: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
    padding-left: 0;
    & > li {
      width: 100%;
      line-height: 40px;
      padding-left: 15px;
      box-sizing: border-box;
    }
    & > li:hover {
      background-color: #f5f5f5;
    }
  }
  .humburger-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    :deep {
      .fold-wrapper {
        margin-top: calc(50% - 10px);
      }
    }
  }
  .tab-humburger-wrapper {
    margin-left: 40px;
    transition: margin-left $transitionTime;
  }
  .tab-no-humburger-wrapper {
    margin-left: 0;
    transition: margin-left $transitionTime;
  }
}
:deep {
  .el-tabs--card > .el-tabs__header {
    border: none;
    margin: 0;
    padding: 0 10px;
    .el-tabs__nav {
      border: none !important;
    }
    .el-tabs__item {
      height: calc(#{$tabHeight} - 12px);
      line-height: calc(#{$tabHeight} - 14px);
      border-radius: 2px;
      font-size: 12px;
      border: 1px solid var(--el-border-color-light);
      background-color: var(--el-color-white);
      padding: 0 10px !important;
      font-weight: normal;
    }
    .el-tabs__item.is-active {
      color: var(--el-color-white);
      border: 1px solid var(--el-color-primary) !important;
      background-color: var(--el-color-primary);
    }
    // .el-tabs__item.is-active::before {
    //   content: "";
    //   width: 7px;
    //   height: 7px;
    //   display: inline-block;
    //   background-color: var(--el-color-white);
    //   border: 1px solid var(--el-color-primary-light-6);
    //   border-radius: 50%;
    //   margin-right: 5px;
    // }
    .el-tabs__item:hover {
      border: 1px solid var(--el-color-primary) !important;
    }
  }

  .el-tabs__item + .el-tabs__item {
    margin-left: 10px;
  }
}
</style>
