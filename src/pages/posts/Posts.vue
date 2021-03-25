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
      <template #cell(postImage)="data" >
          <img :src="data.value" with="75" height="75" @click="previewImage(data.value)" />
      </template>
  </b-table>

<div v-show="previewToggle" class="preview-container" @click="previewToggle = false;">
  <span class="close">&times;</span>

  <div id="preview">
    <img  :src="previewImageUrl" @click="previewToggle = false"/>
  </div>

  <div class="caption">
    {{previewImageName}} 
  </div>
</div>

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
    postsTableData: [],
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false
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
                postImage: process.env.VUE_APP_SERVER_URL + '/images/' + post.postImage,
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
    previewImage(imgName) {
      var vm = this
      vm.previewToggle = !vm.previewToggle

      if (vm.previewImageUrl) vm.previewImageUrl = null
        vm.previewImageUrl = imgName
        vm.previewImageName = imgName.split('/').pop()
    }
  },
};
</script>

<style scoped>
.preview-container {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  width: 100vw;
  height: 100vh;
}

#preview {
  position:relative;
  top: 50%;
  left: 50%;
  height: 100%;
  animation-name: zoom;
  animation-duration: 0.8s;
}

@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}

#preview img {
  transform: translate(-50%, -50%);
}

.caption {
  position: relative;
  top: -10%;
  left: 25%;
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  animation-name: zoom;
  animation-duration: 0.8s;
}

</style>