<template>
  <component
    :is="sideBarComponent"
    v-if="!item.hidden"
    :full-path="fullPath"
    :item="item"
    :show-route="showRoute"
  >
    <template v-if="item.children && item.children.length !== 0">
      <SideBarItem
        v-for="child of item.children"
        :key="child.path"
        :full-path="generatorPath(child.path)"
        :item="child"
      />
    </template>
  </component>
</template>

<script>
import path from 'path'
import MenuItem from './MenuItem'
import SubMenuItem from './SubMenuItem'
import { isExternal } from '../../utils'
export default {
  name: 'SideBarItem',
  components: { MenuItem, SubMenuItem },
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
      showRoute: {}
    }
  },
  computed: {
    sideBarComponent() {
      if (this.isSubMenu()) {
        return 'SubMenuItem'
      }
      return 'MenuItem'
    }
  },
  methods: {
    isSubMenu() {
      const showRoutes = this.item.children ? this.item.children.filter((it) => {
        if (it.hidden) {
          return false
        } else {
          this.showRoute = it
          return true
        }
      }) : []
      if (showRoutes.length === 1) {
        return false
      }
      if (showRoutes.length === 0) {
        this.showRoute = {
          ...this.item,
          path: '',
          noChildren: true
        }
        return false
      }
      return true
    },
    generatorPath(childPath) {
      if (isExternal(childPath)) {
        return childPath
      }
      if (isExternal(this.fullPath)) {
        return childPath
      }
      return path.resolve(this.fullPath, childPath)
    }
  }
}
</script>
