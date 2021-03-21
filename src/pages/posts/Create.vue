<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <h4>Create Post</h4>

      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import AxiosPlugin from "vue-axios-cors";
import VueCookies from "vue-cookies";
import _ from "underscore";

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);

export default {
  name: "posts",
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      zipCode: null,
      city: "",
      state: "",
    };
  },
  methods: {
    submitCustomer: function (data, city, state, zipCode) {
      console.log(city, state, zipCode);
      data.city = city;
      data.state = state;
      data.zipCode = zipCode;
      console.log(data);

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_customer/", { data })
        .then((response) => {
          var data = response.data;
          console.log(data);
        });
    },
  },
  metaInfo: {
    title: "Customers",
  },
};
</script>