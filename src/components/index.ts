import { App } from "vue";
import FormRender from "./common/FormRender";

function getComponentName(key: string) {
  if (!key) {
    return "";
  }
  const paths = key.split("/");
  const name = paths
    .filter((it) => !!it && it !== ".")
    .reverse()
    .find((it) => it !== "index.vue" && it !== "index.ts" && it !== "index.js")
    ?.replace(".vue", "");
  return name || "";
}

export function registerComponents(app: App): void {
  const components = require.context("./", true, /\.vue$/);
  components.keys().forEach((it: string) => {
    const component = components(it);
    app.component(
      component.default.name || getComponentName(it),
      component.default
    );
  });
  app.component("FormRender", FormRender);
}
