<template>
  <div class="main-container">
    <div class="editor-container">
      <MarkdownEditor
        ref="markdownEditor"
        v-model="editorText"
        :height="400"
        placeholder="Insert here…"
      />
    </div>
    <div class="margin-top-lg">
      <el-button
        size="small"
        @click="addText"
      >增加文本</el-button>
      <el-button
        size="small"
        @click="addImage"
      >增加图片</el-button>
      <el-button
        size="small"
        type="primary"
        @click="getHTML"
      >预览HTML</el-button>
    </div>
    <div
      v-if="priviewContent"
      class="priview-content padding-xs margin-top"
      v-html="priviewContent"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownEditor from "@/components/common/MarkdownEditor.vue";
import { ref } from "vue";
import SimpleMDE from "simplemde";

const editorText = ref("");
const priviewContent = ref("");

const markdownEditor = ref<typeof MarkdownEditor>();

function addText() {
  markdownEditor.value?.addText("\n### 新增内容");
}
function addImage() {
  markdownEditor.value?.addImage(
    "\n![](http://qingqingxuan.gitee.io/img/logo.png)"
  );
}
function getHTML() {
  priviewContent.value = (SimpleMDE.prototype as any).markdown(
    editorText.value
  );
}
</script>

<style lang="scss" scoped>
.editor-container {
  position: relative;
}
.theme-dark .priview-content {
  background: #5a5a5a;
  color: #fff;
}
.priview-content {
  background: #fff;
  color: #333;
}
</style>
