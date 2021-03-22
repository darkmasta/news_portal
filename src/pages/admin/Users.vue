<template>
<div>
      <b-row>
      <b-col>
        <h3>Admin View/Update User</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset="10">
        <b-btn variant="primary rounded-pill" class="align-self-start new-user-btn" @click="goToNewUser"><span class="fas fa-plus-circle"></span> Yeni Kullanici Ekle</b-btn>
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
                    :hover="hover"
                    :dark="dark"
                    :fixed="fixed"
                    :foot-clone="footClone"
                    :no-border-collapse="noCollapse"
                    :items="usersTableData"
                    :fields="fields"
                    :head-variant="headVariant"
                    :table-variant="tableVariant"
                    @row-selected="rowSelected" ref="myTable" 
                  >
                  </b-table>

                  <b-btn class="p-3 px-5 mt-4" size="lg" variant="warning" 
                            style="float: right; margin-left: 25px;"
                            v-if="selectedUsers.length == 1"
                            @click="goToUser()">Edit Selected User!</b-btn>
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


export default {
  name: "AdminUsers",
  metaInfo: {
    title: "Users",
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
        fields: [{ key: 'Id', sortable: true}, { key: 'Email', sortable: true} , { key: 'Son_Gorulme', sortable: true}, 
                 { key: 'Password', sortable: true}, { key: 'Kullanici_Dili', sortable: true},
                 { key: 'Status', sortable: true}],
        usersTableData: [], 
        originalUsersTableData: [], 
        loading: false,
        editOrigin: false,
        selectedUsers: [],
        limit: 5,
        minChars: 3,
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
    created() {
      var vm = this

       axios.get(process.env.VUE_APP_SERVER_URL + '/users/')
          .then(response => { 
              var data = response.data
              console.log(data)
              vm.users = data
              data.forEach((user) => {
                var tmp_user = {
                  Id: user._id.slice(-4),
                  Status:  user.userRole,
                  Email: user.email,
                  Kullanici_Dili: user.defaultLang,
                  Son_Gorulme: moment(user.lastLogin).fromNow(),
                  Password: user.password
                }
                vm.usersTableData.push(tmp_user)
              })
              vm.originalUsersTableData = vm.usersTableData

          })

    },
    events: {
        click: function(data) {
            console.log(data)
        }
    },
    watch: {
    },
    methods: {
      goToNewUser() {
          this.$router.push({ name: 'AdminUserCreate' })
      },
      goToUser() {
        var vm = this
        var userData = []
        vm.selectedUsers.forEach( selectedUser => {
          vm.users.forEach( user => {
            if (user._id.slice(-4) == selectedUser.Id) {
              userData.push(user)
            }
          })
        })
        if (userData.length == 1) {
          this.$router.push({ name: 'AdminUser', params: { id: userData[0]._id } })
        }
      },
      rowSelected(items) {
        this.selectedUsers = items
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
      filter (value) {
        const val = value.toLowerCase()
        console.log(value)

        // filter our data
        const filtered = this.originalUsersTableData.filter(d => {
          // Concat data
          return Object.keys(d)
            .map(k => String(d[k]))
            .join('|')
            .toLowerCase()
            .indexOf(val) !== -1 || !val
        })
        // update the rows
        this.usersTableData = filtered
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

table > tbody > .table-active > td {
    background-color: #FFD950 !important;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.07), 0px 4px 5px 0px rgba(0, 0, 0, 0.05), 0px 1px 10px 0px rgba(0, 0, 0, 0.03);
    color: #665720;
}

.new-user-btn {
  margin-bottom: 1.5rem;
}

</style>