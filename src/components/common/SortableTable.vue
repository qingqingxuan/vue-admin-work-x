<template>
  <el-popover
    placement="bottom"
    trigger="click"
  >
    <div
      style="border-bottom: 1px solid #f5f5f5"
      class="flex justify-between align-center"
    >
      <el-checkbox
        v-model="allChecked"
        :indeterminate="isIndeterminate"
        @change="onAllChange"
      >全选</el-checkbox>
      <el-button
        type="text"
        @click="onReset"
      >重置</el-button>
    </div>
    <draggable
      v-model="innerTableProps"
      animation="500"
      @end="onDraggableEnd"
      tag="transition-group"
      item-key="prop"
    >
      <template #item={element}>
        <div
          class="padding-tb-sm"
          :body-style="{padding: 0}"
          shadow="hover"
        >
          <span class="el-icon-sort padding-right-sm"></span>
          <el-checkbox
            v-model="element.checked"
            :label="element.prop"
            @change="onChange"
          >{{ element.title }}</el-checkbox>
        </div>
      </template>
    </draggable>
    <template #reference>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-setting"
        circle
      />
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import draggable from "vuedraggable";
export default defineComponent({
  name: "SortableTable",
  components: { draggable },
  emits: ["update"],
  props: {
    tableProps: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      innerTableProps: this.tableProps.map((it) => {
        return { ...it };
      }),
      originTableProps: this.tableProps.map((it) => {
        return { ...it };
      }),
      isIndeterminate:
        this.tableProps.filter((it) => it.checked).length !==
        this.tableProps.length,
      allChecked: this.tableProps.every((it) => it.checked),
    };
  },
  methods: {
    onDraggableEnd() {
      this.$emit("update", this.innerTableProps);
    },
    onAllChange(value) {
      this.innerTableProps.forEach((it) => (it.checked = value));
      this.$emit("update", this.innerTableProps);
    },
    onChange() {
      const checkedItems = this.innerTableProps.filter((it) => it.checked);
      this.allChecked = checkedItems.length === this.innerTableProps.length;
      this.isIndeterminate =
        checkedItems.length > 0 &&
        checkedItems.length !== this.innerTableProps.length;
      this.$emit("update", this.innerTableProps);
    },
    onReset() {
      this.innerTableProps = this.originTableProps.map((it) => {
        return { ...it };
      });
      this.onChange();
    },
  },
});
</script>