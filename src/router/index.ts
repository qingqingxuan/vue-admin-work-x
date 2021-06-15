import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/login/index.vue";

import { Layout } from "vaw-layouts-x";

export const routes = [
  {
    path: '/404',
    hidden: true,
    component: (): any => import('@/views/404.vue')
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: Login,
  },
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "/index",
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
