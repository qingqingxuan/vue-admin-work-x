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
import { defineComponent, PropType, reactive, ref } from "@vue/runtime-core";
import draggable from "vuedraggable";
export default defineComponent({
  name: "SortableTable",
  components: { draggable },
  emits: ["update"],
  props: {
    tableProps: {
      type: Array as PropType<TablePropsType[]>,
    },
  },
  methods: {
    onDraggableEnd() {
      this.$emit("update", this.innerTableProps);
    },
  },
  setup(props, { emit }) {
    const tempTableProps = props.tableProps as Array<TablePropsType>;
    const innerTableProps = reactive(
      tempTableProps.map((it: TablePropsType) => {
        return { ...it } as TablePropsType;
      })
    );
    const originTableProps = tempTableProps.map((it: TablePropsType) => {
      return { ...it } as TablePropsType;
    });
    const isIndeterminate = ref(
      tempTableProps.filter((it: TablePropsType) => it.checked).length !==
        tempTableProps.length
    );
    const allChecked = ref(
      tempTableProps.every((it: TablePropsType) => it.checked)
    );
    const onAllChange = (value: boolean) => {
      innerTableProps.forEach((it: TablePropsType) => (it.checked = value));
      emit("update", innerTableProps);
    };
    const onChange = () => {
      const checkedItems = innerTableProps.filter(
        (it: TablePropsType) => it.checked
      );
      allChecked.value = checkedItems.length === innerTableProps.length;
      isIndeterminate.value =
        checkedItems.length > 0 &&
        checkedItems.length !== innerTableProps.length;
      emit("update", checkedItems);
    };
    const onReset = () => {
      innerTableProps.splice(0, innerTableProps.length);
      innerTableProps.push(
        ...originTableProps.map((it: TablePropsType) => {
          return { ...it };
        })
      );
      onChange();
    };
    return {
      innerTableProps,
      originTableProps,
      isIndeterminate,
      allChecked,
      onAllChange,
      onChange,
      onReset,
    };
  },
});
</script>