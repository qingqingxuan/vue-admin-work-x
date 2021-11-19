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

<script>
import { isExternal } from '../../utils'
import path from 'path'
import store from '../../store'
export default {
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
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    generatorPath(childPath) {
      if (isExternal(this.fullPath)) {
        return this.fullPath
      }
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(this.fullPath, this.item.path)
    }
  }
}
</script>