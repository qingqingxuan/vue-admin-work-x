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
    <TableFooter ref="tableFooter" />
  </div>
</template>

<script lang="ts">
import TableMixin from "@/mixins/TableMixin";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "CardList",
  mixins: [TableMixin],
  mounted() {
    this.doRefresh();
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getCardList,
        data: () => {
          return {
            ...this.getPageInfo(),
          };
        },
      })
        .then(this.handleSuccess)
        .catch(console.log);
    },
  },
});
</script>

<style lang="scss" scoped>
.col-item + .col-item {
  margin-bottom: 10px;
}
.goods-title {
  font-size: 16px;
}
</style>
