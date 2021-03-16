<template>
<div>
    <h2>Salespersons Registers</h2>
    <b-row>
     <b-col cols="4" class="" v-for="salesperson in salespersons" :key="salesperson._id">
        <b-card class="mb-2 salesperson-box">
          <b-card-title class="admin-card-title">
            {{salesperson.fullname}} ---> {{salesperson.email}}
          </b-card-title>
          <div class="sales-card-info">
              <span class="sales-info-number">
                  <i class="admin-icon fa fa-clock" aria-hidden="true"></i>
                    &nbsp;{{salesperson.date}} 
                  </span>
              <a class="salesperson-info-link" @click="goToSalesPerson(salesperson._id)" href="#">View Salesperson&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></a>
          </div>
        </b-card>
      </b-col>
    </b-row>
</div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios'
import AxiosPlugin from 'vue-axios-cors';
import _ from 'underscore'
import moment from "moment"



Vue.use(axios)

axios.defaults.withCredentials = true 
Vue.use(AxiosPlugin)

export default {
  name: "SalesPersons",
  metaInfo: {
    title: "SalesPersons",
  },
  components: {
  },
  data: () => ({
    messages: [],
    salespersons: [],
    owner: {},
    ticket: {},
    status: ''
  }),
  created() {

  var vm = this

    axios.get(process.env.VUE_APP_SERVER_URL + '/salespersons/', )
              .then(response => { 
                response.data.forEach(element => {
                  console.log(element.date)
                  element.date = moment(element.date).fromNow() 
                  vm.salespersons.push(element)
                });
                console.log(response.data)
              })

  },
  methods: {
    goToSalesPerson(id) {
      this.$router.push({ name: 'SalesPerson', params: { id:id }})
    }
  }
}

</script>
<style>
.salesperson-box {
  display: flex;
  justify-content: flex-start;
}

.salesperson-info-link {
  align-self: flex-end;
}

.sales-card-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sales-info-number {

}

</style>