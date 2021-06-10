<template>
  <div class="home">
    <img src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { testClassDeco } from "../utils";
@Options({
  components: {
    HelloWorld,
  },
})
@testClassDeco
export default class Home extends Vue {}
</script>
