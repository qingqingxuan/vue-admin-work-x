<template>
  <el-card :body-style="{padding: '10px'}">
    <template #header>
      <div>请输入内容</div>
    </template>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input
          v-model="content"
          size="small"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          size="small"
          type="primary"
          class="copy"
          :data-clipboard-text="content"
          @click="onCopy"
        >复制</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { showSuccessMessage } from "@/components/types";
import { defineComponent, ref } from "vue";
import Clipboard from "clipboard";

export default defineComponent({
  name: "Clipboard",
  setup() {
    const content = ref("");
    const onCopy = () => {
      const clipboard = new Clipboard(".copy");
      clipboard.on("success", (e) => {
        showSuccessMessage("复制成功，内容为：" + e.text);
      });
    };
    return {
      content,
      onCopy,
    };
  },
});
</script>
