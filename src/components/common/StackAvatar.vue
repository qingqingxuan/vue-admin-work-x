<template>
  <div class="stack-avatar-container">
    <span
      v-for="(item, index) of avatars"
      :key="index"
      class="avatar-wrapper"
    >
      <el-tooltip
        class="item"
        effect="dark"
        :content="item.name"
        placement="top"
      >
        <img
          :src="item.avatar"
          class="avatar"
        />
      </el-tooltip>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StackAvatar",
  props: {
    avatarList: {
      type: Array,
      default: () => [
        {
          avatar: require("@/assets/img_avatar_01.jpeg"),
          name: "悟空",
        },
        {
          avatar: require("@/assets/img_avatar_02.jpeg"),
          name: "唐僧",
        },
      ],
    },
  },
  setup(props) {
    return {
      avatars: props.avatarList.slice(0, 5),
    };
  },
});
</script>

<style lang="scss" scoped>
.stack-avatar-container {
  .avatar-wrapper {
    margin-left: -15px;
    .avatar {
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid #f5f5f5;
    }
  }
}
</style>
