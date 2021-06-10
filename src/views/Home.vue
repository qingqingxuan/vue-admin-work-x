<template>
  <div class="home">
    <img src="../assets/logo.png" @click="imageClick" />
    <HelloWorld :msg="message" />
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
export default class Home extends Vue {
  message = "this is message";
  mounted(): void {
    console.log("mounted");
  }
  imageClick() {
    console.log(this);
    this.message = "this is new message";
  }
}
</script>
