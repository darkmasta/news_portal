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
          </div>
        </div>
      </div>
      <div class="col-lg-12 mb-4">
        <b-card title="Kullanici Bilgileri">
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.name') }}</legend>
                  <b-input
                    v-model="userData.firstName"
                    placeholder="Isim"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.lastname') }}</legend>
                  <b-input
                    v-model="userData.lastName"
                    label="Soy Isim"
                    placeholder="Soy Isim"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.phone') }}</legend>
                  <b-input
                    v-model="userData.phone"
                    label="Telefon"
                    placeholder="Telefon"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
              <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.email') }}</legend>
                  <b-input
                    v-model="userData.email"
                    label="E-mail"
                    placeholder="E-mail"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.user language') }}</legend>
                <b-select v-model="defaultLang" class="">
                    <option v-for="(defaultLang, index) in languages" 
                        :key="index" :value="defaultLang"> 
                        {{defaultLang}}
                    </option>
                </b-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group>
                <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.address') }}</legend>
                  <b-input
                    v-model="userData.address"
                    label="Address"
                    placeholder="Address"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="4">
                <b-form-group>
                <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.password') }}</legend>
                  <b-input
                    v-model="userData.password"
                    label="Sifre"
                    placeholder="Sifre"
                  >
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('users.role') }}</legend>
                <b-select v-model="userRole" class="">
                    <option v-for="(userRole, index) in userRoles" 
                        :key="index" :value="userRole"> 
                        {{userRole}}
                    </option>
                </b-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="3">
                <b-btn @click="submitProfile(userData)">{{ $t('users.save') }}</b-btn>
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
import Notifications from 'vue-notification'


Vue.use(axios);
Vue.use(AxiosPlugin);
Vue.use(Notifications)
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
    userRole: "",
    userRoles: ['Admin', 'Editor', 'Writer'],
    languages: ['Turkce', 'Ingilizce', 'Arapca', 'Rusca', 'Ukraynaca', 'Fransizca'],
    defaultLang: '',
    userData: {
      photo: "",
      username: "",
      firstName: "Yeni Kullanici",
      lastName: "",
      password: "",
      email: "",
      id: null,
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
      

      if (vm.userRole.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Kullanici Rolu Bos Olamaz!'
        });
      } else if (vm.userData.firstName.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Kullanici Adi Bos Olamaz!'
        });
      } else if (vm.userData.email.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Email Bos Olamaz!'
        });
      } else if (vm.userData.password.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Sifre Bos Olamaz!'
        });
      } else if (vm.defaultLang.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Kullanici Dili Bos Olamaz!'
        })
      } else {
        var data = vm.userData;
        data.userRole = vm.userRole
        data.defaultLang = vm.defaultLang
        console.log(data)

        axios
            .post(process.env.VUE_APP_SERVER_URL + "/create_new_user", { data })
            .then(
            (response) => {
                var userData = response.data;
                console.log(userData)
                if (userData._id.length > 7) {
                    vm.$notify({
                        type: 'success',
                        text: 'Yeni Kullanici Basariyla Olusturuldu!'
                    })
                    setTimeout(() => { this.$router.push({ name: 'AdminUser' , params: { id: userData._id } }) }, 2000);
                }
            },
            (response) => {
                console.log(response);
            }
            );
      }
    },
  },
};
</script>

<style>
.form-control:disabled {
  border-bottom: none !important;
}
</style>
