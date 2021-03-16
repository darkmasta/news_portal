<template>
  <div>
    <b-row>
      <b-col cols="9">
        <div class="d-flex justify-content-between">
          <div class="page-header">
            <h4>View/Update Order</h4>
            <span>Hello {{user.firstName}}, welcome back!</span>
          </div>
          <div>
            <b-btn variant="secondary icon-btn" pill><i class="fas fa-long-arrow-alt-left"></i></b-btn>
            <b-btn variant="secondary rounded-pill" class="align-self-start ml-2" to="/orders/create"><i class="far fa-times-circle mx-2"></i> Clear</b-btn>
          </div>
        </div>
        <b-card class="mt-1" no-body>
          <b-card-header class="pb-0">
            <h4>Shipper Information</h4>
          </b-card-header>
          <b-card-body>
            <b-form-row>
              <b-col>
                <b-form-group label="Select Shipper">
                  <b-input v-model="shipperInfo.shipper" label="Shipper" placeholder="Shipper">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Email">
                  <b-input v-model="shipperInfo.email" label="Email" placeholder="Email">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Address 1">
                  <b-input v-model="shipperInfo.address1" label="Address 1" placeholder="Address 1">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-form-group label="First Name">
                  <b-input v-model="shipperInfo.firstName" label="First Name" placeholder="First Name">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Phone">
                  <b-input v-model="shipperInfo.phone" label="Phone" placeholder="Phone">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Address 2">
                  <b-input v-model="shipperInfo.address2" label="Address 2" placeholder="Address 2">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-form-group label="Last Name">
                  <b-input v-model="shipperInfo.lastName" label="Last Name" placeholder="Last Name">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Mobile">
                  <b-input v-model="shipperInfo.mobile" label="Mobile" placeholder="Mobile">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="City">
                  <b-input v-model="shipperInfo.city" label="City" placeholder="City">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col cols="8">
                <b-form-group label="Company">
                  <b-input v-model="shipperInfo.company" placeholder="" />
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="State/Zip">
                  <b-input v-model="shipperInfo.zip" placeholder="State/Zip" />
                </b-form-group>
              </b-col>
            </b-form-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="3" class="quotes-box">
        <b-card>
          <b-card-title>
            Vechiles Detail
          </b-card-title>
          <b-row no-gutters>
            <b-col>
              <h6 class="mt-1">Selected ({{cars.length}})</h6>
              <b-card v-for="car in cars" :key="car._id" class="quote-price-item mt-3">
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
                        <span>${{car.price}}</span>
                      </b-col>
                      <b-col cols="6" class="mt-2">
                        <span>${{car.margin}}</span>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="1">
                    <b-btn variant="secondary icon-btn rounded-pill" size="sm"><i class="far fa-edit"></i></b-btn>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mt-4" no-body>
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
                <b-form-group label="Address 1">
                  <b-input v-model="deliveryInfo.address1" label="Address 1" placeholder="Address 1">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Contact Name">
                  <b-input v-model="deliveryInfo.contact" label="Contact Name" placeholder="Contact Name">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Phone">
                  <b-input v-model="deliveryInfo.phone" label="Phone" placeholder="Phone">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col>
                <b-form-group label="Address 2">
                  <b-input v-model="deliveryInfo.address2" label="Address 2" placeholder="Address 2">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Company Name">
                  <b-input v-model="deliveryInfo.company" label="Company" placeholder="Company">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Mobile">
                  <b-input v-model="deliveryInfo.mobile" label="Mobile" placeholder="Mobile">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col cols="4">
                <b-form-group label="City">
                  <b-input v-model="deliveryInfo.city" placeholder="City" />
                </b-form-group>
              </b-col>

              <b-col cols="4">
              <b-alert
                      :show="zipDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="zipCountDownChanged"
                    >
                      A valid Zip must be entered!
                    </b-alert>
              
                <b-form-group label="State/Zip">
                  <b-input v-model="deliveryInfo.zip" placeholder="State/Zip" />
                </b-form-group>
              </b-col>

              <b-col cols="4">
                <b-form-group label="Buyer Number">
                  <b-input v-model="deliveryInfo.buyer" placeholder="Buyer Number" />
                </b-form-group>
              </b-col>
            </b-form-row>

          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-4" no-body>
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
                <b-form-group label="Address 1">
                  <b-input v-model="pickupInfo.address1" label="Address 1" placeholder="Address 1">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Contact Name">
                  <b-input v-model="pickupInfo.contact" label="Contact Name" placeholder="Contact Name">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Phone">
                  <b-input v-model="pickupInfo.phone" label="Phone" placeholder="Phone">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-form-group label="Address 2">
                  <b-input v-model="pickupInfo.address2" label="Address 2" placeholder="Address 2">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Company Name">
                  <b-input v-model="pickupInfo.company" label="Company" placeholder="Company">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Mobile">
                  <b-input v-model="pickupInfo.mobile" label="Mobile" placeholder="Mobile">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col cols="4">
                <b-form-group label="City">
                  <b-input v-model="pickupInfo.city" placeholder="City" />
                </b-form-group>
              </b-col>

              <b-col cols="4">
              <b-alert
                      :show="dZipDismissCountDown"
                      dismissible
                      fade
                      variant="warning"
                      @dismiss-count-down="dZipCountDownChanged"
                    >
                      A valid Destination Zip must be entered!
                    </b-alert>
                <b-form-group label="State/Zip">
                  <b-input v-model="pickupInfo.zip" placeholder="State/Zip" />
                </b-form-group>
              </b-col>

              <b-col cols="4">
                <b-form-group label="Buyer Number">
                  <b-input v-model="pickupInfo.buyer" placeholder="Buyer Number" />
                </b-form-group>
              </b-col>
            </b-form-row>

          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mt-4">
          <b-card-title>
            Price Detail
          </b-card-title>
          <b-row>
            <b-col cols="9">
              <b-row>
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
              </b-row>
              <b-row class="mt-2">
                <b-col cols="3">
                  <b-form-group label="Vehicles Run">
                    <b-form-radio-group v-model="selectedDate" name="flavour-2">
                      <b-form-radio value="yes">Yes</b-form-radio>
                      <b-form-radio value="no">No</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group label="Ship Via">
                    <b-form-select v-model="selected" :options="[{text: 'Open', value:'1'}]"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="Payment By">
                    <b-form-radio-group v-model="selectedDate" name="flavour-2">
                      <b-form-radio value="yes">Mercedes benz of chicago</b-form-radio>
                      <b-form-radio value="no">Customer</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="3">
              <b-card class="quote-price-total">
                <div class="d-flex flex-row mt-2">
                  <div class="flex-grow-1">
                    <i class="fas fa-tag mr-3"></i><span>Total</span>
                  </div>
                  <b-badge id="total" variant="primary" size="lg"> +{{totalPrice}}</b-badge>
                </div>
                <div class="d-flex flex-row">
                  <div class="flex-grow-1">
                    <span id="total-price" class="font-weight-bold">${{totalPrice}}</span>
                  </div>
                  <b-badge id="total-2" size="lg" variant="primary">+ ${{totalMargin}}</b-badge>
                </div>
              </b-card>
            </b-col>
            <b-col cols="12">
              <div class="d-flex justify-content-end">
                <b-btn variant="primary" class="font-weight-bold save-order" @click="submitOrder">Save Order</b-btn>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex justify-content-center mt-4">
        <div @click="viewOrderList()">View Order List →</div>
      </b-col>
    </b-row>
  </div>
