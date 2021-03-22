<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <h4>Create Post</h4>
          <span>Selected Categories: </span>{{selectedCategories}}
      </div>
    </div>
    <b-row>
      <b-col class="categories__container">
        <div v-for="(categoryTitle, index) in categoryTitles" :key="index" class="categories__single-category">
          <h3 class="category__title">{{categoryTitle}}</h3>
          <ul class="category__list">
            <li v-for="(category, index2) in categoriesData[categoryTitle]" :key="index2"
              class="category__list-item">
              <input type="checkbox" :value="category" v-model="selectedCategories"> 
              {{category}}
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
    <div class="editor-center mt-5">
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import _ from "underscore";
import categoryData from "../category/categories_data"

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use( CKEditor );

export default {
  name: "PostsCreate",
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      categoriesData: {},
      categoryTitles: [],
      selectedCategories: [],
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
         // The configuration of the editor.
      }
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
          console.log(vm.categoriesData)
        });
  },
  methods: {
    submitPost: function (data, city, state, zipCode) {
      console.log(city, state, zipCode);
      data.city = city;
      data.state = state;
      data.zipCode = zipCode;
      console.log(data);

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_customer/", { data })
        .then((response) => {
          var data = response.data;
          console.log(data);
        });
    },
  },
  metaInfo: {
    title: "Customers",
  },
};
</script>

<style>
.editor-center {
  display: flex;
  justify-content: center;
  margin-top:
}
</style>