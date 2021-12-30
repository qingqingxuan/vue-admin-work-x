<template>
  <el-card>
    <IconSelector v-model:value="icon" />
    <div style="width: 300px">
      <TreeSelector :data="data" v-model:value="value.name" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
const icon = ref("search");
const value = reactive({
  name: 1,
});
watch(
  () => value.name,
  () => {
    console.log(value.name);
  }
);
setTimeout(() => {
  value.name = 5;
}, 3000);
const data = [
  {
    value: 1,
    label: "Level one 1",
    children: [
      {
        value: 4,
        label: "Level two 1-1",
        children: [
          {
            value: 9,
            label: "Level three 1-1-1",
          },
          {
            value: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    value: 2,
    label: "Level one 2",
    children: [
      {
        value: 5,
        label: "Level two 2-1",
      },
      {
        value: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    value: 3,
    label: "Level one 3",
    children: [
      {
        value: 7,
        label: "Level two 3-1",
      },
      {
        value: 8,
        label: "Level two 3-2",
      },
    ],
  },
];
</script>
