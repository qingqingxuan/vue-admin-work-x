import './styles/main.css'
import './styles/iconfont/iconfont.css'
import {
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTabs,
  ElTabPane,
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBadge,
  ElDrawer,
  ElDivider,
  ElRow,
  ElCol,
  ElSwitch,
  ElCard,
  ElPopover,
  ElInput,
  ElMessageBox,
  ElBacktop,
  ElTable,
  ElTableColumn
} from 'element-plus'
import store from './store'
import { inject, App } from 'vue'
import { LocalLayoutStore } from './types'

function registerElement(app: App) {
  app.use(ElScrollbar)
    .use(ElMenu)
    .use(ElMenuItem)
    .use(ElSubMenu)
    .use(ElBreadcrumb)
    .use(ElBreadcrumbItem)
    .use(ElTabs)
    .use(ElTabPane)
    .use(ElButton)
    .use(ElDropdown)
    .use(ElDropdownMenu)
    .use(ElDropdownItem)
    .use(ElCard)
    .use(ElBadge)
    .use(ElPopover)
    .use(ElDrawer)
    .use(ElDivider)
    .use(ElRow)
    .use(ElCol)
    .use(ElSwitch)
    .use(ElInput)
    .use(ElMessageBox)
    .use(ElBacktop)
    .use(ElTable)
    .use(ElTableColumn)
}

export function registerComponents(app: App) {
  const components = require.context('./', true, /\.vue$/)
  components.keys().forEach(it => {
    const component = components(it)
    app.component(component.default.name, component.default)
  })
}

const key = Symbol('layout_store')

function install(Vue: App, options: any) {
  registerComponents(Vue)
  if (options && options.registerElement === false) {
    console.warn('element-plus components not be registed, please check `registerElement` is `false`')
  } else {
    registerElement(Vue)
  }
  delete options.registerElement
  store.start(options)
  Vue.config.globalProperties.$layoutStore = store
  Vue.provide(key, store)
}

export function useLayoutStore() {
  return inject<LocalLayoutStore>(key, store)
}

export { default as Layout } from './Layout.vue'

export { mapTwoLevelRouter } from './utils'

export default {
  state: store.state,
  initPermissionRoute: store.initPermissionRoute,
  setUserInfo: store.setUserInfo,
  reset: store.reset,
  isEmptyPermissionRoute: store.isEmptyPermissionRoute,
  install
}
