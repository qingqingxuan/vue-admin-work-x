<template>
  <el-card
    :body-style="{padding: 0}"
    class="table-container"
    shadow="never"
  >
    <slot name="tableConfig"></slot>
    <slot name="default"></slot>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "TableBody",
});
</script>
<style lang="scss" scoped>
.table-container {
  margin: 10px 0;
  padding: 5px;
}
</style>
