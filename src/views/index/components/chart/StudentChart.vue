<template>
  <el-card
    class="flex-sub chart-item-container"
    :body-style="{padding: 0}"
    shadow="never"
  >
    <template #header>
      <div class="text-bold">
        半年招生对比图（单位：人）
      </div>
    </template>
    <div
      ref="studentChart"
      class="chart-item"
    >
    </div>
  </el-card>

</template>

<script>
import itemChartMixins from "./mixins/item-chart-mixins";
export default {
  name: "StudentChart",
  mixins: [itemChartMixins],
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.$echarts.dispose(this.getInstance(this.$refs.studentChart));
  },
  methods: {
    init() {
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
        yAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月"],
          boundaryGap: 0,
          axisTick: {
            show: false,
          },
        },
        xAxis: {
          type: "value",
          boundaryGap: 0,
        },
        series: [
          {
            data: [480, 289, 711, 618, 393, 571, 470],
            type: "bar",
            smooth: true,
            showSymbol: false,
            barWidth: "auto",
            itemStyle: {
              borderRadius: [0, 15, 15, 0],
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(12, 124, 182)",
                },
                {
                  offset: 1,
                  color: "rgba(244, 187, 236)",
                },
              ]),
            },
          },
        ],
      };
      this.getInstance(this.$refs.studentChart).setOption(option);
    },
    updateChart() {
      this.getInstance(this.$refs.studentChart).resize();
    },
  },
};
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
