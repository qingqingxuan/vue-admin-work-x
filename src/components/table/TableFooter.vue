<template>
  <el-card
    :body-style="{ padding: 0 }"
    class="table-footer-container"
    shadow="never"
  >
    <div class="flex">
      <el-pagination
        :current-page="pageModel.currentPage"
        :page-sizes="pageSizes"
        :page-size="pageModel.pageSize"
        :layout="
          $isMobile
            ? 'total, pager, jumper'
            : 'total, sizes, prev, pager, next, jumper'
        "
        :total="pageModel.totalSize"
        @size-change="pageSizeChanged"
        @current-change="currentChanged"
        @prev-click="currentChanged"
        @next-click="currentChanged"
      />
      <el-button
        v-if="showRefresh"
        style="margin-left: 15px"
        circle
        size="small"
        icon="el-icon-refresh"
        type="primary"
        @click="refresh"
      />
    </div>
  </el-card>
</template>

<script lang="ts">
import { PageModelSetup } from "@/mixins/TableMixin";
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
    showRefresh: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      ...PageModelSetup(),
    };
  },
});
</script>
<style lang="scss" scoped>
.table-footer-container {
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>