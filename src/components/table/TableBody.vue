<template>
  <el-card :body-style="{padding: 0}" class="table-container" :style="cardStyle" shadow="never">
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import TableBodyMixin from "@/mixins/TableBodyMixin";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "TableBody",
  mixins: [TableBodyMixin],
});
</script>
