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
          disabled
          placeholder="请输入文本内容"
        />
      </div>
    </template>
    <el-row class="margin-top">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
      >
        <el-card
          :body-style="{padding: 0}"
          class="margin-lr margin-bottom"
        >
          <template #header>
            <div class=" text-md">带logo</div>
          </template>
          <div class="text-center">
            <canvas
              id="logoCanvas"
              width="250"
              height="250"
            ></canvas>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="(item, index) of qrcodeList"
        :key="index"
      >
        <el-card
          :body-style="{padding: 0}"
          class="margin-lr margin-bottom"
        >
          <template #header>
            <div class=" text-md">{{ item.title }}</div>
          </template>
          <div class="text-center">
            <img
              :src="item.url"
              class="canvas"
              style="margin: 0 auto"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { showErrorMessage } from "@/components/types";
import { defineComponent, onMounted, reactive, ref } from "vue";
import Qrcode from "qrcode";
import logo from "@/assets/logo.png";
interface QrcodeItem {
  title: string;
  url: string;
}
export default defineComponent({
  name: "Qrcode",
  setup() {
    const qrText = ref("");
    const qrUrl = ref("");
    const margin = ref(1);
    const lightColor = ref("");
    const darkColor = ref("");

    const qrcodeList = reactive([] as Array<QrcodeItem>);

    const generatorCode = (it: any) => {
      if (!qrText.value) {
        showErrorMessage("请输入二维码文本内容");
        return;
      }
      Qrcode.toDataURL(qrText.value, {
        width: 250,
        margin: it.margin,
        color: {
          dark: it.darkColor,
          light: it.lightColor,
        },
      }).then((res) => {
        qrcodeList.push({
          title: it.title,
          url: res,
        } as QrcodeItem);
      });
    };
    const generatorCodeWithLogo = () => {
      const canvas = document.getElementById("logoCanvas") as HTMLCanvasElement;
      Qrcode.toCanvas(canvas, qrText.value, {
        width: 250,
      }).then(() => {
        const context = canvas.getContext("2d");
        const img = new Image();
        const x = (canvas.getBoundingClientRect().width - 50) / 2;
        img.src = logo;
        img.onload = () => {
          context?.drawImage(img, x, x, 50, 50);
        };
      });
    };
    onMounted(() => {
      qrText.value = "vue-admin-work-x";
      [
        {
          title: "普通样式",
          lightColor: "",
          darkColor: "",
        },
        {
          title: "前景色样式",
          lightColor: "",
          darkColor: "#ff0000",
        },
        {
          title: "背景色样式",
          lightColor: "#ffff00",
          darkColor: "",
        },
        {
          title: "混合样式",
          lightColor: "#ffff00",
          darkColor: "#ff0000",
        },
        {
          title: "小间距",
          margin: 10,
          lightColor: "#409eff",
          darkColor: "",
        },
      ].forEach(generatorCode);
      generatorCodeWithLogo();
    });
    return {
      qrcodeList,
      qrText,
      logo,
      qrUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-card__header) {
  padding: 10px;
}
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
