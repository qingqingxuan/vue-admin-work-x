<template>
  <el-card>
    <template #header>
      <div>缓存信息</div>
    </template>
    <el-input
      v-model="content"
      placeholder="请输入信息"
    />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CacheNextChild",
  setup() {
    const content = ref("");
    return {
      content,
    };
  },
  mounted() {
    console.log("mounted");
  },
  activated() {
    console.log("activated");
  },
  deactivated() {
    console.log("deactivated");
  },
});
</script>
