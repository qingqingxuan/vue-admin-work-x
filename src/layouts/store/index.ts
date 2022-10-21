import { reactive, shallowReactive } from "vue";
import { toHump } from "../utils";
import { Device, StoreState, UserInfo } from "../types.js";
import { RouteRecordRaw } from "vue-router";
import { usePrimaryColor } from "../hooks";
import defaultSetting from "../../setting";
import { omit } from "lodash";
const layoutModes = ["ltr", "lcr", "ttb"];

export default {
  state: shallowReactive<StoreState>({
    isCollapse: false,
    isFixedNavBar: true,
    layoutMode: defaultSetting.layoutMode,
    device: "pc",
    theme: defaultSetting.theme,
    primaryColor: defaultSetting.primaryColor,
    permissionRoutes: shallowReactive([]) as Array<any>,
    visitedView: shallowReactive([]) as Array<any>,
    cachedView: shallowReactive([]) as Array<any>,
    actionItem: reactive({
      showSearch: true,
      showMessage: true,
      showFullScreen: true,
      showRefresh: true,
    }),
  }),
  start(options: any) {
    this.saveSetting(defaultSetting);
    options.state && (this.state = Object.assign(this.state, options.state));
    this.restoreVisitedView();
    (this as any).onLogout = options.actions.onLogout;
    (this as any).onPersonalCenter = options.actions.onPersonalCenter;
    usePrimaryColor(defaultSetting.primaryColor);
    this.changeLayoutMode(defaultSetting.layoutMode);
    this.changeTheme(defaultSetting.theme);
  },
  randomLayouMode() {
    return layoutModes[Math.floor(Math.random() * layoutModes.length)];
  },
  toggleCollapse(newStatus: boolean) {
    this.state.isCollapse = newStatus;
  },
  toggleFixedNavBar(newStatus: boolean) {
    this.state.isFixedNavBar = newStatus;
  },
  changeLayoutMode(mode = "ltr") {
    this.state.layoutMode = mode;
  },
  changeDevice(device: Device = "pc") {
    this.state.device = device;
  },
  changeTheme(theme = "dark") {
    this.state.theme = theme;
  },
  isShowHeader() {
    return this.state.device === "pc" && this.state.layoutMode === "ttb";
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter((it) => {
      return (
        it.path && !(it as any).hidden && it.children && it.children.length > 0
      );
    });
  },
  getTopLevelItems() {
    return this.state.permissionRoutes
      .filter((it) => {
        return (
          it.path &&
          !(it as any).hidden &&
          it.children &&
          it.children.length > 0
        );
      })
      .map((it) => {
        return {
          isTopItem: true,
          items: it.children,
          ...omit(it, "children"),
        };
      });
  },
  initPermissionRoute(routes: Array<RouteRecordRaw>) {
    this.state.permissionRoutes.length = 0;
    this.state.permissionRoutes.push(...routes);
  },
  isEmptyPermissionRoute() {
    return (
      !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
    );
  },
  saveSetting(setting: any) {
    localStorage.setItem(
      "sys_setting",
      JSON.stringify(Object.assign(defaultSetting, { ...setting }))
    );
  },
  reset() {
    this.state = shallowReactive<StoreState>({
      isCollapse: false,
      isFixedNavBar: true,
      layoutMode: defaultSetting.layoutMode,
      device: "pc",
      theme: defaultSetting.theme,
      primaryColor: defaultSetting.primaryColor,
      permissionRoutes: shallowReactive([]) as Array<any>,
      visitedView: shallowReactive([]) as Array<any>,
      cachedView: shallowReactive([]) as Array<any>,
      actionItem: reactive({
        showSearch: true,
        showMessage: true,
        showFullScreen: true,
        showRefresh: true,
      }),
    });
  },
  addCachedView(route: RouteRecordRaw) {
    if (route.name && route.meta && route.meta.cacheable) {
      const humName = toHump(route.name as string);
      if (!this.state.cachedView.includes(humName)) {
        this.state.cachedView.push(humName);
      }
    }
  },
  removeCachedView(route: RouteRecordRaw) {
    const humName = toHump(route.name as string);
    const index = this.state.cachedView.indexOf(humName);
    if (index !== -1) {
      this.state.cachedView.splice(index, 1);
    }
  },
  resetCachedView() {
    // 从已经访问过的页面的数组中过滤可缓存的页面
    this.state.cachedView.length = 0;
    this.state.cachedView.push(
      ...this.state.visitedView
        .filter((it: RouteRecordRaw) => {
          return it.name && it.meta && it.meta.cacheable;
        })
        .map((it: RouteRecordRaw) => toHump(it.name as string))
    );
  },
  addVisitedView(route: any) {
    return new Promise<any>((resolve) => {
      if (
        !this.state.visitedView.find(
          (it: any) => it.fullPath === route.fullPath
        )
      ) {
        this.state.visitedView.push(route);
        this.persistentVisitedView();
      }
      this.addCachedView && this.addCachedView(route);
      resolve(route);
    });
  },
  removeVisitedView(route: RouteRecordRaw) {
    return new Promise<RouteRecordRaw>((resolve) => {
      this.state.visitedView.splice(this.state.visitedView.indexOf(route), 1);
      this.persistentVisitedView();
      this.removeCachedView && this.removeCachedView(route);
      resolve(route);
    });
  },
  closeLeftVisitedView(selectRoute: RouteRecordRaw) {
    return new Promise<void>((resolve) => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute);
      if (selectIndex !== -1) {
        const tempList = this.state.visitedView.filter(
          (it: RouteRecordRaw, index: number) => {
            return (it.meta && it.meta.affix) || index >= selectIndex;
          }
        );
        this.state.visitedView.length = 0;
        this.state.visitedView.push(...tempList);
        this.persistentVisitedView();
      }
      this.removeCachedView && this.removeCachedView(selectRoute);
      resolve();
    });
  },
  closeRightVisitedView(selectRoute: RouteRecordRaw) {
    return new Promise<void>((resolve) => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute);
      if (selectIndex !== -1) {
        const tempList = this.state.visitedView.filter(
          (it: RouteRecordRaw, index: number) => {
            return (it.meta && it.meta.affix) || index <= selectIndex;
          }
        );
        this.state.visitedView.length = 0;
        this.state.visitedView.push(...tempList);
        this.persistentVisitedView();
      }
      this.removeCachedView && this.removeCachedView(selectRoute);
      resolve();
    });
  },
  closeAllVisitedView() {
    return new Promise<void>((resolve) => {
      const tempList = this.state.visitedView.filter(
        (it: RouteRecordRaw, _index: any) => {
          return it.meta && it.meta.affix;
        }
      );
      this.state.visitedView.length = 0;
      this.state.visitedView.push(...tempList);
      this.persistentVisitedView();
      this.state.cachedView.length = 0;
      this.state.cachedView.push(
        ...this.state.visitedView
          .filter(
            (route: RouteRecordRaw) =>
              route.name && route.meta && route.meta.cacheable
          )
          .map((it: RouteRecordRaw) => toHump(it.name as string))
      );
      resolve();
    });
  },
  persistentVisitedView() {
    const tempPersistendRoutes = this.state.visitedView.map((it: any) => {
      return {
        fullPath: it.fullPath,
        meta: it.meta,
        name: it.name,
        params: it.params,
        path: it.path,
        query: it.query,
      };
    });
    localStorage.setItem("visited", JSON.stringify(tempPersistendRoutes));
  },
  restoreVisitedView() {
    this.state.visitedView.splice(0, this.state.visitedView.length);
    const originRouteString = localStorage.getItem("visited");
    const persistentVisitedRoutes = JSON.parse(originRouteString || "[]");
    persistentVisitedRoutes.forEach((originRoute: any) => {
      if (
        !this.state.visitedView.find(
          (it: any) =>
            it.fullPath === originRoute.fullPath && it.name === originRoute.name
        )
      ) {
        this.state.visitedView.push(originRoute);
      }
    });
  },
};
