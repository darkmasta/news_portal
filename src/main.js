// Additional polyfills
import "custom-event-polyfill";
import "url-polyfill";

import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import BootstrapVue from "bootstrap-vue";

import globals from "./globals";
import Popper from "popper.js";

import axios from "axios";

// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

Vue.config.productionTip = false;
Vue.config.theme = "soft";
Vue.use(BootstrapVue);
Vue.use(require("vue-moment"));

Vue.prototype.$axios = axios;
// Global RTL flag
Vue.mixin({
  data: globals,
});

new Vue({
  router,
  store,
  created() {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.$store.commit("setUserData", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
