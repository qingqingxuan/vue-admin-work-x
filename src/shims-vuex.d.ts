/* eslint-disable */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { ParentState } from './store/types'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<ParentState>;
  }
}
