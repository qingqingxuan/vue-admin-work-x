import { UnwrapNestedRefs } from "@vue/reactivity";
import { RouteRecordRaw } from "vue-router";
export type LayoutMode = "ltr" | "lcr" | "ttb";

export type Device = "pc" | "mobile" | "pad";

export declare interface UserInfo {
  nickName: string;
  avatar: string;
  [propsName: string]: any;
}

export declare interface ActionItem {
  showSearch: boolean;
  showMessage: boolean;
  showFullScreen: boolean;
  showRefresh: boolean;
}

export interface StoreState {
  isCollapse: boolean;
  isFixedNavBar: boolean;
  layoutMode: string;
  device: Device;
  theme: string;
  primaryColor: string;
  actionItem: UnwrapNestedRefs<ActionItem>;
  permissionRoutes: Array<RouteRecordRaw>;
  visitedView: UnwrapNestedRefs<Array<RouteRecordRaw>>;
  cachedView: Array<string>;
}

export type RouteRecordRawWithHidden = RouteRecordRaw & {
  hidden: boolean;
  children: RouteRecordRawWithHidden[];
};

export interface LocalLayoutStore {
  state: UnwrapNestedRefs<StoreState>;
  initPermissionRoute(routes: any): void;
  reset: () => void;
  isEmptyPermissionRoute: () => boolean;
  start(option: any): void;
  addCachedView: (route: RouteRecordRaw) => void;
  removeCachedView: (route: RouteRecordRaw) => void;
  resetCachedView: () => void;
  addVisitedView: (route: any) => Promise<any>;
  removeVisitedView: (route: RouteRecordRaw) => Promise<RouteRecordRaw>;
  closeLeftVisitedView: (selectRoute: RouteRecordRaw) => void;
  closeRightVisitedView: (selectRoute: RouteRecordRaw) => void;
  closeAllVisitedView: () => Promise<void>;
  persistentVisitedView: () => void;
  restoreVisitedView: () => void;
  toggleCollapse: (isCollapse: boolean) => void;
  toggleFixedNavBar: (isFixedNavBar: boolean) => void;
  changeTheme: (themeId: any) => void;
  changeLayoutMode: (layoutId: any) => void;
  changeDevice: (device: string) => void;
  isShowHeader: () => boolean;
  onLogout?: () => void;
  onPersonalCenter?: () => void;
  cancelLogout?: () => void;
  saveSetting: (setting: any) => void;
}
