<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <HelloWorld :msg="react.name" />
    <button @click="changeName">改一下名</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    const react = ref({
      name: '张三'
    })
    const changeName = function () {
      react.name = 'new 张三'
    }
    return { react, changeName }
  }
}
</script>
