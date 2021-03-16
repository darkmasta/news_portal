<template>
  <div>
    <b-row>
      <b-col>
        <h3>Admin Orders</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card class="mt-2" no-body>
          <b-card-body>
            <div>
              <div class="row">
                <div class="col"></div>
                <div class="col">
                  <b-form-group>
                    <b-input
                      size="sm"
                      placeholder="Search..."
                      class="d-inline-block w-auto float-sm-right"
                      @input="filter($event)"
                    />
                  </b-form-group>
                </div>
              </div>
              <b-table
                selectable
                :striped="striped"
                :bordered="bordered"
                :borderless="borderless"
                :outlined="outlined"
                :small="small"
                :hover="hover"
                :dark="dark"
                :fixed="fixed"
                :foot-clone="footClone"
                :no-border-collapse="noCollapse"
                :items="ordersTableData"
                :fields="fields"
                :head-variant="headVariant"
                :table-variant="tableVariant"
                @row-selected="rowSelected"
                ref="myTable"
              >
              </b-table>

              <b-btn
                class="p-3 px-5 mt-4"
                size="lg"
                variant="warning"
                style="float: right; margin-left: 25px"
                v-if="selectedOrders.length == 1"
                @click="goToOrder()"
                >Edit Selected Order!</b-btn
              >
            </div>
          </b-card-body>
        </b-card>
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
import moment from "moment";

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
Vue.use(require("vue-moment"));

// Set up $hhtp client (required by vue-typeahead)
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
      fields: [
        { key: "Id", sortable: true },
        { key: "Date", sortable: true },
        { key: "Vehicle", sortable: true },
        { key: "Tariff", sortable: true },
        { key: "Origin_Destination", sortable: true },
        { key: "Status", sortable: true },
      ],
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
      orders: [],
      quotes: [],
      prices: [
        { text: "Economy", value: "0" },
        { text: "Standard", value: "1" },
        { text: "Expedited", value: "2" },
      ],
      selected: null,
      options: [
        { value: null, text: "New Contact" },
        { value: "0", text: "Contact 1" },
        { value: "1", text: "Contact 2" },
      ],
      selectedPriceOption: "",
      profit: 300,
      items: {
        value: "",
        text: "",
      },
      striped: false,
      bordered: false,
      borderless: false,
      outlined: true,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false,
      headVariant: "light",
      tableVariant: "",
      noCollapse: false,
      shipperInfo: {
        shipper: "",
        email: "",
        address1: "",
        address2: "",
        firstName: "",
        lastName: "",
        phone: "",
        mobile: "",
        city: "",
        zip: 0,
        company: "",
      },
      pickupInfo: {
        address1: "",
        address2: "",
        contact: "",
        phone: "",
        mobile: "",
        city: "",
        zip: 0,
        buyerNumber: "",
        company: "",
      },
      deliveryInfo: {
        address1: "",
        address2: "",
        contact: "",
        phone: "",
        mobile: "",
        city: "",
        zip: 0,
        buyerNumber: "",
        company: "",
      },
    };
  },
  mounted() {
    var vm = this;

    axios.get(process.env.VUE_APP_SERVER_URL + "/get_orders").then(
      (response) => {
        var orders = response.data;
        vm.orders = orders;
        var data = response.data;
        console.log(data);
        data.forEach((order) => {
          var tmp_order = {
            Id: order._id.slice(-4),
            Date: moment(order.date).fromNow(),
            Origin_Destination:
              order.pickupInfo.zip + " -> " + order.deliveryInfo.zip,
            Vehicle: "----",
            Tariff: order.cost,
            Status: "active",
          };
          vm.ordersTableData.push(tmp_order);
        });
        vm.originalOrdersTableData = vm.ordersTableData;
      },
      (response) => {
        console.log(response);
      }
    );
  },
  created() {
    var vm = this;

    axios.get(process.env.VUE_APP_SERVER_URL + "/user").then(
      (response) => {
        var userData = response.data;
        console.log(userData);
        vm.profit = userData.defaultProfit;
        vm.owner = userData._id;
        vm.ownerEmail = userData.email;
      },
      (response) => {
        console.log(response);
      }
    );
  },
  methods: {
    goToOrder() {
      var vm = this
        var orderData = []
        vm.selectedOrders.forEach( selectedOrder => {
          vm.orders.forEach( order => {
            if (order._id.slice(-4) == selectedOrder.Id) {
              orderData.push(order)
            }
          })
        })
        if (orderData.length == 1) {
          this.$router.push({ name: 'AdminOrder', params: { id: orderData[0]._id } })
        }
    },
    rowSelected(items) {
      this.selectedOrders = items;
      console.log(items);
    },
    clickRows(which) {
      let myTable = this.$refs.myTable.$el,
        tableBody = myTable.getElementsByTagName("tbody")[0],
        tableRows = tableBody.getElementsByTagName("tr");
      which.forEach((idx) => {
        tableRows[idx].click();
      });
      console.log("items");
    },
  },
};
</script>

<style></style>
