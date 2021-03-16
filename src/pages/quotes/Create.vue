<template>
  <div>
    <b-row>
      <b-col cols="9">
         <div class="d-flex justify-content-between">
          <div class="page-header">
            <h4>Create Quote</h4>
            <span>Hello {{user.firstName}}, welcome back!</span>
          </div>
          <div>
            <b-btn variant="secondary icon-btn" pill @click="goToQuotes"><i class="fas fa-long-arrow-alt-left"></i></b-btn>
            <b-btn variant="secondary rounded-pill" class="align-self-start ml-2" to="/orders/create"><i class="far fa-times-circle mx-2"></i> Clear</b-btn>
          </div>
        </div>
        <b-row>
          <b-col>
            <b-card>
              <b-card-title>
                <div class="d-flex flex-row">
                  <span class="pt-2 flex-grow-1"> Vehicle</span>
                  <b-btn variant="secondary icon-btn rounded-pill"><i class="fas fa-plus"></i></b-btn>
                </div>
              </b-card-title>
              <b-form-row>
                <b-col cols="9">
                  <b-form-group label="VIN  Number">
                    <b-input v-model="vin" />
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col>
                    <b-alert
                      :show="modelDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="modelCountDownChanged"
                    >
                      A valid model must be entered!
                    </b-alert>
                  <b-form-group label="Model">
                    <b-input v-model="carModel" label="Model" required>
                    </b-input>
                  </b-form-group>
                </b-col>
                <b-col>
                    <b-alert
                      :show="makeDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="makeCountDownChanged"
                    >
                      A valid make must be entered!
                    </b-alert>
                  <b-form-group label="Make">
                    <b-input v-model="make" label="Make" required>
                    </b-input>
                  </b-form-group>
                </b-col>
                <b-col>
                    <b-alert
                      :show="yearDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="yearCountDownChanged"
                    ii>
                      A valid year must be entered!
                    </b-alert>
                  <b-form-group label="Year">
                    <b-input v-model="year" label="Year" required>
                    </b-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-btn class="mt-4 w-100" variant="primary" @click="createCar()">Create Vehicle</b-btn>
                </b-col>
              </b-form-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mt-4">
              <b-card-title>
                Origin
              </b-card-title>
              <b-form-row>
                <b-col>
                    <b-alert
                      :show="zipDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="zipCountDownChanged"
                    >
                      A valid zip must be entered!
                    </b-alert>
                  <b-form-group label="Zip">
                    <b-input v-model="zipCode" label="Origin Zip" placeholder="Origin Zip">
                    </b-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col>
                  <b-form-group label="City">
                    <b-input v-model="city" label="Origin City" placeholder="Origin City">
                    </b-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="State">
                    <b-input v-model="state" label="Origin State" placeholder="Origin State">
                    </b-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </b-card>
          </b-col>
          <b-col>
            <b-card class="mt-4">
              <b-card-title>
                Destination
              </b-card-title>
              <b-form-row>
                <b-col>
                    <b-alert
                      :show="dZipDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="dZipCountDownChanged"
                    >
                      A valid Destination Zip must be entered!
                    </b-alert>
                  <b-form-group label="Zip">
                    <b-input v-model="dZipCode" label="Destination Zip" placeholder="Destination Zip">
                    </b-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col>
                  <b-form-group label="City">
                    <b-input v-model="dCity" label="Destination City" placeholder="Destiantion City">
                    </b-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="State">
                    <b-input v-model="dState" label="Destination State" placeholder="Destination State">
                    </b-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mt-4">
              <b-card-title>
                Do You Know Dates?
              </b-card-title>
              <b-form-row class="mt-4">
                <b-form-group>
                  <b-input-group>
                    <b-form-radio v-model="knowDates" class="mr-2" value="yes">Yes</b-form-radio>
                    <b-form-radio v-model="knowDates" value="no">No</b-form-radio>
                  </b-input-group>
                </b-form-group>
              </b-form-row>
              <b-form-row>
                <b-col>
                  <b-form-group>
                    <datepicker v-model="date1" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Start Date" />
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group>
                    <datepicker v-model="date1" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="End Date" />
                  </b-form-group>
                </b-col>
              </b-form-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mt-4">
              <b-card-title>
                Do You Know Dates?
              </b-card-title>
              <b-form-row class="mt-4">
                <b-col>
                  <b-form-group>
                    <b-input-group>
                      <b-form-radio v-model="knowDates" class="mr-2" value="yes">Yes</b-form-radio>
                      <b-form-radio v-model="knowDates" value="no">No</b-form-radio>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group class="row justify-content-end">
                    <b-form-checkbox-group v-model="selectedDate" name="flavour-2">
                      <b-form-checkbox value="no-rush">No Rush</b-form-checkbox>
                      <b-form-checkbox value="fast">Fast</b-form-checkbox>
                      <b-form-checkbox value="fastest">Fastest</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
              </b-form-row>
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
      <b-col cols="3">
        <b-card class="quote-card">
          <b-card-title>
            Quote
          </b-card-title>
          <b-row no-gutters>
            <b-col>
              <div class="quote-prices">
                <div :class="`d-flex flex-row quote-price-item ${selectedPrice == economyPrice ? 'active': null}` " variant="info" 
                      @click="selectedPrice = economyPrice; setSelectedPrice()">
                  <b-form-radio v-model="selectedPrice" class="flex-grow-1" variant="warning" :value="economyPrice">Economy</b-form-radio> <span>{{economyPrice}}</span>
                </div>
                <div :class="`d-flex flex-row quote-price-item ${selectedPrice == standardPrice ? 'active': null}`" variant="info" 
                      @click="selectedPrice = standardPrice; setSelectedPrice()">
                  <b-form-radio v-model="selectedPrice" class="flex-grow-1" variant="warning" :value="standardPrice">Standard</b-form-radio> <span>{{standardPrice}}</span>
                </div>
                <div :class="`d-flex flex-row quote-price-item ${selectedPrice == expeditedPrice ? 'active': null}`" variant="info" 
                      @click="selectedPrice = expeditedPrice; setSelectedPrice()">
                  <b-form-radio v-model="selectedPrice" class="flex-grow-1" variant="warning" :value="expeditedPrice">Expedited</b-form-radio> <span>{{expeditedPrice}}</span>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col>
              <h6>Selected Vehicles ()</h6>
              <b-card class="quote-price-item mt-2" v-for="(car, index) in cars" :key="index">
                <b-row no-gutters>
                  <b-col cols="1">
                    <i class="fas fa-truck"></i>
                  </b-col>
                  <b-col cols="10">
                    <b-row no-gutters>
                      <b-col cols="12">
                        <span class="font-weight-bold">{{car.make}} {{car.model}} {{car.year}}</span>
                      </b-col>
                      <b-col cols="6" class="mt-2">
                        Price
                      </b-col>
                      <b-col cols="6" class="mt-2">
                        Your Margin
                      </b-col>
                      <b-col cols="6" class="mt-2">
                        <span>{{car.price}}</span>
                      </b-col>
                      <b-col cols="6" class="mt-2">
                        <span v-if="car.edit"><b-input class="car-input" placeholder="margin" v-model="editedMargin"></b-input></span>
                        <span v-if="!car.edit">{{car.margin}}</span>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="1">
                    <b-btn variant="secondary icon-btn rounded-pill" size="sm"><i class="far fa-edit" @click="car.edit == !car.edit; selectCar(index)"></i></b-btn>
                    <b-btn variant="secondary icon-btn rounded-pill" size="sm"><i class="fa fa-trash" @click="removeCar(index)"></i></b-btn>
                    <b-btn v-if="car.edit" variant="secondary icon-btn rounded-pill" size="sm"><i class="fa fa-save" @click="saveCar(car.margin, index); car.edit = !car.edit"></i></b-btn>
                  </b-col>
                </b-row>
              </b-card>
              
             
              <b-card class="quote-price-total mt-4">
                <div class="d-flex flex-row mt-2">
                  <div class="flex-grow-1">
                    <i class="fas fa-tag mr-3"></i><span>${{totalPrice}}</span>
                  </div>
                  <b-badge id="total" variant="primary" size="lg">${{totalPrice}}</b-badge>
                </div>
                <div class="d-flex flex-row">
                  <div class="flex-grow-1">
                    <span id="total-price" class="font-weight-bold">${{total}}</span>
                  </div>
                  <b-badge id="total-2" size="lg" variant="primary">+ ${{totalMargin}}</b-badge>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
        <b-row no-gutters>
          <b-col>
            <div class="d-flex justify-content-between mt-4">
              <b-btn variant="secondary" class="font-weight-bold save-quote" @click="createQuote">Save Quote</b-btn>
              <b-btn variant="primary" class="font-weight-bold save-quote">Book It Now</b-btn>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <div @click="viewOrderList()">View Order List →</div>
