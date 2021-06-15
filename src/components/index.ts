import { App } from "vue"

export function registerComponents(app: App): void {
  const components = require.context('./', true, /\.vue$/)
  components.keys().forEach(it => {
    const component = components(it)
    app.component(component.default.name, component.default)
  })
}