<template>
  <div class="login-container">
    <div class="left">
      <img :src="ImageBg1" />
      <div class="content">
        <img :src="logo" />
        <div class="proj-name">{{ projectName }}</div>
        <div class="desc">Vue3 + Webpack + Typescript + Element Plus</div>
        <div class="ttiipp">博观而约取 厚积而薄发</div>
        <div class="bottom">
          {{ projectName + "    " + version }} · Made by qingqingxuan
        </div>
      </div>
    </div>
    <div class="right">
      <el-card class="form-wrapper">
        <div class="title">账号登录</div>
        <div class="item-wrapper">
          <el-input
            v-model="username"
            placeholder="请输入用户名/手机号"
            clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <IphoneIcon />
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="item-wrapper margin-top-lg">
          <el-input
            v-model="password"
            placeholder="请输入密码"
            type="password"
            clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <LockIcon />
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="flex-sub"></div>
        <div class="margin-top-lg">
          <el-button
            type="primary"
            class="login"
            :loading="loading"
            @click="onLogin"
          >
            登录
          </el-button>
        </div>
        <div class="my-width flex-sub margin-top">
          <div class="flex justify-between">
            <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            <el-link :underline="false" type="primary">忘记密码？</el-link>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageBg1 from "@/assets/img_login_bg_01.jpg";
import logo from "@/assets/logo.png";
import { post, Response } from "@/api/http";
import { login } from "@/api/url";
import { ElMessage } from "element-plus";
import { UserState } from "@/store/types";
import setting from "../../setting";
import useUserStore from "@/store/modules/user";
export default defineComponent({
  name: "Login",
  setup() {
    const projectName = setting.projectName;
    const version = setting.version;
    const username = ref("admin");
    const password = ref("123456");
    const autoLogin = ref(true);
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    const onLogin = () => {
      loading.value = true;
      post({
        url: login,
        data: {
          username: username.value,
          password: password.value,
        },
      })
        .then(({ data }: Response) => {
          userStore.saveUser(data as UserState).then(() => {
            router
              .replace({
                path: route.query.redirect
                  ? (route.query.redirect as string)
                  : "/",
              })
              .then(() => {
                loading.value = false;
              });
          });
        })
        .catch((error) => {
          loading.value = false;
          ElMessage.error(error.message);
        });
    };
    return {
      projectName,
      version,
      username,
      password,
      autoLogin,
      loading,
      onLogin,
      ImageBg1,
      logo,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes scale-to {
  0% {
    transform: scale(0.2, 0.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
$leftWith: 35%;
.login-container {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  .left {
    position: relative;
    width: $leftWith;
    min-width: $leftWith;
    max-width: $leftWith;
    overflow: hidden;
    & > img {
      height: 100%;
      width: 100%;
      object-fit: fill;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      & > img {
        width: 100px;
        height: 100px;
        margin-top: 20%;
      }
      .proj-name {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-top: 10px;
      }
      .desc {
        font-size: 14px;
        color: #fff;
        margin-top: 10px;
      }
      .ttiipp {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 500;
        font-size: 30px;
        text-shadow: 0 0 5px var(--el-color-primary),
          0 0 15px var(--el-color-primary), 0 0 50px var(--el-color-primary),
          0 0 150px var(--el-color-primary);
        animation: scale-to 1s linear;
      }
      .bottom {
        color: silver;
        margin-bottom: 5%;
        font-size: 16px;
      }
    }
  }
  .right {
    flex: 1;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-wrapper {
      width: 50%;
      .title {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .login {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 966px) {
  .left {
    display: none;
  }
  .right {
    background-image: url("../../assets/img_login_mobile_bg_01.jpg");
    background-size: cover;
    .form-wrapper {
      width: 80% !important;
    }
  }
}
</style>
