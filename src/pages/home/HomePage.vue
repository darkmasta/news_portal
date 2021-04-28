<template>
<div class="main_container">
    <header>
        <div class="logo">
          <router-link to="/"> <img :src="require('@/assets/images/logo.png')" /> </router-link>
        </div> 

        <div class="search">
            <input /> 
            <i class="fa fa-search icon"></i>
        </div>

        <div class="select_container">
            <b-select v-model="language" class="language_box">
                <option v-for="(language, index) in languages" 
                    :key="index" v-bind:value="language"> 
                    {{language}}
                </option>
            </b-select>
            <i class="fas fa-sort-down icon"></i>
        </div>
    </header>

    <div class="news_texts">
        <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!</li>
        </ul>
    </div> 

    <div class="categories_box">
        <ul>
            <li>Savunma Sanayi</li>
            <li>Siber Guvenlik</li>
            <li>Uzay</li>
            <li>Nukleer</li>
            <li>Yapay Zeka</li>
            <li>Teknoloji</li>
            <li>Catisma Bolgeleri</li>
            <li>Sivil Havacilik</li>
            <li>Tarih</li>
            <li>Diger <span><i class="fas fa-sort-down icon"></i></span></li>
        </ul>
    </div> 


    <b-row class="top_activities_container">
        <b-col cols="4" class="top_activity_item"
         v-for="(ad, index) in ads.slice(0,3)" :key="index"
         @click="incrementClick(ad)">
            <img :src="ad.adImage"> 
            <h3 class="ad-title">{{ad.adName}}</h3>
        </b-col>
    </b-row>

    <b-row class="top_slider_container">
        <b-col cols="7" class="top_slider">
            <div>SLIDER</div>
        </b-col>
        <b-col class="top_slider_right_box">
            <b-row class="test_box">
                <b-col  class="slider_right_single_item">
                    <img :src="activities[0].activityImage">
                    <h4>{{activities[0].activityTitle}}</h4>
                </b-col>
                <b-col  class="slider_right_single_item">
                    <img :src="activities[1].activityImage">
                    <h4>{{activities[1].activityTitle}}</h4>
                </b-col>
            </b-row>
            <b-row class="test_box">
                <b-col  class="slider_right_single_item">
                    <img :src="activities[3].activityImage">
                    <h4>{{activities[3].activityTitle}}</h4>
                </b-col>
                <b-col  class="slider_right_single_item">
                </b-col>
            </b-row>
            <b-row class="test_box">
                <b-col cols="12" class="bottom_full_width_ad">
                </b-col>
            </b-row>
        </b-col>
    </b-row>

    <b-row class="top_slider_container">
        <b-col cols="7" class="top_slider">
            <div>SLIDER</div>
        </b-col>
        <b-col class="top_slider_right_box">
            <b-row class="most_views_news">
                <h3>ÇOK OKUNAN HABERLER</h3> 
            </b-row>
            <b-row>
                <b-col class="view_time">
                    <div>Son 24 Saat</div>
                </b-col>
                <b-col class="view_time">
                    <div>Son  7 Gün</div>
                </b-col>
                <b-col class="view_time">
                    <div>Son 30 Gün</div>
                </b-col>
            </b-row>
        </b-col>
    </b-row>


     <b-row class="top_activities_container">
        <b-col cols="4" class="top_activity_item">
            <div>SLIDER</div>
        </b-col>
        <b-col cols="4" class="top_activity_item">
            <div>SLIDER</div>
        </b-col>
        <b-col cols="4" class="top_activity_item">
            <div>SLIDER</div>
        </b-col>
    </b-row>


    <b-row class="mt-5"></b-row>


</div>
</template>
<script>
import axios from "axios";
import Activity from '../activities/ActivityEdit.vue';


