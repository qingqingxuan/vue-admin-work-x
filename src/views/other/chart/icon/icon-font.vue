<template>
  <div>
    <el-row class="icon-parent">
      <el-col
        :xs="6"
        :md="3"
        :sm="3"
        :lg="3"
        :xl="3"
        v-for="item of icons"
        :key="item.icon_id"
      >
        <div class="icon-wrapper flex flex-direction justify-center align-center">
          <SvgIcon
            :icon-class="item.font_class"
            style="font-size: 30px"
          />
          <div class=" text-xs margin-top">{{item.font_class}}</div>
          <div
            class="copy text-center"
            @click="onCopy(item)"
          >
            复制
          </div>
        </div>
      </el-col>
    </el-row>
    <TableFooter
      :show-refresh="false"
      ref="tableFooter"
      :pageSizes="[100]"
      @refresh="doRefresh"
      @pageChanged="doRefresh"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, reactive, ref } from "vue";
import Iconfonts from "@/icons/iconfont/iconfont.json";
import { showConfirmBox } from "@/components/types";
import type { TableFooter } from "@/components/types";
import { TinyEmitter } from "tiny-emitter";
interface IconItem {
  font_class: string;
  icon_id: string;
  name: string;
  unicode: string;
  unicode_decimal: number;
}

export default defineComponent({
  name: "IconFont",
  setup() {
    const icons = reactive([] as Array<IconItem>);
    const tableFooter = ref<TableFooter>();
    function doRefresh() {
      const { page = 10, pageSize = 100 } =
        tableFooter.value!.withPageInfoData();
      icons.length = 0;
      const start = (page - 1) * pageSize;
      icons.push(...Iconfonts.glyphs.slice(start, 100 + start));
    }
    icons.push(...Iconfonts.glyphs.slice(0, 100));
    onMounted(() => {
      doRefresh();
      tableFooter.value?.setTotalSize(Iconfonts.glyphs.length);
      tableFooter.value?.setPageSize(100);
    });
    const onCopy = (item: IconItem) => {
      showConfirmBox("复制成功:" + JSON.stringify(item));
    };
    return {
      tableFooter,
      icons,
      onCopy,
      doRefresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-parent {
  border-top: 1px solid #f7f7f7;
  border-left: 1px solid #f7f7f7;
  .icon-wrapper {
    position: relative;
    height: 100px;
    border-right: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    overflow: hidden;
    padding-bottom: 0;
    transition: padding-bottom 0.2s ease-in-out;
    &:hover {
      color: #409eff;
      box-shadow: 0 0 10px #f0f0f0;
      padding-bottom: 22px;
      transition: padding-bottom 0.2s ease-in-out;
      .copy {
        cursor: pointer;
        transform: translateY(0);
        transition: transform 0.2s ease-in-out;
      }
    }
    .copy {
      position: absolute;
      background-color: #409eff;
      padding: 5px 0;
      color: #fff;
      font-size: 12px;
      bottom: 0;
      left: 0;
      right: 0;
      transform: translateY(100%);
      transition: transform 0.2s ease-in-out;
    }
  }
}
</style>