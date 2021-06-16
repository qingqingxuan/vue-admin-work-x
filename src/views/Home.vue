<template>
  <div class="home">
    <img
      src="../assets/logo.png"
      @click="imageClick"
    />
    <div @click="nickNameClick">{{ userState.user.nickName }}</div>
    <div @click="changeVersion('12345612345646')">
      12 {{ userName }} 12 {{ version + "   " + layoutMode }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ParentState } from "@/store/types";
import { useStore } from "@/store";
export default defineComponent({
  name: "Home",
  computed: {
    ...mapState<ParentState>({
      userName: (state: ParentState) => {
        return state.user.userName;
      },
    }),
    ...mapGetters({
      version: "app/getVersion",
    }),
    layoutMode() {
      return this.$store.getters["app/getAppName"];
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
