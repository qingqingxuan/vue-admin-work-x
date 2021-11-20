import { UnwrapNestedRefs } from '@vue/reactivity';
import { RouteRecordRaw } from 'vue-router';
export type LayoutMode = 'ltr' | 'lcr' | 'ttb'

export type Device = 'pc' | 'mobile' | 'pad'

export type Theme = 'dark' | 'light' | 'blue-side' | 'dark_side'

export type ThemeColor = 'theme_color_blue' | 'theme_color_red' | 'theme_color_purple' | 'theme_color_cyan'

export declare interface UserInfo {
  nickName: string;
  avatar: string;
  [propsName: string]: any
}

export declare interface ActionItem {
  showSearch?: boolean;
  showMessage?: boolean;
  showFullScreen?: boolean;
  showRefresh?: boolean
}

export interface StoreState {
  isCollapse: boolean,
  isFixedNavBar: boolean,
  layoutMode: LayoutMode,
  device: Device,
  theme: Theme,
  themeColor: ThemeColor,
  userInfo: UserInfo,
  actionItem: ActionItem,
  permissionRoutes: Array<RouteRecordRawWithHidden>,
  visitedView: Array<RouteRecordRaw>,
  cachedView: Array<string>,
}

export type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }


export interface LocalLayoutStore {
  state: UnwrapNestedRefs<StoreState>;
  initPermissionRoute(routes: any): void;
  setUserInfo(userInfo: any): void;
  reset: () => void;
  isEmptyPermissionRoute: () => boolean;
  start(option: any): void;
  addCachedView: (route: RouteRecordRaw) => void,
  removeCachedView: (route: RouteRecordRaw) => void
  resetCachedView: () => void
  addVisitedView: (route: any) => Promise<any>,
  removeVisitedView: (route: RouteRecordRaw) => Promise<RouteRecordRaw>,
  closeLeftVisitedView: (selectRoute: RouteRecordRaw) => void
  closeRightVisitedView: (selectRoute: RouteRecordRaw) => void
  closeAllVisitedView: () => Promise<void>
  persistentVisitedView: () => void
  restoreVisitedView: () => void
  toggleCollapse: (isCollapse: boolean) => void
  changeTheme: (themeId: any) => void
  changeLayoutMode: (layoutId: any) => void
  onLogout?: () => void
  onPersonalCenter?: () => void
  cancelLogout?: () => void
}
