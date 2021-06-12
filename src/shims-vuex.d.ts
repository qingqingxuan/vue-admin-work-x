import { ParentState } from "./store/types";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<ParentState>;
  }
}
