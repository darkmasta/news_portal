<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand -->
    <b-navbar-brand to="/">
      <b-img :src="require('@/assets/images/logo.png')" v-bind="{ width: 114, class: 'm1' }"></b-img>
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
            <i class="ion ion-md-notifications-outline navbar-icon align-middle mr-1 ml-1"></i>
            <b-badge class="badge-primary indicator" pill>4</b-badge>
            <span class="d-lg-none align-middle">&nbsp; Notifications</span>
          </template>

          <div class="bg-primary text-center text-white font-weight-bold p-3">
            4 New Notifications
          </div>
          <b-list-group flush>
            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
              <div class="media-body line-height-condenced ml-3">
                <div class="text-body">Login from 192.168.1.1</div>
                <div class="text-light small mt-1">
                  Aliquam ex eros, imperdiet vulputate hendrerit et.
                </div>
                <div class="text-light small mt-1">12h ago</div>
              </div>
            </b-list-group-item>

            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
              <div class="media-body line-height-condenced ml-3">
                <div class="text-body">
                  You have <strong>4</strong> new followers
                </div>
                <div class="text-light small mt-1">
                  Phasellus nunc nisl, posuere cursus pretium nec, dictum
                  vehicula tellus.
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>

          <a href="javascript:void(0)" class="d-block text-center text-light small p-2 my-1">Show all notifications</a>
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
  }),
  created() {
    var vm = this

    axios.get(process.env.VUE_APP_SERVER_URL + '/user').then(
    (response) => {
      //console.log(response.data)
      var userData = response.data
      vm.currentUser = userData.firstName + ' ' + userData.lastName
      this.$store.commit('setUser', vm.currentUser)
    },
    (response) => {
      console.log(response)
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
    }
  },
};
</script>
