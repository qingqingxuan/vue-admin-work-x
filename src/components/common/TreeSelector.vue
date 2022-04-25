<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom"
    :width="popWidth"
  >
    <template #reference>
      <el-input
        ref="inputRef"
        @focus="onFocus"
        @blur="onBlur"
        :placeholder="placeholder"
        v-model="selectValue"
        readonly
        class="input-wrapper"
      >
        <template #suffix>
          <el-icon class="suffx-icon">
            <arrow-down />
          </el-icon>
        </template>
      </el-input>
    </template>
    <div class="poper-wrapper">
      <el-tree
        :data="innerData"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="onNodeClick"
      >
      </el-tree>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  PropType,
  ref,
  toRaw,
  unref,
  watch,
} from "vue";
const props = defineProps({
  value: {
    type: [String, Number],
    default: "",
  },
  data: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  dataFields: {
    type: Object,
    default: () => ({
      label: "label",
      value: "value",
      children: "children",
    }),
  },
});
const emitter = defineEmits(["update:value"]);
const innerData = computed(() => transformData(props.data));
const selectValue = computed(() => getLabelByValue(innerData.value));
const visible = ref(false);
const inputRef = ref();
const popWidth = ref(300);
function getLabelByValue(data: Array<TreeDataType>): string {
  if (data && data.length > 0) {
    for (let index = 0; index < data.length; index++) {
      const it = data[index];
      if (it.value === props.value) {
        return it.label;
      } else {
        if (it.children && it.children.length > 0) {
          const label = getLabelByValue(it.children);
          if (label) {
            return label;
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
    }
  }
  return "";
}
function transformData(data: Array<any>) {
  const innerData: TreeDataType[] = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const item: TreeDataType = {
      label: element[props.dataFields.label || "label"],
      value: element[props.dataFields.value || "value"],
    };
    const tempChildren = element[props.dataFields.children || "children"];
    if (tempChildren && tempChildren.length > 0) {
      item.children = transformData(tempChildren);
    }
    innerData.push(item);
  }
  return innerData;
}
function onNodeClick(key: any, item: any) {
  visible.value = false;
  emitter("update:value", key.value);
}
function onFocus() {
  visible.value = true;
}
function onBlur() {
  visible.value = false;
}
onMounted(() => {
  nextTick(() => {
    popWidth.value = unref(inputRef).$el.clientWidth;
  });
});
</script>
<style lang="scss">
.poper-wrapper {
  max-height: 300px;
  overflow: auto;
}
.input-wrapper {
  width: 100%;
  .suffx-icon {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
  }
  &:focus {
    .suffx-icon {
      transform: rotate(180deg);
    }
  }
}
</style>
