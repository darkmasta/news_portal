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
        <div class="activity_item">

        </div>
        <div class="activity_item">

        </div>
        <div class="activity_item">

        </div>
        

    </div>

    <div class="activities_center">
        <div class="activity_item">

        </div>
        <div class="activity_item">

        </div>
        <div class="activity_item">

        </div>
    </div>





</div>
</template>
<script>
import axios from "axios";


export default {
  name: "home-page",
  metaInfo: {
    title: "Home Page",
  },
  data() {
    return {}
  },
  created() {
    var vm = this;
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
}

.activity_item{
    background: coral;
    border: 5px solid black;
    flex: 0 0 calc(20% - 2rem);
    height: 100%;
    padding: 20px;
    margin: 20px;
}



</style>