<template>
  <el-menu-item
    :index="generatorPath()"
    @click="handleClick"
  >
    <!-- <SvgIcon :icon-class="showRoute.meta ? showRoute.meta.icon || 'el-icon-menu' : 'el-icon-menu'" /> -->
    <el-icon>
      <component :is="showRoute.meta ? showRoute.meta.icon || MenuIcon : MenuIcon" />
    </el-icon>
    <template #title>
      <span>{{ showRoute.meta ? showRoute.meta.title : showRoute.name }}</span>
      <MenuItemTip
        :value="showRoute.meta ? showRoute.meta.badge || '' : ''"
        :is-dot="showRoute.meta ? showRoute.meta.badge === 'dot' : false"
      />
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { isExternal } from "../../utils";
import path from "path";
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu as MenuIcon } from "@element-plus/icons";
export default defineComponent({
  name: "MenuItem",
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
    showRoute: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    function generatorPath() {
      if (isExternal(props.fullPath)) {
        return props.fullPath;
      }
      if (isExternal(props.showRoute.path)) {
        return props.showRoute.path;
      }
      return path.resolve(props.fullPath, props.showRoute.path);
    }
    function handleClick() {
      if (isExternal(props.showRoute.path)) {
        window.open(props.showRoute.path);
      } else if (isExternal(props.fullPath)) {
        window.open(props.fullPath);
      } else if (
        route.path !== path.resolve(props.fullPath, props.showRoute.path)
      ) {
        console.log(path.resolve(props.fullPath, props.showRoute.path));

        router.push({
          path: path.resolve(props.fullPath, props.showRoute.path),
        });
      }
    }
    return {
      generatorPath,
      handleClick,
      MenuIcon,
    };
  },
});
</script>
