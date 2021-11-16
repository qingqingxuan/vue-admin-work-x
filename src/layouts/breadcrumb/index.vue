<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item of breadcrumbs"
        :key="item.path"
      >
        <span class="breadcrumb-title">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import store from '../store'
export default {
  name: 'Breadcrumb',
  data() {
    return {
      state: store.state,
      breadcrumbs: []
    }
  },
  watch: {
    $route() {
      this.generatorBreadcrumb()
    }
  },
  mounted() {
    this.generatorBreadcrumb()
  },
  methods: {
    generatorBreadcrumb() {
      this.breadcrumbs = this.$route.matched.filter((it) => {
        return it.meta && it.meta.title
      })
    }
  }
}
</script>
