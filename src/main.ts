import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/router";
import store, { key } from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/main.css"

import LayoutStore from "vaw-layouts-x";
import http from "@/api/http";
import * as urlPath from "@/api/url";

import "../mock";
import { mapState } from "vuex";
import { ParentState } from "./store/types";

const app = createApp(App);
app.config.globalProperties.$urlPath = urlPath;
app.config.globalProperties.$isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
app.config.globalProperties.$isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
app.use(LayoutStore, {
  state: {
    layoutMode: "ltr",
    ...mapState<ParentState>({
      nickName: (state: ParentState) => state.user.nickName,
      avatar: (state: ParentState) => state.user.avatar
    })
  },
  actions: {
    onLogout() {
      store.dispatch('user/logout').then(() => {
        router.replace('/login')
      })
    }
  },
  registerElement: false,
});
app.use(store, key).use(router);
app.use(ElementPlus);
app.use(http);
app.mount("#app");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isMobile: boolean;
    $isAndroid: boolean;
  }
}
