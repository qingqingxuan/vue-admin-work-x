<template>
  <div class="home">
    <img src="../assets/logo.png" @click="imageClick" />
    <div @click="nickNameClick">{{ userState.user.nickName }}</div>
    <div @click="changeVersion('12345612345646')">
      12 {{ name }} 12 {{ version + "   " + layoutMode }}
    </div>
    <HelloWorld :msg="message" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { defineComponent, ref } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ParentState } from "@/store/types";
import { useStore } from "@/store";
export default defineComponent({
  name: "Home",
  components: { HelloWorld },
  computed: {
    ...mapState<ParentState>({
      name: (state: ParentState) => {
        return state.app.version;
      },
    }),
    ...mapGetters({
      version: "app/getVersion",
    }),
    layoutMode() {
      return this.$store.getters["app/getLayoutMode"];
    },
  },
  methods: {
    ...mapActions("app", ["changeVersion"]),
    nickNameClick() {
      this.$store.dispatch("user/changeNickName", "太阳花");
    },
  },
  setup() {
    const message = ref("this is message");
    const a = ref(10);
    const store = useStore();
    const userState = store.state;
    // const nickNameClick = () => {
    //   store.dispatch("user/changeNickName", "太阳花");
    // };
    return {
      message,
      a,
      userState,
      // nickNameClick,
    };
  },
});
</script>
