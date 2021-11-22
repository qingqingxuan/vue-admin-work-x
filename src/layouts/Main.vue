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

<script lang="ts">
import { computed, defineComponent } from "vue";
import store from "./store";
export default defineComponent({
  name: "Main",
  setup() {
    const state = store.state;
    const cachedViews = computed(() => {
      return state.cachedView.map((it) => it);
    });
    return {
      state,
      cachedViews,
    };
  },
});
</script>
