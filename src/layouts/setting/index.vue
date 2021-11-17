<template>
  <el-drawer
    v-model="opened"
    direction="rtl"
    title="系统设置"
    :size="state.device === 'mobile' ? '75%' : '270px'"
  >
    <el-scrollbar
      height="90vh"
      class="wrapper"
    >
      <el-divider content-position="center">主题风格</el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of styleExampleList"
          :key="index"
          :span="8"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            @click="exampleClick(item)"
          />
        </el-col>
      </el-row>
      <el-divider content-position="center">布局模式</el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of layoutExampleList"
          :key="index"
          :span="8"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            :class="[item.class || '']"
            :tip-text="item.tipText"
            @click="layoutExampleClick(item)"
          />
        </el-col>
      </el-row>
      <el-divider content-position="center">主题颜色</el-divider>
      <div class="colors-wrapper">
        <div
          v-for="(item, index) of primartyColorList"
          :key="index"
          class="color-wrapper"
          :class="{'circle' : item.checked}"
          :style="{'background-color': item.value}"
          @click="colorClick(item)"
        ></div>
      </div>
      <div style="height: 20px"></div>
      <el-divider content-position="center">按钮显示</el-divider>
      <div class="setting-item-wrapper">
        <span>固定顶部导航</span>
        <el-switch
          v-model="state.isFixedNavBar"
          :disabled="state.layoutMode === 'ttb'"
        />
      </div>
      <div class="setting-item-wrapper">
        <span>搜索</span>
        <el-switch v-model="state.actionItem.showSearch" />
      </div>
      <div class="setting-item-wrapper">
        <span>消息</span>
        <el-switch v-model="state.actionItem.showMessage" />
      </div>
      <div class="setting-item-wrapper">
        <span>刷新</span>
        <el-switch v-model="state.actionItem.showRefresh" />
      </div>
      <div class="setting-item-wrapper">
        <span>全屏</span>
        <el-switch v-model="state.actionItem.showFullScreen" />
      </div>
      <el-divider />
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import StyleExample from './components/StyleExample'
import { toggleThemeClass, toggleThemeColorClass } from '../utils'
import store from '../store'
export default {
  name: 'Setting',
  components: {
    StyleExample
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opened: this.show,
      styleExampleList: [
        {
          leftBg: '#000000',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'dark-side'
        },
        {
          leftBg: '#ffffff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#d4d4d4',
          checked: false,
          themeId: 'light'
        },
        {
          leftBg: '#047fff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'blue-side'
        },
        {
          leftBg: '#000000',
          rightTopBg: '#333333',
          rightBottomBg: '#555555',
          checked: false,
          themeId: 'dark'
        }
      ],
      layoutExampleList: [
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: true,
          layoutId: 'ltr',
          tipText: '左右'
        },
        {
          leftBg: '#d4d4d4',
          rightTopBg: '#ffffff',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'ttb',
          class: 'extra-class',
          tipText: '上下'
        },
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'lcr',
          class: 'extra-class-1',
          tipText: '分栏'
        }
      ],
      primartyColorList: [
        {
          name: 'blue',
          value: '#409eff',
          checked: true
        },
        {
          name: 'cyan',
          value: '#13C2C2',
          checked: false
        },
        {
          name: 'red',
          value: '#F5222D',
          checked: false
        },
        {
          name: 'purple',
          value: '#722ED1',
          checked: false
        }
      ],
      state: store.state
    }
  },
  mounted() {
    this.styleExampleList.forEach((it) => {
      it.checked = this.state.theme === it.themeId
    })
    this.layoutExampleList.forEach((it) => {
      it.checked = this.state.layoutMode === it.layoutId
    })
    this.primartyColorList.forEach((it) => {
      it.checked = this.state.themeColor === 'theme_color_' + it.name
    })
  },
  watch: {
    show(newVal) {
      console.log(newVal)
      this.opened = newVal
    }
  },
  methods: {
    openDrawer() {
      this.opened = !this.opened
    },
    exampleClick(item) {
      this.styleExampleList.forEach((it) => {
        it.checked = it === item
      })
      store.changeTheme(item.themeId)
      toggleThemeClass(document.body, this.state.theme)
    },
    layoutExampleClick(item) {
      this.layoutExampleList.forEach((it) => {
        it.checked = it === item
      })
      store.changeLayoutMode(item.layoutId)
    },
    colorClick(item) {
      this.primartyColorList.forEach((it) => {
        it.checked = it === item
      })
      toggleThemeColorClass(document.body, 'theme_color_' + item.name)
    }
  }
}
</script>

<style lang="scss">
.dark {
  .el-drawer {
    background-color: #272727 !important;
  }
}
.light,
.dark-side,
.blue-side {
  .el-drawer {
    background-color: #ffff !important;
  }
}

.el-drawer__header {
  margin-bottom: 0 !important;
}
</style>
<style lang="scss" scoped>
$width: 60px;
.wrapper {
  .close-wrapper {
    position: absolute;
    right: 8%;
    top: 1%;
    font-size: 20px;
  }
  .colors-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .color-wrapper {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #c1c1c1;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .circle::after {
      content: "";
      display: block;
      margin: 0 auto;
      margin-top: 25px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgb(3, 190, 50);
      text-align: center;
    }
  }
  .setting-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
  }
}
.example-wrapper + .example-wrapper {
  margin-bottom: 30px;
}
</style>
