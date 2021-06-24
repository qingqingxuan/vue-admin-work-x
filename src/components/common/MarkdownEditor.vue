<template>
  <div
    class="editor-wrapper"
    :style="{ zIndex: zIndex, height: height + 50 + 'px'}"
  >
    <textarea id="markdownEditor"></textarea>
  </div>
</template>

<script lang="ts">
import "simplemde/dist/simplemde.min.css";
import "font-awesome/css/font-awesome.min.css";
import SimpleMDE from "simplemde";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  watch,
} from "@vue/runtime-core";
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
  setup(props, { emit }) {
    let simpleMDE: SimpleMDE | null = null;
    const innerInput = ref(false);
    const init = () => {
      simpleMDE = new SimpleMDE({
        element: document.getElementById("markdownEditor") as HTMLElement,
        spellChecker: false,
        placeholder: props.placeholder,
        hideIcons: ["side-by-side", "fullscreen"],
      });
      simpleMDE.codemirror.on("change", () => {
        innerInput.value = true;
        const val = simpleMDE?.value();
        emit("update:modelValue", val);
      });
    };
    const addText = (text: string) => {
      simpleMDE?.value(simpleMDE?.value() + text);
    };
    const addImage = (imgInfo: string) => {
      simpleMDE?.value(simpleMDE?.value() + imgInfo);
    };
    onMounted(init);
    const value = toRef(props, "modelValue");
    watch(value, (newVal) => {
      if (innerInput.value) {
        innerInput.value = false;
      } else {
        simpleMDE?.value(newVal.toString());
      }
    });
    return {
      innerInput,
      addText,
      addImage,
    };
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
