import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { sget, sset, sclear } from "../StorageControl";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    username: "",
  },
  mutations: {
    SET(_: any, { logged, username }: any) {
      if (logged === true || logged === false) {
        _.logged = logged;
      }
      if (username !== undefined) {
        _.username = username;
      }
    },
    RESET(_: any) {
      _.logged = false;
      _.username = "";
    },
  },
  actions: {
    init({ commit }: any) {
      const username = sget("user");
      if (username !== "") {
        commit("SET", { logged: true, username });
      }
    },
    create({ commit }: any, { username, password }: any) {
      return axios
        .post(`${window.location.origin}/v1/create`, { username, password })
        .then(data => data);
    },
    login({ commit }: any, { username, password }: any) {
      return axios
        .post(`${window.location.origin}/v1/login`, { username, password })
        .then(data => {
          sset("user", username);
          commit("SET", { logged: true, username });
          return data;
        });
    },
    logout({ commit }: any) {
      return axios.post(`${window.location.origin}/v1/logout`).then(data => {
        sclear();
        commit("RESET");
        return data;
      });
    },
  },
});
