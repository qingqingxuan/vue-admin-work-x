<template>
  <div class="logo-wrapper">
    <img
      v-if="showLogo"
      class="logo-img"
      :src="require('@/assets/work_logo.png')"
    />
    <transition
      v-if="showTitle"
      name="el-fade-in-linear"
    >
      <span
        v-show="!state.isCollapse || alwaysShow"
        class="logo-title"
      >{{setting.projectName}}</span>
    </transition>
  </div>
</template>

<script lang="ts">
import store from "../store";
import { defineComponent } from "vue";
import { useSetting } from "@/hooks";
export default defineComponent({
  name: "Logo",
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const setting = useSetting();
    return {
      state: store.state,
      setting,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
.logo-wrapper {
  height: $logoHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-color-white);
  border-bottom: 1px dashed var(--el-border-color-light);
  .logo-img {
    width: 30px;
  }
  .logo-title {
    font-weight: bold;
  }
}
</style>
