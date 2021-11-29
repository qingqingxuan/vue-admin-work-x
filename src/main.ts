import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './utils/router'
import store, { key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/icons/iconfont/iconfont.css'
import '@/icons/iconfont/iconfont.js'
import '@/styles/main.css'
import LayoutStore from '@/layouts'
import http from '@/api/http'
import { registerComponents } from './components'
import dragger from './directive/draggable/index'

import '../mock/index.ts'

import './setting'

const app = createApp(App)
registerComponents(app)
app.use(LayoutStore, {
  state: {
    layoutMode: 'ltr',
  },
  actions: {
    onPersonalCenter() {
      router.push({path: '/personal', query: { uid: 1 }})
    },
    onLogout() {
      store.dispatch('user/logout').then(() => {
        router
          .replace({ path: '/login', query: { redirect: '/' } })
          .then(() => {
            window.location.reload()
          })
      })
    },
  },
})
app.use(store, key).use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(http)
app.use(dragger)
app.mount('#app')
