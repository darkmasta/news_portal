<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Quote List</h4>
          <span>Hello {{user.firstName}}, welcome back!</span>
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/quotes/create"><span class="fas fa-plus-circle"></span> Create Quote</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table class="table nexus-table" hover select-mode="multi" 
                                           :items="quotesTableData" 
                                           :fields="tableFields" 
                                           selectable
                                           borderless 
                                           :current-page="1" 
                                           :per-page="10" 
                                           @row-clicked="goToQuote">
          <template #head(selected)>
            <b-form-checkbox class="ml-2 mt-2">All</b-form-checkbox>
          </template>
          <template #cell(origin_destination)="data">
            <span>{{data.item.origin}}</span><br />
            <span>{{data.item.destination}}</span><br />
            <span>Route Map</span>
          </template>
          <template #cell(selected)="data">
            <b-form-checkbox v-model="data.rowSelected" :value="data.item.rowSelected" class="ml-2 mt-2"></b-form-checkbox>
          </template>
          <template #cell(status)="data">
            <template v-if="data.item.status =='book-now'">
              <b-btn variant="primary" size="sm">Book Now</b-btn>
            </template>
            <template v-if="data.item.status =='expired'">
              Expired <i class="fas fa-edit"></i>
            </template>
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
  name: "quotes",
  metaInfo: {
    title: "Quotes",
  },
  data() {
    return {
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
      selectedRows: [],
      // Pagination
      perPageOptions: [10, 20, 30, 40, 50],
      perPage: 10,
      currentPage: 1,
      value: "",
      quotesTableData: [], 
      originalQuotesTableData: [], 
      loading: false,
      editOrigin: false,
      selectedQuotes: [],
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
      vin: "",
      showPriceTab: false,
      economyPrice: 0,
      standardPrice: 0,
      expeditedPrice: 0,
      totalPrice: 0,
      selectedPrice: 0,
      quoteId: 0,
      ownerEmail: "",
      owner: "",
      prices: [
        { text: "Economy", value: "0" },
        { text: "Standard", value: "1" },
        { text: "Expedited", value: "2" },
      ],
      selectedPriceOption: "",
      profit: 0,
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
      headVariant: 'light',
      tableVariant: '',
      noCollapse: false
    };
    }, 
    mixins: [loadCustomers],
    components: {
    },
    mounted() {
      this.$nextTick(() => {
        var vm = this
        var userData = this.user
        console.log(userData)
        vm.profit = userData.defaultProfit
        vm.city = userData.city
        vm.state = userData.state
        vm.zipCode = userData.zip
      })
    },
    created() {
      var vm = this
       
      this.$nextTick(() => {
        vm.getQuotes()
        vm.fetchUser();
      })

      //console.log(vm.user)

      this.quotes.forEach((quote) => {
        var tmp_quote = {
          id: quote._id.slice(-4),
          date:  moment(quote.date).fromNow(),
          vehicle: quote.vin,
          origin: quote.originZipCode,
          destination: quote.destinationZipCode,
          tariff: '$' + quote.price,
          status: "expired"
        }
        vm.quotesTableData.push(tmp_quote)
      })
      vm.originalQuotesTableData = vm.quotesTableData

      console.log(this.quotes)
      
    },
    events: {
        click: function(data) {
            console.log(data)
        }
    },
    methods: {
      ...mapActions(['getCustomers', 'getQuotes', 'fetchUser']),
      goToQuote(row) {
        var vm = this
        var quoteData = []
        console.log(row)
        vm.quotes.forEach( quote => {
          if (quote._id.slice(-4) == row.id) {
            quoteData.push(quote)
          }
        })

        if (quoteData.length == 1) {
          this.$router.push({ name: 'Quote', params: { id: quoteData[0]._id } })
        }
      },
      createOrder() {
        console.log(this.selectedQuote)
      },
      saveSelectedQuotes(selectedQuotes) {
        var vm = this
        var quoteData = []
        selectedQuotes.forEach( selectedQuote => {
          vm.quotes.forEach( quote => {
            if (quote._id.slice(-4) == selectedQuote.Id) {
              quoteData.push(quote)
            }
          })
        })
        this.$store.commit('setSelectedQuotes', quoteData)
        this.$router.push('orders')
      },
      rowSelected(items) {
        this.selectedQuote = items
        console.log(items)
      },
      clickRows(which) {
        let myTable = this.$refs.myTable.$el,
            tableBody = myTable.getElementsByTagName('tbody')[0],
            tableRows = tableBody.getElementsByTagName('tr')
        which.forEach(idx => {
          tableRows[idx].click()
        })
        console.log("items")
      },
      totalPriceCalc() {
        var vm = this;
        return Number(vm.profit) + Number(vm.selectedPrice);
      },
      updateQuery() {
        this.query = this.value;
        this.update();
      },
      onHit(item) {
        this.value = item.screen_name;
        this.reset();
      },
      resetInput() {
        this.value = "";
        this.reset();
      },
      showDetails() {
        return true;  
      },
      myRowClickHandler(record, index) {
        // 'record' will be the row data from items
        // `index` will be the visible row number (available in the v-model 'shownItems')
        //console.log(record); // This will be the item data for the row
        console.log(record)
        this.selectedQuote = record
      },
      reset () {
        this.item = {}
      },
    },
    computed: {
      ...mapGetters({quotes: "allQuotes", user: "getUser"}),
      totalItems() {
        return this.quotesTableData.length;
      },
      totalPages () {
        return Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
      },
      /*
      tableFields () {
        if (!this.jsonData[0]) return []
        return Object.keys(this.quotesTableData[0]).map(key => ({
          key,
          sortable: this.isSortable
        }))
      }
      */
    }
  }
</script>
