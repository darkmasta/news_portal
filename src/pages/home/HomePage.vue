<template>
<div>
    <header>
        <div class="logo">
            <img :src="require('@/assets/images/logo.png')" /> 
        </div> 
        <ul>
            <li>Savunma Sanayi</li>
            <li>Savunma Sanayi</li>
            <li>Savunma Sanayi</li>
            <li>Savunma Sanayi</li>
            <li>Savunma Sanayi</li>
            <li>Savunma Sanayi</li>
            <li>Savunma Sanayi</li>
        </ul>
    </header>

    <div class="activities_center">
        <activity :activity="activity" v-for="activity in activities" />
    </div>






</div>
</template>
<script>
import axios from "axios";
import Activity from '../activities/Activity.vue';


export default {
  name: "home-page",
  metaInfo: {
    title: "Home Page",
  },
  components: {
    Activity
  },
  data: () => ({
      activities: [],
  }),
  created() {
    var vm = this;


    axios
        .post(process.env.VUE_APP_SERVER_URL + "/get_activities/", {})
        .then((response) => {
            console.log(response.data);
            vm.activities = response.data
            vm.activities.forEach( activity => {
                activity.activityImage = process.env.VUE_APP_SERVER_URL + '/images/' + activity.activityImage;
            })
        })

  },
  methods: {
  }
};
</script>
<style>
header {
    display: flex;
    justify-content: center;
    background: #28a745;
}

.logo {
}

.logo img {
    width: 200px;
    height: auto;
}

ul li {
    display: inline-block;
    color: white;
    padding: .15rem 0.5rem !important;
    font-size: medium !important;
    border: 3px solid #777 !important;
    margin: 2px !important;
}

ul li:hover {
    background: coral;
}

.activities_center {
    width: 100vw;
    height: 15vh;
    display: flex;
    justify-content: center;
    margin: 20px;
    flex-wrap: wrap;
    align-items: center;
}

.activity_item{
    background: coral;
    border: 5px solid black;
    flex: 0 0 calc(20% - 2rem);
    height: 100%;
    margin: 20px;
}



</style>