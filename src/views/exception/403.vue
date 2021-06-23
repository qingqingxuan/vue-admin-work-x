<template>
  <div class="main-container">
    <ExceptionStatus status="403" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ExceptionStatus from "./components/ExceptionStatus.vue";
export default defineComponent({
  name: "Page403",
  components: {
    ExceptionStatus,
  },
});
</script>
