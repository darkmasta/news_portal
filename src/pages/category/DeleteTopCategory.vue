<template>
    <b-row>
      <b-col cols="6" class="top-category-form-container mt-5">
        <b-form-group label="Ust Kategori Sil">
         <b-select v-model="topCategory" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" v-bind:value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          <b-btn variant="primary" class="font-weight-bold save-order" @click="deleteTopCategory(topCategory)">Ust Kategori Sil</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "DeleteTopCategory",
  data() {
    return {
      categoryTitle: "",
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

    });
    console.log(vm.categoriesData)
  },
  methods: {
    deleteTopCategory(topCategory) {
      var vm = this
      var data = {"topCategory": topCategory}
       axios
        .post(process.env.VUE_APP_SERVER_URL + "/delete_top_category/", {data})
        .then((response) => {
          console.log(response.data)
          if (response.data == 'success') {
            vm.$notify({
                type: 'success',
                text: 'Ust Kategori Basariyle Silindi!'
            })
            
            setTimeout(function(){ location.reload(); }, 2000);
          }
        });
    },
  }
};
</script>