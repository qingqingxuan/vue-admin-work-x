<template>
  <div>
    <el-card :body-style="{padding: 0}">
      <el-row
        v-for="item of dataList"
        :key="item.id"
        class="item-wrapper"
      >
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="8"
          :xl="8"
        >
          <div class="header-wrapper">
            <div class="avatar-wrapper">
              <img
                class="avatar"
                :src="item.avatar"
              />
              <img
                class="vip"
                :src="require('@/assets/img_vip_icon.png')"
              />
            </div>
            <div class="nick-wrapper">
              <span class="nick-name">{{ item.nickName }}</span>
              <el-rate
                v-model="item.rate"
                disabled
                text-color="#ff9900"
              />
              <div class="content">
                {{item.content}}
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="8"
          :xl="8"
        >
          <div class="content-wrapper">
            <div>时间</div>
            <div>{{ item.time }}</div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="8"
          :xl="8"
        >
          <div
            style="height: 100%;width: 100%"
            class="flex justify-center flex-direction"
          >
            <el-progress :percentage="item.progress"></el-progress>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <TableFooter
      ref="tableFooter"
      @refresh="doRefresh"
      @pageChanged="doRefresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { getCommentList } from "@/api/url";
import type { TableFooter } from "@/components/types";
import { useDataTable, usePost } from "@/hooks";
import { onMounted, ref } from "vue";

const post = usePost();
const { handleSuccess, dataList } = useDataTable();
const tableFooter = ref<TableFooter>();

function doRefresh() {
  post({
    url: getCommentList,
    data: tableFooter.value?.withPageInfoData(),
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
.item-wrapper {
  padding: 10px;
  .header-wrapper {
    display: flex;
    justify-content: flex-start;
    .avatar-wrapper {
      position: relative;
      .avatar {
        border-radius: 5px;
        width: 70px;
        height: 70px;
        border: 1px solid #f5f5f5;
      }
      .vip {
        position: absolute;
        top: -13px;
        right: -13px;
        width: 30px;
        height: 30px;
        transform: rotate(45deg);
      }
    }
    .nick-wrapper {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
    }
  }
  .content-wrapper {
    text-align: center;
    height: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 10px;
    background-color: #f5f5f5;
  }
}
</style>
