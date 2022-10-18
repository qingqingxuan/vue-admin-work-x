<template>
  <el-card>
    <template #header>
      <div>
        <span>图片裁剪</span>
      </div>
    </template>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div style="height: 300px">
          <img
            style="display: block; max-width: 100%;"
            ref="cropperImg"
            :src="require('@/assets/images/1.jpeg')"
          >
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div style="width: 100%; height: 300px; overflow: hidden; background: #f7f7f7">
          <img
            style="width: 100%; height: 100%"
            :src="cropperSrc"
          >
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  unref,
} from "vue";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default defineComponent({
  name: "Copper",
  setup() {
    const cropperImg = ref<HTMLImageElement | null>(null);
    let cropper: Cropper | null = null;
    const cropperSrc = ref("");
    onMounted(() => {
      cropper = new Cropper(unref(cropperImg) as HTMLImageElement, {
        crop() {
          cropperSrc.value =
            cropper?.getCroppedCanvas().toDataURL("image/jpeg", 0.7) || "";
        },
      });
    });
    return { cropperImg, cropperSrc };
  },
});
</script>
