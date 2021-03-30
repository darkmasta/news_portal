<template>
  <div style="overflow: hidden;">
    <div class="row">
      <div class="col-md-12">
          <h4>Create Post</h4>
          <span>Selected Categories: </span>{{selectedCategories}}
      </div>
    </div>
    <b-row>
      <b-col class="categories__container">
        <div v-for="(categoryTitle, index) in categoryTitles" :key="index" 
            @click="clickCategory(index)" class="categories__single-category"
            :class="{expand_category: clickedCategory == index,
                    collapse_category: clickedCategory != index } 
                    ">
          <h3 class="category__title">{{categoryTitle}}</h3>
          <ul class="category__list">
            <li v-for="(category, index2) in categoriesData[categoryTitle]" :key="index2"
              class="category__list-item">
              {{index2}}
              <input type="checkbox" :value="category" v-model="selectedCategories"> 
              {{category}}
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="upload-example">
          <div v-show="image">
              <cropper
                :src="image"
                ref="cropper"
              />
          </div>
          <div v-show="image" class="reset-button" title="Reset Image" @click="reset()">
            <i class="fa fa-times"></i>
          </div>
          <div v-show="image" class="img-name-text" title="Image Name">
            {{imageName}}
          </div>
          <b-col cols="6" offset="3">
            <div class="img-name">
                <b-form-group label="Foto Ismi">
                  <b-form-input v-model="imageName" placeholder="Foto Ismi"></b-form-input>  
                </b-form-group>
            </div>
          </b-col>
          <div class="button-wrapper">
        
          <span class="button" @click="$refs.file.click()">
            <input type="file" ref="file" @change="loadImage($event)" accept="image/*">
            Load image
          </span>

          <span class="button ml-5" @click="crop">
            Crop 
          </span>


          </div>
        </div>
      </b-col>
      <b-row>
      <b-col cols="12" class="publish_date mt-4">
        <b-col cols="10" class="offset-7">
            <b-input-group prepend="Haber Basligi" class="mt-2">
              <b-form-input v-model="postTitle"></b-form-input>
            </b-input-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Yayinlanma Tarihi">
            <datepicker v-model="publishDate" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Yayin Tarihi" />
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Yayinlanma Saati">
            <datepicker v-model="publishDate" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Yayin Saati" />
          </b-form-group>
        </b-col>
      </b-col>
      </b-row>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Haber URL'si" class="mt-2">
          <b-form-input v-model="postCustomUrl"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Haber Anahtar Kelimeler" class="mt-2">
          <b-form-input v-model="postKeywords"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Seo Anahtar Kelimeler" class="mt-2">
          <b-form-input v-model="postSeoWords"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Seo Url Adresi" class="mt-2">
          <b-form-input v-model="postSeoUrl"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Seo Baslik Aciklamasi" class="mt-2">
          <b-form-input v-model="postSeoHeader"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <div class="divider mt-4 mb-4"></div>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Baglantili Ingilizce Haber 🇬🇧" class="mt-2">
          <b-form-input v-model="postEnglishLink"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Baglantili Arapca Haber 🇸🇦" class="mt-2">
          <b-form-input v-model="postArabicLink"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Baglantili Rusca Haber 🇷🇺" class="mt-2">
          <b-form-input v-model="postRussianLink"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Baglantili Ukraynaca Haber 🇺🇦" class="mt-2">
          <b-form-input v-model="postUkranianLink"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
        <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Baglantili Fransizca Haber 🇫🇷" class="mt-2">
          <b-form-input v-model="postFrenchLink"></b-form-input>
        </b-input-group>
      </b-col>
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
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Datepicker from "vuejs-datepicker";

import categoryData from "../category/categories_data"

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use( CKEditor );

export default {
  name: "PostsCreate",
  components: {
    Cropper,
    Datepicker
  },
  data() {
    return {
      languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
      categoriesData: {},
      clickedCategory: undefined,
      categoryTitles: [],
      selectedCategories: [],
      postTitle: '',
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
         // The configuration of the editor.
      },
      coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0,
      },
      result: {
				coordinates: null,
				image: null
			},
      message: "",
      file: null,
      image: null,
      imageName: "",
      postCustomUrl: '',
      publishDate: '',
      postKeywords: '',
      postSeoWords: '',
      postSeoUrl: '',
      postSeoHeader: '',
      postEnglishLink: '',
      postArabicLink: '',
      postRussianLink: '',
      postUkranianLink: '',
      postFrenchLink: ''
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
                  if (!element.bottomCategory == "")
                  vm.categoriesData[element.topCategory].push(element.bottomCategory)
              }
          })
      });
  },
  methods: {
    submitPost: function () {
      var vm = this
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const formData = new FormData();
				canvas.toBlob(blob => {
          vm.blobToBase64(blob).then(res => {
            const formData = new FormData();
            formData.append('file', res);
            formData.append('fileName', vm.imageName);
            formData.append("editorData", vm.editorData)
            formData.append("postTitle", vm.postTitle)
            formData.append("categories", vm.selectedCategories)
            formData.append("publishDate", vm.publishDate)
            formData.append("postKeywords", vm.postKeywords)
            formData.append("postCustomUrl", vm.postCustomUrl)
            formData.append("postSeoWords", vm.postSeoWords)
            formData.append("postSeoUrl", vm.postSeoUrl)
            formData.append("postSeoHeader", vm.postSeoHeader)
            formData.append("postEnglishLink", vm.postEnglishLink)
            formData.append("postArabicLink", vm.postArabicLink)
            formData.append("postRussianLink", vm.postRussianLink)
            formData.append("postUkranianLink", vm.postUkranianLink)
            formData.append("postFrenchLink", vm.postFrenchLink)

            axios
              .post(process.env.VUE_APP_SERVER_URL + "/create_post/", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                }, 
              })
              .then((response) => {
                var data = response.data;
                console.log(data);
                if (response.data == "success") {
                  vm.$notify({
                      type: 'success',
                      text: 'Haber Resmi Yuklendi!'
                  });
                }
              });
          });
				// Perhaps you should add the setting appropriate file format here
				}, 'image/jpeg');
			}
    },
    crop() {
      const { coordinates, canvas, } = this.$refs.cropper.getResult();
			this.coordinates = coordinates;
			this.image = canvas.toDataURL();
		},
   	reset() {
			this.image = null;
		},
		loadImage(event) {
			var input = event.target;
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					this.image = e.target.result;
				};
				reader.readAsDataURL(input.files[0]);
			}
		},
    blobToBase64 (blob)  {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise(resolve => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    },
    uploadImage() {
      var vm = this
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
        const file = this.$refs.file.files[0];
				const formData = new FormData();
				canvas.toBlob(blob => {
          this.blobToBase64(blob).then(res => {
            formData.append('file', res);
            formData.append('fileName', file.name.split('.').shift());
            formData.append("editorData", vm.editorData)
            formData.append("postTitle", vm.postTitle)
            formData.append("categories", vm.selectedCategories)

            axios
              .post(process.env.VUE_APP_SERVER_URL + "/create_post", formData, {
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
          });
				// Perhaps you should add the setting appropriate file format here
				}, 'image/jpeg');
			}
		},
    clickCategory(index) {
      var vm = this
      vm.clickedCategory = index
    }
  },
};
</script>

<style>
.publish_date {
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider {
  height: 1rem;
  width: 4000px;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 7%, rgba(0,212,255,1) 100%);
}

.ck-editor__editable {
  min-width: 1200px;
}

</style>