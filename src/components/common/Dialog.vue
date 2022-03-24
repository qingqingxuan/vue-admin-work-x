<template>
  <el-dialog
    ref="dialogRef"
    :title="innerTitle"
    v-model="dialogVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="isMobileScreen ? '85%' : '45%'"
    draggable
  >
    <div class="dialog__content-wrapper">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer-button"> </slot>
        <el-button
          v-if="showCancel"
          size="small"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          @click="onConfirm"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
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
  setup(props, { expose }) {
    const innerTitle = computed(() => props.title || "提示");
    const dialogRef = ref();
    const dialogVisible = ref(false);
    const loading = ref(false);
    const store = useLayoutStore();
    const _callback = ref();
    const isMobileScreen = computed(() => {
      return store.state.device === "mobile";
    });
    function show(callback: () => void) {
      dialogVisible.value = true;
      loading.value = false;
      nextTick(() => {
        const contentElement = document.querySelector(
          ".dialog__content-wrapper"
        );
        contentElement?.scrollTo({ top: 0 });
      });
      _callback.value = callback;
    }
    function close() {
      dialogVisible.value = false;
      loading.value = false;
    }
    function onConfirm() {
      if (_callback.value) {
        _callback.value(dialogRef.value);
      } else {
        close();
      }
    }
    function showLoading() {
      loading.value = true;
    }
    function closeLoading() {
      loading.value = false;
    }
    expose({
      show,
      close,
      showLoading,
      closeLoading,
    });
    return {
      dialogRef,
      dialogVisible,
      loading,
      isMobileScreen,
      innerTitle,
      onConfirm,
      close,
      show,
      showLoading,
      closeLoading,
    };
  },
});
</script>

<style lang="scss">
.dialog__content-wrapper {
  max-height: 50vh;
  padding: 10px 5px;
  margin: -10px;
  overflow: auto;
  .base-form-container {
    padding: 5px 20px;
  }
}
</style>
