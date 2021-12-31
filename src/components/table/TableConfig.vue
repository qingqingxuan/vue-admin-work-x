<template>
  <div
    id="tableConfigContainer"
    class="flex padding-sm align-center"
    style="border-bottom: 1px dashed var(--el-border-color-light)"
  >
    <slot name="actions"></slot>
    <div class="flex-sub"></div>
    <div>
      <SortableTable
        v-if="tableColumns && tableColumns.length > 0"
        class="margin-left"
        :table-props="tableColumns"
        @update="onUpdateTable"
      />
      <span class="margin-left-sm" />
      <el-tooltip effect="dark" content="刷新页面" placement="top">
        <el-icon class="icon-wrapper" @click="doRefresh">
          <RefreshIcon />
        </el-icon>
      </el-tooltip>
      <span class="margin-left-sm" />
      <el-tooltip effect="dark" content="全屏" placement="top">
        <el-icon class="icon-wrapper" @click="onFullScreen">
          <FullScreenIcon />
        </el-icon>
      </el-tooltip>
      <span class="margin-left-sm" />
      <el-tooltip effect="dark" content="表格边框" placement="top">
        <div
          class="icon-wrapper"
          :class="{ 'icon-wrapper__checked': border }"
          @click="onBorderClick"
        >
          B
        </div>
      </el-tooltip>
      <span class="margin-left-sm" />
      <el-tooltip effect="dark" content="斑马纹" placement="top">
        <div
          class="icon-wrapper"
          :class="{ 'icon-wrapper__checked': stripe }"
          @click="onStripClick"
        >
          S
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
  FullScreen as FullScreenIcon,
  Plus as PlusIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@element-plus/icons";
import screenfull from "screenfull";
import { ElMessage } from "element-plus";

export default defineComponent({
  emits: ["refresh", "update:tableColumns", "update:border", "update:stripe"],
  components: { RefreshIcon, FullScreenIcon },
  props: {
    tableColumns: {
      type: Array as PropType<Array<TablePropsType>>,
      default: () => [] as Array<TablePropsType>,
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const borderRef = ref(props.border);
    const stripeRef = ref(props.stripe);
    function doRefresh() {
      emit("refresh");
    }
    function onUpdateTable(newVal: Array<TablePropsType>) {
      emit("update:tableColumns", newVal);
    }
    function onFullScreen() {
      if (!screenfull.isEnabled) {
        ElMessage.error("当前浏览器不支持全屏操作");
        return false;
      }
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        const element = document.getElementById("tableBody");
        if (element) {
          screenfull.request(element);
        }
      }
    }
    function onBorderClick() {
      borderRef.value = !borderRef.value;
      emit("update:border", borderRef.value);
    }
    function onStripClick() {
      stripeRef.value = !stripeRef.value;
      emit("update:stripe", stripeRef.value);
    }
    return {
      PlusIcon,
      DeleteIcon,
      borderRef,
      stripeRef,
      doRefresh,
      onUpdateTable,
      onFullScreen,
      onBorderClick,
      onStripClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-wrapper {
  width: 1.8rem;
  height: 1.8rem;
  font-size: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 50%;
  color: var(--el-color-primary);
  vertical-align: top;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #ccc;
  }
}
.icon-wrapper__checked {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>
