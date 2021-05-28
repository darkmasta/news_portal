<template>
  <div>
    <b-row class="authorization">
      <b-col cols="4">
        <div class="d-flex justify-content-center align-items-center pb-2 mb-4 mt-5">
          <b-img :src="require('@/assets/images/logo.png')" width="180"/>
        </div>
        <p id="welcome-text" class="header ml-1 mt-5">
          Welcome!<br>
          Defenshere<br>
          Dashboard
        </p>
        </p>
      </b-col>
      <b-col cols="8">
        <b-row align-v="center" align-h="center">
          <b-col cols="6" align-self="center">
            <b-card bg-variant="transparent" class="mt-5">
              <!-- Logo -->
              <div class="d-flex justify-content-center align-items-center pb-2 mb-4 mt-5">
                <h4>Login to Dashboard</h4>
              </div>
              <!-- / Logo -->

              <!-- Form -->
              <form class="mt-5" @submit.prevent="loginUser(model)" > 
                <b-form-group label="Email">
                  <b-input v-model="model.email" type="text" />
                </b-form-group>
                <b-form-group>
                  <div slot="label" class="d-flex justify-content-between align-items-end">
                    <div>Password</div>
                    <a v-if="false" href="javascript:void(0)" class="d-block small">Forgot password?</a>
                  </div>
                  <b-input v-model="model.password" type="password" />
                </b-form-group>
                <b-alert v-if="errors" variant="warning" show class="mt-3 mb-0" style="margin-bottom: 20px;">
                  {{errorMessage}}
                </b-alert>
                <b-form-group>
                  <b-checkbox>
                    Remember me
                  </b-checkbox>
                </b-form-group>
                <div class="d-flex justify-content-between align-items-center m-0">

                  <b-link variant="default" to="/auth/register">Create Account →</b-link>
                  <b-btn type="submit" variant="primary">Login</b-btn>
                </div>
              </form>
              <!-- / Form -->
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
import axios from "axios";
import Vue from "vue";
import AxiosPlugin from "vue-axios-cors";
import qs from "querystring";


Vue.use(axios);
Vue.use(AxiosPlugin);
axios.defaults.withCredentials = true;

export default {
  name: "pages-authentication-login-v2",
  metaInfo: {
    title: "Login",
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => ({
    credentials: {
      username: "",
      password: "",
      rememberMe: false,
    },
    errors: false,
    errorMessage: "",
  }),
  methods: {
    loginUser: function (data) {
      const requestBody = {
        username: data.email,
        password: data.password,
      };

      console.log(requestBody);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      var vm = this;
      axios
        .post(
          process.env.VUE_APP_SERVER_URL + "/login/local",
          qs.stringify(requestBody),
          config
        )
        .then(
          (response) => {
            var userData = response.data;
            console.log(response.data);
            if (response.data == "Error signing in") {
              console.log(response);
              vm.errors = true;
              vm.$notify({
                  type: 'error',
                  text: 'Hata!'
              })
              vm.errorMessage = "Error logging in";
            } else if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Giris Basarili!'
              })
              setTimeout(() => {this.$router.push({ name: "Dashboard" })}, 1000);
            }
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
};
</script>

<style >
#welcome-text {
  text-align: center;
}

</style>