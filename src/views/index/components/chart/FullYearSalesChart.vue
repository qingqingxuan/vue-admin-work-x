<template>
  <el-skeleton
    :loading="loading"
    animated
  >
    <template #template>
      <el-card>
        <el-skeleton-item
          variant="h3"
          style="width: 50%"
        />
        <div class="margin-top">
          <el-skeleton-item variant="text" />
          <el-skeleton-item
            variant="text"
            class="margin-top"
          />
          <el-skeleton-item
            variant="text"
            class="margin-top"
          />
          <el-skeleton-item
            variant="text"
            class="margin-top"
          />
        </div>
      </el-card>
    </template>
    <template #default>
      <el-card
        class="chart-item-container"
        :body-style="{padding: 0}"
        shadow="never"
      >
        <template #header>
          <div class="text-bold">
            全年销售额分析图（数据为模拟，只为演示效果）
          </div>
        </template>
        <div
          ref="fullYearSalesChart"
          class="chart-item"
        >
        </div>
      </el-card>
    </template>
  </el-skeleton>
</template>
<script lang="ts">
import { useEcharts } from "@/hooks";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { dispose, graphic } from "echarts";
import { random } from "lodash";
const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
function getData() {
  const data: number[] = [];
  while (data.length < months.length) {
    data.push(random(100, 150));
  }
  return data;
}
export default defineComponent({
  name: "FullYearSalesChart",
  setup() {
    const loading = ref(true);
    const fullYearSalesChart = ref<HTMLDivElement | null>(null);
    let interval: any = null;
    const init = () => {
      const option = {
        color: ["rgba(64, 58, 255)"],
        grid: {
          top: "10%",
          left: "2%",
          right: "2%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          data: ["2020全年销售额"],
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: months,
        },
        yAxis: {
          type: "value",
          max: 200,
        },
        series: [
          {
            type: "bar",
            name: "2020全年销售额",
            stack: "总量",
            data: getData(),
            label: {
              show: true,
              formatter(val: any) {
                return val.data + "万";
              },
            },
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
        ],
      };
      setTimeout(() => {
        loading.value = false;
        nextTick(() =>
          useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(
            option
          )
        );
      }, 1000);
    };
    const updateChart = () => {
      useEcharts(fullYearSalesChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    return {
      loading,
      fullYearSalesChart,
      updateChart,
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-item-container {
  width: 100%;
  height: 400px;
  .chart-item {
    height: 345px;
  }
}
</style>
