<template>
  <component
    :is="component"
    :class="svgClass"
    aria-hidden="true"
  >
    <use :href="iconName" />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
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
  setup(props) {
    const component = computed(() => {
      return props.iconClass.startsWith('el-') ? 'i' : 'svg'
    })
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })
    const svgClass = computed(() => {
      if (props.iconClass.startsWith('el-')) {
        return props.iconClass
      }
      if (props.className) {
        return 'svg-icon ' + props.className
      } else {
        return 'svg-icon'
      }
    })
    return {
      component,
      iconName,
      svgClass
    }
  }
})
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
