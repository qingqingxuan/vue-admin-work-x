<template>
  <div
    class="flex justify-between padding"
    style="border-bottom: 1px dashed var(--el-border-color-light)"
  >
    <el-button
      type="danger"
      size="mini"
      :icon="DeleteIcon"
    >删除
    </el-button>
    <div>
      <span class="margin-right">
        <el-checkbox v-model="border">表格边框</el-checkbox>
      </span>
      <span class="margin-right">
        <el-checkbox v-model="stripe">斑马纹</el-checkbox>
      </span>
      <el-tooltip
        effect="dark"
        content="刷新页面"
        placement="top"
      >
        <el-icon :size="20">
          <RefreshIcon />
        </el-icon>
      </el-tooltip>
      <SortableTable
        class="margin-left"
        :table-props="tableProps"
        @update="onUpdateTable"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@element-plus/icons";

export default defineComponent({
  emits: ["onRefresh", "onUpdateTable"],
  components: { RefreshIcon },
  props: {
    tableProps: {
      type: Array as PropType<Array<TablePropsType>>,
      default: () => [] as Array<TablePropsType>,
    },
  },
  setup(props, { emit }) {
    const border = ref(false);
    const stripe = ref(false);
    function doRefresh() {
      emit("onRefresh");
    }
    function onUpdateTable() {
      emit("onUpdateTable");
    }
    return {
      DeleteIcon,
      border,
      stripe,
      doRefresh,
      onUpdateTable,
    };
  },
});
</script>
