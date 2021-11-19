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
            全国合作校区分布图
          </div>
        </template>
        <div
          ref="schoolChart"
          class="chart-item margin-tb-lg"
        >
        </div>
      </el-card>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
import chinaData from "@/assets/data/china.json";
import { convertData } from "@/assets/data/map.js";
import { useEcharts } from "@/hooks";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { dispose, registerMap } from "echarts";
export default defineComponent({
  name: "SchoolChart",
  setup() {
    const loading = ref(true);
    const schoolChart = ref<HTMLDivElement | null>(null);
    const init = () => {
      registerMap("china", chinaData as any);
      const scatterData = convertData();
      const option = {
        tooltip: {
          trigger: "item",
        },
        geo: {
          type: "map",
          map: "china",
          itemStyle: {
            areaColor: "#0083ce",
            borderColor: "#0066ba",
            emphasis: {
              borderWidth: 0,
              borderColor: "#0066ba",
              areaColor: "#F06C00",
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          zoom: 1.2,
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vetical",
        },
        series: [
          {
            type: "scatter",
            name: "合作校区",
            coordinateSystem: "geo",
            data: scatterData
              .sort((a, b) => {
                return b.value[2] - a.value[2];
              })
              .slice(6),
            hoverAnimation: true,
            encode: {
              value: 2,
            },
            itemStyle: {
              color: "#1bff00",
            },
          },
          {
            type: "effectScatter",
            name: "前三名合作校区",
            showEffectOn: "emphasis",
            coordinateSystem: "geo",
            data: scatterData
              .sort((a, b) => {
                return b.value[2] - a.value[2];
              })
              .slice(0, 3),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            itemStyle: {
              color: "#ff4949",
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
          },
        ],
      };
      setTimeout(() => {
        loading.value = false;
        nextTick(() => {
          useEcharts(schoolChart.value as HTMLDivElement).setOption(option);
        });
      }, 100);
    };
    const updateChart = () => {
      useEcharts(schoolChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    onBeforeUnmount(() => {
      dispose(schoolChart.value as HTMLDivElement);
    });
    return {
      loading,
      schoolChart,
      updateChart,
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-item-container {
  width: 100%;
  height: 100%;
  .chart-item {
    height: calc(180px * 2);
  }
}
</style>
