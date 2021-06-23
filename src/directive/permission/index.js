import permission from './permission'

permission.install = function (Vue) {
  Vue.directive('permission', permission)
}

export default permission
