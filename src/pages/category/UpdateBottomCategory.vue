<template>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group label="Alt Kategori Duzenle">
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
          <b-input v-model="categoryName" v-bind:value="categoryName" label="Alt Kategori" placeholder="Alt Kategoriyi Guncelle">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    @click="updateBottomCategory(topCategory, bottomCategory)">Alt Kategori Update</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "UpdateBottomCategory",
  data() {
    return {
      categoryTitle: "",
      categoryName: "",
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
    updateBottomCategory (topCategory, bottomCategory) {
        var vm = this
        var data = {"topCategory": topCategory, "bottomCategory": bottomCategory}
        console.log(vm.categoryName)
        data['categoryName'] = vm.categoryName
        if (vm.categoryName.length < 2) {
            vm.$notify({
                type: 'warn',
                text: 'Alt kategori ismi giriniz!'
            })
        }
        axios
            .post(process.env.VUE_APP_SERVER_URL + "/update_bottom_category/", {data})
            .then((response) => {
                console.log(response.data);
              if (response.data == 'success') {
                vm.$notify({
                    type: 'success',
                    text: 'Alt Kategori Basariyle Guncellendi!'
                })
                setTimeout(function(){ location.reload(); }, 2000);
              }
            });
    },
  }
};
</script>