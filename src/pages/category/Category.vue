<template>
  <div>
    <b-row>
      <b-col class="d-flex justify-content-between ">
        <div class="page-header">
          <h4>Kategoriler </h4>
         Seçilmiş Kategoriler : {{selectedCategories}}
        </div>
        <b-btn variant="primary rounded-pill" class="align-self-start" to="/category/create"><span class="fas fa-plus-circle"></span> Yeni Kategori Ekle</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="categories__container">
        <div v-for="(categoryTitle, index) in categoryTitles" :key="index" 
            class="categories__single-category expand_category" @click="clickCategory(index)"
                    >
          <h3 class="category__title">{{categoryTitle}}</h3>
          <ul class="category__list">
            <li v-for="(category, index2) in categoriesData[categoryTitle]" :key="index2"
              class="category__list-item">
              <input v-model="selectedCategories" type="checkbox" :value="category"> 
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
      clickedCategory: undefined,
      selectedCategories: [],
    }
  },
  created() {
    var vm = this;
    vm.categoryTitles = Object.keys(categoryData)

    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_categories/", {})
      .then((response) => {
          console.log(response.data);
          vm.categoriesData = response.data[0];
          console.log(vm.categoriesData.updatedCategories)
          vm.categoriesData.updatedCategories.forEach(element => {
              vm.categoryTitles.push(element.topCategory)
          });

          // remove duplicates
          // it is expected from top categories
          var uniqueCategoryTitles = [...new Set(vm.categoryTitles)]
          vm.categoryTitles = uniqueCategoryTitles;

          vm.categoriesData.updatedCategories.forEach(element => {
              if( vm.categoriesData[element.topCategory] ) {
                  vm.categoriesData[element.topCategory].push(element.bottomCategory)
              } else {
                  vm.categoriesData[element.topCategory] =  new Array();
                  if (!element.bottomCategory == "")
                  vm.categoriesData[element.topCategory].push(element.bottomCategory)
              }
          })
      });

  },
  methods: {
    clickCategory(index) {
      var vm = this
      vm.clickedCategory = index
    }
  }
};
</script>

<style>



</style>