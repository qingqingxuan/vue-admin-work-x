<template>
  <el-skeleton
    :loading="loading"
    animated
  >
    <template #template>
      <el-card>
        <el-skeleton-item
          variant="h3"
          style="width: 50%;"
        />
        <div class="margin-top">
          <el-skeleton-item variant="text" />
          <el-skeleton-item
            variant="text"
            style="width: 50%;"
            class="margin-top"
          />
          <el-skeleton-item
            variant="text"
            class="margin-top"
          />
          <el-skeleton-item
            variant="text"
            style="width: 50%;"
            class="margin-top"
          />
        </div>
      </el-card>
    </template>
    <template #default>
      <el-card
        :body-style="{padding: '10px'}"
        shadow="never"
      >
        <template #header>
          <div class="flex align-center justify-between">
            <span class="text-bold text-sm">{{ dataModel.title }}</span>
          </div>
        </template>
        <div
          style="height: 130px"
          class="flex flex-direction justify-between"
        >
          <div class="flex flex-direction justify-center">
            <span class="text-xxl">{{ dataModel.data }}</span>
          </div>
          <div class="flex-sub flex flex-direction justify-center">
            <slot
              name="extra"
              :extra="dataModel.extra"
            ></slot>
          </div>
          <div class="divide"></div>
          <div class="flex justify-between align-center">
            <span class="text-grey text-sm">{{ dataModel.bottomTitle }}</span>
            <span class="text-grey text-sm">{{ dataModel.totalSum }}</span>
          </div>
        </div>
      </el-card>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DataItem",
  props: {
    dataModel: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    const loading = ref(true);
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    return {
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-card__header) {
  padding: 10px;
}
.divide {
  margin: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}
</style>
