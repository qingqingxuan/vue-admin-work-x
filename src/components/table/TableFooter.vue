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
      />
      <el-button
        v-if="showRefresh"
        style="margin-left: 15px"
        circle
        size="small"
        :icon="RefreshIcon"
        type="primary"
        @click="onRefresh"
      />
    </div>
  </el-card>
</template>

<script lang="ts">
import { Refresh as RefreshIcon } from "@element-plus/icons";
import { defineComponent, reactive } from "vue";

export default defineComponent({
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
  emits: ["pageChanged", "refresh"],
  setup(props, { emit }) {
    const pageModel = reactive({
      currentPage: 1,
      pageSize: 10,
      totalSize: 0,
    });
    const pageSizeChanged = (pageSize: number) => {
      pageModel.pageSize = pageSize;
      pageModel.currentPage = 1;
      emit("pageChanged", pageModel);
    };
    const currentChanged = (currentPage: number) => {
      pageModel.currentPage = currentPage;
      emit("pageChanged", pageModel);
    };
    const withPageInfoData = (otherParams = {}) => {
      return {
        ...otherParams,
        page: pageModel.currentPage,
        pageSize: pageModel.pageSize,
      };
    };
    const setTotalSize = (totalSize: number) => {
      pageModel.totalSize = totalSize;
    };
    const setPageSize = (pageSize: number) => {
      pageModel.pageSize = pageSize;
    };
    const onRefresh = () => {
      emit("refresh");
    };
    return {
      pageModel,
      pageSizeChanged,
      currentChanged,
      withPageInfoData,
      setTotalSize,
      setPageSize,
      onRefresh,
      RefreshIcon,
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