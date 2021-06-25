<template>
  <div class="redirect-contianer"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "@vue/runtime-core";

export default defineComponent({
  created() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({
      path: "/" + (typeof path === "string" ? path : path.join("/")),
      query,
    });
  },
});
</script>
