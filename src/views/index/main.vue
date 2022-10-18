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
            <div class="margin-top-lg">
              <div>
                较昨日新增：{{ extra.data }}
                <i class="el-icon-caret-top text-green"></i>
              </div>
              <div class=" margin-top-sm">
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
              <div>
                较昨日新增：{{ extra.data }}
                <i class="el-icon-caret-top text-green"></i>
              </div>
              <div class=" margin-top-sm">
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
      class="margin-top-sm"
    >
      <el-col :span="24">
        <FullYearSalesChart ref="fullYearSalesChart" />
      </el-col>
    </el-row>
    <el-row
      :gutter="5"
      class="margin-top-sm"
    >
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
      >
        <SalesChart ref="salesChart" />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
      >
        <StudentChart ref="studentChart" />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
      >
        <EnrollmentChannelsChart ref="enrollmentChannelsChart" />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
      >
        <DepartmentChart ref="departmentChart" />
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
import FullYearSalesChart from "./components/chart/FullYearSalesChart.vue";
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from "vue";
import { useLayoutStore } from "@/layouts/hooks";
export default defineComponent({
  name: "Home",
  components: {
    DataItem,
    OrderChart,
    SalesChart,
    StudentChart,
    EnrollmentChannelsChart,
    DepartmentChart,
    FullYearSalesChart,
  },
  setup() {
    const layoutStore = useLayoutStore();
    const mOrderChart = ref<InstanceType<typeof OrderChart>>();
    const salesChart = ref<InstanceType<typeof SalesChart>>();
    const departmentChart = ref<InstanceType<typeof DepartmentChart>>();
    const enrollmentChannelsChart =
      ref<InstanceType<typeof EnrollmentChannelsChart>>();
    const studentChart = ref<InstanceType<typeof StudentChart>>();
    const fullYearSalesChart = ref<InstanceType<typeof FullYearSalesChart>>();
    const onResize = () => {
      setTimeout(() => {
        mOrderChart.value?.updateChart();
        salesChart.value?.updateChart();
        departmentChart.value?.updateChart();
        enrollmentChannelsChart.value?.updateChart();
        studentChart.value?.updateChart();
        fullYearSalesChart.value?.updateChart();
      }, 500);
    };
    const collapse = computed(() => {
      return layoutStore.state.isCollapse;
    });
    watch(collapse, (newVal: boolean) => {
      onResize();
    });
    return {
      collapse,
      mOrderChart,
      salesChart,
      departmentChart,
      enrollmentChannelsChart,
      studentChart,
      fullYearSalesChart,
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
.light {
  .chart-item {
    background-color: #fff;
  }
}
.stack-avatar-wrapper {
  position: absolute;
  right: -2%;
  top: 10%;
}
</style>
