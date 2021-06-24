<template>
  <div class="main-container">
    <el-card>
      <template #header>
        <el-button
          size="small"
          type="primary"
          @click="resetElements"
        >重置元素位置</el-button>
      </template>
      <draggable
        :list="list"
        animation="500"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
        tag="ul"
      >
        <template #item="{element}">
          <li class="card-item">
            <div
              class="icon"
              :class="element.icon"
              :style="{color: element.color}"
            ></div>
            <div class="label">{{ element.label }}</div>
          </li>
        </template>
      </draggable>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "@vue/runtime-core";
import draggable from "vuedraggable";
const icons = `el-icon-user-solid el-icon-user el-icon-phone el-icon-phone-outline el-icon-more el-icon-more-outline el-icon-star-on el-icon-star-off el-icon-s-goods el-icon-goods el-icon-warning el-icon-warning-outline el-icon-question el-icon-info el-icon-remove el-icon-circle-plus el-icon-success el-icon-error el-icon-zoom-in el-icon-zoom-out el-icon-remove-outline el-icon-circle-plus-outline el-icon-circle-check el-icon-circle-close el-icon-s-help el-icon-help el-icon-minus el-icon-plus el-icon-check el-icon-close el-icon-picture el-icon-picture-outline el-icon-picture-outline-round el-icon-upload el-icon-upload2 el-icon-download el-icon-camera-solid el-icon-camera el-icon-video-camera-solid el-icon-video-camera el-icon-message-solid el-icon-bell el-icon-s-cooperation el-icon-s-order el-icon-s-platform el-icon-s-fold el-icon-s-unfold el-icon-s-operation el-icon-s-promotion el-icon-s-home el-icon-s-release el-icon-s-ticket el-icon-s-management el-icon-s-open el-icon-s-shop el-icon-s-marketing el-icon-s-flag el-icon-s-comment el-icon-s-finance el-icon-s-claim el-icon-s-custom el-icon-s-opportunity el-icon-s-data el-icon-s-check el-icon-s-grid el-icon-menu el-icon-share el-icon-d-caret el-icon-caret-left el-icon-caret-right el-icon-caret-bottom el-icon-caret-top`;
interface IconItemType {
  label: string;
  icon: string;
  id: number;
  color: string;
}
export default defineComponent({
  name: "CardDraggable",
  components: { draggable },
  setup() {
    const iconList = icons.split(" ");
    const list: Array<IconItemType> = reactive([]);
    const drag = false;
    const colors = [
      "#e54d42",
      "#f37b1d",
      "#fbbd08",
      "#8dc63f",
      "#39b54a",
      "#1cbbb4",
      "#0081ff",
      "#6739b6",
      "#9c26b0",
      "#e03997",
      "#a5673f",
      "#8799a3",
    ];
    const getRandomColor = (): string => {
      return colors[Math.floor(Math.random() * colors.length)];
    };
    const resetElements = (): void => {
      list.sort((a: IconItemType, b: IconItemType) => {
        return a.id - b.id;
      });
    };
    onMounted(() => {
      list.push(
        ...iconList.map((it: string, index: number): IconItemType => {
          return {
            label: `第 ${index + 1} 个元素`,
            icon: it,
            id: index,
            color: getRandomColor(),
          };
        })
      );
    });
    return {
      drag,
      list,
      resetElements,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  border-top: 1px solid #f5f5f5;
  border-left: 1px solid #f5f5f5;
  overflow: hidden;
}
.card-item {
  height: 100px;
  padding: 10px 0;
  width: 12.5%;
  text-align: center;
  cursor: move;
  float: left;
  border-right: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  .icon {
    font-size: 40px;
  }
  .label {
    margin-top: 10px;
    font-size: 14px;
  }
}
.card-item:hover {
  .icon {
    transform: scale(1.5);
    transition: transform 0.1s ease-in-out;
  }
}
</style>
