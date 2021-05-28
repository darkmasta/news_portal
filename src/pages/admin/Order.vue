<template>
<div>
  <b-row>
      <b-col>
        <h3>Admin View/Update Order</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        <b-row>
          <b-col>
            <b-card class="mt-3" no-body>
              <b-card-header class="pb-0">
                <h4>Shipper Information</h4>
              </b-card-header>
              <b-card-body>
                
                <b-form-row>
                  <b-col>
                    <b-form-group label="Select Shipper" label-size="lg">
                      <b-input v-model="shipperInfo.shipper" label="Shipper" placeholder="Shipper">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Email" label-size="lg">
                      <b-input v-model="shipperInfo.email" label="Email" placeholder="Email">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Address 1" label-size="lg">
                      <b-input v-model="shipperInfo.address1" label="Address 1" placeholder="Address 1">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                 <b-form-row>
                  <b-col>
                    <b-form-group label="First Name" label-size="lg">
                      <b-input v-model="shipperInfo.firstName" label="First Name" placeholder="First Name">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Phone" label-size="lg">
                      <b-input v-model="shipperInfo.phone" label="Phone" placeholder="Phone">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Address 2" label-size="lg">
                      <b-input v-model="shipperInfo.address2" label="Address 2" placeholder="Address 2">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                 <b-form-row>
                  <b-col>
                    <b-form-group label="Last Name" label-size="lg">
                      <b-input v-model="shipperInfo.lastName" label="Last Name" placeholder="Last Name">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Mobile" label-size="lg">
                      <b-input v-model="shipperInfo.mobile" label="Mobile" placeholder="Mobile">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="City" label-size="lg">
                      <b-input v-model="shipperInfo.city" label="City" placeholder="City">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col cols="8">
                    <b-form-group label="Company" label-size="lg">
                      <b-input v-model="shipperInfo.company" size="lg" placeholder="" />
                    </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group label="State/Zip" label-size="lg">
                      <b-input v-model="shipperInfo.zip" size="lg" placeholder="State/Zip" />
                    </b-form-group>
                  </b-col>
                </b-form-row>


              </b-card-body>
            </b-card>

          </b-col>
        </b-row>
      </b-col>

      <b-col cols="4" class="quotes-box">
        <b-row>
            <p class="quotes-title">Selected</p>
        </b-row>

        <b-row v-for="quote in quotes" :key="quote._id" class="quote-container">              
          <i class="fas fa-trash-alt delete-icon" @click="removeQuote(quote._id)"></i>
          <b-row class="car-model-container">
            <i class="fas fa-truck truck-icon"></i>
            <p class="car-model">{{quote.make}} - {{quote.model}}</p>
          </b-row>
          <b-row class="car-model-container">
            <p class="quote-text">Price</p>
            <p class="quote-text">Your Margin</p>
          </b-row>
          <b-row class="car-model-container">
            <p class="quote-text">${{quote.price}}</p>
            <p class="quote-text">${{quote.profit}}</p>
          </b-row>
        </b-row>
        
      </b-col>
    </b-row>

  <b-row>
      <b-col cols="6">
        <b-row>
          <b-col>
            <b-card class="mt-3" no-body>
              <b-card-header class="pb-0">
                <h4>Pick Contact & Location</h4>
              </b-card-header>
              <b-card-body>
                
                <b-form-row>
                  <b-col cols="4" style="margin-bottom: 20px;">
                        <b-form-select v-model="selected" :options="options"></b-form-select>
                  </b-col>
                </b-form-row>

                 <b-form-row>
                  <b-col>
                    <b-form-group label="Address 1" label-size="lg">
                      <b-input v-model="pickupInfo.address1" label="Address 1" placeholder="Address 1">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Contact Name" label-size="lg">
                      <b-input v-model="pickupInfo.contact" label="Contact Name" placeholder="Contact Name">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Phone" label-size="lg">
                      <b-input v-model="pickupInfo.phone" label="Phone" placeholder="Phone">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                 <b-form-row>
                  <b-col>
                    <b-form-group label="Address 2" label-size="lg">
                      <b-input v-model="pickupInfo.address2" label="Address 2" placeholder="Address 2">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Company Name" label-size="lg">
                      <b-input v-model="pickupInfo.company" label="Company" placeholder="Company">
                      </b-input> </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Mobile" label-size="lg">
                      <b-input v-model="pickupInfo.mobile" label="Mobile" placeholder="Mobile">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col cols="4">
                    <b-form-group label="City" label-size="lg">
                      <b-input v-model="pickupInfo.city" size="lg" placeholder="City" />
                    </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group label="State/Zip" label-size="lg">
                      <b-input v-model="pickupInfo.zip" size="lg" placeholder="State/Zip" />
                    </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group label="Buyer Number" label-size="lg">
                      <b-input v-model="pickupInfo.buyer" size="lg" placeholder="Buyer Number" />
                    </b-form-group>
                  </b-col>
                </b-form-row>


              </b-card-body>
            </b-card>

          </b-col>
        </b-row>

      </b-col>

       <b-col cols="6">
        <b-row>
          <b-col>
            <b-card class="mt-3" no-body>
              <b-card-header class="pb-0">
                <h4>Delivery Contact & Location</h4>
              </b-card-header>
              <b-card-body>
                
                <b-form-row>
                  <b-col cols="4" style="margin-bottom: 20px;">
                        <b-form-select v-model="selected" :options="options"></b-form-select>
                  </b-col>
                </b-form-row>

                 <b-form-row>
                  <b-col>
                    <b-form-group label="Address 1" label-size="lg">
                      <b-input v-model="deliveryInfo.address2" label="Address 1" placeholder="Address 1">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Contact Name" label-size="lg">
                      <b-input v-model="deliveryInfo.contact" label="Contact Name" placeholder="Contact Name">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Phone" label-size="lg">
                      <b-input v-model="deliveryInfo.phone" label="Phone" placeholder="Phone">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                 <b-form-row>
                  <b-col>
                    <b-form-group label="Address 2" label-size="lg">
                      <b-input v-model="deliveryInfo.address2" label="Address 2" placeholder="Address 2">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Company Name" label-size="lg">
                      <b-input v-model="deliveryInfo.company" label="Company" placeholder="Company">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Mobile" label-size="lg">
                      <b-input v-model="deliveryInfo.mobile" label="Mobile" placeholder="Mobile">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col cols="4">
                    <b-form-group label="City" label-size="lg">
                      <b-input v-model="deliveryInfo.city" size="lg" placeholder="City" />
                    </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group label="State/Zip" label-size="lg">
                      <b-input v-model="deliveryInfo.zip" size="lg" placeholder="State/Zip" />
                    </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group label="Buyer Number" label-size="lg">
                      <b-input v-model="deliveryInfo.buyer" size="lg" placeholder="Buyer Number" />
                    </b-form-group>
                  </b-col>
                </b-form-row>


              </b-card-body>
            </b-card>

          </b-col>
        </b-row>

      </b-col>
      </b-row>
      </b-row>
    </b-row>

    <b-row>
      <b-col>
      <b-btn class="p-3 px-5 mt-4" size="lg" variant="danger" 
                              style="float: right; margin-bottom: 15px;"
                              @click="updateOrder(quotes)">Update Order!</b-btn>
      </b-col>
    </b-row>

     <hr class="mt-4">
    <b-row>
      <b-col>
        <h3>Latest Quotes</h3>
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

                   <b-btn class="p-3 px-5 mt-4" size="lg" variant="warning" 
                            style="float: right;"
                            @click="addSelectedQuotes(selectedQuotes)">Add Selected Quotes!</b-btn>
                  
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

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
// Set up $hhtp client (required by vue-typeahead)
Vue.prototype.$http = axios

