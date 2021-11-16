<template>
  <el-scrollbar
    class="scrollbar"
    wrap-class="scrollbar-wrap-class"
  >
    <el-menu
      :default-active="$route.fullPath"
      mode="vertical"
      :collapse="state.isCollapse"
      :background-color="state.themeVariables[state.theme].menuColor"
      :text-color="state.themeVariables[state.theme].menuTextColor"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import store from '../../store'
export default {
  name: 'ScrollerMenu',
  props: {
    routes: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    fullPath: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      state: store.state
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
}
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
</style>
