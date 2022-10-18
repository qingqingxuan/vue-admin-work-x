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
            <el-icon
              :color="element.color"
              size="20"
            >
              <component :is="element.icon + 'Icon'" />
            </el-icon>
            <div class="label">{{ element.label }}</div>
          </li>
        </template>
      </draggable>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import draggable from "vuedraggable";
import * as icons from "@element-plus/icons";
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
    const iconList = Object.keys(icons).splice(0, 50);
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
    margin-top: 30px;
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
