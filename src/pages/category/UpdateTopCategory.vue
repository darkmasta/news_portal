<template>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group>
          <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('categories.edit top category') }}</legend>
          <b-select v-model="categoryTitle" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" :value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          {{categoryTitle}}
          <b-input v-model="topCategory" label="Ust Kategori" placeholder="Ust Kategoriyi Guncelle">
          </b-input>
          <legend class="bv-no-focus-ring col-form-label pt-0 mt-2">{{ $t('categories.category color') }}</legend>
          <b-input v-model="topCategoryColor" label="" placeholder="Kategori Rengi" class="new_top_category_input">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    @click="updateTopCategory()">{{ $t('categories.edit top category')}}</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "update-top-category",
  data() {
    return {
      categoryTitle: "",
      categoriesData: {},
      topCategory: "",
      bottomCategory: "",
      categoryTitles: [],
      updateSuccess: false,
      topCategoryColor: ''
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
  watch: {
    categoryTitle: function(newC, oldC) {
      var vm = this
      if (newC.length > 1) {
        console.log(this.categoriesData[vm.topCategory])
        // console.log(this.categoriesData.updatedCategories)
        this.categoriesData.updatedCategories.forEach(category => {
          console.log(newC)
          if (category.topCategory == newC) {
            console.log(category)
            vm.topCategoryColor = category.topColor
          }
        })
      }
    }
  },
  methods: {
    updateTopCategory () {
        var vm = this
        const categoryName = vm.topCategory
        const topCategory = vm.categoryTitle
        const topCategoryColor = vm.topCategoryColor
        var data = {"topCategory": topCategory, 
                    "categoryName": categoryName,
                    "topCategoryColor": topCategoryColor}

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