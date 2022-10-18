<template>
  <div
    class="editor-wrapper"
  >
  功能开发中
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  watch,
} from "vue";
export default defineComponent({
  name: "MarkdowEditor",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    height: {
      type: [Number, String],
      default: "auto",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.editor-wrapper {
  position: relative;
  :deep(.CodeMirror) {
    height: calc(100% - 50px);
  }
}
.light {
  .editor-wrapper,
  :deep(.CodeMirror) {
    background-color: #fff !important;
  }
}
</style>
<style>
.light .CodeMirror {
  background-color: #fff !important;
}
</style>
