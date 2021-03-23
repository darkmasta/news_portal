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
    <b-row>
      <div class="post-title-center">
          <b-form-group label="Required File 1" label-size="lg">
            <input ref="file" type="file"  />
          </b-form-group>
          <b-btn class="upload-image" @click="uploadImage">Fotoyu Yukle</b-btn>
        <b-input-group prepend="Haber Basligi" class="post-title mt-2">
          <b-form-input v-model="postTitle"></b-form-input>
        </b-input-group>
      </div>
    </b-row>
    <b-row>
      <b-col>
        <div class="editor-center mt-5">
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset="9">
         <b-btn @click="submitPost" variant="primary rounded-pill" class="new-post-btn">
          <span class="fas fa-plus-circle"></span> Haberi Kaydet
         </b-btn>
      </b-col>
    </b-row>
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
      postTitle: '',
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
         // The configuration of the editor.
         width: 1000,
      },
      message: "",
      file: null
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
    submitPost: function () {
      var vm = this
      var data = {}
      data.editorData = vm.editorData
      data.postTitle = vm.postTitle
      data.categories = vm.selectedCategories
      console.log(data)

      const file = this.$refs.file.files[0];
      vm.file = file
      const formData = new FormData();
      formData.append("file", vm.file)
      formData.append("editorData", vm.editorData)
      formData.append("postTitle", vm.postTitle)
      formData.append("categories", vm.selectedCategories)

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_post/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }, 
        })
        .then((response) => {
          var data = response.data;
          console.log(data);
        });
    },
    uploadImage: function() {
      var vm = this
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      vm.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }

      const formData = new FormData();
      formData.append("file", vm.file)

      console.log(file)
      
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (response) => {
            console.log(response.data)
            if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Haber Resmi Yuklendi!'
              });
            }
          },
          (response) => {
            console.log(response);
          }
        );
    }
  },
};
</script>

<style>
.post-title-center {
  margin: 30px auto;
}

.post-title-center input {
  width: 90%;
}

.post-title {
  width: 1000px;
}

.editor-center {
  display: flex;
  justify-content: center;
  margin-top:
}

.ck.ck-reset, .ck.ck-reset_all, .ck.ck-reset_all * {
  width: 85%;
}
.ck.ck-editor__main>.ck-editor__editable {
  height: 40vh;
  margin-bottom: 2em;
}

.categories__container {
  background: #fff;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
}
.categories__single-category {
  background: #21B8B5;
  color: #0E2928;
  margin: 0.5rem;
  border: 5px solid black;
  height: calc(50% - 1rem);
  flex: 0 0 calc(25% - 1rem);
  overflow: scroll;
}
.category__title {
  text-align: center;
  font-size: 1.2rem;
}
.category__list {
  list-style-type: none;
}
.upload-image {
  margin: 1rem auto;
  background: #0E2928;
  color: #fff;
}

</style>