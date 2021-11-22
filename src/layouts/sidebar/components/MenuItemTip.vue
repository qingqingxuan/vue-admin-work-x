<template>
  <el-badge
    :value="value"
    :is-dot="isDot"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItemTip",
  props: {
    isDot: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.el-badge {
  position: absolute;
  top: 45%;
  right: 20px;
}
.el-sub-menu__title .el-badge {
  right: 35px;
}
</style>
