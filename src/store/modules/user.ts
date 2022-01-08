import LayoutStore from "@/layouts";
import Cookies from "js-cookie";

import Avatar from "@/assets/img_avatar.gif";
import { defineStore } from "pinia";
import { UserState } from "../types";
import {
  ROLE_ID_KEY,
  USER_ID_KEY,
  USER_INFO_KEY,
  USER_TOKEN_KEY,
} from "../keys";

const defaultAvatar = Avatar;

const userInfo: UserState = JSON.parse(
  localStorage.getItem(USER_INFO_KEY) || "{}"
);

const useUserStore = defineStore("user", {
  state: () => {
    return {
      userId: userInfo.userId || 0,
      roleId: userInfo.roleId || 0,
      roles: userInfo.roles || null,
      token: userInfo.token || "",
      userName: userInfo.userName || "",
      nickName: userInfo.nickName || "",
      avatar: userInfo.avatar || defaultAvatar,
    };
  },
  getters: {
    getUserId(): number {
      return this.userId;
    },
    getRroleId(): number {
      return this.roleId;
    },
  },
  actions: {
    saveUser(userInfo: UserState) {
      return new Promise<void>((res) => {
        this.userId = userInfo.userId;
        this.userId = userInfo.userId;
        this.token = userInfo.token;
        this.roleId = userInfo.roleId;
        this.roles = userInfo.roles;
        this.userName = userInfo.userName;
        this.nickName = userInfo.nickName;
        this.avatar = userInfo.avatar || defaultAvatar;
        Cookies.set(USER_TOKEN_KEY, userInfo.token);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        res();
      });
    },
    changeNickName(newNickName: string) {
      this.nickName = newNickName;
    },
    logout() {
      return new Promise<void>((res) => {
        this.userId = 0;
        this.avatar = "";
        this.roleId = 0;
        this.roles = [];
        this.userName = "";
        this.nickName = "";
        this.token = "";
        Cookies.remove(USER_TOKEN_KEY);
        localStorage.clear();
        LayoutStore.reset();
        res();
      });
    },
  },
});

export default useUserStore;
