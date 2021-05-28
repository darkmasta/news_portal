<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-1">
          <span class="text-muted font-weight-light">Etiketler</span>
        </h4>
      </div>
      <b-col class="offset-10">
          <b-btn variant="primary rounded-pill" class="align-self-start" to="/tags/create"><span class="fas fa-plus-circle"></span> Yeni Etiket Ekle</b-btn>
      </b-col>
    </div>

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
        :items="tagsTableData"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="tableFields">
        <template #cell(details)="data" class="activities-table-buttons">
          <span title="Edit Tag" class="far fa-edit mr-2 text-primary" @click="goToTag(data)"></span>
          <span title="Delete Tag" class="fas fa-times text-danger" @click="deleteTag(data)"></span>
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

</div>
</template>
<script>
import axios from "axios";
import moment from 'moment';
moment.locale('tr')

export default {
  name: "tags",
  metaInfo: {
    title: "Tags",
  },
  data: () => ({
    tableFields: [
      {
        key: "order",
        label: "Etiket Sirasi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "tag",
        label: 'Etiket İsmi',
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "date",
        label: "Eklenme Tarihi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "total",
        label: "Toplam Kullanim",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "details",
        label: 'İşlemler',
        sortable: "true",
        class: "text-center align-middle",
      }
    ],
    tags: [],
    tagsTableData: [],
    originalTagsTableData: [],

    // pagination
    perPageOptions: [2, 4, 6, 8, 10],
    perPage: 25,
    currentPage: 1,
  }),
  computed: {
    totalItems() {
      return this.tagsTableData.length;
    },
    totalPages () {
      return Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
    },
  },
  created() {
    var vm = this
      
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_tags/", {})
      .then((response) => {
        console.log(response.data);
        vm.tags = response.data
            vm.tags.forEach((tag,index)  => {
              var tmp_tag = {
                order: index + 1,
                tag: tag.tagName,
                date: moment(tag.date).format('DD/MM/YYYY, h:mm:ss a'),
                details: tag._id,
                total: tag.uses
              }
              vm.tagsTableData.push(tmp_tag)
            })
            vm.originalTagsTableData = vm.tagsTableData
      });

  },
  methods: {
    goToTag(data) {
      console.log(data)
      this.$router.push({ name: 'Tag', params: { id: data.value } })
    },
    deleteTag(id) {
      var vm = this
      let data = {id: id.value}
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/delete_tag/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
              vm.$notify({
                  type: 'error',
                  text: 'Etiket Silindi!'
              });
              vm.tagsTableData.splice(id.index, 1)
          }
        });
    },
    filter (value) {
      const val = value.toLowerCase()
      console.log(value)

      // filter our data
      const filtered = this.originalActivitiesTableData.filter(d => {
        // Concat data
        return Object.keys(d)
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      })
      // update the rows
      this.activitiesTableData = filtered
    } 
  },
};
</script>

<style></style>