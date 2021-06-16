import LayoutStore from 'vaw-layouts-x';
import Cookies from 'js-cookie';
import { Module } from "vuex";
import { UserState, RootState } from "../types";

const userInfo: UserState = JSON.parse(localStorage.getItem('user-info') || '{}')
LayoutStore.setUserInfo({
  nickName: userInfo.nickName || 'admin',
  avatar: userInfo.avatar || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

export const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    userId: userInfo.userId || 0,
    roleId: userInfo.roleId || 0,
    roles: userInfo.roles || null,
    token: userInfo.token || '',
    userName: userInfo.userName || '',
    nickName: userInfo.nickName || '',
    avatar: userInfo.avatar || ''
  },
  getters: {
    userId(state) {
      return state.userId
    },
    roleId(state) {
      return state.roleId
    }
  },
  actions: {
    saveUser({ commit }, userInfo: UserState) { 
      return new Promise<void>((res) => {
        commit('SAVE_USER', userInfo);
        res()
      })
    },
    changeNickName({ commit }, newNickName) {
      commit("CHANGE_NICKNAME", newNickName);
    },
    logout({commit}) {
      commit('LOGOUT')
    }
  },
  mutations: {
    CHANGE_NICKNAME(state, newNickName) {
      state.nickName = newNickName;
    },
    SAVE_USER(state, userInfo: UserState) {
      state.userId = userInfo.userId
      state.userId = userInfo.userId
      state.token = userInfo.token
      state.roleId = userInfo.roleId
      state.roles = userInfo.roles
      state.userName = userInfo.userName
      state.nickName = userInfo.nickName
      state.avatar = userInfo.avatar
      Cookies.set('admin-token', userInfo.token)
      localStorage.setItem('user-info', JSON.stringify(userInfo))
      LayoutStore.setUserInfo({
        nickName: userInfo.nickName,
        avatar: userInfo.avatar || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      })
    },
    LOGOUT(state) {
      state.userId = 0
      state.avatar = ''
      state.roleId = 0
      state.roles = []
      state.userName = ''
      state.nickName = ''
      state.token = ''
      Cookies.remove('admin-token')
      localStorage.clear()
      LayoutStore.reset()
    }
  },
};
