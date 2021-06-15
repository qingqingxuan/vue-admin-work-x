import { createRouter, createWebHashHistory } from "vue-router";
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
        component: (): any => import('@/views/index/main.vue'),
        meta: {
          title: "主控台",
          affix: true,
        },
      },
      {
        path: "work-place",
        name: "WorkPlace",
        component: (): any => import('@/views/index/work-place.vue'),
        meta: {
          title: "工作台",
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
