<template>
  <div class="flex item-container margin">
    <el-avatar
      :size="40"
      :src="item.avatar"
    />
    <div class="flex flex-direction justify-between margin-left">
      <div class="text-sm">
        <slot
          name="title"
          :title="item.title"
        ></slot>
      </div>
      <div class="text-gray text-xs">一小时前</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TrendsItem",
  props: {
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
