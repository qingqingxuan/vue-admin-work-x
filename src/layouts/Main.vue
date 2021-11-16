<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade-transform"
      mode="out-in"
      appear
    >
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import store from './store'
export default {
  name: 'Main',
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    cachedViews() {
      return this.state.cachedView.map((it) => it)
    }
  }
}
</script>
