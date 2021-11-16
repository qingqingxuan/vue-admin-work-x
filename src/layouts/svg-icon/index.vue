<template>
  <component
    :is="component"
    :class="svgClass"
    aria-hidden="true"
  >
    <use :href="iconName" />
  </component>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    component() {
      return this.iconClass.startsWith('el-') ? 'i' : 'svg'
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.iconClass.startsWith('el-')) {
        return this.iconClass
      }
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
