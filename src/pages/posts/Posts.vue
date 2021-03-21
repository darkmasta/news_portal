<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Posts</h4>
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/posts/create"><span class="fas fa-plus-circle"></span> Create Post</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>

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
