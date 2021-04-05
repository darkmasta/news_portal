<template>
  <div style="overflow: hidden;">
    <div class="row">
      <div class="col-md-12">
          <h2 style="text-decoration: underline;">Edit Post</h2>
          <span class="info_message">{{info_message}}</span>
      </div>
    </div>
    <b-row>
        <b-col cols="6" class="offset-5">
            <h3>Edit Tarihi</h3> 
        </b-col>

        <b-col cols="10" class="offset-1" v-for="(log, index) in editLogs" :key="index">
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

        <b-col cols="6" class="offset-5 mt-4">
            <h3>Son Edit Sebebi</h3> 
        </b-col>
        <b-col cols="10" class="offset-1">
            <b-input-group prepend="Son Edit Sebebi" class="mt-2">
                <b-form-input v-model="latestLogText"></b-form-input>
            </b-input-group>
        </b-col>

        <div class="divider mt-4 mb-4"></div>

    </b-row>
    <b-row>
      <b-col class="categories__container">
        <div v-for="(categoryTitle, index) in categoryTitles" :key="index" 
             class="categories__single-category"
            :class="{expand_category: clickedCategory == index,
                    collapse_category: clickedCategory != index } 
                    ">
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
    <b-row>
      <b-col cols="12">
        <div class="upload-example">
          <div v-show="image">
              <cropper
                :src="image"
                ref="cropper"
                :transitions="true"
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

          <label class="switch">
            <input type="checkbox" v-model="toggleEditImage">
            <span class="slider round"></span>
            <span v-bind:class="{switch_closed: toggleEditImage}" class="switch_text">Resmi Duzenle</span>
          </label>

          <label class="switch2 mr-3">
            <input type="checkbox" v-model="saveAsDraft">
            <span class="slider round"></span>
            <p v-bind:class="{switch_closed: saveAsDraft}" class="switch_text2">Taslak</p>
          </label>


          </div>
        </div>
      </b-col>
      <div class="divider mt-4 mb-4"></div>
      <b-row>
      <b-col cols="12" class="publish_date_box mt-4 ml-3">
        <b-col cols="11" class="offset-8">
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
      <b-col>
        <div class="editor-center mt-2">
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
      </b-col>
    </b-row>
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

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use( CKEditor );

