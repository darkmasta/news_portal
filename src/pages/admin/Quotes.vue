<template>
<div>
      <b-row>
      <b-col>
        <h3>Admin View/Update Quote</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mt-2" no-body>
          <b-card-body>
            <div>
              <div class="row">
                <div class="col">
                </div>
                <div class="col">
                  <b-form-group>
                    <b-input size="sm"  placeholder="Search..." class="d-inline-block w-auto float-sm-right" @input="filter($event)" />
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
                    ref="myTable"
                    :hover="hover"
                    :dark="dark"
                    :fixed="fixed"
                    :foot-clone="footClone"
                    :no-border-collapse="noCollapse"
                    :items="quotesTableData"
                    :fields="fields"
                    :head-variant="headVariant"
                    :table-variant="tableVariant" @row-selected="rowSelected" 
                  >
                  </b-table>

                  <b-btn v-if="selectedQuotes.length == 1" class="p-3 px-5 mt-4" size="lg" 
                            variant="warning"
                            style="float: right; margin-left: 25px;"
                            @click="goToQuote()">Edit Selected Quote!</b-btn>
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
import moment from "moment"

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
// Set up $hhtp client (required by vue-typeahead)
Vue.prototype.$http = axios

import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  name: "quotes",
  metaInfo: {
    title: "Quotes",
  },
    components: {
    }, 
    mixins: [loadCustomers],
  props: {
      model: {
        type: Object,
        default ()  {
          return {};
        }
      }
    },
    data() {
      return {
        value: "",
        fields: [{ key: 'Id', sortable: true}, { key: 'Created', sortable: true} ,  { key: 'Shipper', sortable: true} ,
                 { key: 'Vehicle',sortable: true}, { key: 'Origin_Destination', sortable: true}, { key: 'First_Avalaible', sortable: true} ,
                 { key: 'Tariff', sortable: true}, { key: 'Carrier_Pay', sortable: true}, { key: 'Status', sortable: true}],
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
        quotes: [],
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
    watch: {
    },
    created() {
      var vm = this
       axios.post(process.env.VUE_APP_SERVER_URL + '/get_customers/')
                .then(response => { 
                    var data = response.data
                    //console.log(data)
                    vm.customers = data
                    _.each(data, function(customer, index) { 
                      var tmp_quote = {
                        value: 0,
                        text: ''
                      }
                      tmp_quote.value = index;
                      tmp_quote.text = customer.fullName;
                      vm.options.push(tmp_quote)
                    })
                })

       axios.post(process.env.VUE_APP_SERVER_URL + '/get_quotes/')
                .then(response => { 
                    var data = response.data
                    console.log(data)
                    vm.quotes = data
                    data.forEach((quote) => {
                      var tmp_quote = {
                        Id: quote._id.slice(-4),
                        Created: moment(quote.date).fromNow(),
                        Origin_Destination: quote.originZipCode + ' -> ' +quote.destinationZipCode,
                        First_Avalaible: '----',
                        Tariff: '$' + quote.profit,
                        Carrier_Pay: '$' + quote.price,
                        Status: 'active',
                        Shipper: quote.ownerEmail,
                        Vehicle: quote.vin,
                      }
                      vm.quotesTableData.push(tmp_quote)
                    })
                    vm.originalQuotesTableData = vm.quotesTableData

                    })

        axios.get(process.env.VUE_APP_SERVER_URL + '/user').then(
          (response) => {
            var userData = response.data
            //console.log(userData)
            vm.profit = userData.defaultProfit
            vm.city = userData.city
            vm.state = userData.state
            vm.zipCode = userData.zip
          },
          (response) => {
            console.log(response)
          }
          )
    },
    events: {
        click: function(data) {
            console.log(data)
        }
    },
    methods: {
      goToQuote() {
        var vm = this
        var quoteData = []
        vm.selectedQuotes.forEach( selectedQuote => {
          vm.quotes.forEach( quote => {
            if (quote._id.slice(-4) == selectedQuote.Id) {
              quoteData.push(quote)
            }
          })
        })
        if (quoteData.length == 1) {
          this.$router.push({ name: 'Quote', params: { id: quoteData[0]._id } })
        }
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
      lookupZip: _.debounce(function() {
        var vm = this
        vm.city = "Searching..."

        var data = {zipCode: vm.zipCode}
        
        axios.post(process.env.VUE_APP_SERVER_URL + '/decode_zip/', {data})
            .then(function (response){
                vm.city = response.data.city 
                vm.state = response.data.state
              })
            .catch(function (error){
                vm.city = "Invalid Zipcode"
                vm.state = "Invalid Zipcode"
              })
      }, 1000),
      lookupZip2: _.debounce(function() {
        var vm = this
        vm.dCity = "Searching..."

        var data = {zipCode: vm.dZipCode}
        
        axios.post(process.env.VUE_APP_SERVER_URL + '/decode_zip/', {data})
            .then(function (response){
                vm.dCity = response.data.city 
                vm.dState = response.data.state
              })
            .catch(function (error){
                vm.dCity = "Invalid Zipcode"
                vm.dState = "Invalid Zipcode"
              })
      }, 1000),
      getQuote: function(model) {
            var vm = this
            var data = {} 
            data = model
            data.vin = vm.vin
            data.year = vm.year
            data.model = vm.carModel
            data.make = vm.make
            data.destinationCity = vm.dCity
            data.destinationState = vm.dState
            data.destinationZipCode = vm.dZipCode 
            data.zipCode = vm.zipCode 
            data.state = vm.state 
            data.city = vm.city 
            console.log(data)
            var query = {
              "carCondition": "1",
              "transportType": "1",
              "vehicleMake": data.make,
              "vehicleModel": data.model,
              "vehicleYear": data.year,
              "zipDrop": Number(data.destinationZipCode),
              "zipPick": data.zipCode
            }

            console.log(query)

            axios.post('https://nexusv.d.brainwork.lv/api/calculations', query).then(response => {
              console.log(response)
              vm.economyPrice = response.data.data.result.quote.economy
              vm.standardPrice = response.data.data.result.quote.standard
              vm.expeditedPrice = response.data.data.result.quote.expedited
              vm.showPriceTab = true
            },
            response => {
            })
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
      filter (value) {
        const val = value.toLowerCase()
        console.log(value)

        // filter our data
        const filtered = this.originalQuotesTableData.filter(d => {
          // Concat data
          return Object.keys(d)
            .map(k => String(d[k]))
            .join('|')
            .toLowerCase()
            .indexOf(val) !== -1 || !val
        })
        // update the rows
        this.quotesTableData = filtered
      } 
    },
    computed: {
      totalItems () {
        return this.quotesTableData.length
      },
      totalPages () {
        return Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
      },
      tableFields () {
        if (!this.jsonData[0]) return []
        return Object.keys(this.quotesTableData[0]).map(key => ({
          key,
          sortable: this.isSortable
        }))
      }
    }
  }
</script>

<style scss>

</style>