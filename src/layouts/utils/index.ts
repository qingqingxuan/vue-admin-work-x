export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function toggleThemeColorClass(element: HTMLElement, className: string) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

export function toggleThemeClass(element: HTMLElement, className: string) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') !== -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str: string) {
  if (!str) return str
  return str.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  }).replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase()
  })
}

import path from 'path'
import { RouteRecordRaw } from 'vue-router'

export function mapTwoLevelRouter(srcRoutes: Array<RouteRecordRaw>) {
  function addParentRoute(routes: Array<RouteRecordRaw>, parent: Array<RouteRecordRaw>, parentPath: string) {
    routes.forEach((it) => {
      if (!isExternal(it.path)) {
        it.path = path.resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes: Array<RouteRecordRaw> = []
    srcRoutes.forEach(it => {
      const route = { ...it }
      const parentRoutes: Array<RouteRecordRaw> = []
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path)
      }
      (parentRoutes && parentRoutes.length > 0) && (route.children = parentRoutes)
      tempRoutes.push(route)
    })
    return tempRoutes
  }
  return []
}
