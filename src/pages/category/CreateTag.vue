<template>
  <b-row>
      <b-col cols="6" class="top-category-form-container">
        <b-form-group label="Yeni Etiket">
          <b-input v-model="tagName" label="" placeholder="Yeni Etiket" class="new_top_category_input">
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
      tagName: "",
    }
  },
  created() {
    var vm = this;

  },
  methods: {
    submitTag(categoryName) {
      var vm = this
      var data = {"tagName": tagName}

      if (vm.tagName.length < 2) {
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
          }
        });
      }
    },
  }
};
</script>