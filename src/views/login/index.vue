<template>
  <div class="login-container">
    <div
      ref="loginWrapper"
      class="login-bg-wrapper"
    >
      <img :src="$isMobile ? ImageMobileBg1 : ImageBg1" />
    </div>
    <div class="flex form-wrapper">
      <div class="left"></div>
      <div class="right">
        <div class="my-width flex-sub flex justify-center align-center">
          <div class="logo-wrapper">
            <img :src="require('@/assets/work_logo.png')" />
          </div>
          <div class="title margin-left">Vue Admin Work</div>
        </div>
        <div class="form-container">
          <div class="item-wrapper">
            <el-input
              v-model="username"
              placeholder="请输入用户名/手机号"
              prefix-icon="el-icon-user"
              clearable
            />
          </div>
          <div class="item-wrapper margin-top-lg">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
            />
          </div>
          <!-- <div class="item-wrapper">
            <VawVerify class="margin-top-lg" @verify-success="onVerifySuccess" />
          </div> -->
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
        </div>
        <div class="my-width flex-sub margin-top">
          <div class="flex justify-between">
            <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            <el-link
              :underline="false"
              type="primary"
            >忘记密码？</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageBg1 from "@/assets/img_login_bg_01.jpg";
import ImageMobileBg1 from "@/assets/img_login_mobile_bg_01.jpg";
import { post, Response } from "@/api/http";
import { login } from "@/api/url";
import { ElMessage } from "element-plus";
import { UserState } from "@/store/types";
import { useStore } from "@/store";
export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("admin");
    const password = ref("123456");
    const autoLogin = ref(true);
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
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
          store.dispatch("user/saveUser", data as UserState).then(() => {
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
      username,
      password,
      autoLogin,
      loading,
      onLogin,
      ImageBg1,
      ImageMobileBg1,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .login-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .logo-wrapper {
    & img {
      width: 50px;
    }
    & img::after {
      content: "欢迎来到vue-admin-work-x";
    }
  }
  .login-footer-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    ::v-deep {
      .el-card {
        background-color: transparent;
      }
    }
  }
  .form-wrapper {
    position: absolute;
    top: 18.5%;
    left: 0;
    right: 0;
    bottom: 15.8%;
    @media screen and (max-width: 768px) {
      .left {
        display: none;
      }
      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 80%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #34495e;
          text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
        }
        .form-container {
          width: 80%;
          min-height: 60%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      .left {
        display: none;
      }
      .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #5497ff;
        }
        .form-container {
          width: 50%;
          height: 60%;
          margin-bottom: 10%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 992px) {
      .left {
        display: block;
        flex: 1;
      }
      .right {
        margin-left: 10%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #5497ff;
        }
        .item-wrapper {
          width: 48%;
        }
        .login {
          width: 48%;
        }
      }
    }
  }
}
</style>
