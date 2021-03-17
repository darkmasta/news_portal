<template>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group label="Alt Kategori Sil">
          <b-select v-model="topCategory" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" v-bind:value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          {{categoryTitle}}
          <b-select v-model="bottomCategory" class="mb-4">
            <option v-for="(bottomCategory, index) in categoriesData[topCategory]" 
              :key="index" v-bind:value="bottomCategory"> 
              {{bottomCategory}}
            </option>
          </b-select>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    @click="deleteBottomCategory(topCategory, bottomCategory)">Alt Kategori Sil</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "DeleteBottomCategory",
  data() {
    return {
      categoryTitle: "",
      categoriesData: {},
      topCategory: "",
      bottomCategory: "",
      categoryTitles: [],
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

        // remove duplicates
        // it is expected from top categories
        var uniqueCategoryTitles = [...new Set(vm.categoryTitles)]
        vm.categoryTitles = uniqueCategoryTitles;

        vm.categoriesData.updatedCategories.forEach(element => {
            if( vm.categoriesData[element.topCategory] ) {
                vm.categoriesData[element.topCategory].push(element.bottomCategory)
            } else {
                vm.categoriesData[element.topCategory] =  new Array();
                vm.categoriesData[element.topCategory].push(element.bottomCategory)
            }
        })
    });
    console.log(vm.categoriesData)
  },
  methods: {
    deleteBottomCategory (topCategory, bottomCategory) {
        var data = {"topCategory": topCategory, "bottomCategory": bottomCategory}
        axios
            .post(process.env.VUE_APP_SERVER_URL + "/add_bottom_category/", {data})
            .then((response) => {
                console.log(response.data);
            });
    },
    setArray(a, b) {
        window[a]= b;
    }
  }
};
</script>