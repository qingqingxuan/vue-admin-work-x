<template>
  <el-card
    class="chart-item-container"
    :body-style="{padding: 0}"
    shadow="never"
  >
    <template #header>
      <div class="text-bold">
        全年销售额分析图
      </div>
    </template>
    <div
      ref="fullYearSalesChart"
      class="chart-item"
    >
    </div>
  </el-card>
</template>
<script lang="ts">
import useEcharts from "@/mixins/useEcharts";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@vue/runtime-core";
import { dispose, graphic } from "echarts";

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
export default defineComponent({
  name: "FullYearSalesChart",
  setup() {
    const fullYearSalesChart = ref<HTMLDivElement | null>(null);
    const init = () => {
      const option = {
        color: ["rgba(110, 199, 205)", "rgba(211, 58, 192)"],
        grid: {
          top: "10%",
          left: "2%",
          right: "2%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          data: ["2019全年销售额", "2020全年销售额"],
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: months,
          boundaryGap: false,
          splitLine: { show: false },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            name: "2019全年销售额",
            stack: "总量",
            data: [80, 60, 55, 99, 103, 110, 97, 87, 65, 120, 105, 115],
            smooth: true,
            lineStyle: {
              color: "rgba(110, 199, 205)",
            },
            label: {
              show: true,
              formatter(val: any) {
                if (val.dataIndex === 0) {
                  return "";
                } else {
                  return val.data;
                }
              },
            },
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(234, 228, 201)",
                },
                {
                  offset: 1,
                  color: "rgba(110, 199, 205)",
                },
              ]),
            },
          },
          {
            type: "line",
            name: "2020全年销售额",
            stack: "总量",
            data: [90, 70, 50, 93, 88, 96, 83, 75, 90, 110, 98, 100],
            smooth: true,
            lineStyle: {
              color: "rgba(211, 58, 192)",
            },
            label: {
              show: true,
              formatter(val: any) {
                if (val.dataIndex === 0) {
                  return "";
                } else {
                  return val.data;
                }
              },
            },
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(240, 188, 136)",
                },
                {
                  offset: 1,
                  color: "rgba(211, 58, 192)",
                },
              ]),
            },
          },
        ],
      };
      useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(option);
    };
    const updateChart = () => {
      useEcharts(fullYearSalesChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    onBeforeUnmount(() => {
      dispose(fullYearSalesChart.value as HTMLDivElement);
    });
    return {
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
