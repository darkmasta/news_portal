<template>
  <div class="authentication-wrapper authentication-4 ui-bg-cover ui-bg-overlay-container px-4" :style="{ backgroundImage: 'url(' + require('@/assets/images/auth-bg.jpg') + ')', height: '100vh' }">
    <div class="ui-bg-overlay bg-dark opacity-50"></div>
    <div class="authentication-inner py-5">
      <b-card no-body>
        <div class="row row-bordered">
          <div class="col-md-12 py-4 mb-1">
            <div class="text-center">
              <!-- <img alt="Nexus AT" src="@/assets/images/logo.png" /> -->
              <h4>Dealership Register</h4>
              <h5 class="text-muted font-weight-normal">
                Create Your Account
              </h5>
            </div>
          </div>
        </div>
        <div class="row no-gutters row-bordered row-border-light">
          <div class="col-md-3 pt-0">
            <b-list-group class="account-settings-links" flush>
              <b-list-group-item button :active="curTab === 'registeruser'">Register User </b-list-group-item> <!-- signin -->
              <b-list-group-item button :active="curTab === 'dealership'">Dealership</b-list-group-item> <!-- password -->
              <b-list-group-item button :active="curTab === 'businness'">Businnes Info</b-list-group-item> <!-- info -->
              <b-list-group-item button :active="curTab === 'verification'">Verification</b-list-group-item> <!-- links -->
              <b-list-group-item button :active="curTab === 'complete'">Complete</b-list-group-item> <!-- connections -->
            </b-list-group>
          </div>

          <div v-if="curTab === 'registeruser'" class="col-md-9">
            <b-card-header>
              <h4>Register User</h4>
            </b-card-header>
            <b-card-body>
              <b-form-group label="Full Name" label-size="lg">
                <b-input v-model="model.fullName" required />
              </b-form-group>

              <b-form-group label="Email" label-size="lg">
                <b-input v-model="model.email" required />

              </b-form-group>

              <b-form-group label="Password" label-size="lg">
                <b-input type="password" v-model="model.password" required />
              </b-form-group>

              <b-form-group label="Repeat Password" label-size="lg">
                <b-input type="password" v-model="model.passwordRepeat" required />
              </b-form-group>
            </b-card-body>
            <b-card-footer>
              <b-alert v-if="errors" variant="warning" show class="mt-3 mb-0">
                {{errorMessage}}
              </b-alert>
              <div class="text-right mt-3">
                <b-btn variant="primary" @click="registerUser1(model)">Next</b-btn>
              </div>
            </b-card-footer>
          </div>

          <div v-if="curTab === 'dealership'" class="col-md-9">
            <b-card-header>
              <h4>Dealership Information</h4>
            </b-card-header>
            <b-card-body class="pb-2">
              <b-form-group label="Legal Name Of Businness" label-size="lg">
                <b-input v-model="model.businessname" type="text" required />
              </b-form-group>

              <b-form-group>
                <b-form-checkbox id="business-uses-dba" v-model="businessUsesDBA">
                  Click here if your business uses a DBA name
                </b-form-checkbox>
              </b-form-group>

              <b-form-group v-if="businessUsesDBA" label="DBA Trade Name" label-size="lg">
                <b-input v-model="model.dbaName" type="text" />
              </b-form-group>

              <b-form-group label="Primary Phone Number" label-size="lg">
                <b-input v-model="model.primaryPhone" type="text" required />
              </b-form-group>

              <b-form-group label="Cell Phone Number" label-size="lg">
                <b-input v-model="model.cellPhone" type="text" required />
              </b-form-group>

              <b-form-group label="Dealership Type" label-size="lg">
                <b-dropdown id="dropdown-1" v-model="model.dealerShipType" :text="dealerShipType" class="m-md-2">
                  <b-dropdown-item @click="model.dealerShipType = 'Franchise'; dealerShipType = 'Franchise'">Franchise</b-dropdown-item>
                  <b-dropdown-item @click="model.dealerShipType = 'Independent'; dealerShipType = 'Independent'">Independent</b-dropdown-item>
                  <b-dropdown-item @click="model.dealerShipType = 'Wholesaler'; dealerShipType = 'Wholesaler' ">Wholesaler</b-dropdown-item>
                </b-dropdown>
              </b-form-group>
            </b-card-body>

            <b-card-footer>
              <b-alert v-if="errors" variant="warning" show class="mt-3 mb-0">
                {{errorMessage}}
              </b-alert>
              <div class="text-right mt-3">
                <b-btn variant="primary" @click="registerUser2(model)">Next</b-btn>
              </div>
            </b-card-footer>
          </div>

          <div v-if="curTab === 'business'" class="col-md-9">
            <b-card-header>
              <h4>Business & Tax Info</h4>
            </b-card-header>
            <b-card-body class="pb-2">
              <b-form-group label="Dealership Street Address" label-size="lg">
                <b-input v-model="model.address" type="text" required />
              </b-form-group>
              <b-form-row>
                <b-col>
                  <b-form-group label="City" label-size="lg">
                    <b-input v-model="model.city" type="text" required />
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="State" label-size="lg">
                    <b-input v-model="model.state" type="text" required />
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-group label="Zip Code" label-size="lg">
                <b-input v-model="model.zipCode" type="number" required />
              </b-form-group>

              <b-form-group label="State Issued Dealer License Number" label-size="lg">
                <b-input v-model="model.licenceNumber" type="number" required />
              </b-form-group>
              <b-form-group label="Federal Tax ID Number" label-size="lg">
                <b-input v-model="model.taxNumber" type="number" required />
              </b-form-group>
            </b-card-body>

            <b-card-footer>
              <b-alert v-if="errors" variant="warning" show class="mt-3 mb-0">
                {{errorMessage}}
              </b-alert>
              <div class="text-right mt-3">
                <b-btn variant="default" @click="curTab='dealership'">Back</b-btn>
                <b-btn variant="primary" @click="registerUser3(model)">Next</b-btn>
              </div>
            </b-card-footer>
          </div>

          <div v-if="curTab === 'verification'" class="col-md-9">
            <b-card-header>
              <h4>Dealership Verification</h4>
            </b-card-header>
            <b-card-body class="pb-2">
              <b-form-group label="Required File 1" label-size="lg">
                <input ref="file" type="file" @change="onSelect()" />
              </b-form-group>
              <b-form-group label="State Issued Dealer License Number" label-size="lg">
                <input ref="file2" type="file" @change="onSelect2()" />
              </b-form-group>
              <b-form-group label="State Issued Dealer License Number" label-size="lg">
                <b-input v-model="model.signature" type="text" required />
              </b-form-group>
            </b-card-body>

            <b-card-footer>
              <b-alert v-if="errors" variant="warning" show class="mt-3 mb-0">
                {{errorMessage}}
              </b-alert>

              <div class="text-right mt-3">
                <b-btn variant="default" @click="curTab='business'">Back</b-btn>
                <b-btn variant="primary" @click="registerUser4(model)">Next</b-btn>
              </div>

            </b-card-footer>
          </div>

          <div v-if="curTab === 'complete'" class="col-md-9">
            <b-card-header header="">
              <h4>Dealership Registration Successfull</h4>
            </b-card-header>
            <b-card-body>
              <h5 class="mb-2">
                We will view your registration and get back to you ASAP.
              </h5>
              <h5 class="mb-2">
                Thank you for choosing Nexus Auto Transport
              </h5>
            </b-card-body>
            <b-card-footer>
              <div class="text-right mt-3">
                <b-btn variant="default" @click="curTab='verification'">Back</b-btn>
                <b-btn variant="primary" to="/auth/login">Sign In</b-btn>
              </div>
            </b-card-footer>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<!-- Page -->
