export { default as useLayoutStore } from './useLayoutStore'

export function usePrimaryColor(color: string) {
  const el = document.documentElement as HTMLElement
  el.style.setProperty('--el-color-primary', color)
  const tempColors = color.split('#')[1]
  const r = parseInt( '0x' + tempColors.slice(0, 2))
  const g = parseInt( '0x' + tempColors.slice(2, 4))
  const b = parseInt( '0x' + tempColors.slice(4, 6))
  for(let i = 1; i<=9; i++) {
    el.style.setProperty('--el-color-primary-light-' + i, `rgba(${r}, ${g}, ${b}, ${1 - i * 0.1})`)
  }
}