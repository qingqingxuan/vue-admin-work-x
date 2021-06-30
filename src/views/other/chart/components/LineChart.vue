<template>
  <div
    ref="eChartContainer"
    style="height: 180px; width: 100%"
  >
  </div>
</template>

<script lang="ts">
import useEcharts from "@/mixins/useEcharts";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "LineChart",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const eChartContainer = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        grid: {
          x: "10%",
          y: "5%",
          x2: 0,
          y2: "15%",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      const instance = useEcharts(eChartContainer.value as HTMLDivElement);
      instance.setOption(option);
      console.log(instance);
      instance.resize();
    });
    return {
      eChartContainer,
    };
  },
});
</script>

<style>
</style>