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
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Menu1",
  setup() {
    const content = ref("");
    return {
      content,
    };
  },
});
</script>
