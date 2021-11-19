<template>
  <div
    class="vaw-main-layout-container"
    :class="[!state.isCollapse ? 'main-layout-open-status': 'main-layout-close-status', state.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout']"
  >
    <section :class="[!state.isCollapse ? 'nav-bar-open-status' : 'nav-bar-close-status',state.isFixedNavBar ? 'fixed-nav-bar' : '',!showNavBar ? 'tab-bar-top' : '']">
      <NavBar v-if="showNavBar" />
      <TabBar :show-humburger="isShowHeader" />
    </section>
    <div class="main-base-style">
      <section class="main-section">
        <Main />
      </section>
      <section class="footer-wrapper">
        <Footer />
      </section>
      <el-backtop target=".main-base-style">
        <div>
          <i class="el-icon-caret-top"></i>
        </div>
      </el-backtop>
    </div>
    <el-backtop target=".vaw-main-layout-container">
      <div>
        <i class="el-icon-caret-top"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import NavBar from './navbar/NavBar'
import TabBar from './tabbar'
import Main from './Main'
import store from './store'
export default {
  name: 'MainLayout',
  components: { NavBar, Main, TabBar },
  props: {
    showNavBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    isShowHeader() {
      return store.isShowHeader()
    }
  },
  methods: {
    onFixedHeader() {
      store.toggleFixedNavBar(!this.state.isFixedNavBar)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";
.main-layout-open-status {
  margin-left: $menuWidth;
}
.main-layout-close-status {
  margin-left: $minMenuWidth;
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
  padding-top: $logoHeight + $tabHeight;
  overflow-y: hidden;
  .main-base-style {
    overflow-y: auto;
  }
}

.vaw-main-layout-container {
  height: 100%;
  box-sizing: border-box;
  transition: margin-left $transitionTime;
  .main-base-style {
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  .main-section {
    min-height: calc(100% - #{$footerHeight});
    overflow-x: hidden;
  }
  .fixed-nav-bar {
    position: fixed;
    top: 0;
    transition: width $transitionTime;
    z-index: 99;
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
