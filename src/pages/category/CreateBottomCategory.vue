<template>
    <b-row>
      <b-col cols="6" class="top-category mt-5">
        <b-form-group label="Yeni Alt Kategori">
          <b-select v-model="topCategory" class="mb-4">
            <option v-for="(categoryTitle, index) in categoryTitles" 
              :key="index" :value="categoryTitle"> 
              {{categoryTitle}}
            </option>
          </b-select>
          <div class="mb-2">{{topCategory}}</div>
          <b-input v-model="bottomCategory" label="" placeholder="Yeni alt kategory">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    @click="submitBottomCategory(topCategory, bottomCategory)">Alt kategori ekle</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"

export default {
  name: "create-bottom-category",
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
  },
  methods: {
    submitBottomCategory (topCategory, bottomCategory) {
        var data = {"topCategory": topCategory, "bottomCategory": bottomCategory}
        var vm = this
        axios
            .post(process.env.VUE_APP_SERVER_URL + "/add_bottom_category/", {data})
            .then((response) => {
                console.log(response.data);
                if (response.data.nModified > 0) {
                vm.$notify({
                    type: 'success',
                    text: 'Alt Kategori Basariyle Eklendi!'
                })
              }
            });
    }
  }
};
</script>