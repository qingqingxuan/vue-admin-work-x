<template>
  <div class="item-container">
    <div class="img-wrapper">
      <img
        class="img-item"
        :src="item.imagePath"
      />
    </div>
    <div class="info-wrapper">
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectItem",
  props: {
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.item-container {
  position: relative;
  width: 100%;
  height: 7rem;
  z-index: 0;
  .img-wrapper {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    overflow: hidden;
    border-radius: 5px;
    z-index: 1;
    .img-item {
      position: relative;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      transform: scale(1, 1);
      object-fit: cover;
    }
    .img-item:hover {
      transform: scale(1.5, 1.5);
      transition: transform 0.3s ease-in-out;
    }
  }
  .img-wrapper::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.4;
    border-radius: 50%;
    transform: scale(2, 2);
    pointer-events: none;
  }
  .img-wrapper:hover::after {
    transform: scale(0, 0);
    transition: all 0.3s ease-in-out;
  }
  .info-wrapper {
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 5px;
    z-index: 2;
    color: #fff;
    pointer-events: none;
  }
}
</style>
