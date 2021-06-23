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
import { defineComponent, PropType } from "@vue/runtime-core";
import draggable from "vuedraggable";
export default defineComponent({
  name: "SortableTable",
  components: { draggable },
  emits: ["update"],
  props: {
    tableProps: {
      type: Array as PropType<TablePropsType[]>,
    },
    myName: {
      type: String,
    },
  },
  data() {
    return {
      innerTableProps: (this.tableProps as Array<TablePropsType>).map(
        (it: TablePropsType) => {
          return { ...it } as TablePropsType;
        },
      ),
      originTableProps: (this.tableProps as Array<TablePropsType>).map(
        (it: TablePropsType) => {
          return { ...it } as TablePropsType;
        },
      ),
      isIndeterminate:
        (this.tableProps as Array<TablePropsType>).filter(
          (it: TablePropsType) => it.checked,
        ).length !== (this.tableProps as Array<TablePropsType>).length,
      allChecked: (this.tableProps as Array<TablePropsType>).every(
        (it: TablePropsType) => it.checked,
      ),
    };
  },
  methods: {
    onDraggableEnd() {
      this.$emit("update", this.innerTableProps);
    },
    onAllChange(value: boolean) {
      this.innerTableProps.forEach(
        (it: TablePropsType) => (it.checked = value),
      );
      this.$emit("update", this.innerTableProps);
    },
    onChange() {
      const checkedItems = this.innerTableProps.filter(
        (it: TablePropsType) => it.checked,
      );
      this.allChecked = checkedItems.length === this.innerTableProps.length;
      this.isIndeterminate =
        checkedItems.length > 0 &&
        checkedItems.length !== this.innerTableProps.length;
      this.$emit("update", this.innerTableProps);
    },
    onReset() {
      this.innerTableProps = this.originTableProps.map((it: TablePropsType) => {
        return { ...it };
      });
      this.onChange();
    },
  },
});
</script>