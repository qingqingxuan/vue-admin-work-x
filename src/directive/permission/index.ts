import { App } from 'vue'
import permission from './permission'

permission.install = function (app: App) {
  app.directive('permission', permission)
}

export default permission
