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
           data-toggle="tab" href="#" :class="{active: expandTab == 'google'}"
                      @click="expandTab = 'google'">SEO Ayarlari</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           data-toggle="tab" href="#" :class="{active: expandTab == 'social'}"
                      @click="expandTab = 'social'">Sosyal Medya Linkleri</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           data-toggle="tab" href="#" :class="{active: expandTab == 'seoImage'}"
                  @click="expandTab = 'seoImage'">Görsel</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           data-toggle="tab" href="#" :class="{active: expandTab == 'logo'}"
                  @click="expandTab = 'logo'">Logo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" 
           data-toggle="tab" href="#" :class="{active: expandTab == 'favicon'}"
                  @click="expandTab = 'favicon'">Favicon</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="navs-left-home" class="tab-pane fade" :class="{active: expandTab == 'google', show: expandTab == 'google'}">
            <b-row  class="edit_log">
              <b-col cols="6" class="offset-3 mt-2">
                <h3>SEO Ayarları</h3> 
              </b-col>

              <b-col cols="10" class="offset-1">
                <b-form-group label="Google Baslik">
                  <b-form-input v-model="googleHeading" placeholder="Google Baslik"></b-form-input>  
                </b-form-group>
              </b-col>

              <b-col cols="10" class="offset-1">
                <b-form-group label="Google Aciklama">
                  <b-form-textarea v-model="googleStatement" placeholder="Google Aciklama"></b-form-textarea>  
                </b-form-group>
              </b-col>


              <b-row>
                <b-col cols="10" class="offset-3">
                  <b-input-group prepend="Seo Anahtar Kelimeler" class="mt-2">
                    <b-form-input v-model="seoKeyword"></b-form-input>
                    <div class="edit_buttons">
                      <span title="Ekle" class="fa fa-check" @click="addToSeoKeywords(seoKeyword)"></span>
                    </div>
                  </b-input-group>
                </b-col>

                <b-col v-for="(seoKeyword, index) in seoKeywords" :key="index" class="offset-2" cols="2">
                  <span class="identityItem">{{seoKeyword}} 
                    <i class="fa fa-times" @click="removeFromSeoKeywords(index)"></i></span>
                </b-col>
              </b-row>


            </b-row>
        </div>
        <div id="navs-left-profile" class="tab-pane fade " :class="{active: expandTab == 'social', show: expandTab == 'social'}">
              <b-col cols="6" class="offset-3 mt-2">
                <h3>Sosyal Medya Ayarlari</h3> 
              </b-col>

              <b-col cols="10" class="offset-1">
                <b-form-group label="Twitter Link">
                  <b-form-input v-model="twitterLink" placeholder="Twitter Link"></b-form-input>  
                </b-form-group>
              </b-col>

              <b-col cols="10" class="offset-1">
                <b-form-group label="Facebook Link">
                  <b-form-input v-model="facebookLink" placeholder="Facebook Link"></b-form-input>  
                </b-form-group>
              </b-col>

              <b-col cols="10" class="offset-1">
                <b-form-group label="Instagram Link">
                  <b-form-input v-model="instagramLink" placeholder="Instagram Link"></b-form-input>  
                </b-form-group>
              </b-col>
        </div>
        <div id="navs-left-profile" class="tab-pane fade " :class="{active: expandTab == 'favicon', show: expandTab == 'favicon'}">
              <b-col cols="6" class="offset-3 mt-2">
                <h3>Favicon</h3> 
              </b-col>
        
          <b-col cols="12">
            <div class="upload-example">
              <div>
                  <cropper
                    ref="cropper3"
                    :src="image"
                    :transitions="true"
                  />
              </div>
              <div  class="reset-button" title="Reset Image" @click="reset()">
                <i class="fa fa-times"></i>
              </div>
              <div class="get-image-button" title="Get Image">
                <i class="fas fa-download"></i>
              </div>
              <div class="button-wrapper">

            
              <span class="button" @click="$refs.file.click()">
                <input ref="file" type="file" accept="image/*" @change="loadFavicon($event)">
               Favicon Yükle 
              </span>

              <span class="button ml-5" @click="crop">
                Kırp
              </span>

              <label class="switch">
                <input v-model="toggleEditImage" type="checkbox">
                <span class="slider round"></span>
                <span :class="{switch_closed: toggleEditImage}" class="switch_text">Resmi Duzenle</span>
              </label>
             
                <b-btn variant="primary rounded-pill" class="change-logo ml-5 mb-1" @click="changeFavicon">
                  <span class="fas fa-plus-circle"></span> Faviconu Güncelle
                </b-btn>

              </div>
            </div>
          </b-col>
          
        </div>
        <div id="navs-left-profile" class="tab-pane fade " :class="{active: expandTab == 'logo', show: expandTab == 'logo'}">

          <b-row>
          <b-col cols="12">
            <b-col cols="6" class="offset-5 mt-3 kategoriler">
              <h3>Logo</h3> 
            </b-col>
            <div class="upload-example">
              <div>
                  <cropper
                    ref="cropper2"
                    :src="image"
                    :transitions="true"
                  />
              </div>
              <div  class="reset-button" title="Reset Image" @click="reset()">
                <i class="fa fa-times"></i>
              </div>
              <div class="get-image-button" title="Get Image">
                <i class="fas fa-download"></i>
              </div>
              <div class="button-wrapper">

            
              <span class="button" @click="$refs.file.click()">
                <input ref="file" type="file" accept="image/*" @change="loadLogo($event)">
               Logo Yükle 
              </span>

              <span class="button ml-5" @click="crop">
                Kırp
              </span>

              <label class="switch">
                <input v-model="toggleEditImage" type="checkbox">
                <span class="slider round"></span>
                <span :class="{switch_closed: toggleEditImage}" class="switch_text">Resmi Duzenle</span>
              </label>
             
                <b-btn variant="primary rounded-pill" class="change-logo ml-5 mb-1" @click="changeLogo">
                  <span class="fas fa-plus-circle"></span> Logoyu Güncelle
                </b-btn>

              </div>
            </div>
          </b-col>
          </b-row>
        </div>
        <div id="navs-left-messages" class="tab-pane fade images_tab" :class="{active: expandTab == 'seoImage', show: expandTab == 'seoImage'}">
          <b-row >
          <b-col cols="12">
            <b-col cols="6" class="offset-5 mt-3 kategoriler">
              <h3>SEO Resmi</h3> 
            </b-col>
            <div class="upload-example">
              <div>
                  <cropper
                    ref="cropper"
                    :src="image"
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
                <input ref="file" type="file" accept="image/*" @change="loadImage($event)">
                Görsel Ekle
              </span>

              <span class="button ml-5" @click="crop">
                Kırp 
              </span>

              <label class="switch">
                <input v-model="toggleEditImage" type="checkbox">
                <span class="slider round"></span>
                <span :class="{switch_closed: toggleEditImage}" class="switch_text">Resmi Duzenle</span>
              </label>
             
              </div>
            </div>
          </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <div class="divider mt-4 mb-4"></div>

    <b-row class="mt-4">
      <b-col offset="9">
         <b-btn variant="primary rounded-pill" class="new-post-btn" @click="submitSettings">
          <span class="fas fa-plus-circle"></span> Ayarları Kaydet
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



