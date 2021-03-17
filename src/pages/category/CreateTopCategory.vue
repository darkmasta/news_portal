<template>
  <b-row>
      <b-col cols="6" class="top-category-form-container">
        <b-form-group label="Yeni Ust Kategori">
          <b-input v-model="categoryTitle" label="" placeholder="Yeni ust kategory" class="new_top_category_input">
          </b-input>
          <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitTopCategory(categoryTitle)">Ust kategori ekle</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateTopCategory",
  data() {
    return {
      categoryTitle: "",
    }
  },
  created() {
    var vm = this;

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
  }
};
</script>