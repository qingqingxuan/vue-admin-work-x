<template>
  <div
    class="vaw-main-layout-container"
    :class="[
      state.layoutMode === 'ttb' ? 'main-layout__ttb' : '',
      state.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout',
      state.isCollapse ? 'main-layout-close-status' : 'main-layout-open-status',
    ]"
  >
    <section
      :class="[
        state.layoutMode === 'ttb'
          ? 'nav-bar__ttb'
          : !state.isCollapse
          ? 'nav-bar-open-status'
          : 'nav-bar-close-status',
        state.isFixedNavBar ? 'fixed-nav-bar' : '',
        !mShowNavBar ? 'tab-bar-top' : '',
      ]"
    >
      <NavBar v-if="mShowNavBar" />
      <!-- <TabBar /> -->
    </section>
    <div class="main-base-style">
      <section class="main-section">
        <Main />
      </section>
      <section class="footer-wrapper">
        <Footer />
      </section>
      <el-backtop target=".main-base-style"> </el-backtop>
    </div>
    <el-backtop target=".vaw-main-layout-container"> </el-backtop>
  </div>
</template>

<script lang="ts">
import store from "./store";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "MainLayout",
  props: {
    showNavBar: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const state = store.state;
    function onFixedHeader() {
      store.toggleFixedNavBar(!state.isFixedNavBar);
    }
    const mShowNavBar = computed(() => {
      return props.showNavBar;
    });
    const isShowHeader = computed(() => {
      return store.isShowHeader();
    });
    return {
      state,
      mShowNavBar,
      isShowHeader,
      onFixedHeader,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";
.main-layout__ttb {
  margin-left: 0;
}
.main-layout-open-status {
  margin-left: $menuWidth;
}
.main-layout-close-status {
  margin-left: $minMenuWidth;
}
.nav-bar__ttb {
  width: 100%;
}
.nav-bar-open-status.fixed-nav-bar {
  width: calc(100% - #{$menuWidth});
}
.nav-bar-close-status.fixed-nav-bar {
  width: calc(100% - #{$minMenuWidth});
}

.main-layout {
  padding-top: 0;
  overflow-y: auto;
}
.main-layout_fixed-nav-bar {
  padding-top: $logoHeight;
  // padding-top: $logoHeight + $tabHeight;
  overflow-y: hidden;
  .main-base-style {
    overflow-y: auto;
  }
}

.vaw-main-layout-container {
  height: 100%;
  box-sizing: border-box;
  transition: margin-left $transitionTime;
  position: relative;
  .main-base-style {
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  .main-section {
    min-height: calc(100% - #{$footerHeight} - 6px);
    overflow-x: hidden;
  }
  .fixed-nav-bar {
    position: fixed;
    top: 0;
    transition: width $transitionTime;
    z-index: 96;
  }
  .tab-bar-top {
    padding-top: $logoHeight;
  }
}
.footer-wrapper {
  margin-top: 6px;
}
.is-mobile {
  .main-layout-open-status,
  .main-layout-close-status {
    margin-left: 0;
    transition: none;
  }
  .nav-bar-open-status,
  .nav-bar-close-status {
    width: 100%;
  }
}
</style>
