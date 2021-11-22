import { LocalLayoutStore } from './../types'
import { reactive } from 'vue'
import { toHump } from '../utils'
import {
  Device,
  RouteRecordRawWithHidden,
  StoreState,
  UserInfo,
} from '../types.js'
import { RouteRecordRaw } from 'vue-router'
import { usePrimaryColor } from '../hooks'
import defaultSetting from '../../setting'
const layoutModes = ['ltr', 'lcr', 'ttb']

export default {
  state: reactive<StoreState>({
    isCollapse: false,
    isFixedNavBar: true,
    layoutMode: defaultSetting.layoutMode,
    device: 'pc',
    theme: defaultSetting.theme,
    primaryColor: defaultSetting.primaryColor,
    permissionRoutes: [],
    visitedView: [],
    cachedView: [],
    userInfo: {
      nickName: '',
      avatar: '',
    },
    actionItem: {
      showSearch: true,
      showMessage: true,
      showFullScreen: true,
      showRefresh: true,
    },
  }),
  start(options: any) {
    this.saveSetting(defaultSetting)
    options.state && (this.state = Object.assign(this.state, options.state))
    this.restoreVisitedView()
    this.onLogout = options.actions.onLogout
    this.onPersonalCenter = options.actions.onPersonalCenter
    usePrimaryColor(defaultSetting.primaryColor)
    this.changeLayoutMode(defaultSetting.layoutMode)
    this.changeTheme(defaultSetting.theme)
  },
  randomLayouMode() {
    return layoutModes[Math.floor(Math.random() * layoutModes.length)]
  },
  toggleCollapse(newStatus: boolean) {
    this.state.isCollapse = newStatus
  },
  toggleFixedNavBar(newStatus: boolean) {
    this.state.isFixedNavBar = newStatus
  },
  changeLayoutMode(mode = 'ltr') {
    this.state.layoutMode = mode
  },
  changeDevice(device: Device = 'pc') {
    this.state.device = device
  },
  changeTheme(theme = 'dark') {
    this.state.theme = theme
  },
  isShowHeader() {
    return this.state.device === 'pc' && this.state.layoutMode === 'ttb'
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter((it) => {
      return it.path && !it.hidden && it.children && it.children.length > 0
    })
  },
  initPermissionRoute(routes: Array<RouteRecordRawWithHidden>) {
    this.state.permissionRoutes = routes
  },
  isEmptyPermissionRoute() {
    return (
      !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
    )
  },
  setUserInfo(userInfo: UserInfo) {
    this.state.userInfo.nickName = userInfo ? userInfo.nickName || '' : ''
    this.state.userInfo.avatar = userInfo ? userInfo.avatar || '' : ''
  },
  saveSetting(setting: any) {
    localStorage.setItem(
      'sys_setting',
      JSON.stringify(Object.assign(defaultSetting, { ...setting }))
    )
  },
  reset() {
    this.state = reactive<StoreState>({
      isCollapse: false,
      isFixedNavBar: true,
      layoutMode: defaultSetting.layoutMode,
      device: 'pc',
      theme: defaultSetting.theme,
      primaryColor: defaultSetting.primaryColor,
      permissionRoutes: [],
      visitedView: [],
      cachedView: [],
      userInfo: {
        nickName: '',
        avatar: '',
      },
      actionItem: {
        showSearch: true,
        showMessage: true,
        showFullScreen: true,
        showRefresh: true,
      },
    })
  },
  addCachedView(route: RouteRecordRaw) {
    if (route.name && route.meta && route.meta.cacheable) {
      const humName = toHump(route.name as string)
      if (!this.state.cachedView.includes(humName)) {
        this.state.cachedView.push(humName)
      }
    }
  },
  removeCachedView(route: RouteRecordRaw) {
    const humName = toHump(route.name as string)
    const index = this.state.cachedView.indexOf(humName)
    if (index !== -1) {
      this.state.cachedView.splice(index, 1)
    }
  },
  resetCachedView() {
    // 从已经访问过的页面的数组中过滤可缓存的页面
    this.state.cachedView = this.state.visitedView
      .filter((it, _index) => {
        return it.name && it.meta && it.meta.cacheable
      })
      .map((it) => toHump(it.name as string))
  },
  addVisitedView(route: any) {
    return new Promise<any>((resolve) => {
      if (
        !this.state.visitedView.find(
          (it: any) => it.fullPath === route.fullPath
        )
      ) {
        this.state.visitedView.push(route)
        this.persistentVisitedView()
      }
      this.addCachedView && this.addCachedView(route)
      resolve(route)
    })
  },
  removeVisitedView(route: RouteRecordRaw) {
    return new Promise<RouteRecordRaw>((resolve) => {
      this.state.visitedView.splice(this.state.visitedView.indexOf(route), 1)
      this.persistentVisitedView()
      this.removeCachedView && this.removeCachedView(route)
      resolve(route)
    })
  },
  closeLeftVisitedView(selectRoute: RouteRecordRaw) {
    return new Promise<void>((resolve) => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        this.state.visitedView = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index >= selectIndex
        })
        this.persistentVisitedView()
      }
      this.removeCachedView && this.removeCachedView(selectRoute)
      resolve()
    })
  },
  closeRightVisitedView(selectRoute: RouteRecordRaw) {
    return new Promise<void>((resolve) => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        this.state.visitedView = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index <= selectIndex
        })
        this.persistentVisitedView()
      }
      this.removeCachedView && this.removeCachedView(selectRoute)
      resolve()
    })
  },
  closeAllVisitedView() {
    return new Promise<void>((resolve) => {
      this.state.visitedView = this.state.visitedView.filter((it, _index) => {
        return it.meta && it.meta.affix
      })
      this.persistentVisitedView()
      this.state.cachedView = this.state.visitedView
        .filter((route) => route.name && route.meta && route.meta.cacheable)
        .map((it) => toHump(it.name as string))
      resolve()
    })
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
      }
    })
    localStorage.setItem('visited', JSON.stringify(tempPersistendRoutes))
  },
  restoreVisitedView() {
    this.state.visitedView = [...this.state.visitedView]
    const originRouteString = localStorage.getItem('visited')
    const persistentVisitedRoutes = JSON.parse(originRouteString || '[]')
    persistentVisitedRoutes.forEach((originRoute: any) => {
      if (
        !this.state.visitedView.find(
          (it: any) =>
            it.fullPath === originRoute.fullPath && it.name === originRoute.name
        )
      ) {
        this.state.visitedView.push(originRoute)
      }
    })
  },
} as LocalLayoutStore
