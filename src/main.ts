import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/router";
import store, { key } from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import "@/styles/main.css"
import "@/icons/iconfont/iconfont.css"
import "@/icons/iconfont/iconfont.js"
import LayoutStore from "vaw-layouts-x";
import http from "@/api/http";
import * as urlPath from "@/api/url";
import { registerComponents } from "./components";
import { TinyEmitter } from 'tiny-emitter'
import * as _ from 'lodash'
import dragger from "./directive/draggable/index";
import * as echarts from 'echarts'

import "../mock/index.ts";

const app = createApp(App);
app.config.globalProperties.$urlPath = urlPath;
app.config.globalProperties.$isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
app.config.globalProperties.$isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
app.config.globalProperties.$emitter = new TinyEmitter();
app.config.globalProperties.$_ = _
app.config.globalProperties.$echarts = echarts
registerComponents(app);
app.use(LayoutStore, {
  state: {
    layoutMode: 'ltr'
  },
  actions: {
    onPersonalCenter() {
      router.push('/personal')
    },
    onLogout() {
      store.dispatch('user/logout').then(() => {
        router.replace('/login')
      })
    }
  },
  registerElement: false,
});
app.use(store, key).use(router);
app.use(ElementPlus, { locale });
app.use(http);
app.use(dragger)
app.mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isMobile: boolean;
    $isAndroid: boolean;
    $emitter: TinyEmitter;
    $echarts: echarts.ECharts;
    mEmit: TinyEmitter;
    $_: typeof _;
  }
}
