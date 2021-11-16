<template>
  <span
    class="fold-wrapper iconfont"
    :class="[state.isCollapse ? 'fold-open-status' : 'fold-close-status']"
    @click="toggleFold"
  >&#xe6fd;</span>
</template>

<script>
import store from '../store'
export default {
  name: 'Humburger',
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    toggleFold() {
      store.toggleCollapse(!store.state.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.fold-open-status {
  transform: rotate(180deg);
}
.fold-close-status {
  transform: rotate(0);
}
.fold-wrapper {
  box-sizing: border-box;
  display: inline-block;
  line-height: $logoHeight;
  text-align: center;
  padding: 0 15px;
  height: 100%;
  font-size: 20px;
  transition: transform $transitionTime;
}
.fold-wrapper:hover {
  color: #999999;
  cursor: pointer;
}
</style>
