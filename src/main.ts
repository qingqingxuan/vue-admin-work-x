import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import LayoutStore from "vaw-layouts-x";

const app = createApp(App);
app.use(LayoutStore, {
  state: {
    layoutMode: "ltr",
  },
  actions: {},
});
app.use(store).use(router);
app.use(ElementPlus);
app.mount("#app");
