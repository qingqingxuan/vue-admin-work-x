import { isArray } from '@/utils/utils'
import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const currentRoles = store.state.user.roles
  if (value && isArray(value)) {
    const checkResult = value.some(role => {
      let tempRole = role
      if (!tempRole.startsWith('ROLE_')) {
        tempRole = 'ROLE_' + tempRole
      }
      return !!currentRoles.find(it => it.roleCode === tempRole)
    })
    if (!checkResult) {
      el.parentElement && el.parentElement.removeChild(el)
    }
  } else {
    throw new Error('please set value')
  }
}

export default {
  inserted(el, binding, vnode) {
    checkPermission(el, binding)
  },
  update(el, binding, vnode) {
    checkPermission(el, binding)
  }
}