import 'vue-search-select/dist/VueSearchSelect.css'


export default {
  name: "orders",
  metaInfo: {
    title: "Orders",
  },
  data() {
    return {
      value: "",
      fields: [{ key: 'Id', sortable: true}, { key: 'Created', sortable: true} , { key: 'Assigned_To',sortable: true} , { key: 'Shipper', sortable: true} ,
                 { key: 'Vehicle',sortable: true}, { key: 'Origin_Destination', sortable: true}, { key: 'First_Avalaible', sortable: true} ,
                 { key: 'Tariff', sortable: true}, { key: 'Carrier_Pay', sortable: true}, { key: 'Status', sortable: true}],
      originalQuotesTableData: [], 
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
          { value: null, text: 'New Contact' },
          { value: '0', text: 'Contact 1' },
          { value: '1', text: 'Contact 2' },
        ],
      selectedPriceOption: "",
      profit: 0,
      items: {
        value: "",
        text: "",
      },
      shipperInfo: {
        shipper: '',
        email: '',
        address1: '',
        address2: '',
        firstName: '',
        lastName: '',
        phone: '',
        mobile: '',
        city: '',
        zip: 0,
        company: '' 
      },
      pickupInfo: {
        address1: '',
        address2: '',
        contact: '',
        phone: '',
        mobile: '',
        city: '',
        zip: 0,
        buyerNumber: '',
        company: '' 
      },
      deliveryInfo: {
        address1: '',
        address2: '',
        contact: '',
        phone: '',
        mobile: '',
        city: '',
        zip: 0,
        buyerNumber: '',
        company: '' 
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
      noCollapse: false,
      quotesTableData: [],
      selectedQuotes: [],
      quotesData: []
    };
  }, 
  mounted() {
    var vm = this
    var data = {}
    data.id = vm.$route.params.id


    axios.post(process.env.VUE_APP_SERVER_URL + '/get_order', {data}).then(
      (response) => {
        var data = response.data
        vm.deliveryInfo = data.deliveryInfo
        vm.shipperInfo = data.shipperInfo
        vm.pickupInfo = data.pickupInfo
        data.quotes.forEach( quote => {
            let data = {}
            data.id = quote
            axios.post(process.env.VUE_APP_SERVER_URL + '/get_quote_by_id', {data}).then(
                (response) => {
                    //console.log(response.data)
                    vm.quotes.push(response.data[0])
                },
                (response) => {

                }
            )
        })
        //console.log(data)
      },
      (response) => {
        //console.log(response)
      }
      )


  },
  created() {
    var vm = this

      axios.get(process.env.VUE_APP_SERVER_URL + '/user').then(
        (response) => {
          var userData = response.data
          vm.profit = userData.defaultProfit
          vm.owner = userData._id
          vm.ownerEmail = userData.email
        },
        (response) => {
          //console.log(response)
        }
        )

        axios.post(process.env.VUE_APP_SERVER_URL + '/get_quotes/')
        .then(response => { 
            var data = response.data
            vm.quotesData = data
            //console.log(data)
            data.forEach((quote) => {
              var tmp_quote = {
                Id: quote._id.slice(-4),
                Created: '----',
                Assigned_To: quote.ownerEmail,
                Origin_Destination: quote.destinationZipCode,
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
  },
  methods: {
    removeQuote: function(id) {
      var vm = this
      console.log(vm.quotes)
      var filteredQuoteList = []
      vm.quotes.forEach(quote => {
        if (quote._id != id) {
          filteredQuoteList.push(quote)
        }
      });
      vm.quotes = filteredQuoteList
      this.$nextTick()
    },
    addSelectedQuotes(selectedQuotes) {
        var vm = this
        var quoteData = []
        selectedQuotes.forEach( selectedQuote => {
          vm.quotesData.forEach( quote => {
            if (quote._id.slice(-4) == selectedQuote.Id) {
              vm.quotes.push(quote)
            }
          })
        })
    },
    updateOrder: function(quotes) {
      var vm = this
      var data = {} 
      data.quotes = quotes
      data.ownerEmail = vm.ownerEmail
      data.owner = vm.owner
      data.shipperInfo = vm.shipperInfo
      data.deliveryInfo = vm.deliveryInfo
      data.pickupInfo = vm.pickupInfo
      var total = 0
      var profit = 0
      data.quotes.forEach( quote => {
        total += quote.price
        profit += quote.profit
      })

      data.cost = total
      data.profit = profit
      data.id = vm.$route.params.id


      console.log(data)
      
        
      axios.post(process.env.VUE_APP_SERVER_URL + '/update_order/', {data})
          .then(response => { 
            console.log(response.data)
          },
                response => {

          })
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
  }
};
</script>

<style>

.shadow {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.quotes-box {
  height: 450px;
  overflow-y: scroll;
  overflow-y: none;
  background-color: #C6CCD7; 
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.quotes-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5em;
  position: relative;
  top: 15px;
  left: 15px;
  padding: 5px;
}

.quote-container {
  height: 100px;
  width: 100%;
  margin: 25px auto;
  background-color: #E5E5E5;
  border-radius: 15px;

}

.car-model-container {
  width: 100%;    
  padding: 10px;
}

.car-model {
  margin-top: 15px;
  margin-left: 10px;
}

.truck-icon {
  margin: 15px 0 0 15px; 
}

.delete-icon {
  position: relative;
  top: 15px;
  left: 230px;
}

.quote-text {
  margin-top: -35px;
  margin-left: 30px;
  color: rgb(56, 44, 44);
}

</style>