</div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import axios from "axios";
import AxiosPlugin from "vue-axios-cors";
import _ from "underscore";
import $ from "jquery";
import loadCustomers from "@/mixins/loadCustomers";
import VueTypeahead from "vue-typeahead";
import { mapActions, mapGetters } from 'vuex'

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
// Set up $hhtp client (required by vue-typeahead)
Vue.prototype.$http = axios;

export default {
  name: "quotes",
  components: {
    Datepicker,
  },
  extends: VueTypeahead,
  metaInfo: {
    title: "Quotes",
  },
  mixins: [loadCustomers],
  props: {
    model: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      selectedDate: [{text: "no-rush", value: "no-rush"}, {text: "fast", value: "fast"}, {text: "fastest", value: "fastest"}],
      knowDates: "",
      date1: "",
      value: "",
      src: "https://typeahead-js-twitter-api-pro",     
      minChars: 3,
      zipCode: "",
      city: "",
      state: "",
      dZipCode: "",
      dCity: "",
      dState: "",
      year: "",
      carModel: "",
      make: "",
      address: "",
      customers: [],
      cars: [],
      vin: "",
      showPriceTab: false,
      economyPrice: 0,
      standardPrice: 0, 
      expeditedPrice: 0,
      selectedPrice: 0,
      selectedCar: 0,
      editedMargin: 0,
      quoteId: 0,
      ownerEmail: "",
      owner: "",
      orders: [],
      prices: [
        { text: "Economy", value: "0" },
        { text: "Standard", value: "1" },
        { text: "Expedited", value: "2" },
      ],
      item: {
        value: "",
        text: "",
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      yearDismissCountDown: 0,  
      makeDismissCountDown: 0,  
      modelDismissCountDown: 0,  
      dZipDismissCountDown: 0,  
      zipDismissCountDown: 0,  
      makeDismissSecs: 0,
      modelDismissSecs: 0,
      defaultProfit: 0
    };
  },
  computed: {
    ...mapGetters({quotes: "allQuotes", user: "getUser"}),
    totalPrice() {
      var vm = this;
      var total = 0;
      _.each(vm.cars, car => total+= car.price) 
      return total;
    },
    totalMargin() {
      var vm = this;
      var total = 0;
      _.each(vm.cars, car => total+= car.margin) 
      return total;
    },
    total() {
      var vm = this;
      var total = 0;
      _.each(vm.cars, car => {
        total+= car.margin
        total+= car.price
      }) 
      return total;
    },
  },
  watch: {
    vin: function () {
      var vm = this;
      if (vm.vin.length > 6) var vinStr = this.vin + ";";
      {
        $.ajax({
          url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
          type: "POST",
          data: { format: "json", data: vinStr },
          dataType: "json",
          success: function (result) {
            var data = result.Results[0];
            vm.year = data.ModelYear;
            vm.make = data.Make;
            vm.carModel = data.Model;
            console.log(result);
            vm.$nextTick();
          },
          error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
          },
        });
      }
    },
    zipCode: function () {
      this.model.city = "";
      if (this.zipCode.length == 5) {
        //call api method
        this.lookupZip();
      }
    },
    dZipCode: function () {
      this.model.dCity = "";
      if (!!this.dZipCode) {
        if (this.dZipCode.length == 5) {
          //call api method
          this.lookupZip2();
        }
      }
    },
    item: function () {
      if (this.item.text == "Select Customer") {
        this.address = "";
      } else {
        this.customers.forEach((element) => {
          if (this.item.text == element.fullName) {
            this.dCity = element.city;
            this.dState = element.state;
            this.dZipCode = element.zipCode;
          }
        });
      }
    },
  },
  mounted() {
  },
  created() {
    var vm = this

       
    this.$nextTick(() => {
      vm.getQuotes()
      vm.fetchUser();
    })

    var user = vm.user
    vm.defaultProfit = user.defaultProfit;
    console.log(user)

    /*
    vm.vin = "JN8AE2KP6B9004195"
    vm.zipCode = "60010"
    vm.dZipCode = "70010"
    */

  },
  events: {
    click: function (data) {
      console.log(data);
    },
  },
  methods: {
    ...mapActions(['getCustomers', 'getQuotes', 'fetchUser']),
    goToQuotes() {
      this.$router.push({name: 'Quotes'})
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
    lookupZip: _.debounce(function () {
      var vm = this;
      vm.city = "Searching...";

      var data = { zipCode: vm.zipCode };

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/decode_zip/", { data })
        .then(function (response) {
          vm.city = response.data.city;
          vm.state = response.data.state;
        })
        .catch(function () {
          vm.city = "Invalid Zipcode";
          vm.state = "Invalid Zipcode";
        });
    }, 1000),
    lookupZip2: _.debounce(function () {
      var vm = this;
      vm.dCity = "Searching...";

      var data = { zipCode: vm.dZipCode };

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/decode_zip/", { data })
        .then(function (response) {
          vm.dCity = response.data.city;
          vm.dState = response.data.state;
        })
        .catch(function () {
          vm.dCity = "Invalid Zipcode";
          vm.dState = "Invalid Zipcode";
        });
    }, 1000), 
    yearCountDownChanged(dismissCountDown) {
      this.yearDismissCountDown = dismissCountDown
    }, 
    makeCountDownChanged(dismissCountDown) {
      this.makeDismissCountDown = dismissCountDown 
    },
    modelCountDownChanged(dismissCountDown) {
      this.modelDismissCountDown = dismissCountDown 
    },
    dZipCountDownChanged(dismissCountDown) {
      this.dZipDismissCountDown = dismissCountDown 
    },
    zipCountDownChanged(dismissCountDown) {
      this.zipDismissCountDown = dismissCountDown 
    },
    createCar() {
      var vm = this;
      var data = {}
      data.year = vm.year
      data.model = vm.carModel;
      data.make = vm.make;
      data.dZipCode = vm.dZipCode
      data.zipCode = vm.zipCode

      console.log(data)
      if (!data.year || data.year == "" || data.year == null) {
        vm.yearDismissCountDown = 3 
        console.log(data);
      } 

      if (!data.make || data.make == "" || data.make == null) {
        vm.makeDismissCountDown = 3 
        console.log(data);
      } 
      
      if (!data.model || data.model == "") {
        vm.modelDismissCountDown = 3
        console.log(data);
      }

      if (!data.dZipCode || data.dZipCode == "" || data.dZipCode == undefined) {
        vm.dZipDismissCountDown = 3
        console.log(data);
      }

      if (!data.zipCode || data.zipCode == "") {
        vm.zipDismissCountDown = 3
        console.log(data);
      }

      if (data.model && data.year && data.make) {
          var query = {
            carCondition: "1",
            transportType: "1",
            vehicleMake: data.make,
            vehicleModel: data.model,
            vehicleYear: data.year,
            zipDrop: data.dZipCode,
            zipPick: data.zipCode,
          };

          axios
            .post("https://nexusv.d.brainwork.lv/api/calculations", query)
            .then((response) => {
              console.log(response);
              vm.economyPrice = response.data.data.result.quote.economy;
              vm.standardPrice = response.data.data.result.quote.standard;
              vm.expeditedPrice = response.data.data.result.quote.expedited;
              var carData = {
                zipCode: vm.zipCode,
                dZipCode: vm.dZipCode,
                make: vm.make,
                model: vm.carModel,
                year: vm.year,
                vin: vm.vin || "",
                state: vm.state,
                city: vm.city,
                dCity: vm.dCity,
                dState: vm.dState,
                price: vm.selectedPrice,
                margin: vm.defaultProfit,
                edit: false,
                select: false,
              }
              this.$nextTick(() => {
                  vm.cars.push(carData)
              });
            });

      }
    },
    createQuote() {
      var vm = this;
      var data = {};

      data.ownerEmail = vm.ownerEmail;
      data.owner = vm.owner;
      data.cars = vm.cars


     console.log(data)

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_quote/", { data })
        .then((response) => {
          console.log(response.data);
        });
    },
    decode: function (vin) {
      var vm = this;
      if (vin != undefined && vin.length > 5) {
        var vinStr = this.vin + ";";
        $.ajax({
          url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
          type: "POST",
          data: { format: "json", data: vinStr },
          dataType: "json",
          success: function (result) {
            var data = result.Results[0];
            vm.year = data.ModelYear;
            vm.make = data.Make;
            vm.carModel = data.Model;
            console.log(result);
            vm.$nextTick();
          },
          error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
          },
        });
      }
    },
    reset() {
      this.item = {};
    },
    selectPrice() {
      var vm = this;
      this.$nextTick(() => {
        console.log(vm.selectedpriceoption);
        if (vm.selectedpriceoption == 0) {
          vm.totalprice = number(vm.profit) + number(vm.economyprice);
        } else if (vm.selectedpriceoption == 1) {
          vm.totalprice = number(vm.profit) + number(vm.standardprice);
        } else if (vm.selectedpriceoption == 2) {
          vm.totalprice = number(vm.profit) + number(vm.expeditedprice);
        }
      });
    },
    selectFromParentComponent1() {
      this.item = this.options[0];
    },
    removeCar(index) {
      this.cars.splice(index, 1);
    },
    saveCar(margin, index) {
      this.$nextTick(() => {
        this.cars[index].margin = Number(this.editedMargin)
        this.cars[index].selected = false 
        console.log(this.cars)
      });
    },
    selectCar(index) {
      this.$nextTick(() => {
        this.selectedCar = index
        this.cars[index].edit = true
      });
    },
    setSelectedPrice() {
      var index = this.selectedCar || 0
      this.cars[index].price = this.selectedPrice
    }
  },
};
</script>

<style>
.price {
  margin-top: 20px;
  margin-bottom: 20px;
}
.book-it {
  width: 60%;
}
.car-input {
  height: 1.5em;
  width: 80%;
}
</style>