<template>
  <div class="login-container">
    <el-button type="primary" size="mini" @click="onLogin">登录</el-button>
  </div>
</template>

<script lang="ts">
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const onLogin = () => {
      Cookies.set("admin-token", "123");
      router.push({ path: route.query.redirect as string });
    };
    return {
      onLogin,
    };
  },
});
</script>

<style></style>
