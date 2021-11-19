<template>
  <el-dialog
    ref="dialog"
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
} from "@vue/runtime-core";
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
  setup(props) {
    const dialog = ref();
    const dialogVisible = ref(false);
    const innerTitle = ref(props.title);
    const autoClose = ref(false);
    const showSubmitLoading = ref(false);
    const loading = ref(false);
    const store = useLayoutStore();
    let resolve = null;
    const isMobileScreen = computed(() => {
      return store.state.device === "mobile";
    });
    function show(config?: DialogConfig): Promise<any> {
      config?.beforeShowAction && config.beforeShowAction();
      autoClose.value = config?.autoClose || false;
      showSubmitLoading.value = config?.showSubmitLoading || false;
      innerTitle.value = config?.innerTitle || props.title || "提示";
      dialogVisible.value = true;
      loading.value = false;
      nextTick(() => {
        const contentElement = document.querySelector(".content-wrapper");
        contentElement?.scrollTo({ top: 0 });
      });
      return new Promise((res) => {
        resolve = res;
      });
    }
    function onVnodeMounted() {
      VDraggable.mounted(dialog.value?.$el.nextElementSibling);
    }
    function close(afterAction?: () => void | null) {
      dialogVisible.value = false;
      afterAction && afterAction();
    }
    function closeSubmitLoading() {
      loading.value = false;
    }
    function toggle() {
      dialogVisible.value = !dialogVisible.value;
    }
    function onConfirm() {
      if (autoClose.value) {
        dialogVisible.value = false;
      }
      const slotItems = dialog.value.$slots.content
        ? dialog.value.$slots.content()
        : null;
      if (slotItems) {
        for (let index = 0; index < slotItems.length; index++) {
          const it = slotItems[index];
          if (it && it.props) {
            const formItems = it.props["form-items"];
            if (formItems) {
              const validate = formItems.every((it: any) => {
                return it.validator
                  ? it.validator(
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
    }
    return {
      dialog,
      dialogVisible,
      innerTitle,
      autoClose,
      showSubmitLoading,
      loading,
      isMobileScreen,
      onConfirm,
      toggle,
      closeSubmitLoading,
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
