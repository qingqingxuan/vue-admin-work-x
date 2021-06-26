<template>
  <el-card
    class="flex-sub chart-item-container"
    :body-style="{padding: 0}"
    shadow="never"
  >
    <template #header>
      <div class="text-bold">
        一周销售额走势图（单位：万）
      </div>
    </template>
    <div
      ref="salesChart"
      class="chart-item"
    >
    </div>
  </el-card>

</template>

<script>
import ItemChartMixins from "./mixins/item-chart-mixins";
export default {
  name: "SalesChart",
  mixins: [ItemChartMixins],
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.$echarts.dispose(this.getInstance(this.$refs.salesChart));
  },
  methods: {
    init() {
      if (!this.$refs.salesChart) {
        return;
      }
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
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
      this.getInstance(this.$refs.salesChart).setOption(option);
    },
    updateChart() {
      this.getInstance(this.$refs.salesChart).resize();
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
