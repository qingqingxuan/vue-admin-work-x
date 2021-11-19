<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item of breadcrumbs"
        :key="item.path"
      >
        <span class="breadcrumb-title">{{ item.meta?.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onMounted, shallowReactive, watch } from 'vue'
import { RouteLocationMatched, useRoute } from 'vue-router'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const breadcrumbs = shallowReactive([] as Array<RouteLocationMatched>)
    const route = useRoute()
    function generatorBreadcrumb() {
      breadcrumbs.length = 0
      breadcrumbs.push(
        ...route.matched.filter((it) => {
          return it.meta && it.meta.title
        })
      )
    }
    watch(
      () => route.path,
      () => {
        generatorBreadcrumb()
      }
    )
    onMounted(generatorBreadcrumb)
    return {
      breadcrumbs
    }
  }
})
</script>
