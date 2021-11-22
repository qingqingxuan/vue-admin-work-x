<template>
  <div class="main-container">
    <el-card :body-style="{padding: '0px'}">
      <template #header>
        <div class="flex justify-between">
          <span :underline="false">打印图片</span>
          <el-button
            type="primary"
            size="small"
            @click="printImage"
          >打印</el-button>
        </div>
      </template>
      <div class="image-wrapper">
        <img :src="imagePath" />
      </div>
    </el-card>
    <el-card
      :body-style="{padding: '5px'}"
      class="margin-top-xs"
    >
      <template #header>
        <div class="flex justify-between">
          <span :underline="false">打印HTML</span>
          <el-button
            type="primary"
            size="small"
            @click="printHtml"
          >打印</el-button>
        </div>
      </template>
      <div
        id="htmlWrapper"
        class="html-wrapper flex justify-center align-center flex-direction"
      >
        <el-table
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
        >
          <el-table-column
            align="center"
            label="姓名"
            prop="name"
          />
          <el-table-column
            align="center"
            label="年龄"
            prop="age"
          />
          <el-table-column
            align="center"
            label="性别"
            prop="gender"
          />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import printJS from "print-js";
import imagePath from "@/assets/logo.png";
import { shallowReactive } from "vue";
import { useDataTable } from "@/hooks";

const { tableConfig } = useDataTable();

const dataList = shallowReactive([
  {
    name: "张三",
    age: 10,
    gender: "男",
  },
  {
    name: "李四",
    age: 40,
    gender: "男",
  },
  {
    name: "王五",
    age: 30,
    gender: "女",
  },
]);

function printImage() {
  printJS({
    printable: imagePath,
    type: "image",
    showModal: false,
  });
}
function printHtml() {
  printJS({
    printable: "htmlWrapper",
    type: "html",
    targetStyles: ["*"],
  });
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 30%;
  margin: 0 auto;
  & > img {
    width: 100%;
  }
}
.html-wrapper {
  width: 80%;
  margin: 0 auto;
  & > h1 {
    color: red;
  }
}
</style>
