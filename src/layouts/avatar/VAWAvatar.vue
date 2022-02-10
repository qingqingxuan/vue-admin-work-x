<template>
  <div class="vaw-avatar-container">
    <el-dropdown>
      <div class="action-wrapper">
        <div class="avatar">
          <img :src="useStore.avatar" />
        </div>
        <span class="nick-name el-dropdown-link">
          <span>{{ useStore.nickName }}</span>
          <el-icon>
            <CaretBottomIcon />
          </el-icon>
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="UserIcon" @click="onPersonalCenter"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item :icon="SwitchButton" @click="onLogout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElMessageBox } from "element-plus";
import { User as UserIcon, SwitchButton } from "@element-plus/icons";
import useUserStore from "@/store/modules/user";
import layoutStore from "../store";
export default defineComponent({
  name: "VAWAvatar",
  setup() {
    const useStore = useUserStore();
    function onPersonalCenter() {
      (layoutStore as any).onPersonalCenter &&
        (layoutStore as any).onPersonalCenter();
    }
    function onLogout() {
      ElMessageBox({
        title: "提示",
        message: "是否要退出登录？",
        type: "warning",
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        showCancelButton: true,
      }).then(() => {
        useStore.logout().then(() => {
          (layoutStore as any).onLogout && (layoutStore as any).onLogout();
        });
      });
    }
    return {
      useStore,
      onPersonalCenter,
      onLogout,
      UserIcon,
      SwitchButton,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
:deep(.el-dropdown) {
  color: currentColor !important;
}
.vaw-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      display: flex;
      align-items: center;
      border: 1px solid var(--el-color-primary-light-7);
      border-radius: 50%;
      & > img {
        border: 1px solid #f6f6f6;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .nick-name {
      margin-left: 10px;
      .tip {
        transform: rotate(0);
        transition: transform $transitionTime;
      }
    }
  }
}
.vaw-avatar-container:hover {
  cursor: pointer;
  .nick-name .tip {
    transform: rotate(180deg);
    transition: transform $transitionTime;
  }
}
</style>