</template>
<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>
<script>
import Vue from "vue";
import axios from "axios";
import AxiosPlugin from "vue-axios-cors";
import Datepicker from "vuejs-datepicker";
import { mapActions, mapGetters } from 'vuex'
import _ from "underscore";

Vue.use(axios);

axios.defaults.withCredentials = true;
Vue.use(AxiosPlugin);
// Set up $hhtp client (required by vue-typeahead)
Vue.prototype.$http = axios;

import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "orders",
  metaInfo: {
    title: "Orders",
  },
  components: {
    Datepicker,
  },
  data() {
    return {
      selectedDate: "",
      date1: "",
      date2: "",
      knowDates: "",
      value: "",
      loading: false,
      src: "https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search",
      limit: 5,
      minChars: 3,
      zipCode: "",
      cars: [],
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
      selectedPrice: 0,
      quoteId: 0,
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
      dismissSecs: 5,
      dismissCountDown: 0,
      yearDismissCountDown: 0,  
      makeDismissCountDown: 0,  
      modelDismissCountDown: 0,  
      dZipDismissCountDown: 0,  
      zipDismissCountDown: 0,  
      makeDismissSecs: 0,
      modelDismissSecs: 0,
    };
  },
  computed: {
    ...mapGetters({user: "getUser"}),
    totalPrice() {
      var vm = this;
      var total = 0;
      _.each(vm.cars, car => total+= car.price) 
      return total;
    },
    totalMargin() {
      var vm = this;
      var total = 0;
      _.each(vm.cars, car => {
        //console.log(car)
        if (Number(car.margin)) {
          total+= Number(car.margin)
        }
      }) 
      return total;
    },
    total() {
      var vm = this;
      var total = 0;
      _.each(vm.cars, car => {
        if (car.margin){
          total+= Number(car.margin)
        }
        if (car.price) {
          total+= Number(car.price)
        }
      }) 
      return total;
    },
  },
  mounted() {
    var vm = this

    var data = {}
    data.id = vm.$route.params.id

    function hasRepeatedLetters(str) {
              var patt = /^([a-z])\1+$/;
              var result = patt.test(str);
              return result;
    };

    function compress (text) {
//        console.log(hasRepeatedLetters(text))
    }

    function howManyRepeated(str){
      const result = [];
      const strArr = str.toLowerCase().split("").sort().join("").match(/(.)\1+/g);
      console.log(strArr)

      
        if (strArr != null) {
          strArr.forEach((elem, index) => {
            //console.log(elem)
            if (true) {
              result.push({'char': elem[0], 'count': elem.length});
            }
            if (elem[0] == ' ') {
              result.push({'char': elem[0], 'count': elem.length, index: index});
            }
            });
        }

      return result
    }

    function compress (data) {
      var finalText = ""
      data.forEach(elem => {
        finalText += String(elem.char) + '' + String(elem.count)
      })
      return finalText
    }

    var test = howManyRepeated("bbbaaacddddee");

    console.log(compress(test))

    //compress("aaaaa")
  },
  created() {
    var vm = this;

    this.$nextTick(() => {
      vm.fetchUser();
    })

    var user = vm.user

    vm.zipCode = vm.user.zip



  },
  methods: {
    ...mapActions(['fetchUser']),
    submitOrder: function () {
      var vm = this;

      var data = {}
      data.dZipCode = vm.deliveryInfo.zip
      data.zipCode = vm.pickupInfo.zip
      data.deliveryInfo = vm.deliveryInfo
      data.pickupInfo = vm.pickupInfo
      data.shipperInfo = vm.shipperInfo
      data.quote = vm.selectedQuote
      data.quoteId = vm.selectedQuote._id
      data.cost = vm.totalPrice
      data.profit = vm.totalMargin

      ////console.log(data)

      if (!data.year || data.year == "" || data.year == null) {
        vm.yearDismissCountDown = 3 
        //console.log(data);
      } 

      if (!data.dZipCode || data.dZipCode == "" || data.dZipCode == undefined) {
        vm.dZipDismissCountDown = 3
        //console.log(data);
      }

      if (!data.zipCode || data.zipCode == "") {
        vm.zipDismissCountDown = 3
        //console.log(data);
      }
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_order/", { data })
        .then((response) => {
          //console.log(response.data);
        });
    },
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
  },
};
</script>