<template>
  <el-card :body-style="{ padding: 0 }" class="table-footer-container" shadow="never">
    <div class="flex">
      <el-pagination :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :layout="
          $isMobile
            ? 'total, pager, jumper'
            : 'total, sizes, prev, pager, next, jumper'
        " :total="totalSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="prevClick" @next-click="nextClick" />
      <el-button v-if="showRefresh" style="margin-left: 15px" circle size="small" icon="el-icon-refresh" type="primary" @click="refresh" />
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "TableFooter",
  props: {
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 30, 40];
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalSize: {
      type: Number,
      default: 10,
    },
    showRefresh: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    handleSizeChange(pageSize: number) {
      this.currentPage = 1;
      this.$emit("pageSizeChanged", pageSize);
    },
    handleCurrentChange() {
      this.$emit("currentChanged", this.currentPage);
    },
    prevClick() {
      this.$emit("currentChanged", this.currentPage);
    },
    nextClick() {
      this.$emit("currentChanged", this.currentPage);
    },
    refresh() {
      this.$emit("onRefresh");
    },
  },
});
</script>
