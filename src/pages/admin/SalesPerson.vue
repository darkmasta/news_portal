<template>
<div>
  <b-row>
    <b-col cols="7" class="box">
    <b-card class="mb-2 salesperson-box">
      <b-card-title class="admin-card-title">
        {{salesperson.fullname}} ---> {{salesperson.email}}
      </b-card-title>
      <div class="sales-card-info">
          <span class="admin-info-number">
              <i class="admin-icon fa fa-clock" aria-hidden="true"></i>
                &nbsp;{{salesperson.date}} 
          </span>
      </div>
      <b-row class="info-text">
        <b-col cols="3">
            <span>Email:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.email}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>Business Name:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.businessName}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>Dba Name:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.dbaName}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>Address:</span>
        </b-col>
        <b-col cols="5">
            <span>
                  &nbsp;{{salesperson.address}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>City:</span>
        </b-col>
        <b-col cols="5">
            <span>
                  &nbsp;{{salesperson.city}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>State:</span>
        </b-col>
        <b-col cols="5">
            <span>
                  &nbsp;{{salesperson.state}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>Zip Code:</span>
        </b-col>
        <b-col cols="5">
            <span>
                  &nbsp;{{salesperson.zipCode}} 
            </span>
        </b-col>
      </b-row>
      <b-row class="info-text">
        <b-col cols="3">
            <span>Tax Number:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.taxNumber}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>Primary Phone:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.primaryPhone}} 
            </span>
        </b-col>
      </b-row>
       <b-row class="info-text">
        <b-col cols="3">
            <span>Dealership Type:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.dealershipType}} 
            </span>
        </b-col>
      </b-row>
      <b-row class="info-text">
        <b-col cols="3">
            <span>Verified:</span>
        </b-col>
        <b-col cols="6">
            <span>
                  &nbsp;{{salesperson.isVerified}} 
            </span>
        </b-col>
      </b-row>
    </b-card>
    </b-col>
    <b-col>
        <b-card class="verify-btn">
            <b-btn id="verify-first-btn" variant="warning" @click="verify(salesperson._id)">Verify</b-btn>
            <b-btn id="verify-second-btn" variant="danger">Delete</b-btn>
        </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
     <b-card style="width: 55rem;">
            <h4 class="card-title">File 1</h4>
            <img class="doc-img" v-bind:src="'/images/' + salesperson.file1name"  alt="Card image cap"/>

     </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
     <b-card style="width: 55rem;">
            <h4 class="card-title">File 2</h4>
            <img class="doc-img" v-bind:src="'/images/' + salesperson.file2name"  alt="Card image cap"/>

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
  name: "SalesPerson",
  metaInfo: {
    title: "Sales Person",
  },
  data: () => ({
    owner: {},
    ticket: {},
    salesperson: {},
  }),
  created() {
    var vm = this
    var data = {}
    data.id = vm.$route.params.id

    axios.get(process.env.VUE_APP_SERVER_URL + '/salespersons/' + data.id)
      .then(response => { 
        response.data[0].date = moment(response.data[0].date).fromNow()
        vm.salesperson = response.data[0]
        console.log(response.data)
    })
  },
  methods: {
    verify(id) {
      var data = {id: id}
      axios.post(process.env.VUE_APP_SERVER_URL + '/verify_salesperson/', {data})
        .then(response => { 
          response.data[0].date = moment(response.data[0].date).fromNow()
          vm.salesperson = response.data[0]
          console.log(response.data)
      })
    }
  }
}
</script>
<style>

.info-text {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 500;
}

.doc-img {
  max-width: 100%;
  max-height: 100%;
}

.verify-btn {
  width: 100%;
}

#verify-first-btn {
  width: 40%;
  margin: 20px;
  padding: 20px;
}

#verify-second-btn {
  width: 40%;
  margin: 20px;
  padding: 20px;
}

</style>