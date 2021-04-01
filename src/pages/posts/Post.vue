<template>
<div class="main_container">
    <header>
        <div class="logo" style="cursor: pointer;">
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



    <div class="post_title">
        <h1>{{post.postTitle}}</h1> 

    </div>

    <div class="post_image">
        <img :src="post.postImage">
    </div>

    <b-row>
        <b-col cols="2" class="offset-2">
            <div class="publish_date">
                <span>{{publishDate}} --- {{post.publishHour}}</span>
            </div>
        </b-col>

        <b-col cols="3">
            <div class="publish_date" style="background: #ccc;">
                <span>Writer: {{post.ownerEmail}}</span>
            </div>
        </b-col>

        <b-col cols="2" class="ml-2">
            <span class="button manset mt-5">
                Manset 
            </span>
        </b-col>

        <b-col cols="2" class="ml-2">
            <span class="button taslak mt-5" @click="goToUpdatePost">
                Taslak/Guncelle
            </span>
        </b-col>
    </b-row>

    <b-row>
    </b-row>

    <div class="post_content">
        <div v-html="post.content">
        </div>
    </div>



</div>
</template>
<script>
import axios from "axios";


export default {
  name: "post",
  metaInfo: {
    title: "Post",
  },
  components: {
  },
  data: () => ({
      languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
      language: 'Turkce 🇹🇷',
      activities: [],
      post: {},
      customUrl: '',
      id: ''
  }),
  created() {
    var vm = this;

    let data = {}
    data.id = vm.$route.params.id
    vm.id = data.id

    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");


    if (checkForHexRegExp.test(vm.id) == true) {
        axios.post(process.env.VUE_APP_SERVER_URL + "/post_by_id", {data})
            .then(
                (response) => {
                        vm.post = response.data;
                        let customUrl = vm.post.postTitle.toLowerCase().split(' ').join('-')
                        if (vm.id == vm.post._id) { // id url'si custom url'e git
                            this.$router.push({ name: 'Post', params: { id: customUrl }})
                        } else {
                            console.log("URL id degil")
                        }
                },
                (err) => {
                    console.error(err);
                })
    } else if (checkForHexRegExp.test(vm.id) == false){
        let data2 = {}
        console.log(vm.$route.params.id)
        data2.postTitle = vm.post.postTitle || vm.$route.params.id.split('-').join(' ') 

        axios.post(process.env.VUE_APP_SERVER_URL + "/post_by_title", {data2})
            .then(
            (response) => {
                console.log(response.data)
                vm.post = response.data;
                vm.post.postImage = process.env.VUE_APP_SERVER_URL + /images/ + vm.post.postImage
                console.log(vm.post);
            },
            (err) => {
                console.error(err)
            }
            )
    }
    




  },
  methods: {
      goToUpdatePost() {
          var vm = this
          let id = vm.post._id
          this.$router.push({ name: 'Posts Edit', params: { id: id}})
      }
  },
  computed: {
      publishDate: function() {
          var vm = this
          if(vm.post && vm.post.publishDate) return vm.post.publishDate.split('T').shift()
          else return "No Date is avaliable"
      }
  }
};
</script>
<style>

.post_content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px auto;
}

.activity_box {
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

.news_texts ul li:hover {
    cursor: pointer;
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

.categories_box ul li:hover {
    cursor: pointer;
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

.post_title {
   display: flex; 
   justify-content: center;
   margin: 20px auto;
}

.publish_date {
    position: relative;
    top: 10px;
    right: -50px;
    font-size: 16px;
    font-weight: 500;
    width: 75%;
    background: rgba(13,105,56, 0.5);
}

.publish_date span {
    padding: 10px;
    text-align: center;
}

.post_image {
    display: flex;
    justify-content: center;
}

.post_image  img{
    width: 60%;
    height: auto;
}

.main_container {
    overflow-y: scroll !important;
}

.manset {
    position: relative;
    top: 10px;
    right: 100px;
}

.taslak {
    position: relative;
    top: 10px;
    right: 270px;
}

</style>