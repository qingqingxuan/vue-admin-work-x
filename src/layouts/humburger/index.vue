<template>
  <el-icon
    class="fold-wrapper"
    :class="[state.isCollapse ? 'fold-close-status' : 'fold-open-status']"
    @click="toggleFold"
  >
  <Fold />
  </el-icon>
</template>

<script lang="ts">
import store from '../store'
import { defineComponent } from 'vue'
import { Fold } from '@element-plus/icons'
export default defineComponent({
  name: 'Humburger',
  components: {Fold},
  setup() {
    function toggleFold() {
      store.toggleCollapse(!store.state.isCollapse)
    }
    return {
      state: store.state,
      toggleFold
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
.fold-open-status {
  transform: rotate(180deg);
}
.fold-close-status {
  transform: rotate(0);
}
.fold-wrapper {
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  margin: 0 10px;
  font-size: 20px;
  transition: transform $transitionTime;
}
.fold-wrapper:hover {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
