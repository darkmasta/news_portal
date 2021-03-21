<template>
<div>
          <b-row class="container2">
              <b-col id="sales-box" class="box" cols="4">
                  <b-card class="mb-2" id="sales">
                      <b-card-title class="admin-card-title">
                          Kullanici Islemleri 
                        <i class="info-icon fa fa-info-circle" aria-hidden="true"></i>
                      </b-card-title>
                      <div class="admin-card-info">
                          <span class="admin-info-number">
                              <i class="admin-icon fa fa-arrow-circle-down" aria-hidden="true"></i>
                                &nbsp;12 
                              </span>
                          <a class="admin-info-link" id="sales-link" @click="goToUsers()" href="#">Kullanicilari Goruntule&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></a>
                      </div>
                  </b-card>
              </b-col>
          </b-row>
</div>
</template>
<script>
import draggable from 'vuedraggable/src/vuedraggable'
import Vue from 'vue';
import axios from 'axios'
import AxiosPlugin from 'vue-axios-cors';
import _ from 'underscore'
import moment from "moment"



Vue.use(axios)

axios.defaults.withCredentials = true 
Vue.use(AxiosPlugin)

export default {
  name: "instant-helps",
  metaInfo: {
    title: "Instant Helps",
  },
  components: {
    draggable
  },
  data: () => ({
    topic: 'Update Topic',
    orderId: '',
    topic: '',
    message: '',
    messages: [],
    owner: {},
    ticket: {},
    status: ''
  }),
  methods: {
    goToUsers() {
      this.$router.push({ name: 'AdminUsers' })
    },
    goToOrders() {
      this.$router.push({ name: 'AdminOrders' })
    }
  }
}

</script>
<style>



.admin-card-title {
    font-size: 1.111em;
    margin-bottom: 1.2rem;
}

.admin-card-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.admin-info-container {
}

.admin-info-number {
    font-weight: bold;
    font-size: 30px;
}

.admin-info-link {
    text-decoration: none;
    font-weight: 500;
    align-self: flex-end;
    margin-left: 30px;
}

.admin-icon {
    margin: auto;
    font-size: 20px;
    color: #ccc;
}

.info-icon {
    margin-left: 5px;
    color: #ccc;
}

.container2 {
    display: flex;
    flex-direction: row;
}

.container2:nth-child(2) {

}

#sales {
  background-color: #1b8fba;
}

#sales-link {
  color: #bbb;
}

#sales-link:hover {
  color: #555;
}

#sales-box {
  order: 0;
}

</style>