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

    <div class="activities_center">
        <activity :activity="activity" v-for="(activity, index) in activities"
                :key="index" />
    </div>

    <b-row> 
        <b-col cols="8" class="box">
        </b-col>
        <b-col cols="4" class="box">
        </b-col>
    </b-row>





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
            })
        })

  },
  methods: {
  }
};
</script>
<style>
.box {
    border: 1px solid red;
    height: 100px;
}
.main_container {
  background: rgb(255,255,255);
  height: 100vh;
  overflow: hidden;
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



</style>