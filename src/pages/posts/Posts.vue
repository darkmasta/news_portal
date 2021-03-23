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

  <b-table
      class="table nexus-table" hover select-mode="multi" 
                      borderless selectable  
      :items="postsTableData"
      :fields="tableFields">
      <template #cell(postImage)="data">
          <img :src="data.value" with="75" height="75" />
      </template>
  </b-table>
  </div>
</template>
<script>
import axios from "axios";
import moment from 'moment'


import "vue-search-select/dist/VueSearchSelect.css";
export default {
  name: "orders",
  metaInfo: {
    title: "Orders",
  },
  data: () => ({
    tableFields: [
      {
        key: "id",
        label: "ID",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "postImage",
        label: "Haber Resmi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "Baslik",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "date",
        label: "Date",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "details",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      }
    ],
    posts: [],
    postsTableData: []
  }),
  created() {
    var vm = this
    
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_posts/", {})
      .then((response) => {
        console.log(response.data);
        vm.posts = response.data
            vm.posts.forEach(post => {
              var tmp_post = {
                id: post._id.slice(-4),
                date: moment(post.date).fromNow(),
                status: 'active',
                postImage: 'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg',
                Baslik: post.postTitle
              }
              vm.postsTableData.push(tmp_post)
            })
            vm.originalPostsTableData = vm.postsTableData
      });
    

  },
  computed: {

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
