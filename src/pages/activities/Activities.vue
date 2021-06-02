<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-1">
          <span class="text-muted font-weight-light">{{ $t('activities.activities') }}</span>
        </h4>
      </div>
      <b-col class="offset-10">
          <b-btn variant="primary rounded-pill" class="align-self-start" to="/activities/create"><span class="fas fa-plus-circle"></span> {{ $t('activities.create activity') }}</b-btn>
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
        :items="activitiesTableData"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="tableFields">
        <template #cell(activityImage)="data" >
            <img class="post-table-image" :src="data.value" with="75" height="75" @click="previewImage(data.value)" />
        </template>
        <template #cell(details)="data" class="activities-table-buttons">
        <span v-if="data.item.visible == $i18n.t('main.not visible')" title="Göster" 
            class="fas fa-broadcast-tower" @click="makeVisible(data)"></span>
        <span v-if="data.item.visible == $i18n.t('main.visible')" title="Gösterme"
            class="fab fa-firstdraft mr-2 text-primary" @click="makeInvisible(data)"></span>
          <span v-if="data.item.status == $i18n.t('main.confirmed')" title="Red" 
              class="fa fa-ban" @click="unconfirmActivity(data)"></span>
          <span v-if="data.item.status == $i18n.t('main.unconfirmed')" title="Onay"
              class="fa fa-check mr-2 text-primary" @click="confirmActivity(data)"></span>
          <span title="Edit Post" class="far fa-edit mr-2 text-primary" @click="goToActivity(data)"></span>
          <span title="Delete Post" class="fas fa-times text-danger" @click="deleteActivity(data)"></span>
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
  name: "activities",
  metaInfo: {
    title: "Activities",
  },
  data: () => ({
    activities: [],
    activitiesTableData: [],
    originalActivitiesTableData: [],
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false,
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false,

    // pagination
    perPageOptions: [2, 4, 6, 8, 10],
    perPage: 10,
    currentPage: 1,
  }),
  computed: {
    tableFields() { 
      return [
      {
        key: "activityImage",
        label: this.translateCol('activity image'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "Baslik",
        label: this.translateCol('activity name'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "owner",
        label: this.translateCol('creator'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "activityType",
        label: this.translateCol('activity category'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "startDate",
        label: this.translateCol('start date'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "endDate",
        label: this.translateCol('end date'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "status",
        label: this.translateCol('activity status'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "visible",
        label: this.translateCol('ad field'),
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "details",
        label: this.translateCol('details'),
        sortable: "true",
        class: "text-center align-middle",
      }
    ]
    },
    totalItems() {
      return this.activitiesTableData.length;
    },
    totalPages () {
      return Math.floor(this.totalItems / this.perPage) || (this.totalItems ? 1 : 0)
    },
  },
  created() {
    var vm = this
      
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_activities/", {})
      .then((response) => {
        console.log(response.data);
        vm.activities = response.data
            vm.activities.forEach(activity=> {
              var tmp_activity = {
                id: activity._id.slice(-4),
                startDate: moment(activity.startDate).format('DD/MM/YYYY, h:mm:ss a'),
                endDate: moment(activity.endDate).format('DD/MM/YYYY, h:mm:ss a'),
                status: (activity.status == 'confirmed') ? vm.$i18n.t('main.confirmed') : vm.$i18n.t('main.unconfirmed'),
                owner: activity.owner,
                position: activity.activityPosition,
                visible: activity.visible ? vm.$i18n.t('main.visible') : vm.$i18n.t('main.not visible'),
                activityType: activity.activityType,
                activityImage: process.env.VUE_APP_SERVER_URL + '/images/' + activity.activityImage,
                Baslik: activity.activityTitle,
                details: activity._id
              }
              vm.activitiesTableData.push(tmp_activity)
            })
            vm.originalActivitiesTableData = vm.activitiesTableData
      });

  },
  methods: {
    translateCol (colName) {
      return this.$i18n.t('activities.' + colName)
    },
    goToActivity(data) {
      this.$router.push({ name: 'Activity', params: { id: data.value } })
    },
    confirmActivity(id) {
      var vm = this
      let data = {id: id.value}
      console.log(data)
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/confirm_activity/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
            vm.$notify({
                type: 'success',
                text: 'Etkinlik Onaylandi!'
            });
            setTimeout(() => { location.reload(); }, 1600);
          }
        });
    },
    unconfirmActivity(id) {
      var vm = this
      let data = {id: id.value}
      console.log(data)
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/unconfirm_activity/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
            vm.$notify({
                type: 'error',
                text: 'Etkinlik Reddedildi!'
            });
            setTimeout(() => { location.reload(); }, 1600);
          }
        });
    },
    makeVisible(id) {
      var vm = this
      let data = {id: id.value}
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/activity_visible/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Etkinlik Gösteriliyor!'
              });
              vm.activitiesTableData[id.index].visible = 'Gösteriliyor'
          }
        });
    },
    makeInvisible(id) {
      var vm = this
      let data = {id: id.value}
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/activity_invisible/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
              vm.$notify({
                  type: 'error',
                  text: 'Etkinlik Gösterilmiyor!'
              });
              vm.activitiesTableData[id.index].visible = 'Gösterilmiyor'
          }
        });

    },
    deleteActivity(id) {
      var vm = this
      let data = {id: id.value}
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/delete_activity/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
              vm.$notify({
                  type: 'error',
                  text: 'Etkinlik Silindi!'
              });
              vm.activitiesTableData.splice(id.index, 1)
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