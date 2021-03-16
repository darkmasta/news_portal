import api from "../../api/node-server";
import Vue from "vue";
import { router } from "../../router/index";

function makeReactive(state) {
  if (typeof state !== "object") return;

  Object.keys(state).forEach(function (key) {
    if (state[key] !== null && state[key] !== undefined) {
      Vue.set(state, key, state[key]);
      makeReactive(state[key]);
    }
  });
}

const state = {
  orders: [],
  customers: [],
};

const getters = {
  allOrders: (state) => state.orders,
};

const actions = {
  initial({ rootState }) {
    makeReactive(rootState);
  },
  async getCustomers({ commit }) {
    const response = await api.getCustomers();
  },
  async getOrders(state) {
    const response = await api.getOrders();
    state.commit("setOrders", response.data);
  },
};

const mutations = {
  setOrders: (state, orders) => {
    state.orders = orders;
  },
};

export default { state, getters, actions, mutations };