<style src="@/vendor/styles/pages/account.scss" lang="scss"></style>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication-register.scss" lang="scss"></style>

<script>
import axios from "axios";
import Vue from "vue";
import AxiosPlugin from "vue-axios-cors";
import Password from "vue-password-strength-meter";

Vue.use(axios);
Vue.use(AxiosPlugin);
axios.defaults.withCredentials = true;

export default {
  name: "pages-account-settings",
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  metaInfo: {
    title: "Register",
  },
  data: () => ({
    curTab: "registeruser",
    dealerShipType: "Franchise",
    errors: false,
    errorMessage: "",
    businessUsesDBA: false,
    file: null,
    file2: null,
    signature: "",
    accountData: {
      avatar: "",
      name: "",
      fullName: "",
      email: "",
      companyName: "",
      dbaTradeName: "",
      primaryPhoneNumber: "",
      cellPhoneNumber: "",
      dealerShipType: "Select One",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      licenceNumber: "",
      taxIDNumber: "",
      owner: "",
      file1: null,
      file2: null,
      verified: false,
    },
  }),
  methods: {
    registerUser1: function (data) {
      var vm = this;
      if (!data.email) {
        vm.errors = true;
        vm.errorMessage = "Email must be provided";
      } else if (!data.fullName) {
        vm.errors = true;
        vm.errorMessage = "Full name must be provided";
      } else if (!data.password) {
        vm.errors = true;
        vm.errorMessage = "Password must be provided";
      } else if (!data.passwordRepeat) {
        vm.errors = true;
        vm.errorMessage = "Password Repeat must be provided";
      } else if ((String(data.password) == String(data.passwordRepeat)) == false) {
        vm.errors = true;
        vm.errorMessage = "Passwords should match";
      } else {
        console.log(data.password);
        console.log(data.passwordRepeat);
        console.log(!String(data.password) == String(data.passwordRepeat))
        axios
          .post(process.env.VUE_APP_SERVER_URL + "/sales_register1", { data })
          .then(
            (response) => {
              console.log(response.data)
              vm.errors = false;
              vm.curTab = "dealership";
              //this.$router.push({name: 'sales_register2'})
            },
            (response) => {
              console.log(response);
            }
          );
      }
    },
    registerUser2: function (data) {
      var vm = this;
      console.log(data);
      if (!data.businessname) {
        vm.errors = true;
        vm.errorMessage = "Business Name must be provided";
      } else if (!data.primaryPhone) {
        vm.errors = true;
        vm.errorMessage = "Primary phone name must be provided";
      } else {
        axios
          .post(process.env.VUE_APP_SERVER_URL + "/sales_register2", { data })
          .then(
            () => {
              vm.errors = false;
              vm.curTab = "business";
              //this.$router.push({name: 'sales_register2'})
            },
            (response) => {
              console.log(response);
            }
          );
      }
    },
    registerUser3: function (data) {
      var vm = this;
      console.log(data);
      if (!data.address) {
        vm.errors = true;
        vm.errorMessage = "Address must be provided";
      } else if (!data.city) {
        vm.errors = true;
        vm.errorMessage = "City name must be provided";
      } else if (!data.state) {
        vm.errors = true;
        vm.errorMessage = "State name must be provided";
      } else if (!data.zipCode) {
        vm.errors = true;
        vm.errorMessage = "Zip Code must be provided";
      } else if (!data.licenceNumber) {
        vm.errors = true;
        vm.errorMessage = "License Number name must be provided";
      } else {
        axios
          .post(process.env.VUE_APP_SERVER_URL + "/sales_register3", { data })
          .then(
            () => {
              vm.errors = false;
              vm.curTab = "verification";
              //this.$router.push({name: 'sales_register2'})
            },
            (response) => {
              console.log(response);
            }
          );
      }
    },
    registerUser4(data) {
      var vm = this;
      if (!vm.file) {
        vm.errors = true;
        vm.errorMessage = "File should be provided";
        console.log(data);
      } else if (!vm.file2) {
        vm.error = true;
        vm.errorMessage = "File should be provided";
      } else if (!data.signature) {
        vm.error = true;
        vm.errorMessage = "Signature must be provided";
      } else {
        console.log(this.file, this.file2);

        const formData = new FormData();
        formData.append("file", vm.file);
        formData.append("file2", vm.file2);
        formData.append("signature", data.signature);

        // this works
        // let request = new XMLHttpRequest();
        // request.onreadystatechange = function () {
        //   if (request.readyState === 4) {
        //     vm.errors = false;
        //     vm.curTab = "complete";
        //     //this.$router.push({name: 'sales_register2'})
        //     if (request.response == "success") {
        //       console.log("true");
        //     }
        //   }
        // };

        // request.open(
        //   "POST",
        //   process.env.VUE_APP_SERVER_URL + "/sales_register4"
        // );
        // request.send(formData);

        axios
          .post(process.env.VUE_APP_SERVER_URL + "/sales_register4", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(
            () => {
              vm.errors = false;
              vm.curTab = "complete";
              //this.$router.push({name: 'sales_register2'})
            },
            (response) => {
              console.log(response);
            }
          );
      }
    },
    addMusicTag(newTag) {
      this.accountData.info.music.push(newTag);
    },
    addMovieTag(newTag) {
      this.accountData.info.movies.push(newTag);
    },
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(file);
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
    onSelect2() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file2 = this.$refs.file2.files[0];
      this.file2 = file2;
      if (!allowedTypes.includes(file2.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file2.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
  },
};
</script>
