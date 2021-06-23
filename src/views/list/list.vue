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
    <TableFooter ref="tableFooter" />
  </div>
</template>

<script lang="ts">
import TableMixin from "@/mixins/TableMixin";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "List",
  mixins: [TableMixin],
  mounted() {
    this.doRefresh();
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getCommentList,
        data: () => {
          return {
            ...this.getPageInfo(),
          };
        },
      })
        .then(this.handleSuccess)
        .catch(console.log);
    },
    handleCommand({ type, item }) {
      if (type === "delete") {
        this.$showConfirmDialog("是否要删除此评论？", () => {
          this.dataList.splice(this.dataList.indexOf(item), 1);
          this.$successMsg("评论删除成功");
        });
      } else {
        const tip = item.status === 0 ? "开启" : "关闭";
        this.$showConfirmDialog(`是否要${tip}此评论？`, () => {
          item.status = item.status === 0 ? 1 : 0;
          this.$successMsg(`评论${tip}成功`);
        });
      }
    },
    load() {
      if (this.noMore) return;
      this.pageModel.currentPage += 1;
      this.loading = true;
      setTimeout((_) => {
        this.getData();
      }, 1000);
    },
  },
});
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
