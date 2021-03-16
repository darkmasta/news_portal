import api from "../../api/node-server";
import { router } from "../../router/index";

const state = {
  quotes: [],
  selectedQuote: {},
  customers: [],
};

const getters = {
  allQuotes: (state) => state.quotes,
  getSelectedQuote: (state) => state.selectedQuote,
};

const actions = {
  async getCustomers({ commit }) {
    const response = await api.getCustomers();
  },
  async getQuotes(state) {
    const response = await api.getQuotes();
    state.commit("setQuotes", response.data);
  },
};

const mutations = {
  setQuotes: (state, quotes) => {
    state.quotes = quotes;
  },
  setSelectedQuote: (state, quote) => {
    state.selectedQuote = quote;
    quote = JSON.stringify(quote);
    localStorage.setItem("selectedQuote", quote);
  },
};

export default { state, getters, actions, mutations };
