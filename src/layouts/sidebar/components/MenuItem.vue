<template>
  <el-menu-item
    :index="generatorPath()"
    @click="handleClick"
  >
    <SvgIcon :icon-class="showRoute.meta ? showRoute.meta.icon || 'el-icon-menu' : 'el-icon-menu'" />
    <template #title>
      <span>{{ showRoute.meta ? showRoute.meta.title : showRoute.name }}</span>
      <MenuItemTip
        :value="showRoute.meta ? showRoute.meta.badge || '' : ''"
        :is-dot="showRoute.meta ? showRoute.meta.badge === 'dot' : false"
      />
    </template>
  </el-menu-item>
</template>

<script>
import { isExternal } from '../../utils'
import path from 'path'
export default {
  name: 'MenuItem',
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
    },
    showRoute: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    generatorPath() {
      if (isExternal(this.fullPath)) {
        return this.fullPath
      }
      if (isExternal(this.showRoute.path)) {
        return this.showRoute.path
      }
      return path.resolve(this.fullPath, this.showRoute.path)
    },
    handleClick() {
      if (isExternal(this.showRoute.path)) {
        window.open(this.showRoute.path)
      } else if (isExternal(this.fullPath)) {
        window.open(this.fullPath)
      } else if (
        this.$route.path !== path.resolve(this.fullPath, this.showRoute.path)
      ) {
        this.$router.push({
          path: path.resolve(this.fullPath, this.showRoute.path)
        })
      }
    }
  }
}
</script>
