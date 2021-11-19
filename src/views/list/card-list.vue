<template>
  <div>
    <el-row :gutter="15">
      <el-col
        v-for="item of dataList"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        class="col-item"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="text-center">
            <el-image
              style="width: 100%; height: 250px"
              :src="require('@/assets/images/' + item.image + '.jpeg')"
              fit="cover"
            />
          </div>
          <div style="padding: 10px">
            <div class="goods-title">
              {{ item.title }}
            </div>
            <div class="text-cut-l2 margin-top-sm">
              {{ item.description }}
            </div>
            <div class="flex justify-between align-center margin-top-xs">
              <span class="text-df text-gray">
                {{ item.time }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <TableFooter
      ref="tableFooter"
      @refresh="doRefresh"
      @pageChanged="doRefresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { getCardList } from "@/api/url";
import type { TableFooter } from "@/components/types";
import { useDataTable } from "@/hooks";
import { usePost } from "@/hooks";
import { onMounted, ref } from "vue";

const post = usePost();
const { handleSuccess, dataList } = useDataTable();
const tableFooter = ref<TableFooter>();

function doRefresh() {
  post({
    url: getCardList,
    data: () => tableFooter.value?.withPageInfoData(),
  })
    .then(handleSuccess)
    .then((res: any) => {
      tableFooter.value?.setTotalSize(res.totalSize);
    })
    .catch(console.log);
}
onMounted(doRefresh);
</script>

<style lang="scss" scoped>
.col-item + .col-item {
  margin-bottom: 10px;
}
.goods-title {
  font-size: 16px;
}
</style>
