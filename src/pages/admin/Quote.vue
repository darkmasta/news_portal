<template>
<div>
      <b-row>
      <b-col>
        <h3>Update Quote</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        <b-row>
          <b-col>
            <b-card class="mt-3" no-body>
              <b-card-header class="pb-0">
                <h4>Vehicle</h4>
              </b-card-header>
              <b-card-body>
                <b-form-row>
                  <b-col cols="9">
                    <b-form-group label="VIN  Number" label-size="lg">
                      <b-input v-model="vin" size="lg" placeholder="2GCJC13ZX71140438" />
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group label-size="lg">
                      <b-btn class="mt-4" size="lg" variant="warning" @click="decode(vin)">Decode Number</b-btn>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col>
                    <b-form-group label="Year" label-size="lg">
                      <b-input v-model="year" label="Year" placeholder="Year">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Make" label-size="lg">
                      <b-input v-model="make" label="Make" placeholder="Make">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Model" label-size="lg">
                      <b-input v-model="carModel" label="Model" placeholder="Model">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-card-body>
            </b-card>
            <!-- <b-col>
                  <b-form-group label="Select Customer" label-size="lg">
                    <model-select v-model="item" :options="options" placeholder="Select Customer">
                    </model-select>
                  </b-form-group>
                </b-col> -->
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mt-4" no-body>
              <b-card-header class="pb-0">
                <div class="row">
                  <div class="col-md-4">
                  <h4>Origin</h4>
                  </div>
                  <div class="offset-md-4 col-md-4">
                  <b-btn
                  variant="primary"
                  size="sm"
                  class="editOrigin"
                  @click="editOrigin = !editOrigin"
                  >Edit</b-btn>
                  </div>
                </div>
              </b-card-header>
              <b-card-body>
                <b-form-row>
                  <b-col>
                    <b-form-group label="Zip" label-size="lg">
                      <b-input v-if="!editOrigin" v-model="zipCode" size="lg" label="Origin Zip" disabled></b-input>
                      <b-input v-if="editOrigin" v-model="zipCode" size="lg" label="Origin Zip" placeholder="Origin Zip">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col>
                    <b-form-group label="City" label-size="lg">
                      <b-input v-if="!editOrigin" v-model="city" size="lg" label="Origin City" disabled></b-input>
                      <b-input v-if="editOrigin" v-model="city" label="Origin City" placeholder="Origin City">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="State" label-size="lg">
                      <b-input v-if="!editOrigin" v-model="state" size="lg" label="Origin State" disabled></b-input>
                      <b-input v-if="editOrigin" v-model="state" label="Origin State" placeholder="Origin State">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col>
            <b-card class="mt-4" no-body>
              <b-card-header class="pb-0">
                <h4>Destination</h4>
              </b-card-header>
              <b-card-body>
                <b-form-row>
                  <b-col>
                    <b-form-group label="Zip" label-size="lg">
                      <b-input v-model="dZipCode" size="lg" label="Destination Zip" placeholder="Destination Zip">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col>
                    <b-form-group label="City" label-size="lg">
                      <b-input v-model="dCity" label="Destination City" placeholder="Destiantion City">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="State" label-size="lg">
                      <b-input v-model="dState" label="Destination State" placeholder="Destination State">
                      </b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mt-4" no-body>
              <b-card-header class="pb-0">
                <h4>Notes</h4>
              </b-card-header>
              <b-card-body>
                <b-form-group label="" label-size="lg">
                  <textarea v-model="model.notes" rows="4" cols="80" class="form-control" placeholder="Notes..." />
                </b-form-group>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <!-- <b-card-footer>
      <div class="text-right mt-3">
        <b-button slot="footer" type="primary" fill @click="submitQuote(model, year, make, carModel, item, city, state, zipCode,dZipCode)">Save</b-button>
      </div>
    </b-card-footer> -->
      <b-col cols="4">
        <b-row>
          <b-col>
            <b-card class="mt-3" no-body>
              <b-card-header class="pb-0">
                <h4>Search Customers</h4>
              </b-card-header>
              <b-card-body>
                <b-input-group size="lg">
                  <b-input-group-text v-if="loading" slot="prepend">
                    <i class="ion ion-md-sync"></i>
                  </b-input-group-text>
                  <b-input-group-text v-if="!loading" slot="prepend">
                    <i class="ion ion-ios-search"></i>
                  </b-input-group-text>
                  <input v-model="value" type="text" class="form-control" placeholder="Customer Name" autocomplete="off" @keydown.down="down" @keydown.up="up" @keydown.enter="hit" @keydown.esc="reset" @blur="reset" @input="updateQuery" />
                  <b-input-group-text v-if="value" slot="append" @click="resetInput">
                    <i class="ion ion-md-close"></i>
                  </b-input-group-text>
                </b-input-group>

                
              </b-card-body>

            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mt-4" no-body>
              <b-card-header class="pb-0">
                <h4>Quote</h4>
              </b-card-header>
              <b-card-body>
                <b-row>
                  <b-col>
                    <b-button-group vertical>
                      <b-button variant="info" @click="selectedPrice = economyPrice">
                        <b-form-radio size="lg" class="mt-2" variant="warning" name="some-radios" value="100">Economy <b-badge class="ml-2" size="lg" variant="warning"> <b>{{economyPrice}}</b></b-badge>
                        </b-form-radio>
                      </b-button>
                      <b-button variant="info" @click="selectedPrice = standardPrice">
                        <b-form-radio size="lg" class="mt-2" variant="warning" name="some-radios" value="200">Standard <b-badge class="ml-2" variant="warning"><b>{{standardPrice}}</b></b-badge>
                        </b-form-radio>
                      </b-button>
                      <b-button variant="info" @click="selectedPrice = expeditedPrice">
                        <b-form-radio size="lg" class="mt-2" variant="warning" name="some-radios" value="300">Expedited <b-badge class="ml-2" variant="warning"><b>{{expeditedPrice}}</b></b-badge>
                        </b-form-radio>
                      </b-button>
                    </b-button-group>
                  </b-col>
                  <b-col>
                    <b-list-group class="mt-4">
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Price :
                        <b-badge variant="info" class="px-4 py-2 profit-badge">{{selectedPrice}}</b-badge>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Profit :
                        <b-badge variant="info" class="px-4 py-2 profit-badge">
                          <b-input v-model="profit" placeholder="Profit" class="profit-input">
                          </b-input>
                        </b-badge>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <b>Total :</b>
                        <b-badge variant="info" class="px-4 py-2 profit-badge"><b>{{totalPriceCalc()}}</b></b-badge>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <div class="d-flex flex-row-reverse">
              <b-btn class="p-3 px-5 mt-4" size="lg" variant="danger" @click="updateQuote(model, profit)">Update Quote!</b-btn>
              <b-btn class="p-3 px-5 mt-4 mr-4" size="lg" variant="warning" @click="getQuote(model)">Get Quote</b-btn>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <hr class="mt-4">
    
  
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
  name: "quotes",
  metaInfo: {
    title: "Quotes",
  },
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
        loading: false,
        editOrigin: false,
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
    };
    }, 
    mixins: [loadCustomers],
    components: {
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

      var data = {}
      data.id = vm.$route.params.id
       
       axios.post(process.env.VUE_APP_SERVER_URL + '/get_quote_by_id', {data})
                .then(response => { 
                    var userData = response.data[0]
                    console.log(userData)
                    vm.vin = userData.vin
                    vm.carModel = userData.model
                    vm.year = userData.year
                    vm.profit = userData.profit
                    vm.selectedPrice = userData.price
                    vm.city = userData.originCity
                    vm.state = userData.originState
                    vm.zipCode = userData.originZipCode
                    vm.dZipCode = userData.destinationZipCode
                    vm.dCity = userData.destinationCity
                    vm.dState = userData.destinationState
                    })
    },
    events: {
        click: function(data) {
            console.log(data)
        }
    },
    watch: {
      vin: function()  {
        var vm = this
        if (vm.vin.length > 6)
        var vinStr = this.vin + ";"
        {
          $.ajax({
            url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
            type: "POST",
            data: { format: "json", data: vinStr},
            dataType: "json",
            success: function(result)
            {
              var data = result.Results[0]
              vm.year = data.ModelYear
              vm.make = data.Make
              vm.carModel = data.Model 
              console.log(result);
              vm.$nextTick()
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
              console.log(xhr.status);
              console.log(thrownError);
            }
          });
        }
      },
      zipCode: function(){
        this.model.city = ''
        if (this.zipCode && this.zipCode.length == 5){
          //call api method
          this.lookupZip()
        }
      },
      dZipCode: function(){
        this.model.dCity = ''
          if (this.dZipCode && this.dZipCode.length == 5){
            //call api method
            this.lookupZip2()
          }
      },
      item: function() {
        if (this.item.text == 'Select Customer') {
          this.address = ''
        } else {
          this.customers.forEach(element => {
            if (this.item.text == element.fullName) {
              this.dCity = element.city
              this.dState = element.state
              this.dZipCode = element.zipCode
            }           
          });
        }
      }
    },
    methods: {
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
              "zipDrop": data.destinationZipCode,
              "zipPick": data.zipCode
            }

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
          updateQuote: function(model) {
            var vm = this
            var data = {}
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
            

            data.price = vm.selectedPrice
            data.profit = vm.profit
            data.id = vm.$route.params.id

            console.log(data)
            
              
            axios.post(process.env.VUE_APP_SERVER_URL + '/update_quote/', {data})
                .then(response => { 
                  console.log(response.data)
                },
                      response => {

                })


          },
      decode: function(vin) {
        var vm = this
        if(vin != undefined && vin.length > 5) {
          var vinStr = this.vin + ";"
          $.ajax({
            url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
            type: "POST",
            data: { format: "json", data: vinStr},
            dataType: "json",
            success: function(result)
            {
              var data = result.Results[0]
              vm.year = data.ModelYear
              vm.make = data.Make
              vm.carModel = data.Model 
              console.log(result);
              vm.$nextTick()
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
              console.log(xhr.status);
              console.log(thrownError);
            }
          });
        }
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
.price {
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}
.book-it {
  width: 60%;
}




.container {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  height: 100%;
}

ul li {
  margin: 0 0 24px;
  list-style-type: none;

}

.the-arrow {
  width: 1px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.the-arrow.-left {
  position: absolute;
  top: 60%;
  left: 0;
}
.the-arrow.-left > .shaft {
  width: 0;
  background-color: #4c4c4c;
}
.the-arrow.-left > .shaft:before, .the-arrow.-left > .shaft:after {
  width: 0;
  background-color: #4c4c4c;
}
.the-arrow.-left > .shaft:before {
  -webkit-transform: rotate(0);
          transform: rotate(0);
}
.the-arrow.-left > .shaft:after {
  -webkit-transform: rotate(0);
          transform: rotate(0);
}
.the-arrow.-right {
  top: 3px;
}
.the-arrow.-right > .shaft {
  width: 1px;
  -webkit-transition-delay: 0.2s;
          transition-delay: 0.2s;
}
.the-arrow.-right > .shaft:before, .the-arrow.-right > .shaft:after {
  width: 8px;
  -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.the-arrow.-right > .shaft:before {
  -webkit-transform: rotate(40deg);
          transform: rotate(40deg);
}
.the-arrow.-right > .shaft:after {
  -webkit-transform: rotate(-40deg);
          transform: rotate(-40deg);
}
.the-arrow > .shaft {
  background-color: #4c4c4c;
  display: block;
  height: 1px;
  position: relative;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  -webkit-transition-delay: 0;
          transition-delay: 0;
  will-change: transform;
}
.the-arrow > .shaft:before, .the-arrow > .shaft:after {
  background-color: #4c4c4c;
  content: '';
  display: block;
  height: 1px;
  position: absolute;
  top: 0;
  right: 0;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  -webkit-transition-delay: 0;
          transition-delay: 0;
}
.the-arrow > .shaft:before {
  -webkit-transform-origin: top right;
          transform-origin: top right;
}
.the-arrow > .shaft:after {
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.animated-arrow {
  display: inline-block;
  color: #4c4c4c;
  font-size: 1.25em;

  font-style: italic;
  text-decoration: none;
  position: relative;
  top: 35px;
  left: -50px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.animated-arrow:hover {
  color: #808080;
}
.animated-arrow:hover > .the-arrow.-left > .shaft {
  width: 64px;
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
  background-color: #808080;
}
.animated-arrow:hover > .the-arrow.-left > .shaft:before, .animated-arrow:hover > .the-arrow.-left > .shaft:after {
  width: 8px;
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
  background-color: #808080;
}
.animated-arrow:hover > .the-arrow.-left > .shaft:before {
  -webkit-transform: rotate(40deg);
          transform: rotate(40deg);
}
.animated-arrow:hover > .the-arrow.-left > .shaft:after {
  -webkit-transform: rotate(-40deg);
          transform: rotate(-40deg);
}
.animated-arrow:hover > .main {
  -webkit-transform: translateX(17px);
          transform: translateX(17px);
  -webkit-transform: translateX(80px);
          transform: translateX(80px);
}
.animated-arrow:hover > .main > .the-arrow.-right > .shaft {
  width: 0;
  -webkit-transform: translateX(200%);
          transform: translateX(200%);
  -webkit-transition-delay: 0;
          transition-delay: 0;
}
.animated-arrow:hover > .main > .the-arrow.-right > .shaft:before, .animated-arrow:hover > .main > .the-arrow.-right > .shaft:after {
  width: 0;
  -webkit-transition-delay: 0;
          transition-delay: 0;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
}
.animated-arrow:hover > .main > .the-arrow.-right > .shaft:before {
  -webkit-transform: rotate(0);
          transform: rotate(0);
}
.animated-arrow:hover > .main > .the-arrow.-right > .shaft:after {
  -webkit-transform: rotate(0);
          transform: rotate(0);
}
.animated-arrow > .main {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.animated-arrow > .main > .text {
  margin: 0 16px 0 0;
  line-height: 1;
}
.animated-arrow > .main > .the-arrow {
  position: relative;
}

.prices {
  border-style: solid;
  margin-top: 100px;
  border-color: green;
}


.field__input{ 
  --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
  
  background-color: transparent;
  border-radius: 0;
  border: none;

  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: inherit;
  font-size: inherit;
}

.field__input:focus::-webkit-input-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

.field__input:focus::-moz-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

/*
=====
CORE STYLES
=====
*/

.field{
  --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);   
  --uiFieldBorderColorActive: var(--fieldBorderColorActive, rgba(22, 22, 22, 1));

  display: var(--fieldDisplay, inline-flex);
  position: relative;
  font-size: var(--fieldFontSize, 1rem);
}

.field__input{
  box-sizing: border-box;
  width: var(--fieldWidth, 100%);
  height: var(--fieldHeight, 3rem);
  padding: var(--fieldPaddingTop, 1.25rem) var(--uiFieldPaddingRight) var(--fieldPaddingBottom, .5rem) var(--uiFieldPaddingLeft);
  border-bottom: var(--uiFieldBorderWidth) solid var(--fieldBorderColor, rgba(0, 0, 0, .25));  
}

.field__input:focus{
  outline: none;
}

.field__input::-webkit-input-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input::-moz-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input:focus::-webkit-input-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__input:focus::-moz-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__label-wrap{
  box-sizing: border-box;
  pointer-events: none;
  cursor: text;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.field__label-wrap::after{
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;
  opacity: 0;

  position: absolute;
  bottom: 0;
  left: 0;
}

.field__input:focus ~ .field__label-wrap::after{
  opacity: 1;
}

.field__label{
  position: absolute;
  left: var(--uiFieldPaddingLeft);
  top: calc(50% - .5em);

  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);

  transition: top .2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity .2s ease-out, font-size .2s ease-out;
  will-change: bottom, opacity, font-size;
}

.field__input:focus ~ .field__label-wrap .field__label,
.field__input:not(:placeholder-shown) ~ .field__label-wrap .field__label{
  --fieldHintFontSize: var(--fieldHintFontSizeFocused, .75rem);

  top: var(--fieldHintTopHover, .25rem);
}

/* 
effect 1
*/

.field_v1 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transition: opacity .2s ease-out;
  will-change: opacity;
}

form {
  max-width: 250px;
  position: relative;
  margin: 50px auto 0;
  font-size: 15px;
}

.radiobtn {
  position: relative;
  display: block;
}
.radiobtn label {
  display: block;
  background: #fee8c3;
  color: #444;
  border-radius: 5px;
  padding: 10px 20px;
  border: 2px solid #fdd591;
  margin-bottom: 5px;
  cursor: pointer;
}
.radiobtn label:after, .radiobtn label:before {
  content: "";
  position: absolute;
  right: 11px;
  top: 11px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: #fdcb77;
}
.radiobtn label:before {
  background: transparent;
  -webkit-transition: 0.1s width cubic-bezier(0.075, 0.82, 0.165, 1) 0s, 0.3s height cubic-bezier(0.075, 0.82, 0.165, 2) 0.1s;
  transition: 0.1s width cubic-bezier(0.075, 0.82, 0.165, 1) 0s, 0.3s height cubic-bezier(0.075, 0.82, 0.165, 2) 0.1s;
  z-index: 2;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 13px;
  background-position: center;
  width: 0;
  height: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS4zIDEzLjIiPiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0LjcuOGwtLjQtLjRhMS43IDEuNyAwIDAgMC0yLjMuMUw1LjIgOC4yIDMgNi40YTEuNyAxLjcgMCAwIDAtMi4zLjFMLjQgN2ExLjcgMS43IDAgMCAwIC4xIDIuM2wzLjggMy41YTEuNyAxLjcgMCAwIDAgMi40LS4xTDE1IDMuMWExLjcgMS43IDAgMCAwLS4yLTIuM3oiIGRhdGEtbmFtZT0iUGZhZCA0Ii8+PC9zdmc+);
}
.radiobtn input[type="radio"] {
  display: none;
  position: absolute;
  width: 100%;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.radiobtn input[type="radio"]:checked + label {
  background: #fdcb77;
  -webkit-animation-name: blink;
          animation-name: blink;
  -webkit-animation-duration: 1s;
          animation-duration: 1s;
  border-color: #fcae2c;
}
.radiobtn input[type="radio"]:checked + label:after {
  background: #fcae2c;
}
.radiobtn input[type="radio"]:checked + label:before {
  width: 20px;
  height: 20px;
}

@-webkit-keyframes blink {
  0% {
    background-color: #fdcb77;
  }
  10% {
    background-color: #fdcb77;
  }
  11% {
    background-color: #fdd591;
  }
  29% {
    background-color: #fdd591;
  }
  30% {
    background-color: #fdcb77;
  }
  50% {
    background-color: #fdd591;
  }
  45% {
    background-color: #fdcb77;
  }
  50% {
    background-color: #fdd591;
  }
  100% {
    background-color: #fdcb77;
  }
}

@keyframes blink {
  0% {
    background-color: #fdcb77;
  }
  10% {
    background-color: #fdcb77;
  }
  11% {
    background-color: #fdd591;
  }
  29% {
    background-color: #fdd591;
  }
  30% {
    background-color: #fdcb77;
  }
  50% {
    background-color: #fdd591;
  }
  45% {
    background-color: #fdcb77;
  }
  50% {
    background-color: #fdd591;
  }
  100% {
    background-color: #fdcb77;
  }
}


.green {
  background-color: #52961a;
}

table > tbody > .table-active > td {
    background-color: #FFD950!important;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.07), 0px 4px 5px 0px rgba(0, 0, 0, 0.05), 0px 1px 10px 0px rgba(0, 0, 0, 0.03);
    color: #665720;
}

.form-control:disabled {
  color: #000 !important;
}

.profit-input {
    border: none !important;
    display: inline-block;
    padding: 0.25em 0.417em;
    font-size: 0.858em !important;
    height: auto;
    width: 100%;
    font-weight: 500 !important;
    line-height: 1;
    text-align: center;
    color: #fff !important;
    /*white-space: nowrap;*/
    /*vertical-align: baseline;*/
    border-radius: 0.125rem;
    transition: all 0.2s ease-in-out;
}

.profit-badge {
  width: 50%;
}

</style>