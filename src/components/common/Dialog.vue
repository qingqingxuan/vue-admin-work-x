<template>
  <el-dialog
    :title="innerTitle"
    v-model="dialogVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="isMobileScreen ? '85%' : '45%'"
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
import { defineComponent } from "@vue/runtime-core";
import { DialogConfig } from "../types";
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
  data() {
    return {
      dialogVisible: false,
      innerTitle: this.title,
      autoClose: false,
      showSubmitLoading: false,
      loading: false,
    };
  },
  computed: {
    isMobileScreen(): boolean {
      return this.$layoutStore.state.device === "mobile";
    },
  },
  methods: {
    show(config?: DialogConfig): Promise<any> {
      config?.beforeShowAction && config.beforeShowAction();
      this.autoClose = config?.autoClose || false;
      this.showSubmitLoading = config?.showSubmitLoading || false;
      this.innerTitle = config?.innerTitle || this.title || "提示";
      this.dialogVisible = true;
      this.loading = false;
      return new Promise((resolve) => {
        (this as any).resolve = resolve;
      });
    },
    close(afterAction?: () => void | null) {
      this.dialogVisible = false;
      afterAction && afterAction();
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    onConfirm() {
      if (this.autoClose) {
        this.dialogVisible = false;
      }
      if (this.showSubmitLoading) {
        this.loading = true;
      }
      (this as any).resolve(this);
    },
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
