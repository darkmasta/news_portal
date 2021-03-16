import qs from "qs";
import axios from "axios";

export default {
  getCustomers() {
    return axios.post(process.env.VUE_APP_SERVER_URL + "/get_customers/");
  },
  getQuotes() {
    return axios.post(process.env.VUE_APP_SERVER_URL + "/get_quotes/");
  },
  getOrders() {
    return axios.get(process.env.VUE_APP_SERVER_URL + "/get_orders/");
  },
  fetchUser() {
    return axios.get(process.env.VUE_APP_SERVER_URL + "/user/");
  },
};
