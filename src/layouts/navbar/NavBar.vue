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

<script>
import store from '../store'
export default {
  name: 'NavBar',
  data() {
    return {
      state: store.state
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.vaw-nav-bar-wrapper {
  height: $logoHeight;
  max-height: $logoHeight;
  min-height: $logoHeight;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .avatar-wrapper {
    padding-right: 15px;
  }
  .right-wrapper {
    height: 100%;
  }
}
</style>
