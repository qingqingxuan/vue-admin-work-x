import { App } from 'vue'
import { USER_INFO_KEY } from './../../store/keys'
function checkPermission(el: Element, binding: any) {
  const { value } = binding
  const currentRoles = JSON.parse(
    localStorage.getItem(USER_INFO_KEY) || '{}'
  ).roles
  if (value && Array.isArray(value)) {
    const checkResult = value.some((role) => {
      let tempRole = role
      if (!tempRole.startsWith('ROLE_')) {
        tempRole = 'ROLE_' + tempRole
      }
      return !!currentRoles.find((it: any) => it.roleCode === tempRole)
    })
    if (!checkResult) {
      el.parentElement && el.parentElement.removeChild(el)
    }
  } else {
    throw new Error('please set value')
  }
}

export default {
  mounted(el: Element, binding: any) {
    checkPermission(el, binding)
  },
  install(app: App) {
    console.log('install')
  },
}
