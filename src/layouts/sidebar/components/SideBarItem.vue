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

<script lang="ts">
import path from 'path'
import MenuItem from './MenuItem.vue'
import SubMenuItem from './SubMenuItem.vue'
import { isExternal } from '../../utils'
import { defineComponent, computed, reactive, ref } from 'vue'
export default defineComponent({
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
  setup(props) {
    const showRoute = ref({})
    function isSubMenu() {
      const tempShowRoutes = props.item.children
        ? props.item.children.filter((it: any) => {
            if (it.hidden) {
              return false
            } else {
              showRoute.value = it
              return true
            }
          })
        : []
      if (tempShowRoutes.length === 1) {
        return false
      }
      if (tempShowRoutes.length === 0) {
        showRoute.value = {
          ...props.item,
          path: '',
          noChildren: true
        }
        return false
      }
      return true
    }
    function generatorPath(childPath: string) {
      if (isExternal(childPath)) {
        return childPath
      }
      if (isExternal(props.fullPath)) {
        return childPath
      }
      return path.resolve(props.fullPath, childPath)
    }
    const sideBarComponent = computed(() => {
      if (isSubMenu()) {
        return 'SubMenuItem'
      }
      return 'MenuItem'
    })
    return {
      showRoute,
      generatorPath,
      isSubMenu,
      sideBarComponent
    }
  }
})
</script>
