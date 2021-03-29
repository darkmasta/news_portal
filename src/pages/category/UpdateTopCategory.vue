<template>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group label="Ust Kategori Duzenle">
          <b-select v-model="categoryTitle" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" v-bind:value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          {{categoryTitle}}
          <b-input v-model="topCategory" label="Ust Kategori" placeholder="Ust Kategoriyi Guncelle">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    @click="updateTopCategory()">Ust Kategori Duzenle</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "UpdateTopCategory",
  data() {
    return {
      categoryTitle: "",
      categoriesData: {},
      topCategory: "",
      bottomCategory: "",
      categoryTitles: [],
      updateSuccess: false,
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
  },
  methods: {
    updateTopCategory () {
        var vm = this
        const categoryName = vm.topCategory
        const topCategory = vm.categoryTitle
        var data = {"topCategory": topCategory, "categoryName": categoryName}

        vm.categoriesData[topCategory].forEach( (bottom_category) => {
          axios
              .post(process.env.VUE_APP_SERVER_URL + "/update_top_category/", {data})
              .then((response) => {
                  console.log(response.data);
                  vm.$notify({
                      type: 'success',
                      text: 'Ust Kategori Basariyle Guncellendi!'
                  })
              });
        })

        setTimeout(function(){ location.reload(); }, 2000);
    },
  }
};
</script>