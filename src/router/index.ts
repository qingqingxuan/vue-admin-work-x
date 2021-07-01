import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";

import { Layout } from "vaw-layouts-x";

export const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)*',
        component: (): any => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    component: (): any => import('@/views/exception/404.vue')
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
        component: (): any => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
        },
      }
    ]
  },
  {
    path: '/',
    redirect: '/index/home',
    hidden: true
  },
  {
    path: "/index",
    name: "root",
    component: Layout,
    meta: {
      title: "Dashboard",
      icon: 'dashboard-fill'
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: (): any => import('@/views/index/main.vue'),
        meta: {
          title: "主控台",
          affix: true,
          cacheable: true,
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
