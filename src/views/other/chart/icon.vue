<template>
  <el-card :body-style="{padding: '10px'}">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="icon-font"
        name="iconfont"
        lazy
      >
        <IconFont />
      </el-tab-pane>
      <el-tab-pane
        label="element-plus"
        name="elementplus"
        lazy
      >
        <ElementPlus />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IconFont from "./components/IconFont.vue";
import ElementPlus from "./components/ElementPlus.vue";

export default defineComponent({
  components: { IconFont, ElementPlus },
  setup() {
    const activeName = ref("iconfont");
    return {
      activeName,
    };
  },
});
</script>

<style>
</style>