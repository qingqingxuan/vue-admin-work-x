<template>
  <div class="vaw-nav-bar-wrapper">
    <Humburger />
    <Breadcrumb v-if="state.device !== 'mobile'" />
    <div style="flex: 1">
    </div>
    <div class="right-wrapper">
      <ActionItems />
    </div>
    <div class="avatar-wrapper">
      <VAWAvatar />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import store from '../store'
export default defineComponent({
  name: 'NavBar',
  setup() {
    return {
      state: store.state
    }
  }
})
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
.vaw-nav-bar-wrapper {
  height: $logoHeight;
  max-height: $logoHeight;
  min-height: $logoHeight;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: var(--el-color-white);
  border-bottom: 1px solid var(--el-border-color-light);
  .avatar-wrapper {
    padding-right: 15px;
  }
  .right-wrapper {
    height: 100%;
  }
}
</style>
