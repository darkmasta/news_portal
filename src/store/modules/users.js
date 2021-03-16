import api from "../../api/node-server";
import { router } from "../../router/index";

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
  async fetchUser(state) {
    const response = await api.fetchUser();
    state.commit("setUser", response.data);
  },
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
};

export default { state, getters, actions, mutations };
