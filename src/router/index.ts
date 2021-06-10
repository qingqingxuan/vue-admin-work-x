import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

import LayoutStore, { Layout } from "vaw-layouts-x";

const routes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "index",
        name: "Home",
        component: Home,
        meta: {
          title: "首页",
          affix: true,
        },
      },
    ],
  },
];

LayoutStore.initPermissionRoute(routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
