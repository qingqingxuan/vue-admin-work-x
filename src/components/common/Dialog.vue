<template>
  <el-dialog
    ref="dialogRef"
    :title="innerTitle"
    v-model="dialogVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="isMobileScreen ? '85%' : '45%'"
    @vnodeMounted="onVnodeMounted"
  >
    <div class="content-wrapper">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer-button">
        </slot>
        <el-button
          v-if="showCancel"
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          size="mini"
          @click="onConfirm"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
} from "vue";
import { DialogConfig } from "../types";
import VDraggable from "@/directive/draggable/draggable";
import { useLayoutStore } from "@/layouts/hooks";
import { nextTick, ref } from "vue";
export default defineComponent({
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, {expose}) {
    const innerTitle = ref(props.title || '提示')
    const dialogRef = ref()
    const dialogVisible = ref(false);
    const loading = ref(false);
    const store = useLayoutStore();
    const _resolve = ref()
    const isMobileScreen = computed(() => {
      return store.state.device === "mobile";
    });
    function show(): Promise<any> {
      dialogVisible.value = true;
      loading.value = false;
      nextTick(() => {
        const contentElement = document.querySelector(".content-wrapper");
        contentElement?.scrollTo({ top: 0 });
      });
      return new Promise((resolve) => {
        _resolve.value = resolve
      })
    }
    function onVnodeMounted() {
      VDraggable.mounted(dialogRef.value?.$el.nextElementSibling);
    }
    function close() {
      dialogVisible.value = false;
      loading.value = false
    }
    function onConfirm() {
      _resolve.value(dialogRef.value)
    }
    expose({
      show,
      close,
      loading
    })
    return {
      dialogRef,
      dialogVisible,
      loading,
      isMobileScreen,
      innerTitle,
      onConfirm,
      close,
      show,
      onVnodeMounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.content-wrapper {
  max-height: 50vh;
  padding: 5px;
  margin: -10px;
  overflow: auto;
}
.light {
  .content-wrapper {
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
