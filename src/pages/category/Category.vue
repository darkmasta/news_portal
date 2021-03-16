<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Kategoriler </h4>
          selected categories: {{selectedCategories}}
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/category/create"><span class="fas fa-plus-circle"></span> Yeni Kategori Ekle</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="categories__container">
        <div v-for="(categoryTitle, index) in categoryTitles" :key="index" class="categories__single-category">
          <h3 class="category__title">{{categoryTitle}}</h3>
          <ul class="category__list">
            <li v-for="(category, index2) in categoriesData[categoryTitle]" :key="index2"
              class="category__list-item">
              <input type="checkbox" :value="category" v-model="selectedCategories"> 
              {{category}}
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "category-create",
  metaInfo: {
    title: "Kategoriler",
  },
  data() {
    return {
      categoriesData: {},
      categoryTitles: [],
      selectedCategories: [],
    }
  },
  created() {
    var vm = this;
    vm.categoryTitles = Object.keys(categoryData)

       axios
        .post(process.env.VUE_APP_SERVER_URL + "/get_categories/", {})
        .then((response) => {
          //console.log(response.data);
          vm.categoriesData = response.data[0];
          console.log(vm.categoriesData)
        });
  }
};
</script>

<style>
.categories__container {
  background: #fff;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
}
.categories__single-category {
  background: #21B8B5;
  color: #0E2928;
  margin: 0.5rem;
  border: 5px solid black;
  height: calc(50% - 1rem);
  flex: 0 0 calc(25% - 1rem);
  overflow: scroll;
}
.category__title {
  text-align: center;
  font-size: 1.2rem;
}
.category__list {
  list-style-type: none;
}




</style>