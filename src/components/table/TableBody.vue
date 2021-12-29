<template>
  <el-card
    :body-style="{padding: 0}"
    class="table-container"
    shadow="never"
  >
    <slot name="tableConfig"></slot>
    <slot name="default"></slot>
    <slot name="footer"></slot>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TableBody",
});
</script>
<style lang="scss" scoped>
.table-container {
  padding: 5px;
}
</style>
