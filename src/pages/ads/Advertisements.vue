<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-1">
          <span class="text-muted font-weight-light">Reklamlar</span>
        </h4>
      </div>
      <b-col class="offset-10">
          <b-btn variant="primary rounded-pill" class="align-self-start" to="/ads/create"><span class="fas fa-plus-circle"></span> Yeni Reklam Ekle</b-btn>
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
          :items="adsTableData"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="tableFields">
        <template #cell(adImage)="data" >
            <img class="post-table-image" :src="data.value" with="75" height="75" @click="previewImage(data.value)" />
        </template>
        <template #cell(details)="data" class="activities-table-buttons">
          <span title="Red" class="fa fa-ban" 
              v-if="data.item.status == 'Onaylandi'" @click="unconfirmAd(data)"></span>
          <span title="Onay" class="fa fa-check mr-2 text-primary"
              v-if="data.item.status == 'Onay Bekliyor'" @click="confirmAd(data)"></span>
          <span title="Edit Reklam" class="far fa-edit mr-2 text-primary" @click="goToAd(data)"></span>
          <span title="Delete Reklam" class="fas fa-times text-danger" @click="deleteAd(data)"></span>
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
import moment from 'moment';
moment.locale('tr')

export default {
  name: "ads",
  metaInfo: {
    title: "Ads",
  },
  components: {
  },
  data: () => ({
    tableFields: [
      {
        key: "adImage",
        label: "Reklam Görseli",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "Baslik",
        label: 'Reklam Adı',
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "owner",
        label: "Ekleyen",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "link",
        label: "Reklam Linki",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "views",
        label: "Görüntülenme",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "adType",
        label: "Reklam Grubu",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "position",
        label: "Reklam Konumu",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "status",
        label: "Reklam Durumu",
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
    ads: [],
    adsTableData: [],
    originalAdsTableData: [],
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false,

    // pagination
    perPage: 10,
    currentPage: 1,
  }),
  created() {
    var vm = this

    axios.head(process.env.VUE_APP_SERVER_URL + "/get_ads/")
      .catch(function(error) {
        if (!error.response) {
          // Display my warning message
          alert("AdBlock Tespit Edildi")
          vm.$notify({
              type: 'warn',
              text: 'Bu sayfanın düzgün çalışması için AdBlock\'u devre dışı bırakmalısınız',
              duration: 5000
          });

        }
      })
      
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_ads/", {})
      .then((response) => {
        console.log(response.data);
        vm.ads= response.data
            vm.ads.forEach(ad=> {
              var tmp_ad= {
                owner: ad.owner,
                position: ad.adPosition || '---',
                status: (ad.status == 'unconfirmed') ? 'Onay Bekliyor' : 'Onaylandi',
                adType: ad.adType,
                views: ad.views,
                link: ad.link,
                adImage: process.env.VUE_APP_SERVER_URL + '/images/' + ad.adImage,
                Baslik: ad.adTitle || ad.adName,
                details: ad._id
              }
              vm.adsTableData.push(tmp_ad)
            })
            vm.originalAdsTableData = vm.adsTableData
      })


  },
  computed: {
    totalItems () {
      return this.adsTableData.length
    },
    totalPages () {
      return Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
    },
  },
methods: {
  goToAd(data) {
     this.$router.push({ name: 'Ad', params: { id: data.value } })
  },
  confirmAd(id) {
    var vm = this
    let data = {id: id.value}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/confirm_ad/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'success',
                text: 'Reklam Onaylandi!'
            });
            vm.adsTableData[id.index].status = 'Onaylandi'
        }
      });
  },
  unconfirmAd(id) {
    var vm = this
    let data = {id: id.value}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/unconfirm_ad/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'error',
                text: 'Reklam Reddedildi!'
            });
            vm.adsTableData[id.index].status = 'Onay Bekliyor'
        }
      });
  },
  deleteAd(id) {
    var vm = this
    let data = {id: id.value}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/delete_ad/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'error',
                text: 'Reklam Silindi!'
            });
            vm.adsTableData.splice(id.index, 1)
        }
      });
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
    console.log(value)

    // filter our data
    const filtered = this.originalAdsTableData.filter(d => {
      // Concat data
      return Object.keys(d)
        .map(k => String(d[k]))
        .join('|')
        .toLowerCase()
        .indexOf(val) !== -1 || !val
    })
    // update the rows
    this.adsTableData = filtered
  } 
  },
};
</script>

<style>

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

.post-table-image {
  width: 75px;
  height: 75px;
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

.activities-table-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>