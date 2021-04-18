<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-1">
          <span class="text-muted font-weight-light">Etkinlikler</span>
        </h4>
      </div>
      <b-col class="offset-10">
          <b-btn variant="primary rounded-pill" class="align-self-start" to="/activities/create"><span class="fas fa-plus-circle"></span> Yeni Aktivite Ekle</b-btn>
      </b-col>
    </div>


    <b-table
      class="table nexus-table mt-2" hover  
                      borderless 
      :items="activitiesTableData"
      :fields="tableFields">
      <template #cell(activityImage)="data" >
          <img class="post-table-image" :src="data.value" with="75" height="75" @click="previewImage(data.value)" />
      </template>
      <template #cell(details)="data" class="activities-table-buttons">
        <span title="Red" class="fa fa-ban" 
            v-if="data.item.status == 'Onaylandi'" @click="unconfirmActivity(data)"></span>
        <span title="Onay" class="fa fa-check mr-2 text-primary"
            v-if="data.item.status == 'Onay Bekliyor'" @click="confirmActivity(data)"></span>
        <span title="Edit Post" class="far fa-edit mr-2 text-primary" @click="goToActivity(data)"></span>
        <span title="Delete Post" class="fas fa-times text-danger" @click="deleteActivity(data)"></span>
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
import moment from 'moment';
moment.locale('tr')

export default {
  name: "activities",
  metaInfo: {
    title: "Activities",
  },
  data: () => ({
    tableFields: [
      {
        key: "activityImage",
        label: "Etkinlik Resmi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "Baslik",
        label: 'Etkinlik Adi',
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
        key: "activityType",
        label: "Etkinlik Türü",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "startDate",
        label: "Baslangic Tarihi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "endDate",
        label: "Bitis Tarihi",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
      {
        key: "status",
        label: "Etkinlik Durumu",
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
    activities: [],
    activitiesTableData: [],
    originalActivitiesTableData: [],
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false,
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false,
  }),
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
                status: (activity.status == 'confirmed') ? 'Onaylandi' : 'Onay Bekliyor',
                owner: activity.owner,
                position: activity.activityPosition,
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
  computed: {
  },
  methods: {
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
    deleteActivity(data) {
      console.log(data)
    },
    previewImage(imgName) {
      var vm = this
      vm.previewToggle = !vm.previewToggle

      if (vm.previewImageUrl) vm.previewImageUrl = null
      vm.previewImageUrl = imgName
      vm.previewImageName = imgName.split('/').pop()
    },
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