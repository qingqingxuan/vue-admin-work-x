<template>
  <el-sub-menu
    :index="generatorPath(item.path)"
    popper-append-to-body
  >
    <template #title>
      <SvgIcon :icon-class="item.meta ? item.meta.icon || 'el-icon-menu' : 'el-icon-menu'" />
      <span>{{ item.meta ? item.meta.title : item.name }}</span>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>

<script lang="ts">
import { isExternal } from '../../utils'
import path from 'path'
import store from '../../store'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SubMenuItem',
  props: {
    fullPath: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    function generatorPath(childPath: string) {
      if (isExternal(props.fullPath)) {
        return props.fullPath
      }
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(props.fullPath, props.item.path)
    }
    return {
      state: store.state,
      generatorPath
    }
  }
})
</script>