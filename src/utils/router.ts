import LayoutStore, { Layout } from 'vaw-layouts-x';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router, { routes as constantRoutes } from "../router";
import Cookies from "js-cookie";
import { post } from '@/api/http';
import store from '@/store';
import { baseAddress, getMenuListByRoleId } from '@/api/url';
import { RouteRecordRaw } from 'vue-router'
import { toHump } from '.';

NProgress.configure({
  showSpinner: false,
});


interface OriginRoute{
  menuUrl: string,
  menuName?: string,
  hidden?: boolean,
  redirect?: string,
  affix?: boolean,
  cacheable?: boolean,
  icon?: string,
  tip?: string | number,
  children: Array<OriginRoute>
}

type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

function getRoutes() {
  return post({
    url: baseAddress + getMenuListByRoleId,
    method: 'POST',
    data: {
      userId: store.getters['user/userId'],
      roleId: store.getters['user/roleId']
    }
  }).then(res => {
    return generatorRoutes(res.data)
  })
}


function getComponent(it: OriginRoute) {
  return (resolve: any) => {
    if (it.children && it.children.length > 0) {
      require(['vaw-layouts-x/src/components/RouteViewLayout.vue'], resolve)
    } else {
      require(['@/views' + it.menuUrl], resolve)
    }
  }
}

function getCharCount(str: string, char: string) {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}

function isMenu(path: string) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res.forEach(it => {
    const route: RouteRecordRawWithHidden = {
      path: it.menuUrl,
      name: getNameByUrl(it.menuUrl),
      hidden: !!it.hidden,
      redirect: it.redirect || '',
      component: isMenu(it.menuUrl) ? Layout : getComponent(it),
      meta: {
        title: it.menuName,
        affix: !!it.affix,
        cacheable: !!it.cacheable,
        icon: it.icon || '',
        tip: it.tip
      }
    }
    if (it.children) {
      route.children = generatorRoutes(it.children)
    }
    tempRoutes.push(route)
  })
  return tempRoutes
}

const whiteRoutes: string[] = ["/login"];

function isTokenExpired(): boolean {
  const token = Cookies.get("admin-token");
  return !!token;
}
router.beforeEach((to) => {
  NProgress.start();
  if (whiteRoutes.includes(to.path)) {
    NProgress.done();
    return true;
  } else {
    if (!isTokenExpired()) {
      NProgress.done();
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      };
    } else {
      const isEmptyRoute = LayoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes: Array<RouteRecordRaw> = []
        getRoutes().then(routes => {
          accessRoutes.push(...routes)
          accessRoutes.push({
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            hidden: true
          } as RouteRecordRaw)
          LayoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
          accessRoutes.forEach(it => {
            router.addRoute(it)
          })
          return { ...to, replace: true }
        })
      } else {
        return true;
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
