<template>
  <el-popover placement="bottom" trigger="click">
    <div
      style="border-bottom: 1px solid #f5f5f5"
      class="flex justify-between align-center"
    >
      <el-checkbox
        v-model="allChecked"
        :indeterminate="isIndeterminate"
        @change="onAllChange"
        >全选</el-checkbox
      >
      <el-button type="text" @click="onReset">重置</el-button>
    </div>
    <draggable
      v-model="innerTableProps"
      animation="500"
      @end="onDraggableEnd"
      tag="transition-group"
      item-key="prop"
    >
      <template #item="{ element }">
        <div class="padding-tb-sm" :body-style="{ padding: 0 }" shadow="hover">
          <span class="padding-right-sm">
            <el-icon>
              <SortIcon />
            </el-icon>
          </span>
          <el-checkbox
            v-model="element.checked"
            :label="element.prop"
            @change="onChange"
            >{{ element.title }}</el-checkbox
          >
        </div>
      </template>
    </draggable>
    <template #reference>
      <el-icon class="icon-wrapper">
        <SettingIcon />
      </el-icon>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import draggable from "vuedraggable";
import { Setting as SettingIcon } from "@element-plus/icons";
export default defineComponent({
  name: "SortableTable",
  components: { draggable, SettingIcon },
  emits: ["update"],
  props: {
    tableProps: {
      type: Array as PropType<TablePropsType[]>,
    },
  },
  setup(props, { emit }) {
    const tempTableProps = props.tableProps as Array<TablePropsType>;
    const innerTableProps = ref(
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
      innerTableProps.value.forEach(
        (it: TablePropsType) => (it.checked = value)
      );
      emit(
        "update",
        innerTableProps.value.filter((it) => it.checked)
      );
    };
    const onChange = () => {
      const checkedItems = innerTableProps.value.filter(
        (it: TablePropsType) => it.checked
      );
      allChecked.value = checkedItems.length === innerTableProps.value.length;
      isIndeterminate.value =
        checkedItems.length > 0 &&
        checkedItems.length !== innerTableProps.value.length;
      emit("update", checkedItems);
    };
    const onReset = () => {
      innerTableProps.value = originTableProps.map((it: TablePropsType) => {
        return { ...it };
      });
      onChange();
    };
    function onDraggableEnd() {
      emit(
        "update",
        innerTableProps.value.filter((it) => it.checked)
      );
    }
    return {
      innerTableProps,
      originTableProps,
      isIndeterminate,
      allChecked,
      onAllChange,
      onChange,
      onReset,
      onDraggableEnd,
      SettingIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
  height: 15px;
}
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
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>
