<template>
  <div class="dashboard">
    <b-row>
      <b-col cols="9">
        <b-col class="d-flex justify-content-between ">
          <div class="page-header">
            <h4>Dashboard</h4>
            <span>Hello {{user.firstName}}, welcome back!</span>
          </div>
          <div>
            <b-btn variant="secondary rounded-pill" class="align-self-start mr-2"><i class="fas fa-truck"></i></b-btn>
            <b-btn variant="secondary rounded-pill" class="align-self-start"><i class="fas fa-bars mr-2"></i> Customize</b-btn>
          </div>
        </b-col>
        <b-row>
          <b-col>
            <b-card no-body class="transaction-summary" bg-variant="transparent">
              <b-row no-gutters>
                <b-col>
                  <b-dd variant="transparent" text="Ay" size="sm" class="float-right">
                    <b-dd-item>Gun</b-dd-item>
                    <b-dd-item>Hafta</b-dd-item>
                    <b-dd-item>Something else here</b-dd-item>
                    <b-dd-divider />
                    <b-dd-item>Separated link</b-dd-item>
                  </b-dd>
                </b-col>
              </b-row>
              <b-row align-v="center" no-gutters>
                <b-col cols="1">
                  <span class="number-summary">3.k</span>
                </b-col>
                <b-col>
                  <b-progress :value="50" :max="150"></b-progress>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col>
                  <span class="summary"><i class="fas fa-eye mr-2"></i> Toplam Goruntulenme</span>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col>
                  <b-dd variant="transparent" text="Ay" size="sm" class="float-right">
                    <b-dd-item>Gun</b-dd-item>
                    <b-dd-item>Hafta</b-dd-item>
                    <b-dd-item>Something else here</b-dd-item>
                    <b-dd-divider />
                    <b-dd-item>Separated link</b-dd-item>
                  </b-dd>
                </b-col>
              </b-row>
              <b-row align-v="center" no-gutters>
                <b-col cols="1">
                  <span class="number-summary">50</span>
                </b-col>
                <b-col>
                  <b-progress :value="50" :max="150"></b-progress>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col>
                  <span class="summary"><i class="fas fa-mouse mr-2"></i> Toplam Tiklanma</span>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Doughnut from "./doughnut.vue";
import LineChart from "./line";
import LineStepChart from "./step-line";
import BarChart from "./bar";
import Bar2Chart from "./bar-2";

import { mapActions, mapGetters } from 'vuex';


export default {
  name: "dashboard",
  metaInfo: {
    title: "Dashboad",
  },
  components: {
    Doughnut,
    LineChart,
    BarChart,
    Bar2Chart,
    LineStepChart,
  },
  data: () => ({
    jsonData: [
      {
        id: "3619662-OH",
        name: "Order 1",
        date: "27 Feb, 2020",
        time: "11:00",
        price: "$2500",
        status: "",
      },
      {
        id: "3619662-OH",
        name: "Order 2",
        date: "27 Feb, 2020",
        time: "11:00",
        price: "$2500",
        status: "",
      },
      {
        id: "3619662-OH",
        name: "Order 3",
        date: "27 Feb, 2020",
        time: "11:00",
        price: "$2500",
        status: "",
      },
    ],
    tableFields: [
      {
        key: "name",
        label: "Name",
        sortable: true,
        sortDirection: "desc",
        class: "text-left align-middle",
      },
      {
        key: "date",
        label: "Date",
        sortable: true,
        sortDirection: "desc",
        class: "text-left align-middle",
      },
      {
        key: "time",
        label: "Time",
        sortable: true,
        sortDirection: "desc",
        class: "text-left align-middle",
      },
      {
        key: "price",
        label: "Price",
        sortable: true,
        sortDirection: "desc",
        class: "text-left align-middle",
      },
      {
        key: "status",
        label: "Status",
        class: "text-center align-middle",
      },
    ],
  }),
  created() {
    var vm = this
       
    this.$nextTick(() => {
      vm.fetchUser();
    })

    // console.log(vm.user) // it's ready in component scope
  },
  mounted() {
    const charts = this.$children.filter((component) =>
      /^vue-chartjs-/.test(component.$options._componentTag)
    );

    const resizeCharts = () =>
      charts.forEach((chart) => {
        chart._data._chart.resize();
      });

    // Initial resize
    resizeCharts();

    // For performance reasons resize charts on delayed resize event
    this.layoutHelpers.on("resize.charts-demo", resizeCharts);
  },
  beforeDestroy() {
    this.layoutHelpers.off("resize.charts-demo");
  },
  methods: {
    ...mapActions(['fetchUser']),

  },
  computed: {
    ...mapGetters({quotes: "allQuotes", user: "getUser"}),

  }
}
</script>
