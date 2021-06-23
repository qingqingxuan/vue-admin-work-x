import { App } from 'vue';
import draggable from './draggable'

const install = function (app: App) {
  app.directive('draggable', draggable)
}

draggable.install = install

export default draggable
