<template>
<div class="main_container">
    <header>
        <div class="logo">
            <img :src="require('@/assets/images/logo.png')" /> 
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


    <b-row> 
        <b-col cols="4" class="activity_box">
            <activity :activity="activities[0]" />
        </b-col>
        <b-col cols="4" class="activity_box">
            <activity :activity="activities[1]" />
        </b-col>
        <b-col cols="4" class="activity_box">
            <activity :activity="activities[0]" />
        </b-col>
    </b-row>

    <b-row class="top_slider_container">
        <b-col cols="7" class="top_slider">
            <div>SLIDER</div>
        </b-col>
        <b-col class="top_slider_right_box">
            <b-row class="test_box">
                <b-col  class="slider_right_single_item">
                </b-col>
                <b-col  class="slider_right_single_item">
                </b-col>
            </b-row>
            <b-row class="test_box">
                <b-col  class="slider_right_single_item">
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


    <b-row class="mt-5"> 
        <b-col cols="4" class="activity_box">
            <activity :activity="activities[0]" />
        </b-col>
        <b-col cols="4" class="activity_box">
            <activity :activity="activities[1]" />
        </b-col>
        <b-col cols="4" class="activity_box">
            <activity :activity="activities[0]" />
        </b-col>
    </b-row>


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
                axios.get(activity.activityImage)
                     .then((response) => {
                         console.log(response.data)
                     })
                     .catch((error) => {
                         if(error)
                         console.log(activity.activityImage.split('/').pop())
                         activity.activityImage = 'https://defensehere.herokuapp.com/images/' + 
                                                        activity.activityImage.split('/').pop()
                     }) 
            })
        })

  },
  methods: {
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
    margin: 20px;
    margin-top: 40px;
}

.top_slider {
    height: 40vh;
    background: coral;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top_slider div{
    font-size: 40px;
}

.top_slider_right_box {
    height: 40vh;
    margin-left: 20px;
    width: 100%;
    border: 2px solid black;
    flex: 0 0 40%;
}

.test_box {
    height: 31%;
    border: 1px solid red;
    flex: 0 0 45%;
}

.slider_right_single_item {
    background: green;
    margin: 10px;
    height: 100%;
}

.bottom_full_width_ad {
    background: blue;
    margin-top: 20px;
}



</style>