export default {
  name: "home-page",
  metaInfo: {
    title: "Home Page",
  },
  components: {
    Activity
  },
  data: () => ({
      languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
      language: 'Turkce 🇹🇷',
      activities: [],
      ads: []
  }),
  created() {
    var vm = this;

    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_ads/", {})
      .then((response) => {
        console.log(response.data);
        vm.ads = response.data
        vm.ads.forEach(ad => {
            ad.adImage = process.env.VUE_APP_SERVER_URL + '/images/'  + ad.adImage
        })
      })

    axios
        .post(process.env.VUE_APP_SERVER_URL + "/get_activities/", {})
        .then((response) => {
            console.log(response.data);
            vm.activities = response.data
            vm.activities.forEach( activity => {
                activity.activityImage = process.env.VUE_APP_SERVER_URL + '/images/' + activity.activityImage;
                axios.get(activity.activityImage)
                     .then((response) => {
                        //  console.log(response.data)
                     })
                     .catch((error) => {
                         if(error)
                        //  console.log(activity.activityImage.split('/').pop())
                         activity.activityImage = 'https://defensehere.herokuapp.com/images/' + 
                                                        activity.activityImage.split('/').pop()
                     }) 
            })
        })

  },
  methods: {
    incrementClick(ad) {
        var vm = this
        let data = {id: ad._id}

        axios
        .post(process.env.VUE_APP_SERVER_URL + "/click_ad/", {data})
        .then((response) => {
            console.log(response.data);
            vm.$notify({
                type: 'success',
                text: 'Reklam Tiklandi!'
            });
        })

    }
  }
};
</script>
<style>
.activity_box {
    height: 100px;
}
.main_container {
  background: rgb(255,255,255);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: rgb(13,105,56);
}


.logo img {
    width: 160px;
    height: auto;
    margin-left: 15rem;
}

.search {
    flex: 0 0 calc(25% - 1rem);
    margin-left: 40rem;
    text-align: center;
}

.search i {
    font-size: 1.2rem;
    position: relative;
    left: -10%;
    color: rgb(149,149,149);
}

.search input {
    padding: 10px;
    width: 80%;
}

.language_box {
    flex: 0 0 calc(10% - 1rem);
    border-radius: 0%;
    height: 2.77rem;
    width: 25rem;
    background: rgba(13,105,56, 0.5);
    border: 1.7px solid white;
    color: white;
}

.select_container {
    display: flex;
    align-items: center;
}

.select_container i {
    font-size: 1.3rem;
    position: relative;
    left: -8%;
    margin-bottom: 0.5rem;
    color: white;
}

.language_box i {
    color: black;
}

.news_texts  {
    background: rgb(20,30,42);
    height: 3.5rem;
    width: 2000px;
    text-align: center;
    overflow: hidden;
}

.news_texts ul li {
   display: inline-block; 
   color: white;
   margin-top: 1rem;
   margin-bottom: 1.5rem;
   font-size: 1rem;
}

.news_texts ul>li:before { 
    content:'\ffed'; 
    margin-right: 1.5em;
    margin-left: 1.5em;
}

.categories_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 60px;
    padding-top: 1.2em;
    margin-top: 2em;
    vertical-align: center;
    background: rgb(239,239,239);
    color: rgb(14,105,55);
}

.categories_box ul {
    list-style-type: none;
}

.categories_box ul li {
    display: inline-block;
    margin: 20px 2rem;
    text-transform: uppercase;
    font-weight: 600;
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

.text_box {
    background: coral;
}

.top_slider_container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    margin-top: 40px;
}

.top_slider {
    height: 60vh;
    background: coral;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top_slider div{
    font-size: 40px;
}

.top_slider_right_box {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    border: 2px solid black;
    flex: 0 0 40%;
}

.test_box {
    display: flex;
    border: 1px solid red;
    flex: 0 0 33%;
}

.slider_right_single_item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: green;
    margin: 10px;
}

.slider_right_single_item img {
    max-width: 100%;
    height: auto;
}

.slider_right_single_item  h4 {
    text-align: center;
    margin-top: 10px;
}

.bottom_full_width_ad {
    background: blue;
    height: 76%;
}

.top_activities_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.top_activity_item {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid red;
    height: 130px;
    cursor: pointer;
}

.top_activity_item img {
    max-height: 100%;
    width: auto;
}

.top_activity_item  h3 {
    position: relative;
    top: 1%;
    left: 0; 
    transform: translate(-50%, -50%);
}

.most_views_news {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0D6937;
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    line-height: 21.29px;
}

.most_views_news h3 {
    margin-top: 10px;
}

.view_time {
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;       
  color: #606060;
  height: 80px;
  background: #E5E5E5;
  border-right: 2px solid white;
} 

.view_time:last-child {
    border-right: none;
} 


</style>