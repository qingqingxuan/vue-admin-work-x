<template>
  <el-skeleton
    animated
    :loading="loading"
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
        class="flex-sub chart-item-container"
        :body-style="{padding: 0}"
        shadow="never"
      >
        <template #header>
          <div class="text-bold">
            一周销售额（单位：万）
          </div>
        </template>
        <div
          ref="salesChart"
          class="chart-item"
        >
        </div>
      </el-card>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
import { dispose, graphic } from "echarts";
import useEcharts from "@/hooks/Echarts";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
export default defineComponent({
  name: "SalesChart",
  setup() {
    const loading = ref(true);
    const salesChart = ref<HTMLDivElement | null>(null);
    const init = () => {
      const option = {
        grid: {
          left: "2%",
          right: "5%",
          top: "5%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
          boundaryGap: false,
          splitLine: { show: false },
        },
        yAxis: {
          type: "value",
          boundaryGap: false,
          splitLine: { show: false },
        },
        series: [
          {
            data: [150, 180, 224, 218, 200, 180, 150],
            type: "line",
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(116, 21, 219)",
                },
              ]),
            },
          },
        ],
      };
      setTimeout(() => {
        loading.value = false;
        nextTick(() => {
          useEcharts(salesChart.value as HTMLDivElement).setOption(option);
        });
      }, 100);
    };
    const updateChart = () => {
      useEcharts(salesChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    return {
      loading,
      salesChart,
      updateChart,
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-item-container {
  width: 100%;
  height: 215px;
  .chart-item {
    height: 180px;
  }
}
</style>
