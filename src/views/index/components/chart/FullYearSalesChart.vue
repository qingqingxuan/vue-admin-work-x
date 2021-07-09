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
import useEcharts from "@/mixins/useEcharts";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@vue/runtime-core";
import { dispose, graphic } from "echarts";
import { random } from "lodash";
function getData() {
  const data: number[] = [];
  while (data.length < 12) {
    data.push(random(20, 150));
  }
  return data;
}
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
    const loading = ref(true);
    const fullYearSalesChart = ref<HTMLDivElement | null>(null);
    let interval: any = null;
    const init = () => {
      const option = {
        color: ["rgba(64, 58, 255)", "rgba(136, 188, 241)"],
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
            data: getData(),
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
            data: getData(),
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
                  color: "rgba(64, 158, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(136, 188, 241)",
                },
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
        interval = setInterval(() => {
          const option = {
            series: [
              {
                data: getData(),
              },
              {
                data: getData(),
              },
            ],
          };
          useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(
            option
          );
        }, 5000);
      }, 3000);
    };
    const updateChart = () => {
      useEcharts(fullYearSalesChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    onBeforeUnmount(() => {
      dispose(fullYearSalesChart.value as HTMLDivElement);
      clearInterval(interval);
    });
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
