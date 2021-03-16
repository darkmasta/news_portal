<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Orders</h4>
          <span>Hello {{user.firstName}}, welcome back!</span>
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/orders/create"><span class="fas fa-plus-circle"></span> Create Order</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table class="table nexus-table" hover select-mode="multi" 
                      :items="ordersTableData" :fields="tableFields" 
                      borderless selectable :current-page="1" :per-page="10" 
                      @row-clicked="goToOrder">
          <template #head(selected)>
            <b-form-checkbox class="ml-2 mt-2">All</b-form-checkbox>
          </template>
          <template #cell(origin_destination)="data">
            <span>{{data.item.origin}}</span><br />
            <span>{{data.item.destination}}</span><br />
            <span>Route Map</span>
          </template>
          <template #cell(selected)="data">
            <b-form-checkbox v-model="rowSelected" :value="rowSelected" class="ml-2 mt-2"></b-form-checkbox>
          </template>
          <template #cell(details)>
            <i class="fas fa-ellipsis-h table-details"></i>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <!-- Pagination -->
    <b-row>
      <b-col>
        <div class="col-sm text-sm-left text-center mb-3 mb-sm-0">
          <span v-if="totalPages" class="text-muted">Page {{ currentPage }} of {{ totalPages }}</span>
        </div>
        <div class="col-sm">
          <b-pagination v-if="totalItems" v-model="currentPage" class="justify-content-center justify-content-sm-end" :total-rows="totalItems" :per-page="perPage" size="sm" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import AxiosPlugin from "vue-axios-cors";
import _ from "underscore";
import $ from "jquery";
import loadCustomers from "@/mixins/loadCustomers";
import VueTypeahead from "vue-typeahead";
import moment from "moment"
import { mapActions, mapGetters } from 'vuex'

Vue.use(axios);
axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
Vue.prototype.$http = axios;

import "vue-search-select/dist/VueSearchSelect.css";
export default {
  name: "orders",
  metaInfo: {
    title: "Orders",
  },
  data() {
    return {
      value: "",
       jsonData: [
    {
      id: "3619662-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "book-now",
    },
    {
      id: "3619663-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "book-now",
    },
    {
      id: "3619664-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "expired",
    },
    {
      id: "3619665-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "book-now",
    },
    {
      id: "3619666-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "book-now",
    },
    {
      id: "3619667-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "expired",
    },
    {
      id: "3619668-OH",
      date: "27 Feb, 2020",
      vehicle: "2015 Lexus IS 250 Sedan Midsize",
      origin: "Dallas TX 75  204",
      destination: "Washington DC 20011",
      tariff: "$777",
      status: "expired",
    },
  ],
  tableFields: [
    {
      key: "selected",
      class: "text-center align-middle",
    },
    {
      key: "id",
      label: "ID",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "vehicle",
      label: "Vehicle",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "origin_destination",
      label: "Origin/Destination",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "tariff",
      label: "Tariff",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "details",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    }
  ],
  originalJsonData: [],
  selectedRows: [],

  // Pagination
  perPageOptions: [10, 20, 30, 40, 50],
  perPage: 10,
  currentPage: 1,
      fields: [{ key: 'Id', sortable: true}, { key: 'Date', sortable: true} , { key: 'Vehicle',sortable: true} , { key: 'Tariff', sortable: true} ,
                 { key: 'Origin_Destination', sortable: true},  { key: 'Status', sortable: true}],
      ordersTableData: [], 
      originalOrdersTableData: [], 
      selectedOrders: [],
      loading: false,
      src: "https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search",
      limit: 5,
      minChars: 3,
      zipCode: "",
      city: "",
      state: "",
      dZipCode: "",
      dCity: "",
      dState: "",
      year: null,
      carModel: "",
      make: "",
      address: "",
      customers: [],
      ownerEmail: "",
      owner: "",
      quotes: [],
      prices: [
        { text: "Economy", value: "0" },
        { text: "Standard", value: "1" },
        { text: "Expedited", value: "2" },
      ],
      selected: null,
        options: [
          { value: null, text: 'New Contact' },
          { value: '0', text: 'Contact 1' },
          { value: '1', text: 'Contact 2' },
        ],
      selectedPriceOption: "",
      profit: 300,
      items: {
        value: "",
        text: "",
      },
    };
  }, 
  mounted() {
    var vm = this

    var userData = this.user
    vm.profit = userData.defaultProfit
    vm.owner = userData._id
    vm.ownerEmail = userData.email
  },
  created() {
    var vm = this

    this.$nextTick(() => {
      vm.getOrders()
      vm.fetchUser();
    })
    console.log(vm.orders)
    
    vm.orders.forEach(order => {
      var tmp_order = {
        id: order._id.slice(-4),
        date: moment(order.date).fromNow(),
        origin: String(order.pickupInfo.city) + ' ' + String(order.pickupInfo.zip),
        destination: String(order.deliveryInfo.city) + ' ' + String(order.deliveryInfo.zip),
        vehicle: '----',
        tariff: order.cost,
        status: 'active',
      }
      vm.ordersTableData.push(tmp_order)
    })
    vm.originalOrdersTableData = vm.ordersTableData
  },
  computed: {
    ...mapGetters({orders: "allOrders", user: 'getUser'}),
    totalItems() {
        return this.ordersTableData.length;
      },
      totalPages () {
        return Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
      },
  },
  methods: {
    ...mapActions(['getOrders', 'fetchUser']),
     goToOrder(row) {
        var vm = this
        var orderData = []
        console.log(row)
        vm.orders.forEach( order => {
          if (order._id.slice(-4) == row.id) {
            orderData.push(order)
          }
        })

        if (orderData.length == 1) {
          this.$router.push({ name: 'Order', params: { id: orderData[0]._id } })
        }
    },
    filter(value) {
      const val = value.toLowerCase();

      // filter our data
      const filtered = this.originalJsonData.filter((d) => {
        // Concat data
        return (
          Object.keys(d)
            .map((k) => String(d[k]))
            .join("|")
            .toLowerCase()
            .indexOf(val) !== -1 || !val
        );
      });

      // update the rows
      this.jsonData = filtered;
    },
    rowSelected(items) {
      this.selectedQuotes = items
      console.log(items)
    },
    clickRows(which) {
      let myTable = this.$refs.myTable.$el,
          tableBody = myTable.getElementsByTagName('tbody')[0],
          tableRows = tableBody.getElementsByTagName('tr')
      which.forEach(idx => {
        tableRows[idx].click()
      })
    },

  },
};
</script>
