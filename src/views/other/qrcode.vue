<template>
  <el-card
    :body-style="{padding: '0'}"
    shadow="never"
    class="main-container"
  >
    <template #header>
      <div class="flex align-center">
        <span>生成二维码</span>
        <el-input
          v-model="qrText"
          class="flex-sub margin-lr"
          size="small"
          placeholder="请输入文本内容"
        />
        <el-button
          type="primary"
          size="mini"
          @click="generatorCode"
        >点击生成</el-button>
      </div>
    </template>
    <div
      v-show="qrUrl"
      class="content-wrappar flex flex-direction justify-center align-center"
    >
      <img
        ref="canvas"
        :src="qrUrl"
        class="canvas"
      />
      <div class="setting-wrapper margin-top">
        <div class="flex justify-between align-center">
          <span class="label">间距</span>
          <el-slider
            v-model="margin"
            :step="1"
            :max="10"
            :min="1"
            class="slider-wrapper"
            @change="onMarginChange"
          />
        </div>
        <div class="flex justify-center align-center margin-top">
          <el-button
            size="mini"
            type="primary"
            @click="changeBgColor"
          >更改背景色</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="changeFrColor"
          >更改前景色</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="restore"
          >恢复原始状态</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { showErrorMessage } from "@/components/types";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import Qrcode from "qrcode";
export default defineComponent({
  name: "Qrcode",
  setup() {
    const qrText = ref("");
    const qrUrl = ref("");
    const margin = ref(1);
    const lightColor = ref("");
    const darkColor = ref("");

    const generatorCode = () => {
      if (!qrText.value) {
        showErrorMessage("请输入二维码文本内容");
        return;
      }
      Qrcode.toDataURL(qrText.value, {
        width: 250,
        margin: margin.value,
        color: {
          dark: darkColor.value,
          light: lightColor.value,
        },
      }).then((res) => {
        qrUrl.value = res;
      });
    };
    const onMarginChange = () => {
      generatorCode();
    };
    const changeBgColor = () => {
      lightColor.value = "#ffff00";
      generatorCode();
    };
    const changeFrColor = () => {
      darkColor.value = "#ff0000";
      generatorCode();
    };
    const restore = () => {
      lightColor.value = "";
      darkColor.value = "";
      margin.value = 1;
      generatorCode();
    };
    onMounted(() => {
      qrText.value = "vue-admin-work-x";
      generatorCode();
    });
    return {
      qrText,
      qrUrl,
      margin,
      lightColor,
      darkColor,
      generatorCode,
      onMarginChange,
      changeBgColor,
      changeFrColor,
      restore,
    };
  },
});
</script>

<style lang="scss" scoped>
.content-wrappar {
  .canvas {
    width: 250px !important;
    height: 250px !important;
    border: 2px solid #f5f5f5;
  }
  .setting-wrapper {
    width: 50%;
    .label {
      width: 50px;
    }
    .slider-wrapper {
      width: 100%;
    }
  }
}
</style>
