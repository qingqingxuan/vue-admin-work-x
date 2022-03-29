<template>
  <el-card
    id="tableBody"
    :body-style="{padding: 0}"
    class="table-body-container table-container"
    shadow="never"
  >
    <slot name="header"></slot>
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
