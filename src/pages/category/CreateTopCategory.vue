<template>
  <b-row>
      <b-col cols="6" class="top-category-form-container">
        <b-form-group>
          <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('categories.new top category') }}</legend>
          <b-input v-model="categoryTitle" label="" placeholder="Yeni ust kategory" class="new_top_category_input">
          </b-input>
          <legend class="bv-no-focus-ring col-form-label pt-0 mt-2">{{ $t('categories.category color') }}</legend>
          <b-input v-model="topCategoryColor" label="" placeholder="Kategori Rengi" class="new_top_category_input">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitTopCategory(categoryTitle)">{{$t('categories.add top category')}}</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";

export default {
  name: "create-top-category",
  data() {
    return {
      categoryTitle: "",
      topCategoryColor: "",
    }
  },
  created() {
    var vm = this;

  },
  methods: {
    submitTopCategory(categoryName) {
      var vm = this
      var data = {"categoryName": categoryName,
                  "topCategoryColor": vm.topCategoryColor}

      if (categoryName.length < 2) {
        vm.$notify({
            type: 'warn',
            text: 'Kategori Ismi Bos Olamaz!'
        })
      } else {
       axios
        .post(process.env.VUE_APP_SERVER_URL + "/add_top_category/", {data})
        .then((response) => {
          console.log(response.data);
          var categoryData = response.data
          if (categoryData == 'success') {
            vm.$notify({
                type: 'success',
                text: 'Ust Kategori Basariyle Olusturuldu!'
            })
            setTimeout(() => { location.reload(); }, 2000);
          }
        });
      }
    },
  }
};
</script>