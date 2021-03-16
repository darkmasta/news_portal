<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Invoicing</h4>
          <span>Hello chris, welcome back!</span>
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/invoicing/create"><span class="fas fa-plus-circle"></span> Create</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table class="table nexus-table" hover select-mode="multi" :items="ordersTableData" :fields="tableFields" borderless selectable :current-page="1" :per-page="10" @row-selected="onRowSelected">
          <template #head(selected)>
            <b-form-checkbox class="ml-2 mt-2">All</b-form-checkbox>
          </template>
          <template #cell(file)="data">
          <b-btn variant="outline-dark" class="file-button" :to="data.item.file"> <i class="fas fa-file"></i></b-btn>
          </template>
          <template #cell(selected)="data">
            <b-form-checkbox v-model="data.rowSelected" :value="data.item.rowSelected" class="ml-2 mt-2"></b-form-checkbox>
          </template>
          <template #cell(details)>
            <i class="fas fa-eye table-details mr-3"></i>
            <i class="fas fa-paper-plane mr-3"></i>
            <i class="fas fa-download table-details mr-3"></i>
            <i class="fas fa-info table-details mr-3"></i>
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
Vue.use(axios);
axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
Vue.prototype.$http = axios;
import moment from "moment"
import { mapActions, mapGetters } from 'vuex'

import "vue-search-select/dist/VueSearchSelect.css";
export default {
  name: "orders",
  metaInfo: {
    title: "Orders",
  },
  data: () => ({
    tableFields: [
      {
        key: "selected",
        class: "text-left align-middle",
      },
      {
        key: "file",
        label: "",
        class: "text-left align-middle",
      },
      {
        key: "id",
        label: "ID",
        sortable: true,
        sortDirection: "desc",
        class: "text-left align-middle",
      },
      {
        key: "email",
        label: "Email",
        sortable: true,
        sortDirection: "desc",
        class: "text-left align-middle",
      },
      {
        key: "details",
        label: "",
        class: "text-right align-middle",
      }
    ],
    originalOrdersTableData: [],
    ordersTableData: [],
    selectedRows: [],

    // Pagination
    perPageOptions: [10, 20, 30, 40, 50],
    perPage: 10,
    currentPage: 1,
  }),
  created () {
    var vm = this

    this.$nextTick(() => {
      vm.fetchUser();
      vm.getOrders()
    })

    vm.orders.forEach(order => {
      var tmp_order = {
        id: order._id.slice(-4),
        date: moment(order.date).fromNow(),
        origin: String(order.pickupInfo.city) + ' ' + String(order.pickupInfo.zip),
        destination: String(order.deliveryInfo.city) + ' ' + String(order.deliveryInfo.zip),
        email: order.shipperInfo.email,
        tariff: order.cost,
      }
      vm.ordersTableData.push(tmp_order)
    })
    vm.originalOrdersTableData = vm.ordersTableData

    console.log(vm.orders)
  },
  computed: {
    ...mapGetters({orders: "allOrders", user: 'getUser'}),
    totalItems() {
      return this.ordersTableData.length;
    },
    totalPages() {
      return (
        Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
      );
    },
  },
  methods: {
    ...mapActions(['getOrders', 'fetchUser']),
    onRowSelected(row) {
      var vm = this
      var orderData = []

      vm.orders.forEach( order => {
        if (order._id.slice(-4) == row[0].id) {
          orderData.push(order)
        }
      })

      if (orderData.length == 1) {
        var data = orderData[0]
        console.log(data)
        axios.post(process.env.VUE_APP_SERVER_URL + '/api', {data})
          .then(response => { 
              
          })
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
  },
};
</script>
