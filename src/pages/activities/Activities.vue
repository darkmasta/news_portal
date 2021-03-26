<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-1">
          <span class="text-muted font-weight-light">Activities</span>
        </h4>
      </div>
      <b-col class="offset-10">
          <b-btn variant="primary rounded-pill" class="align-self-start" to="/activities/create"><span class="fas fa-plus-circle"></span> Yeni Aktivite Ekle</b-btn>
      </b-col>
    </div>

    <b-table
      class="table nexus-table mt-2" hover select-mode="multi" 
                      borderless selectable  
      :items="activitiesTableData"
      :fields="tableFields">
      <template #cell(activityImage)="data" >
          <img :src="data.value" with="75" height="75" @click="previewImage(data.value)" />
      </template>
    </b-table>

  </div>
</template>
<script>
import axios from "axios";
import moment from 'moment';

export default {
  name: "payments",
  metaInfo: {
    title: "Payments",
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
        key: "activityImage",
        label: "Etkinlik Resmi",
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
        key: "position",
        label: "Pozisyon",
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
        label: "Status",
        sortable: true,
        sortDirection: "desc",
        class: "text-center align-middle",
      },
    ],
    activities: [],
    activitiesTableData: [],
    originalActivitiesTableData: [],
    previewImageUrl: null,
    previewImageName: '',
    previewToggle: false
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
                startDate: moment(activity.startDate).fromNow(),
                endDate: moment(activity.endDate).fromNow(),
                status: 'active',
                position: activity.activityPosition,
                activityImage: process.env.VUE_APP_SERVER_URL + '/images/' + activity.activityImage,
                Baslik: activity.activityTitle
              }
              vm.activitiesTableData.push(tmp_activity)
            })
            vm.originalActivitiesTableData = vm.activitiesTableData
      });

  },
  computed: {

  },
  methods: {},
};
</script>