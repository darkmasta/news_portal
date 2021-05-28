<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand -->
    <b-navbar-brand to="/">
      <b-img :src="logoUrl" v-bind="{ width: 114, class: 'm1' }"></b-img>
    </b-navbar-brand>

    <!-- Sidenav toggle -->
    <!-- <b-navbar-nav v-if="sidenavToggle" class="align-items-lg-center mr-auto mr-lg-4" >
      <a class="nav-item nav-link px-0 ml-2 ml-lg-0" href="javascript:void(0)" @click="toggleSidenav">
        <i class="ion ion-md-menu text-large align-middle" />
      </a>
    </b-navbar-nav> -->

    <!-- Navbar toggle -->
    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>

    <b-collapse id="app-layout-navbar" is-nav>
      <b-navbar-nav class="align-items-lg-center ml-auto">
        <b-nav-item-dropdown no-caret :right="!isRtlMode" class="demo-navbar-notifications">
          <template slot="button-content">
            <i class="fas fa-language navbar-icon align-middle mr-1 ml-1"></i>
            
            <span class="d-lg-none align-middle">&nbsp; Diller</span>
          </template>

          <b-list-group flush>
          </b-list-group>

          <a href="javascript:void(0)" 
            v-for="locale in locales" :key="locale" @click="switchLocale(locale)"
            class="d-block text-center text-light small p-2 my-1">{{locale}}</a>
        </b-nav-item-dropdown>
        <!-- Divider -->
        <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">
          
        </div>
        <b-nav-item-dropdown no-caret :right="!isRtlMode" class="navbar-user">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle mr-2">
              <i class="ion ion-md-arrow-dropdown"></i>
              <span class="px-1 mr-2 ml-2">{{currentUser}}</span>
              <img src="@/assets/images/profile-avatar.png" alt class="d-block ui-w-30 rounded-circle" />
            </span>
          </template>

          <b-dd-item @click="goToProfile"><i class="ion ion-ios-person text-lightest"></i> &nbsp; Profilim</b-dd-item>
          <b-dd-item @click=""><i class="ion ion-ios-mail text-lightest"></i> &nbsp; Mesajlar</b-dd-item>
          <b-dd-item @click="goToProfile"><i class="ion ion-md-settings text-lightest"></i> &nbsp; Hesap Ayarlari</b-dd-item>
          <b-dd-divider />
          <b-dd-item @click="logout"><i class="ion ion-ios-log-out text-danger"></i> &nbsp; Cikis Yap</b-dd-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import AxiosPlugin from "vue-axios-cors";
import VueCookies from "vue-cookies";
import _ from "underscore";
import { mapState } from 'vuex'

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);

export default {
  name: "app-layout-navbar",

  props: {
    sidenavToggle: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    publicUrl: process.env.VUE_APP_SERVER_URL,
    curUser: { name: "", photo: "" },
    currentUser: "",
    logoUrl: 'https://defensehere.herokuapp.com/images/logo.png',
    locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
  }),
  created() {
    var vm = this

    axios.get(process.env.VUE_APP_SERVER_URL + '/user').then(
    (response) => {
      console.log(response.data)
      var userData = response.data
      vm.currentUser = userData.firstName + ' ' + userData.lastName
      this.$store.commit('setUser', vm.currentUser)
    },
    (response) => {
      // console.log(response)
      if (String(response).includes('status code 500')) {
        vm.$notify({
          'type': 'warn',
          'text': 'Giris Yapmalısınız!'
        })
        setTimeout(() => { vm.$router.push({ name: 'Login'})}, 1000);

      }
    }
    )
  },
  methods: {
    toggleSidenav() {
      this.layoutHelpers.toggleCollapsed();
    },
    getLayoutNavbarBg() {
      return this.layoutNavbarBg;
    },
    goToProfile() {
      this.$router.push({name: 'Profile'})
    },
    logout()  {
      this.$router.push({name: 'Login'})
    },
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale
      }
    }
  },
};
</script>
