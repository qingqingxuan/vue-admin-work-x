<template>
  <el-drawer
    v-model="opened"
    direction="rtl"
    title="系统设置"
    :size="state.device === 'mobile' ? '75%' : '270px'"
  >
    <el-scrollbar height="90vh" class="wrapper">
      <el-divider content-position="center">主题风格</el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of styleExampleList"
          :key="index"
          :span="12"
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
          :class="{ circle: item.checked }"
          :style="{ 'background-color': item.value }"
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

<script lang="ts">
import StyleExample from "./components/StyleExample.vue";
import store from "../store";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { usePrimaryColor } from "../hooks";
import { primaryColors } from "../../setting";
export default defineComponent({
  name: "Setting",
  components: {
    StyleExample,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { expose }) {
    const opened = ref(props.show);
    const styleExampleList = reactive([
      {
        leftBg: "#000000",
        rightTopBg: "#ffffff",
        rightBottomBg: "#f5f5f5",
        checked: false,
        themeId: "dark-side",
      },
      {
        leftBg: "#ffffff",
        rightTopBg: "#ffffff",
        rightBottomBg: "#d4d4d4",
        checked: false,
        themeId: "light",
      },
    ]);
    const layoutExampleList = reactive([
      {
        leftBg: "#000000",
        rightTopBg: "#d4d4d4",
        rightBottomBg: "#d4d4d4",
        checked: true,
        layoutId: "ltr",
        tipText: "左右",
      },
      {
        leftBg: "#d4d4d4",
        rightTopBg: "#ffffff",
        rightBottomBg: "#d4d4d4",
        checked: false,
        layoutId: "ttb",
        class: "extra-class",
        tipText: "上下",
      },
      {
        leftBg: "#000000",
        rightTopBg: "#d4d4d4",
        rightBottomBg: "#d4d4d4",
        checked: false,
        layoutId: "lcr",
        class: "extra-class-1",
        tipText: "分栏",
      },
    ]);
    const primartyColorList = reactive(
      primaryColors.map((it) => {
        return {
          name: it,
          value: it,
          checked: false,
        };
      })
    );
    const state = store.state;
    onMounted(() => {
      styleExampleList.forEach((it) => {
        it.checked = state.theme === it.themeId;
      });
      layoutExampleList.forEach((it) => {
        it.checked = state.layoutMode === it.layoutId;
      });
      primartyColorList.forEach((it) => {
        it.checked = state.primaryColor === it.value;
      });
    });
    function openDrawer() {
      opened.value = !opened.value;
    }
    function exampleClick(item: any) {
      styleExampleList.forEach((it) => {
        it.checked = it === item;
      });
      store.changeTheme(item.themeId);
      store.saveSetting({ theme: item.themeId });
    }
    function layoutExampleClick(item: any) {
      layoutExampleList.forEach((it) => {
        it.checked = it === item;
      });
      store.changeLayoutMode(item.layoutId);
      store.saveSetting({ layoutMode: item.layoutId });
    }
    function colorClick(item: any) {
      primartyColorList.forEach((it) => {
        it.checked = it === item;
      });
      usePrimaryColor(item.value);
      store.saveSetting({ primaryColor: item.value });
    }
    expose({
      openDrawer,
    });
    return {
      opened,
      styleExampleList,
      layoutExampleList,
      primartyColorList,
      state,
      exampleClick,
      layoutExampleClick,
      colorClick,
    };
  },
});
</script>

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
    flex-wrap: wrap;
    .color-wrapper {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #c1c1c1;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: 10px 8px;
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
