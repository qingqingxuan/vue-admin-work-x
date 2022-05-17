import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";

import { Layout, mapTwoLevelRouter } from "@/layouts";

/**
 * 这里存放一些系统必要的路由，不需要权限控制。如：登录、重定向、404等，可以根据自己的实际情况进行修改
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)*",
        component: (): any => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    hidden: true,
    component: (): any => import("@/views/exception/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: Login,
  },
  {
    path: "/personal",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "",
        name: "Personal",
        component: (): any => import("@/views/personal/index.vue"),
        meta: {
          title: "个人中心",
        },
      },
    ],
  },
  {
    path: "/",
    redirect: "/index/home",
    hidden: true,
  },
];

/**
 * 这里存放一些需要进行权限控制的页面，但是不需要在菜单接口返回的路由信息，如某些页面的二级详情页面。
 */
export const asyncRoutes = [
  {
    path: "/index",
    name: "root",
    component: Layout,
    meta: {
      title: "Dashboard",
      icon: "HouseIcon",
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: (): any => import("@/views/index/main.vue"),
        meta: {
          title: "主控台",
          affix: true,
          cacheable: true,
        },
      },
      {
        path: "work-place",
        name: "WorkPlace",
        component: (): any => import("@/views/index/work-place.vue"),
        meta: {
          title: "工作台",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter([...constantRoutes, ...asyncRoutes]),
});

export default router;
