<template>
  <div
    v-infinite-scroll="onLoad"
    :infinite-scroll-disabled="disabled"
  >
    <el-row class="icon-parent">
      <el-col
        :xs="6"
        :md="3"
        :sm="3"
        :lg="3"
        :xl="3"
        v-for="item of icons"
        :key="item"
      >
        <div class="icon-wrapper flex flex-direction justify-center align-center">
          <i
            :class="item"
            style="font-size: 30px"
          />
          <div class="text-xs margin-top text-center">{{item}}</div>
          <div
            class="copy text-center"
            @click="onCopy(item)"
          >
            复制
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="text-center  padding-tb">{{loading ? '加载中…' : '加载完成'}}</div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { showConfirmBox } from "@/components/types";
import { ElementIcons } from "@/assets/data/element-plus-icon";

export default defineComponent({
  name: "ElementPlus",
  setup() {
    const loading = ref(false);
    const icons = reactive([] as Array<string>);
    const iconArray = ElementIcons.split(" ");
    const disabled = computed(() => icons.length == iconArray.length);
    const onCopy = (item: string) => {
      showConfirmBox("复制成功:" + item);
    };
    const onLoad = () => {
      loading.value = true;
      setTimeout(() => {
        icons.push(...iconArray.slice(icons.length, icons.length - 1 + 100));
        nextTick(() => {
          loading.value = icons.length != iconArray.length;
        });
      }, 2000);
    };
    return {
      loading,
      icons,
      disabled,
      onCopy,
      onLoad,
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
