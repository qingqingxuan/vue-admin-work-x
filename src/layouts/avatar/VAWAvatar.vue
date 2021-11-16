<template>
  <div class="vaw-avatar-container">
    <el-dropdown>
      <div class="action-wrapper">
        <div class="avatar">
          <img :src="state.userInfo.avatar" />
        </div>
        <span class="nick-name el-dropdown-link">
          <span>{{ state.userInfo.nickName }}</span> <i class="el-icon-arrow-down tip"></i>
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            icon="el-icon-user"
            @click="personalCenter"
          >个人中心</el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-switch-button"
            @click="logout"
          >退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import store from '../store'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'VAWAvatar',
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    personalCenter() {
      store.onPersonalCenter && store.onPersonalCenter()
    },
    logout() {
      ElMessageBox({
        title: '提示',
        message: '是否要退出登录？',
        type: 'warning',
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        showCancelButton: true
      }).then(() => {
        store.onLogout && store.onLogout()
      }).catch(() => {
        store.cancelLogout && store.cancelLogout()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.vaw-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      display: flex;
      align-items: center;
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
