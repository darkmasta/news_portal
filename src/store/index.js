import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import quotes from "./modules/quotes";
import orders from "./modules/orders";
import users from "./modules/users";
import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
  paths: ["quotes", "orders", "users"],
});

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  modules: {
    quotes,
    orders,
    users,
  },
  plugins: [dataState],
});