export default {
  name: "posts-create",
  components: {
    Cropper,
  },
  data: () => ({
    languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
    expandTab: '',
    info_message: '',
    toggleEditImage: false,
    secondTryForBugFix: false,
    seoKeyword: '',
    seoKeywords: [],
    googleHeading: '',
    twitterLink: '',
    instagramLink: '',
    facebookLink: '',
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
    owner: '',
    googleStatement: '',
    logo: '',
    base64logo: '',
    favicon: '',
    base64favicon: ''
  }),
  created() {
    var vm = this;

    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_seo/")
      .then((response) => {
        let seoData = response.data.pop()

        vm.seoKeywords = seoData.seoKeywords
        vm.googleHeading = seoData.googleHeading
        vm.twitterLink = seoData.twitterLink
        vm.facebookLink = seoData.facebookLink
        vm.instagramLink = seoData.instagramLink

      })
    vm.owner = this.$store.getters.getUser
  },
  methods: {
    submitSettings: function () {
      var vm = this
      let data = {
          seoKeywords: vm.seoKeywords,
          googleHeading: vm.googleHeading,
          googleImage: vm.imageName || '',
          twitterLink: vm.twitterLink,
          facebookLink: vm.facebookLink,
          instagramLink: vm.instagramLink,
      }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/update_seo/", {data})
        .then((response) => {
          vm.$notify({
              type: 'success',
              text: 'SEO Ayarları Başarıyla Güncellendi!'
          });
        })
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
    loadLogo(event) {
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
					this.logo = e.target.result;
          this.base64logo = this.image
				};
				reader.readAsDataURL(input.files[0]);
			}
	},
    loadFavicon(event) {
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
					this.favicon = e.target.result;
          this.base64favicon = this.image
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
    changeLogo() {
      var vm = this
			const { canvas } = this.$refs.cropper2.getResult();
			if (canvas) {
        const file = this.$refs.file.files[0];
				const formData = new FormData();
				canvas.toBlob(blob => {
          this.blobToBase64(blob).then(res => {
            formData.append('file', res);

            axios
              .post(process.env.VUE_APP_SERVER_URL + "/change_logo", formData, {
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
                        text: 'Logo Yuklendi!'
                    });
                    setTimeout(() => { location.reload(); }, 2000);
                  }
                },
                (response) => {
                  console.log(response);
                }
              );
          });
				// Perhaps you should add the setting appropriate file format here
				}, 'image/png');
			}
		},
    changeFavicon() {
      var vm = this
			const { canvas } = this.$refs.cropper3.getResult();
			if (canvas) {
        const file = this.$refs.file.files[0];
				const formData = new FormData();
				canvas.toBlob(blob => {
          this.blobToBase64(blob).then(res => {
            formData.append('file', res);

            axios
              .post(process.env.VUE_APP_SERVER_URL + "/change_favicon", formData, {
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
                        text: 'Favicon Yuklendi!'
                    });
                    setTimeout(() => { location.reload(); }, 2000);
                  }
                },
                (response) => {
                  console.log(response);
                }
              );
          });
				// Perhaps you should add the setting appropriate file format here
				}, 'image/png');
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
    addToSeoKeywords(text) {
      var vm = this
      vm.seoKeywords.push(text)
    },
    removeFromSeoKeywords(index) {
      var vm = this
      vm.seoKeywords.splice(index, 1)
    },
  },
};
</script>

<style>
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

.kunye_box {
  margin-right: 2em;
}

.kunye_box h7 {
  font-weight: bold;
}

.identityItem {
  display: inline-block;
  background: #7CFFC4;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
}

.edit_buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit_buttons span {
  font-size: 16px;
  display: inline-block;
  margin: 8px;
}

.button-wrapper {
  display: flex;
  justify-content: space-around;
}

.change-logo {
  background: #3fb37f;
}

</style>