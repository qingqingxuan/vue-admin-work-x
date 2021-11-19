
<template>
  <div class="footer-container">
    Copyright <i
      class="iconfont"
      style="margin: 0 5px"
    >&#xe619;</i> Vue-Admin-Work 2021
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Footer'
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
.footer-container {
  height: $footerHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
