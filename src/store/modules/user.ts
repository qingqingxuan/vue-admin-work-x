import { Module } from "vuex";
import { UserState, RootState } from "../types";

export const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    userName: "张三",
    nickName: "小小花",
  },
  actions: {
    changeNickName({ commit }, newNickName) {
      commit("CHANGE_NICKNAME", newNickName);
    },
  },
  mutations: {
    CHANGE_NICKNAME(state, newNickName) {
      state.nickName = newNickName;
      console.log(state);
    },
  },
};
