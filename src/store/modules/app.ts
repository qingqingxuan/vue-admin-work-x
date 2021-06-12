import { Module } from "vuex";
import { AppState, RootState } from "../types";

export const appModule: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    version: "1.0.0",
    layoutMode: "lcr",
  },
  actions: {
    changeVersion({ commit }, newVersion) {
      commit("CHANGE_VERSION", newVersion);
    },
  },
  mutations: {
    CHANGE_VERSION(state, newVersion) {
      state.version = newVersion;
    },
  },
};
