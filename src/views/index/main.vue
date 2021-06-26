<template>
  <div class="main-container">
    <el-row :gutter="5">
      <el-col
        v-for="(item, index) of dataList"
        :key="index"
        :xs="24"
        :sm="12"
        :md="6"
        class="item-wrapper"
      >
        <DataItem :data-model="item">
          <template
            v-if="index === 0"
            #extra="{ extra }"
          >
            <div class="margin-top">
              <div class="text-gray">
                较昨日新增：{{ extra.data }}
                <i class="el-icon-caret-top text-green"></i>
              </div>
              <div class="text-gray margin-top-sm">
                较上周新增：{{ extra.data1 }}
                <i class="el-icon-caret-top text-blue"></i>
              </div>
            </div>
          </template>
          <template
            v-else-if="index === 1"
            #extra="{ extra }"
          >
            <div
              class="margin-top"
              style="position: relative"
            >
              <div class="text-gray">
                较昨日新增：{{ extra.data }}
                <i class="el-icon-caret-top text-green"></i>
              </div>
              <div class="text-gray margin-top-sm">
                较上周新增：{{ extra.data1 }}
                <i class="el-icon-caret-top text-blue"></i>
              </div>
              <div class="stack-avatar-wrapper">
                <StackAvatar />
              </div>
            </div>
          </template>
          <template
            v-else-if="index === 2"
            #extra="{ extra }"
          >
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="extra.data"
              status="exception"
            />
          </template>
          <template
            v-else-if="index === 3"
            #extra
          >
            <OrderChart ref="mOrderChart" />
          </template>
        </DataItem>
      </el-col>
    </el-row>
    <el-row
      :gutter="5"
      class="margin-top-xs"
    >
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
      >
        <div class="flex flex-direction">
          <SalesChart ref="salesChart" />
          <StudentChart
            ref="studentChart"
            class="margin-top-xs"
          />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        class="map-margin-tb"
      >
        <div>
          <SchoolChart ref="schoolChart" />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
      >
        <div class="flex flex-direction">
          <EnrollmentChannelsChart ref="enrollmentChannelsChart" />
          <DepartmentChart
            ref="departmentChart"
            class="margin-top-xs"
          />
        </div>
      </el-col>
    </el-row>
    <el-row
      :gutter="5"
      class="margin-top-xs"
    >
      <el-col :span="24">
        <FullYearSalesChart ref="fullYearSalesChart" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import DataItem from "./components/DataItem.vue";
import OrderChart from "./components/chart/OrderChart.vue";
import SalesChart from "./components/chart/SalesChart.vue";
import StudentChart from "./components/chart/StudentChart.vue";
import EnrollmentChannelsChart from "./components/chart/EnrollmentChannelsChart.vue";
import DepartmentChart from "./components/chart/DepartmentChart.vue";
import SchoolChart from "./components/chart/SchoolChart.vue";
import FullYearSalesChart from "./components/chart/FullYearSalesChart.vue";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "Main",
  components: {
    DataItem,
    OrderChart,
    SchoolChart,
    SalesChart,
    StudentChart,
    EnrollmentChannelsChart,
    DepartmentChart,
    FullYearSalesChart,
  },
  data() {
    return {
      dataList: [
        {
          title: "今日访问量",
          data: "+1000",
          bottomTitle: "总访问量",
          totalSum: "100万+",
          extra: {
            data: 1000,
            data1: 2350,
          },
        },
        {
          title: "新增用户",
          data: "+500",
          bottomTitle: "总用户量",
          totalSum: "200万+",
          extra: {
            data: 700,
            data1: 968,
          },
        },
        {
          title: "当月销售额",
          data: "￥50000",
          bottomTitle: "累计销售额",
          totalSum: "2000万+",
          extra: {
            data: 80,
          },
        },
        {
          title: "当月订单量",
          data: "189笔",
          bottomTitle: "累计订单量",
          totalSum: "1万+",
          extra: {
            data: 80,
          },
        },
      ],
    };
  },
  computed: {
    collapse() {
      return this.$layoutStore.state.isCollapse;
    },
  },
  watch: {
    collapse(newVal) {
      setTimeout(() => {
        (this as any).onResize();
      }, 500);
    },
  },
  methods: {
    onResize(width?: number) {
      // this.$refs.mOrderChart[0].updateChart();
      // this.$refs.salesChart.updateChart();
      (
        this.$refs.departmentChart as InstanceType<typeof DepartmentChart>
      ).updateChart();
      // this.$refs.enrollmentChannelsChart.updateChart();
      // this.$refs.schoolChart.updateChart();
      // this.$refs.studentChart.updateChart();
      // this.$refs.fullYearSalesChart.updateChart();
    },
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
  .item-wrapper {
    margin-bottom: 5px;
  }
  .map-margin-tb {
    margin: 5px 0;
  }
}
.chart-item {
  background-color: #fff;
}
.stack-avatar-wrapper {
  position: absolute;
  right: -2%;
  top: 10%;
}
</style>
