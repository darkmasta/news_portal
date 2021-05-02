<template>
  <div style="overflow: hidden;">
    <div class="row">
      <div class="col-md-12">
          <h2 style="text-decoration: underline;">Haber Olustur</h2>
          <span class="info_message">{{info_message}}</span>
      </div>
    </div>
    <div class="nav-tabs-left">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" 
           @click="expandTab = 'edit'" data-toggle="tab" href="/#/posts/create"
                      :class="{active: expandTab == 'edit'}">Edit Tarihi</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           @click="expandTab = 'categories'" data-toggle="tab" href="/#/posts/create"
                      :class="{active: expandTab == 'categories'}">Kategoriler</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           @click="expandTab = 'tags'" data-toggle="tab" href="/#/posts/create"
                      :class="{active: expandTab == 'tags'}">Etiketler</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           @click="expandTab = 'postImage'" data-toggle="tab" href="/#/posts/create"
                  :class="{active: expandTab == 'postImage'}">Haber Resmi</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           @click="expandTab = 'postLinks'" data-toggle="tab" href="/#/posts/create"
                  :class="{active: expandTab == 'postLinks'}">Haber Linkleri</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           @click="expandTab = 'languages'" data-toggle="tab" href="/#/posts/create"
                  :class="{active: expandTab == 'languages'}">Haber Dilleri</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade" :class="{active: expandTab == 'edit', show: expandTab == 'edit'}" id="navs-left-home">
            <b-row  class="edit_log">
              <b-col cols="6" class="offset-3 mt-2">
                <h3>Edit Tarihi</h3> 
              </b-col>

              <b-col cols="10" class="ml-2" v-for="(log, index) in editLogs" :key="index">
                <b-input-group prepend="Edit Log" class="mt-2">
                  <b-form-input v-model="log.editText">
                  </b-form-input>
                  <b-form-input v-bind:value="log.editor" disabled></b-form-input>
                  <div class="edit_buttons">
                    <span class="fas fa-times" @click="removeLog(index)"></span>
                    <span class="far fa-edit" @click="editLog(index)"></span>
                  </div>
                </b-input-group>
              </b-col>

            </b-row>
        </div>
        <div class="tab-pane fade " :class="{active: expandTab == 'categories', show: expandTab == 'categories'}" id="navs-left-profile">
          <b-row class="edit_log"> 
            <b-col class="categories__container">
              <div v-for="(categoryTitle, index) in categoryTitles" :key="index" 
                  class="categories__single-category"
                  :class="{expand_category: clickedCategory == index,
                          collapse_category: clickedCategory != index }">
                <h3 class="category__title" @click="clickCategory(index)">{{categoryTitle}}</h3>
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
              <b-col cols="12" class="mt-2 mb-2">
                  <span>Selected Categories: </span>{{selectedCategories}}
              </b-col>
          </b-row>
        </div>
        <div class="tab-pane fade " :class="{active: expandTab == 'tags', show: expandTab == 'tags'}" id="navs-left-profile">

        <vue-typeahead-bootstrap
          v-model="tag"
          :data="tags"
          :minMatchingChars="1"
          @hit="addToSelectedTags"
        />


        <div class="selected-tags mt-5">
          <span class="selected-tag" v-for="(selectedTag, index) in selectedTags" :key="index">{{selectedTag}}
          <i @click="removeFromSelectedTags(index)" style="color: red;" class="fas fa-times ml-2"></i></span>
        </div>



        </div>
        <div class="tab-pane fade images_tab" :class="{active: expandTab == 'postImage', show: expandTab == 'postImage'}" id="navs-left-messages">
          <b-row >
          <b-col cols="12">
            <b-col cols="6" class="offset-5 mt-3 kategoriler">
              <h3>Haber Resmi</h3> 
            </b-col>
            <div class="upload-example">
              <div>
                  <cropper
                    :src="image"
                    ref="cropper"
                    :transitions="true"
                  />
              </div>
              <div  class="reset-button" title="Reset Image" @click="reset()">
                <i class="fa fa-times"></i>
              </div>
              <div class="get-image-button" title="Get Image">
                <i class="fas fa-download"></i>
              </div>
              <div class="img-name-text" title="Image Name">
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

              <label class="switch">
                <input type="checkbox" v-model="toggleEditImage">
                <span class="slider round"></span>
                <span v-bind:class="{switch_closed: toggleEditImage}" class="switch_text">Resmi Duzenle</span>
              </label>
             
              </div>
            </div>
          </b-col>
          </b-row>
        </div>
        <div class="tab-pane fade" :class="{active: expandTab == 'postLinks', show: expandTab == 'postLinks'}" id="navs-left-messages">
          <b-row>
            <b-row>
            <b-col cols="12" class="publish_date_box mt-4 ml-3">
              <b-col cols="10" class="offset-6">
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
                  <vue-timepicker v-model="publishHour" close-on-complete></vue-timepicker>
                </b-form-group>
              </b-col>
            </b-col>
            </b-row>
          </b-row>

          <b-row>
            <b-col cols="10" class="offset-1">
              <b-form-group label="Haber Dili">
                <b-select v-model="postLanguage" class="">
                  <option v-for="(postLanguage, index) in languages" 
                      :key="index" v-bind:value="postLanguage"> 
                      {{postLanguage}}
                  </option>
                </b-select>
              </b-form-group>
            </b-col>
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
            <b-col cols="10" class="offset-1 mb-3">
              <b-input-group prepend="Seo Baslik Aciklamasi" class="mt-2">
                <b-form-input v-model="postSeoHeader"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
        <div class="tab-pane fade " :class="{active: expandTab == 'languages', show: expandTab == 'languages'}" id="navs-left-profile">
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
        </div>
      </div>
    </div>

    <div class="divider mt-4 mb-4"></div>

     <b-row class="editor-container mt-3">
      <b-col cols="6" class="offset-7">
        <div class="editor-center mt-2">
          <ckeditor :editor="editor" @ready="onReady" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-4">
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
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'




