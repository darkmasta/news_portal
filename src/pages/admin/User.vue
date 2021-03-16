<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="media align-items-center py-3 mb-3">
          <div class="d-flex justify-content-center mb-3">
            <img
              v-if="userData.photo"
              :src="`${backendUrl}storage/agents/${userData.photo}`"
              alt=""
              class="d-block ui-w-100 rounded-circle"
            />
            <img
              v-else
              src="@/assets/images/profile-avatar.webp"
              alt=""
              class="d-block ui-w-100 rounded-circle"
            />
          </div>
          <div class="media-body ml-4">
            <h4 class="font-weight-bold mb-0">{{ userData.name }}</h4>
            <b-btn variant="primary" size="sm" @click="edit = !edit"
              >Edit</b-btn
            >
          </div>
        </div>
      </div>
      <div class="col-lg-12 mb-4">
        <b-card title="User Details">
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group label="Name">
                  <span v-if="!edit">{{ userData.name }}</span>
                  <b-input
                    label="Name"
                    v-if="edit"
                    placeholder="Name"
                    v-model="userData.name"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="E-mail">
                  <span v-if="!edit"> {{ userData.email }} </span>
                  <b-input
                    label="E-mail"
                    v-if="edit"
                    placeholder="E-mail"
                    v-model="userData.email"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Phone">
                  <span v-if="!edit">{{ userData.phone }}</span>
                  <b-input
                    label="Phone"
                    v-if="edit"
                    placeholder="Phone"
                    v-model="userData.phone"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="City">
                  <span v-if="!edit">{{ userData.city }}</span>
                  <b-input
                    label="City"
                    v-if="edit"
                    placeholder="City"
                    v-model="userData.city"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="State">
                  <span v-if="!edit">{{ userData.state }}</span>
                  <b-input
                    label="State"
                    v-if="edit"
                    placeholder="State"
                    v-model="userData.state"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Zip Code">
                  <span v-if="!edit">{{ userData.zip }}</span>
                  <b-input
                    label="Zip Code"
                    v-if="edit"
                    placeholder="Zip Code"
                    v-model="userData.zip"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-group label="Default Profit">
                  <span v-if="!edit">{{ userData.defaultProfit }}</span>
                  <b-input
                    label="Enter Your Profit"
                    v-if="edit"
                    placeholder="Profit"
                    v-model="userData.defaultProfit"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col cols="8">
                <b-form-group label="Address">
                  <span v-if="!edit">{{ userData.address }}</span>
                  <b-input
                    label="Address"
                    v-if="edit"
                    placeholder="Address"
                    v-model="userData.address"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="4">
                <b-form-group label="Password">
                  <span v-if="!edit">{{ userData.password}}</span>
                  <b-input
                    label="Password"
                    v-if="edit"
                    placeholder="Password"
                    v-model="userData.password"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="3">
                <b-btn @click="submitProfile(userData)">Save</b-btn>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>

<script>
import axios from "axios";
import Vue from "vue";
import AxiosPlugin from "vue-axios-cors";

Vue.use(axios);
Vue.use(AxiosPlugin);
axios.defaults.withCredentials = true;

export default {
  name: "profile",
  metaInfo: {
    title: "Profile",
  },
  data: () => ({
    formSubmit: false,
    file: null,
    id: 0,
    imgPreview: null,
    edit: false,
    userData: {
      photo: "",
      username: "",
      name: "",
      email: "",
      phone: "",
      id: null,
      defaultProfit: 0,
      city: "",
      state: "",
      zip: 0,
      admin: 0,
      deleted_at: null,
    },

    sources: {
      options: [],
      selected: [],
    },
  }),

  created() {
    var vm = this;
    var data = {}
    data.id = vm.$route.params.id
    vm.id = data.id

    axios.post(process.env.VUE_APP_SERVER_URL + "/user_by_id", {data}).then(
      (response) => {
        var userData = response.data;
        vm.userData.email = userData.email;
        vm.userData.name = userData.firstName + " " + userData.lastName;
        vm.userData.address = userData.address;
        vm.userData.city = userData.city;
        vm.userData.state = userData.state;
        vm.userData.phone = userData.phone;
        vm.userData.about = userData.about;
        vm.userData.zip = userData.zip;
        vm.userData.defaultProfit = userData.defaultProfit;
        console.log(response);
      },
      (response) => {
        console.log(response);
      }
    );
  },
  methods: {
    setUserData(data) {
      for (var key in this.userData) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          this.userData[key] = data[key];
        }
      }
    },
    submitProfile(userData) {
      var vm = this;
      var data = vm.userData;
      data.id = vm.id
      console.log(data);
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/update_user_profile", { data })
        .then(
          (response) => {
            var userData = response.data;
            vm.edit = false;
            console.log(userData);
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
};
</script>

<style>
.form-control:disabled {
  border-bottom: none !important;
}
</style>
