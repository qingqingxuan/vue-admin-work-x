<template>
  <el-card :body-style="{padding: '10px'}">
    <template #header>
      <div>拆线图</div>
    </template>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        style="height: 180px"
      >
        <LineChart />
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "@vue/runtime-core";
import LineChart from "./components/LineChart.vue";

export default defineComponent({
  name: "Echarts",
  components: {
    LineChart,
  },
});
</script>
