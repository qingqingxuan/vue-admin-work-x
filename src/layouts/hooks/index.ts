export { default as useLayoutStore } from './useLayoutStore'

export function usePrimaryColor(color: string) {
  const el = document.documentElement as HTMLElement
  el.style.setProperty('--el-color-primary', color)
}