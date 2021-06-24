<template>
  <el-dialog
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
import { defineComponent } from "@vue/runtime-core";
import { DialogConfig } from "../types";
import VDraggable from "@/directive/draggable/draggable";
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
      (this as any).validator = config?.validator;
      this.$nextTick(() => {
        const contentElement = document.querySelector(".content-wrapper");
        contentElement?.scrollTo({ top: 0 });
      });
      return new Promise((resolve) => {
        (this as any).resolve = resolve;
      });
    },
    onVnodeMounted() {
      VDraggable.mounted(this.$el.nextElementSibling);
    },
    close(afterAction?: () => void | null) {
      this.dialogVisible = false;
      afterAction && afterAction();
    },
    closeSubmitLoading() {
      this.loading = false;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    onConfirm() {
      if (this.autoClose) {
        this.dialogVisible = false;
      }
      const slotItems = this.$slots.content ? this.$slots.content() : null;
      if (slotItems) {
        for (let index = 0; index < slotItems.length; index++) {
          const it = slotItems[index];
          if (it && it.props) {
            const formItems = it.props["form-items"];
            if (formItems) {
              const validate = formItems.every((it: any) => {
                return it.validator
                  ? it.validator.call(
                      this,
                      it,
                      formItems.find(
                        (item: any) => it.associatedOption === item.name
                      )
                    )
                  : true;
              });
              if (!validate) {
                return;
              }
            }
          }
        }
      }
      if ((this as any).validator) {
        if (!(this as any).validator()) {
          return;
        }
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
