<template>
  <div>
    query
    {{ params.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const state = reactive({
      params: {},
    });
    onMounted(() => {
      state.params = route.query;
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style>
</style>