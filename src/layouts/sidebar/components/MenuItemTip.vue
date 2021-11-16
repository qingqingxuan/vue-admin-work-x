<template>
  <el-badge
    :value="value"
    :is-dot="isDot"
  />
</template>

<script>
export default {
  name: 'MenuItemTip',
  props: {
    isDot: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-badge {
  position: absolute;
  top: 5px;
  right: 20px;
}
.el-sub-menu__title .el-badge {
  right: 35px;
}
</style>
