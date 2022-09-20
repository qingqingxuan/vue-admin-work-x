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
            招生渠道分析图
          </div>
        </template>
        <div
          ref="channelsChart"
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
import { dispose } from "echarts";
export default defineComponent({
  name: "EnrollmentChannelsChart",
  setup() {
    const loading = ref(true);
    const channelsChart = ref<HTMLDivElement | null>(null);
    const init = () => {
      const option = {
        grid: {
          left: "12%",
          right: "5%",
          top: "5%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              length: 5,
              length2: 5,
              smooth: true,
            },
            data: [
              { value: 1969, name: "线上" },
              { value: 743, name: "互推" },
              { value: 1594, name: "电话" },
              { value: 1347, name: "地推" },
              { value: 635, name: "直播" },
            ],
          },
        ],
      };
      setTimeout(() => {
        loading.value = false;
        nextTick(() => {
          useEcharts(channelsChart.value as HTMLDivElement).setOption(option);
        });
      }, 100);
    };
    const updateChart = () => {
      useEcharts(channelsChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    return {
      loading,
      channelsChart,
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
