<template>
<div>
  <b-row>
    <b-col class="d-flex justify-content-between ">
      <div class="page-header">
        <h4>Haber Listesi</h4>
      </div>
      <b-btn variant="primary rounded-pill" class="align-self-start" to="/posts/create"><span class="fas fa-plus-circle"></span> Create Post</b-btn>
    </b-col>
  </b-row>

  <div class="row">
    <div class="col">
      <b-form-group>
        <b-input size="sm"  placeholder="Search..." class="d-inline-block w-auto float-sm-right" @input="filter($event)" />
      </b-form-group>
    </div>
  </div>

  <b-table
      class="table nexus-table" hover select-mode="multi" 
      borderless selectable  
      @row-selected="rowSelected" ref="myTable" 
      :items="postsTableData"
      :fields="tableFields">
      <template #cell(postImage)="data" >
          <img  class="post-table-image" :src="data.value" with="75" height="75" @click="previewImage(data.value)" />
      </template>
      <template #cell(details)="data">
        <span title="Publish" class="fas fa-broadcast-tower" 
            v-if="data.item.status == 'Taslak'" @click="goToPostLink(data)"></span>
        <span title="Draft" class="fab fa-firstdraft mr-2 text-primary"
            v-if="data.item.status == 'Aktif'" @click="goToPostLink(data)"></span>
        <span title="Edit Post" class="far fa-edit mr-2 text-primary" @click="goToPost(data)"></span>
        <span title="Delete Post" class="fas fa-times text-danger" @click="deletePost(data)"></span>
      </template>
  </b-table>


<div v-show="previewToggle" class="preview-container" @click="previewToggle = false;">
  <span class="close">&times;</span>

  <div id="preview">
    <img :src="previewImageUrl" @click="previewToggle = false"/>
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
moment.locale('tr')

import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "Posts",
  metaInfo: {
    title: "Posts",
  },
  data: () => ({
    tableFields: [
      {
        key: "order",
        label: "Haber Sirasi",
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
        label: 'Başlık',
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
        key: "owner",
        label: "Ekleyen Kişi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "views",
        label: "Okunma Sayısı",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "language",
        label: 'Haber Dilleri',
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "status",
        label: "Durumu",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "details",
        label: 'İşlemler',
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
    ],
    posts: [],
    postsTableData: [],
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false,
    selectedRows: []
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
                date: moment(post.date).format('DD/MM/YYYY, h:mm:ss a'),
                status: post.isDraft ? 'Taslak' : 'Aktif',
                postImage: process.env.VUE_APP_SERVER_URL + '/images/' + post.postImage,
                Baslik: post.postTitle,
                details: post._id,
                order: post.postOrder || '---',
                owner: post.owner || '---',
                views: '' + post.views || '---',
                language:  String(post?.postLanguage).slice(-4) || '---'
              }
              vm.postsTableData.push(tmp_post)
            })
            vm.originalPostsTableData = vm.postsTableData
      });
    

  },
  computed: {

  },
  methods: {
    rowSelected(data) {
      this.selectedRows = data;
      console.log(data);
    },
    goToPost() {
      var vm = this
      var postData = []
      vm.selectedRows.forEach( selectedPost => {
        console.log(selectedPost)
          vm.posts.forEach( post => {
          if (post._id.slice(-4) == selectedPost.id) {
              postData.push(post)
          }
          })
      })
      if (postData.length == 1) {
          console.log(postData)
          this.$router.push({ name: 'Posts Edit', params: { id: postData[0]._id } })
      }
    },
    deletePost(post) {
      if (confirm('Kullanici Siliniyor. Emin Misiniz?')) {
        var vm = this
        let data = {}
        data.id = post.value
        axios.post(process.env.VUE_APP_SERVER_URL + "/delete_post", {data})
            .then((response) => {
              console.log(response.data)
              if (response.data == 'success') {
                  vm.$notify({
                      type: 'success',
                      text: 'Haber Basariyle Silindi!'
                  });
              }
            })
      }
    },
    goToPostLink(data) {
      console.log(data)
      // this.$router.push({ name: 'Post', params: { id: data.value } })
      let routeData = this.$router.resolve({ name: 'Post', params: { id: data.value } })
      window.open(routeData.href, '_blank')
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
    previewImage(imgName) {
      var vm = this
      vm.previewToggle = !vm.previewToggle

      if (vm.previewImageUrl) vm.previewImageUrl = null
        vm.previewImageUrl = imgName
        vm.previewImageName = imgName.split('/').pop()
    },
    filter (value) {
      const val = value.toLowerCase()

      // filter our data
      const filtered = this.originalPostsTableData.filter(d => {
        // Concat data
        return Object.keys(d)
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      })
      // update the rows
      this.postsTableData = filtered
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

.post-table-image {
  width: 75px;
  height: 75px;
}

</style>