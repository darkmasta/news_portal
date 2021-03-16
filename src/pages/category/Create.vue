<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">Category Create</span>
        </h4>
      </div>
    </div>
    <b-row>
      <b-col cols="6" class="top-category-form-container">
        <b-form-group label="Yeni Ust Kategori">
          <b-input v-model="newTopCategoryTitle" label="" placeholder="Yeni ust kategory" class="new_top_category_input">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order" @click="submitTopCategory(newTopCategoryTitle)">Ust kategori ekle</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group label="Yeni Alt Kategori">
          <b-select v-model="selectedTopCategory" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" v-bind:value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          <div class="mb-2">{{selectedTopCategory}}</div>
          <b-input v-model="newBottomCategoryTitle" label="" placeholder="Yeni alt kategory" class="new_top_category_input">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order" @click="submitBottomCategory(selectedTopCategory, newBottomCategoryTitle)">Alt kategori ekle</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="divider"></div>
    <b-row>
      <b-col cols="6" class="top-category-form-container mt-5">
        <b-form-group label="Ust Kategori Sil">
         <b-select v-model="selectedTopCategory" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" v-bind:value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          <b-btn variant="primary" class="font-weight-bold save-order" @click="submitBottomCategory">Ust Kategori Sil</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group label="Alt Kategori Sil">
          <b-select v-model="selectedTopCategoryForDelete" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" v-bind:value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          <b-select v-model="selectedBottomCategoryForDelete" class="mb-4">
            <option v-for="(bottomCategoryTitle, index) in categoriesData[selectedTopCategoryForDelete]" 
              :key="index" v-bind:value="bottomCategoryTitle"> 
              {{bottomCategoryTitle}}
            </option>
          </b-select>
          <b-btn variant="primary" class="font-weight-bold save-order" @click="submitBottomCategory">Alt kategori sil</b-btn>
        </b-form-group>
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
    title: "Category Create",
  },
  data() {
    return {
      categoriesData: {},
      categoryTitles: [],
      selectedCategories: [],
      selectedTopCategory: "",
      newTopCategoryTitle: "",
      newBottomCategoryTitle: "",
      selectedTopCategoryForDelete: "",
      selectedBottomCategoryForDelete: ""
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
          console.log(vm.categoriesData.updatedCategories)
          vm.categoriesData.updatedCategories.forEach(element => {
            vm.categoryTitles.push(element.topCategory)
          });
        });
  },
  methods: {
    submitTopCategory(categoryName) {
      var data = {"categoryName": categoryName}
       axios
        .post(process.env.VUE_APP_SERVER_URL + "/add_top_category/", {data})
        .then((response) => {
          console.log(response.data);
        });
    },
    submitBottomCategory (topCategory, bottomCategory) {
      var data = {"topCategory": topCategory, "bottomCategory": bottomCategory}
       axios
        .post(process.env.VUE_APP_SERVER_URL + "/add_bottom_category/", {data})
        .then((response) => {
          console.log(response.data);
        });
    }
  }
};
</script>
<style>
.new_top_category_input {
  margin-bottom: 1rem;

}

.divider {
  height: 1rem;
  width: 102%;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 7%, rgba(0,212,255,1) 100%);
}

</style>