export default {
  name: "PostsCreate",
  components: {
    Cropper,
    Datepicker,
    VueTimepicker
  },
  data: () => ({
    info_message: '',
    languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
    categoriesData: {},
    clickedCategory: undefined,
    toggleEditImage: false,
    secondTryForBugFix: false,
    saveAsDraft: false,
    editLogDynamicText: '',
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
    editLogs: [''],
    latestLogText: '',
    base64: '',
    message: "",
    file: null,
    image: null,
    imageWidth: 0,
    imageHeight: 0,
    imageName: "",
    postCustomUrl: '',
    publishDate: '',
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
    user: {}
  }),
  created() {
    var vm = this;
    let data = {}
    data.id = vm.$route.params.id
    vm.id = data.id


    axios.post(process.env.VUE_APP_SERVER_URL + "/post_by_id", {data})
        .then((response) => {
          vm.post = response.data;
          console.log(vm.post);
          vm.editorData = vm.post.content
          vm.publishDate = vm.post.date
          vm.publishHour = vm.post.publishHour
          vm.postTitle = vm.post.postTitle
          var categoryArray = vm.post.categories[0]
          categoryArray = categoryArray.split(',')
          vm.selectedCategories = categoryArray

          axios.get(process.env.VUE_APP_SERVER_URL + "/user")
                .then((response) => {
                  vm.user = response.data
                  console.log(vm.user)
                  if (vm.post.isLocked && vm.user.email != vm.post.lockerEditor ) {
                    vm.info_message = "Bu haber su anda baska birisi tarafindan gunceleniyor." +
                                        "\n Haber guncellemeye kapalidir." + 
                                        "Editor: " + vm.post.lockerEditor
                  } else if (vm.post.isLocked == false) {
                    axios.post(process.env.VUE_APP_SERVER_URL + "/lock_post", {data})
                      .then((response) => {
                        console.log(response.data)
                      })
                  }
                })

          vm.editLogs = vm.post.logs
          console.log("IS LOCKED",vm.post.isLocked)

          vm.imageName = vm.post.postImage.split('.').shift()
          vm.postCustomUrl = vm.post.postCustomUrl
          vm.postKeywords = vm.post.postKeywords
          vm.postSeoWords = vm.post.postSeoWords
          vm.postSeoUrl = vm.post.postSeoUrl
          vm.postSeoHeader = vm.post.postSeoHeader
          vm.postEnglishLink = vm.post.postEnglishLink
          vm.postArabicLink = vm.post.postArabicLink
          vm.postRussianLink = vm.post.postRussianLink
          vm.postUkranianLink = vm.post.postUkranianLink


          fetch(process.env.VUE_APP_SERVER_URL + '/images/' + vm.post.postImage)
                  .then(res => res.blob())
                  .then(blob => {
                      let objectURL = URL.createObjectURL(blob);
                      let myImage = new Image();
                      myImage.src = objectURL;
                      vm.image = myImage.src
                  })


            },
            (err) => {
                console.error(err);
            })



    vm.categoryTitles = Object.keys(categoryData)

    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_categories/", {})
      .then((response) => {
          //console.log(response.data);
          vm.categoriesData = response.data[0];
          //console.log(vm.categoriesData.updatedCategories)
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
  beforeDestroy() {
    var vm = this
    let data = {}
    data.id = vm.id
    data.lockerEditor = ""

    axios.post(process.env.VUE_APP_SERVER_URL + "/unlock_post", {data})
      .then((response) => {
        console.log(response.data)
      })

  },
  methods: {
    submitPost: function () {
      var vm = this
			const { coordinates, canvas } = this.$refs.cropper.getResult();
			if (vm.toggleEditImage && canvas) {
        if (vm.post.isLocked && vm.user.email != vm.post.lockerEditor) {
          vm.$notify({
            type: 'error',
            text: 'Haber Kilitli!'
          })
          return;
        }
		    const formData = new FormData();
        canvas.toBlob(blob => {
          vm.blobToBase64(blob).then(res => {
            const formData = new FormData();
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
            formData.append("latestLogText", vm.latestLogText)
            formData.append("id", vm.id)
            vm.editLogs.push(vm.latestLogText)
            console.log(vm.editLogs)
            console.log(vm.latestLogText)
            formData.append("logs", vm.editLogs)


            axios
                .post(process.env.VUE_APP_SERVER_URL + "/update_post/", formData, {
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
			}, 'image/jpeg');
			} else if (this.toggleEditImage == false && this.secondTryForBugFix == false) {

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
                if (vm.post.isLocked && vm.user.email != vm.post.lockerEditor) {
                  console.log("asd")
                  vm.$notify({
                    type: 'error',
                    text: 'Haber Kilitli!'
                  })
                  return;
                }

                canvas.toBlob(blob => {
                  vm.blobToBase64(blob).then(res => {
                      const formData = new FormData();
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
                      formData.append("latestLogText", vm.latestLogText)
                      formData.append("id", vm.id)

                      console.log(vm.editLogs)
                      formData.append("logs", vm.editLogs)


                  axios
                      .post(process.env.VUE_APP_SERVER_URL + "/update_post/", formData, {
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
                }, 'image/jpeg')}
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
            var reader = new FileReader();
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
    clickCategory(index) {
      var vm = this
      if (vm.clickedCategory == index) {
        vm.clickedCategory = 100
      } else {
        vm.clickedCategory = index
      }
    },
    removeLog(index) {
      if (vm.post.isLocked && vm.user.email != vm.post.lockerEditor) {
        console.log("asd")
        vm.$notify({
          type: 'error',
          text: 'Haber Kilitli!'
        })
        return;
      }
      var vm = this
      console.log(vm.editLogs[index])
      var data = {}
      data['id'] = vm.editLogs[index]._id
      console.log(data)
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/delete_post_log/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Haber Log\'u Basariyle Silindi!'
              });
              vm.editLogs.splice(index, 1);
          }
        });
    },
    editLog(index) {
      var vm = this
      if (vm.post.isLocked && vm.user.email != vm.post.lockerEditor) {
        console.log("asd")
        vm.$notify({
          type: 'error',
          text: 'Haber Kilitli!'
        })
        return;
      }
      console.log(vm.editLogs[index])
      var data =  vm.editLogs[index]
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/edit_post_log/", {data})
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Haber Log\'u Basariyle Guncellendi!'
              });
              // vm.editLogs.splice(index, 1);
          }
        });
    }
  },
};
</script>

<style>
.publish_date_box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info_message {
  font-size: 16px;
  color: red;
  display: inline-block;
  margin-bottom: 2em;
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

.edit_buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.edit_buttons span {
  font-size: 16px;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
}
</style>