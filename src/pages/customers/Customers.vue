<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Customers</h4>
          <span>Hello chris, welcome back!</span>
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/customers/create"><span class="fas fa-plus-circle"></span> Create User</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table class="table nexus-table" hover select-mode="multi" :items="jsonData" :fields="tableFields" borderless selectable :current-page="1" :per-page="10" @row-selected="onRowSelected">
          <template #head(selected)>
            <b-form-checkbox class="ml-2 mt-2">All</b-form-checkbox>
          </template>
          <template #cell(selected)="data">
            <b-form-checkbox v-model="data.rowSelected" :value="data.item.rowSelected" class="ml-2 mt-2"></b-form-checkbox>
          </template>
          <template #cell(details)>
            <i class="fas fa-eye table-details"></i>
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

import "vue-search-select/dist/VueSearchSelect.css";
export default {
  name: "orders",
  metaInfo: {
    title: "Orders",
  },
  data: () => ({
    jsonData: [
      {
        id: "3619662-OH",
        full_name: "Mehmet Özsoy",
        email: "mehmetozsoy1988@gmail.com"
      },
      {
        id: "3619663-OH",
        full_name: "27 Feb, 2020",
        email: "mehmetozsoy1988@gmail.com"
      },
      {
        id: "3619664-OH",
        full_name: "27 Feb, 2020",
        email: "mehmetozsoy1988@gmail.com"
      },
      {
        id: "3619665-OH",
        full_name: "27 Feb, 2020",
        email: "mehmetozsoy1988@gmail.com"
      },
      {
        id: "3619666-OH",
        full_name: "27 Feb, 2020",
        email: "mehmetozsoy1988@gmail.com"
      },
      {
        id: "3619667-OH",
        full_name: "27 Feb, 2020",
        email: "mehmetozsoy1988@gmail.com"
      },
      {
        id: "3619668-OH",
        full_name: "27 Feb, 2020",
        email: "mehmetozsoy1988@gmail.com"
      },
    ],
    tableFields: [
      {
        key: "selected",
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
        key: "full_name",
        label: "Full Name",
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
        class: "text-center align-middle",
      }
    ],
    originalJsonData: [],
    selectedRows: [],

    // Pagination
    perPageOptions: [10, 20, 30, 40, 50],
    perPage: 10,
    currentPage: 1,
  }),
  computed: {
    totalItems() {
      return this.jsonData.length;
    },
    totalPages() {
      return (
        Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
      );
    },
  },
  methods: {
    onRowSelected(data) {
      this.selectedRows = data;
      console.log(data);
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
