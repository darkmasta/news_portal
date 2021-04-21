<template>
<div>
      <b-row>
      <b-col>
        <h3>Kullanıcı Listesi</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset="10">
        <b-btn variant="primary rounded-pill" class="align-self-start new-user-btn" @click="goToNewUser"><span class="fas fa-plus-circle"></span> Yeni Kullanıcı Ekle</b-btn>
      </b-col>
    </b-row>
  <b-row>
    <b-col>
      <b-card class="mt-2" no-body>
        <b-card-body>
          <b-row>
            <b-col>
              <b-form-group>
                <b-input size="sm"  placeholder="Search..." class="d-inline-block w-auto float-sm-right" @input="filter($event)" />
              </b-form-group>
            </b-col>
          </b-row>

        <b-table
          class="table nexus-table mt-2" hover  
                          borderless 
                          ref="myTable"
          :items="usersTableData"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields">
          <template #cell(details)="data" class="activities-table-buttons">
            <span title="View User" class="far fa-user mr-2 text-primary" @click="goToUser(data)"></span>
            <span title="Edit User" class="far fa-edit mr-2 text-primary" @click="goToUserWithEdit(data)"></span>
            <span title="Delete User" class="fas fa-times text-danger" @click="deleteUser(data)"></span>
          </template>
        </b-table>

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
moment.locale('tr')


export default {
name: "AdminUsers",
metaInfo: {
  title: "Users",
},
data: () => ({
  value: "",
  fields: [ 
    {
      key: "order",
      label: "Kullanıcı Sırası",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: "name",
      label: 'İsim Soyisim',
      sortable: "true",
      class: "text-center align-middle",
    },
    {
      key: 'Email', 
      label: 'E-posta Adresi',
      sortable: true
    } ,
    {
      key: "userRole",
      label: "Kullanıcı Rolü",
      sortable: true,
      sortDirection: "desc",
      class: "text-center align-middle",
    },
    {
      key: 'Son_Gorulme',
      sortable: true, 
      label: 'Son Aktif Olma Zamanı'
    }, 
    {
      key: 'Kullanici_Dili',
      label: 'Kullanıcı Dili', 
      sortable: true
    },
    {
      key: "details",
      label: 'İşlemler',
      sortable: "true",
      class: "text-center align-middle",
    },
  ],
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
  noCollapse: false,

  // pagination
  perPageOptions: [2, 4, 6, 8, 10],
  perPage: 2,
  currentPage: 1,
}), 
created() {
  var vm = this

    axios.get(process.env.VUE_APP_SERVER_URL + '/users/')
      .then(response => { 
          var data = response.data
          console.log(data)
          vm.users = data
          data.forEach((user, index) => {
            var tmp_user = {
              order: index + 1,
              name: user.firstName + ' ' + user.lastName,
              userRole:  user.userRole,
              Email: user.email,
              Kullanici_Dili: user.defaultLang,
              Son_Gorulme: moment(user.lastLogin).format('DD/MM/YYYY, h:mm:ss a'),
              details: user._id
            }
            vm.usersTableData.push(tmp_user)
          })
          vm.originalUsersTableData = vm.usersTableData

      })

},
methods: {
  goToNewUser() {
      this.$router.push({ name: 'AdminUserCreate' })
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
  goToUser(data) {
    console.log(data)
    this.$router.push({ name: 'AdminUser', params: { id: data.item.details} })
  },
  goToUserWithEdit(data) {
    console.log(data)
    data.item.details += '~'
    data.item.details += 'edit'
    this.$router.push({ name: 'AdminUser', params: { id: data.item.details} })
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
    return this.usersTableData.length
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