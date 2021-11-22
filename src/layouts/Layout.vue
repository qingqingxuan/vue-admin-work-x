<template>
  <div
    class="vaw-layout-container"
    :class="[state.device === 'mobile' && 'is-mobile', state.theme]"
  >
    <transition name="header">
      <VAWHeader v-if="isShowHeader" />
    </transition>
    <template v-if="isShowHeader">
      <SideBar
        ref="sideBar"
        :show-logo="!isShowHeader"
        class="layout-mode-ttb"
      />
      <MainLayout :show-nav-bar="!isShowHeader" />
    </template>
    <template v-else-if="state.layoutMode === 'lcr'">
      <TabSplitSideBar />
      <MainLayout />
    </template>
    <template v-else>
      <SideBar ref="sideBar" />
      <MainLayout />
    </template>
    <div
      v-if="state.device === 'mobile'"
      class="mobile-shadow"
      :class="[state.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    ></div>
    <Setting ref="appSettingRef" />
  </div>
</template>

<script lang="ts">
import { useEmit } from "@/hooks";
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import store from "./store";
export default defineComponent({
  name: "Layout",
  setup() {
    const emit =  useEmit()
    const appSettingRef = ref()
    emit?.on('show_setting', () => {
      appSettingRef.value.openDrawer()
    })
    const isShowHeader = computed(() => {
      return store.isShowHeader();
    });
    function handleScreenResize() {
      const width = document.body.clientWidth;
      if (width <= 768) {
        store.changeDevice("mobile");
        store.toggleCollapse(true);
      } else if (width < 992 && width > 768) {
        store.changeDevice("pad");
        store.toggleCollapse(true);
      } else if (width < 1200 && width >= 992) {
        store.changeDevice("pc");
        store.toggleCollapse(false);
      } else {
        store.changeDevice("pc");
        store.toggleCollapse(false);
      }
    }
    function closeMenu() {
      store.toggleCollapse(true);
    }
    onMounted(() => {
      handleScreenResize();
      window.addEventListener("resize", handleScreenResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleScreenResize);
    });
    return {
      appSettingRef,
      state: store.state,
      isShowHeader,
      closeMenu,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./styles/variables.scss";
.vaw-layout-container {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  .mobile-shadow {
    display: none;
  }
  .layout-mode-ttb {
    margin-top: $logoHeight;
    transition: all $transitionTime;
  }
}
.is-mobile {
  .mobile-shadow {
    background-color: #000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 98;
  }
  .close-shadow {
    display: none;
  }
  .show-shadow {
    display: block;
    opacity: 0.5;
    transition: all $transitionTime;
  }
}
</style>
