<template>
  <el-popover ref="popoverRef" :width="380" trigger="click">
    <div class="icon-container">
      <div class="icon-wrapper">
        <el-row>
          <el-col :span="4" v-for="item of iconNames" :key="item">
            <div
              class="flex justify-center align-center flex-direction icon-item"
              @click="onSelectItem(item)"
            >
              <el-icon>
                <component :is="item" style="font-size: 22px" />
              </el-icon>
              <div class="label-name">{{ item }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        v-model:current-page="currentPage"
        :total="total"
        @current-change="onPageChange"
      />
    </div>
    <template #reference>
      <el-button size="small" v-if="!seletedItem">请选择图标</el-button>
      <el-button size="small" type="primary" v-else>
        已选择
        <el-icon>
          <component :is="seletedItem" />
        </el-icon>
      </el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import * as Icons from "@element-plus/icons";
import { ref, unref, watch } from "vue";
const emit = defineEmits(["onSelect", "update:value"]);
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  enableCopy: {
    type: Boolean,
    default: false,
  },
});
const iconList = Object.keys(Icons);
const pageSize = 36;
const currentPage = ref(1);
const iconNames = ref(iconList.slice(0, pageSize));
const searchList = ref<Array<string>>([]);
const total = ref(iconList.length);
const popoverRef = ref();
const seletedItem = ref(props.value);
watch(
  () => props.value,
  (newVal) => {
    seletedItem.value = newVal;
  }
);
function onPageChange(page: number) {
  currentPage.value = page;
  iconNames.value =
    searchList.value.length === 0
      ? iconList.slice((page - 1) * pageSize, page * pageSize)
      : searchList.value.slice((page - 1) * pageSize, page * pageSize);
}
function onSelectItem(item: string) {
  emit("onSelect", item);
  emit("update:value", item);
  seletedItem.value = item;
  unref(popoverRef).hide();
}
</script>
<style lang="scss" scoped>
.icon-container {
  width: 350px;
  overflow: hidden;
  text-align: center;
  &::before {
    content: "";
  }
  .icon-wrapper {
    min-height: 300px;
    overflow: hidden;
    .icon-item {
      height: 60px;
      overflow: hidden;
      text-align: center;
      .label-name {
        width: 70%;
        margin: 0 auto;
        font-size: 12px;
        color: #888;
        margin-top: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .el-icon {
        transform: scale(1);
        transition: transform 0.2s linear;
      }
      &:hover {
        cursor: pointer;
        .el-icon {
          transform: scale(1.5);
          transition: transform 0.2s linear;
        }
      }
    }
  }
}
</style>
