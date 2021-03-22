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
            <h4 class="font-weight-bold mb-0">{{ userData.firstName }} {{userData.lastName}}</h4>
            <b-btn class="mt-2" variant="primary" size="sm" @click="edit = !edit"
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
                <b-form-group label="Isim">
                  <span v-if="!edit">{{ userData.firstName }}</span>
                  <b-input
                    label="Isim"
                    v-if="edit"
                    placeholder="Isim"
                    v-model="userData.firstName"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Soy Isim">
                  <span v-if="!edit"> {{ userData.lastName }} </span>
                  <b-input
                    label="Soy Isim"
                    v-if="edit"
                    placeholder="Soy Isim"
                    v-model="userData.lastName"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="E-mail">
                  <span v-if="!edit">{{ userData.email }}</span>
                  <b-input
                    label="Email"
                    v-if="edit"
                    placeholder="Email"
                    v-model="userData.email"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Kullanici Dili">
                <span v-if="!edit">{{defaultLang}}</span>
                <b-select v-model="defaultLang" class="" v-if="edit">
                    <option v-for="(defaultLang, index) in languages" 
                        :key="index" v-bind:value="defaultLang"> 
                        {{defaultLang}}
                    </option>
                </b-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Son Gorulme">
                  <span>{{ userData.lastLogin }}</span>
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
              <b-col>
                <b-form-group label="Kullanici Rolu">
                <span v-if="!edit">{{ userData.userRole }}</span>
                <b-select v-model="userRole" class="" v-if="edit">
                    <option v-for="(userRole, index) in userRoles" 
                        :key="index" v-bind:value="userRole"> 
                        {{userRole}}
                    </option>
                </b-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="3">
                <b-btn @click="submitProfile(userData)">Save</b-btn>
                <b-btn variant="danger" class="ml-5" @click="deleteUser()">Delete User</b-btn>
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
import moment from "moment"


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
    userRoles: ['Admin', 'Editor', 'Writer'],
    userRole: "",
    languages: ['Turkce', 'Ingilizce', 'Arapca', 'Rusca', 'Ukraynaca', 'Fransizca'],
    defaultLang: '',
    userData: {
      userRole: "",
      photo: "",
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      lastLogin: '',
      id: null,
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
        vm.userData.firstName = userData.firstName;
        vm.userData.lastName = userData.lastName;
        vm.userData.password = userData.password;
        vm.userData.userRole = userData.userRole;
        vm.userRole = userData.userRole

        vm.defaultLang = userData.defaultLang;
        vm.userData.lastLogin = moment(userData.lastLogin).fromNow()
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

      if (vm.userRole.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Kullanici Rolu Bos Olamaz!'
        });
      } else if (vm.userData.firstName < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Kullanici Adi Bos Olamaz!'
        });
      } else if (vm.userData.email < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Email Bos Olamaz!'
        });
      } else if (vm.userData.password < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Sifre Bos Olamaz!'
        });
      } else {
        var data = vm.userData;
        data.userRole = vm.userRole
        data.defaultLang = vm.defaultLang
        console.log(data)

        axios
            .post(process.env.VUE_APP_SERVER_URL + "/update_user_profile", { data })
            .then(
            (response) => {
                var userData = response.data;
                vm.edit = false;
                console.log(userData)
                if (userData._id.length > 7) {
                    vm.$notify({
                        type: 'success',
                        text: 'Kullanici Basariyla Guncellendi!'
                    })
                }
            },
            (response) => {
                console.log(response);
            }
            );
      }
    },
    deleteUser() {
      var vm = this;
      var data = vm.userData
      data.id = vm.id

      if (confirm('Kullanici Siliniyor. Emin Misiniz?')) {
        axios
          .post(process.env.VUE_APP_SERVER_URL + "/delete_user", { data })
          .then(
          (response) => {
              var userData = response.data;
              vm.edit = false;
              console.log(userData)
              if (userData._id.length > 7) {
                  vm.$notify({
                      type: 'success',
                      text: 'Kullanici Basariyla Silindi!'
                  })
              }
          },
          (response) => {
              console.log(response);
          }
          );  
      } else {
        return
      }
    }
  },
};
</script>

<style>
.form-control:disabled {
  border-bottom: none !important;
}
</style>
