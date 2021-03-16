<template>
  <div>
    <div class="row">
      <div class="col-md-7">
        <b-card-header>
          <h4>Create Customer</h4>
        </b-card-header>
        <b-card-body>
          <b-form-row>
            <div class="col-md-6">
              <b-form-group label="Full Name" label-size="lg">
                <b-input v-model="model.fullName" label="Full Name" placeholder="Full Name">
                </b-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="Email" label-size="lg">
                <b-input v-model="model.Email" label="Email" type="email" placeholder="Email">
                </b-input>
              </b-form-group>
            </div>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group label="City" label-size="lg">
                <b-input v-model="city" label="City" placeholder="City">
                </b-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="State" label-size="lg">
                <b-input v-model="state" label="State" placeholder="State">
                </b-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Zip Code" label-size="lg">
                <b-input v-model="zipCode" label="Zip Code" placeholder="Zip Code">
                </b-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-form-group label="Address">
                <b-textarea v-model="model.address" placeholder="Address">

                </b-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group label="Notes">
                <b-textarea v-model="model.notes" placeholder="Notes">

                </b-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>

          <div class="text-right mt-3">
            <b-button slot="footer" type="primary" fill @click="submitCustomer(model, city,state,zipCode)">Save</b-button>
          </div>
        </b-card-body>
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
  name: "customers",
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
  watch: {
    zipCode: function () {
      this.model.city = "";
      if (!this.zipCode && this.zipCode.length == 5) {
        //call api method
        this.lookupZip();
      }
    },
  },
  methods: {
    lookupZip: _.debounce(function () {
      var vm = this;
      vm.city = "Searching...";

      var data = { zipCode: vm.zipCode };

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/decode_zip/", { data })
        .then(function (response) {
          vm.city = response.data.city;
          vm.state = response.data.state;
        })
        .catch(function (error) {
          vm.city = "Invalid Zipcode";
          vm.state = "Invalid Zipcode";
        });
    }, 100),
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