<template>
  <component
    :is="sideBarComponent"
    v-if="!item.hidden"
    :full-path="fullPath"
    :item="item"
    :show-route="showRoute"
    @top-item-click="topItemClick"
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
import path from "path";
import MenuItem from "./MenuItem.vue";
import SubMenuItem from "./SubMenuItem.vue";
import { isExternal } from "../../utils";
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
  name: "SideBarItem",
  components: { MenuItem, SubMenuItem },
  props: {
    fullPath: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["top-item-click"],
  setup(props, { emit }) {
    const showRoute = ref({});
    function isSubMenu() {
      const tempShowRoutes = props.item.children
        ? props.item.children.filter((it: any) => {
            if (it.hidden) {
              return false;
            } else {
              showRoute.value = it;
              return true;
            }
          })
        : [];
      if (
        props.item.meta &&
        props.item.meta.isSingle &&
        tempShowRoutes.length === 1
      ) {
        return false;
      }
      if (tempShowRoutes.length === 0) {
        showRoute.value = {
          ...props.item,
          path: "",
          noChildren: true,
        };
        return false;
      }
      return true;
    }
    function generatorPath(childPath: string) {
      if (isExternal(childPath)) {
        return childPath;
      }
      if (isExternal(props.fullPath)) {
        return childPath;
      }
      return path.resolve(props.fullPath, childPath);
    }
    const sideBarComponent = computed(() => {
      if (isSubMenu()) {
        return "SubMenuItem";
      }
      return "MenuItem";
    });
    function topItemClick(item: any) {
      emit("top-item-click", item);
    }
    return {
      showRoute,
      generatorPath,
      isSubMenu,
      sideBarComponent,
      topItemClick,
    };
  },
});
</script>