import categoryData from "../category/categories_data"


import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import CKEditor from '@ckeditor/ckeditor5-vue2';

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';

// Required dependency of bootstrap css/scss files

Vue.use(CKEditor)


export default {
  name: "PostsCreate",
  components: {
    Cropper,
    Datepicker,
    VueTimepicker,
    VueTypeaheadBootstrap
  },
  data() {
    return {
      languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
      categoriesData: {},
      postLanguage: '',
      expandTab: '',
      info_message: '',
      editLogs: [''],
      clickedCategory: undefined,
      toggleEditImage: false,
      secondTryForBugFix: false,
      saveAsDraft: false,
      categoryTitles: [],
      selectedCategories: [],
      postTitle: '',
      editor: DecoupledEditor,
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
      base64: '',
      message: "",
      file: null,
      image: null,
      imageWidth: 0,
      imageHeight: 0,
      imageName: "",
      postCustomUrl: '',
      publishDate: '',
      owner: '',
      publishHour: '',
      postKeywords: '',
      postSeoWords: '',
      postSeoUrl: '',
      postSeoHeader: '',
      postEnglishLink: '',
      postArabicLink: '',
      postRussianLink: '',
      postUkranianLink: '',
      postFrenchLink: '',
      tagsWithIds: [],
      tags: [],
      tag: '',
      selectedTags: [],
      selectedTagIds: [],
    }
  },
  created() {
    var vm = this;
    vm.categoryTitles = Object.keys(categoryData)


    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_tags/")
      .then((response) => {
        let tags = response.data
        vm.tagsWithIds = tags
        console.log(tags)
        tags.forEach( tag => {
          vm.tags.push(tag.tagName)
        })

        console.log(vm.tags)

      })

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

    vm.owner = this.$store.getters.getUser

  },
  methods: {
    submitPost: function () {
      var vm = this
			const { coordinates, canvas } = this.$refs.cropper.getResult();
      if (!canvas || canvas == undefined) {
          vm.$notify({
            type: 'success',
            text: 'Haber resmi bos olamaz'
          })
          return;
      }
			if (vm.toggleEditImage && canvas) {
				const formData = new FormData();
				canvas.toBlob(blob => {
          vm.blobToBase64(blob).then(res => {
            const formData = new FormData();
            if(!res)  {
              vm.$notify({
                type: 'success',
                text: 'Haber resmi bos olamaz'
              })
            }
            if(!vm.imageName || vm.imageName == "") {
              vm.$notify({
                type: 'warn',
                text: 'Lutfen Resim Ismi Giriniz'
              })
              return;
            }
            if(!vm.publishDate || vm.publishDate == "") {
              vm.$notify({
                type: 'warn',
                text: 'Haber Tarihi Bos Olamaz'
              })
              return;
            }
            if(!vm.postTitle || vm.postTitle == "") {
              vm.$notify({
                type: 'warn',
                text: 'Haber Basligi Bos Olamaz'
              })
              return;
            }
            formData.append('file', res);
            formData.append('fileName', vm.imageName);
            formData.append('toggleEditImage', vm.toggleEditImage);
            formData.append("editorData", vm.editorData)
            formData.append("postTitle", vm.postTitle)
            formData.append("categories", vm.selectedCategories)
            formData.append("publishDate", vm.publishDate)
            formData.append("publishHour", vm.publishHour)
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
            formData.append("postLanguage", vm.postLanguage)
            formData.append("selectedTags", vm.selectedTags)
            formData.append("owner", vm.owner)


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
                  vm.selectedTagIds.forEach(tagId => {
                    let data = {id: tagId}

                    axios
                      .post(process.env.VUE_APP_SERVER_URL + "/use_tag/", {data})
                      .then((response) => {
                        console.log("tag used")
                      })

                  })
                }
              });
            })
				// Perhaps you should add the setting appropriate file format here
				}, 'image/jpeg');
			} else if (this.toggleEditImage == false && this.secondTryForBugFix == false) {

       	this.$refs.cropper.setCoordinates({
          width: vm.imageWidth,
          height: vm.imageHeight,
          left: 0,
          top: 0 
        })

        this.$refs.cropper.setCoordinates(({ coordinates, imageSize }) => ({
          width: imageSize.width,
          height: imageSize.height
        }))

        vm.secondTryForBugFix = true

        vm.$notify({
          type: 'warn',
          text: 'Resim hazirlaniyor, lutfen tekrar deneyin'
        })

      } else if (this.toggleEditImage == false && this.secondTryForBugFix == true) {
          if (!canvas || canvas == undefined) {
              vm.$notify({
                type: 'success',
                text: 'Haber resmi bos olamaz'
              })
              return;
          }
          canvas.toBlob(blob => {
            vm.blobToBase64(blob).then(res => {
              console.log(coordinates)
              const formData = new FormData();
              formData.append("file", res)
              if (!res || res == undefined) {
                vm.$notify({
                  type: 'warn',
                  text: 'Haber resmi bos olamaz'
                })
                return;
              }
              if(!vm.imageName || vm.imageName == "") {
                vm.$notify({
                  type: 'warn',
                  text: 'Lutfen Resim Ismi Giriniz'
                })
                return;
              }
              if(!vm.publishDate || vm.publishDate == "") {
                vm.$notify({
                  type: 'warn',
                  text: 'Haber Tarihi Bos Olamaz'
                })
                return;
              }
              if(!vm.postTitle || vm.postTitle == "") {
                vm.$notify({
                  type: 'warn',
                  text: 'Haber Basligi Bos Olamaz'
                })
                return;
              }
              formData.append('fileName', vm.imageName);
              formData.append('toggleEditImage', vm.toggleEditImage);
              formData.append("editorData", vm.editorData)
              formData.append("postTitle", vm.postTitle)
              formData.append("categories", vm.selectedCategories)
              formData.append("publishDate", vm.publishDate)
              formData.append("publishHour", vm.publishHour)
              formData.append("postKeywords", vm.postKeywords)
              formData.append("postCustomUrl", vm.postCustomUrl)
              formData.append("postSeoWords", vm.postSeoWords)
              formData.append("postSeoUrl", vm.postSeoUrl)
              formData.append("postSeoHeader", vm.postSeoHeader)
              formData.append("postEnglishLink", vm.postEnglishLink)
              formData.append("postArabicLink", vm.postArabicLink)
              formData.append("postLanguage", vm.postLanguage)
              formData.append("owner", vm.owner)
              formData.append("postRussianLink", vm.postRussianLink)
              formData.append("postUkranianLink", vm.postUkranianLink)
              formData.append("postFrenchLink", vm.postFrenchLink)
              formData.append("selectedTags", vm.selectedTags)

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
                    this.secondTryForBugFix = false
                    vm.$notify({
                        type: 'success',
                        text: 'Haber Resmi Yuklendi!'
                    });
                  }
                });
            });
          // Perhaps you should add the setting appropriate file format here
          }, 'image/jpeg')
      }
    },
    addToSelectedTags() {
      var vm = this;
      // console.log(vm.tag)
      // console.log(vm.tagsWithIds[vm.tags.indexOf(vm.tag)])
      vm.selectedTagIds.push(vm.tagsWithIds[vm.tags.indexOf(vm.tag)]._id)
      vm.selectedTags.push(vm.tag)

    },
    onReady( editor )  {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    },
    updateSize({ coordinates }) {
			this.size.width = Math.round(coordinates.width);
			this.size.height = Math.round(coordinates.height);
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
      var vm = this

			if (input.files && input.files[0]) {
        console.log(input.files[0])
				var reader = new FileReader();
        var fr = new FileReader;

        fr.onload = function() {
          var img = new Image;

          img.onload = () => {
            vm.imageWidth = img.width; 
            vm.imageHeight = img.height;
          }

          img.src = fr.result
        }

        fr.readAsDataURL(input.files[0])

				reader.onload = (e) => {
					this.image = e.target.result;
          this.base64 = this.image
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
      if (vm.clickedCategory == index) {
        vm.clickedCategory = 100
      } else {
        vm.clickedCategory = index
      }
    },
    addTag(tag) {
      var vm = this
      console.log(tag);
      vm.selectedTags.push(tag)
    },
    removeTag(index) {
      var vm = this
      vm.selectedTags.splice(index, 1)
    },
    removeFromSelectedTags(index) {
      var vm = this
      vm.selectedTags.splice(index, 1)
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

.publish_date_box {
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



.input-group>.input-group-prepend {
    flex: 0 0 20%;
}
.input-group .input-group-text {
    width: 100%;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  margin-left: 50px;
  width: 60px;
  height: 34px;
}

.switch2 {
  position: relative;
  display: inline-block;
  margin-left: 70px;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch_text {
  position: relative;
  display: block;
  left: 65px;
  top: -25px;
  color: #666;
  text-decoration: line-through;
} 

.switch_text2 {
  position: relative;
  display: block;
  left: 65px;
  top: -15px;
  color: #666;
  text-decoration: line-through;
} 

.switch_closed {
  text-decoration: none;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: -5px;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #3fb37f;
}

input:checked + .switch_text {
}

input:focus + .slider {
  box-shadow: 0 0 1px #3fb37f;
}

input:checked + .slider:before {
  -webkit-transform: translateX(30px);
  -ms-transform: translateX(30px);
  transform: translateX(30px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.vue__time-picker input.display-time {
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    width: 10em;
    height: 2.2em;
    padding: 1.4em .5em;
    font-size: 1em;
    background-color: #f2f2f3;
}

.categories_tab {
  height: 40vh;
}

.images_tab {
  overflow: scroll;
  height: 60vh;
}

.vue-advanced-cropper {
  width: 500px;
  height: auto;
  margin: 0 auto;
}

.nav-tabs {
  width: 140px;
}

.get-image-button {
  position: absolute;
  right: 19px;
  bottom: 110px;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 41px;
  width: 41px;
  background: rgba(62, 179, 127, 0.7);
  transition: background -1.5s;
}

.get-image-button:hover {
  background: #2fb37f;
}

.editor_center {
  display: block;
  width: 1200px;
}

.ck-toolbar {
  position: relative;
  top: 0;
  left: 0px;
  height: 40px !important;
}

.ck-editor__editable {
  position: relative;
  top: 45px;
  left: -996px;
  min-width: 1000px;
  height: 400px;
  outline: #ccc auto 1px;
}

.tags-container {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  
}

.tags-container li {
  display: inline-block;
  padding: 10px;
  margin: 10px;
  background: rgba(179, 209, 255, 0.5);
}

.tags-hr {
  border-bottom: 5px solid blue;
}

.selected-tag  {
  background: rgb(153, 255, 187, 0.5);
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
}

.vbt-autcomplete-list {
  background: rgb(235, 232, 225);
}

</style>