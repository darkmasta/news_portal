<template>
<div>
  <div class="row">
    <div class="col-lg-12">
      <h4 class="font-weight-bold py-3 mb-1">
        <span class="text-muted font-weight-light">Reklam Güncelle</span>
      </h4>
    </div>
  </div> 

<div class="activity_item_center">
  <img :src="ad.adImage" />
  <h4>{{ad.adTitle}}</h4>
</div>

<div class="nav-tabs-left">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" 
        @click="expandTab = 'adInfo'" data-toggle="tab" href="#"
                  :class="{active: expandTab == 'adInfo'}">Reklam Bilgileri</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" 
        @click="expandTab = 'adImage'" data-toggle="tab" href="#"
                  :class="{active: expandTab == 'adImage'}">Reklam Resmi</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" 
        @click="expandTab = 'adOperations'" data-toggle="tab" href="#"
                  :class="{active: expandTab == 'adOperations'}">Reklam Onay/Red</a>
    </li>
  </ul>
  <div class="tab-content">
  <div class="tab-pane fade" :class="{active: expandTab == 'adInfo', show: expandTab == 'adInfo'}" id="navs-left-home">
    <div>
      <b-row>
        <b-col cols="5" class="offset-1">
          <b-input-group prepend="Reklam Ekleyen" class="mt-2">
            <b-form-input v-model="ad.owner" disabled></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="5" class="offset-1">
          <b-input-group prepend="Reklam Basligi" class="mt-2">
            <b-form-input v-model="ad.adTitle"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="5" class="activity_status">
          <b-form-group label="Reklam Turu">
            <b-select v-model="adType">
              <option v-for="(adType, index) in adTypeList" 
                  :key="index" v-bind:value="adType"> 
                  {{adType}}
              </option>
            </b-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="">
          <b-col cols="3" class="offset-1">
            <b-form-group label="Reklam Durumu">
              <b-select v-model="status">
                <option v-for="(status, index) in statusList" 
                    :key="index" v-bind:value="status"> 
                    {{status}}
                </option>
              </b-select>
            </b-form-group>
          </b-col>
      </b-row>
    </div>
  </div>
  <div class="tab-pane fade" :class="{active: expandTab == 'adImage', show: expandTab == 'adImage'}" id="navs-left-home">
    <b-row >
      <b-col cols="12">
        <b-col cols="6" class="offset-5 mt-3 kategoriler">
          <h3>Etkinlik Resmi</h3> 
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
          <div class="get-image-button" title="Get Image" @click="getImage()">
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
  <div class="tab-pane fade" :class="{active: expandTab == 'adOperations', show: expandTab == 'adOperations'}" id="navs-left-home">
    <div class="activity-operations-buttons">
      <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="deleteAd">Reklami Sil</b-btn>
    </div>
  </div>
  </div>
</div>

<b-row>
  <b-col class="offset-10">
    <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitAd">Reklami Guncelle</b-btn>
  </b-col>
</b-row>

</div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import _ from "underscore";
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Datepicker from "vuejs-datepicker";
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'



export default {
name: "Ad",
components: {
  Cropper,
  Datepicker,
  VueTimepicker
},
data: () => ({
  ad: {
    adImage: ''
  },
  expandTab: '',
  publishDate: '',
  publishHour: '',
  statusList: ['Onay Bekliyor', 'Onayli', 'Red'],
  activityTypeList: ['Konferans', 'Panel', 'Söyleşi'],
  activityType: '',
  status: '',
  toggleEditImage: false,
  imageName: '',
  image: null,
  startDate: null,
  endDate: null,
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
  adName: '',
  adTitle: '',
  adImage: '',
  adTypeList: ['Ana Sayfa', 'Haber Detay', 'Diger'],
  adType: '',
  adLocationList: ['Ana Sayfa Ust Sag', 'Ana Sayfa Ust Sol', 'Haber Detay 1', 'Haber Detay  2'],
  adLocation: '',
  adStatusList: ['Aktif', 'Pasif', 'Beklemede', 'Vakti Gecti'],
  adStatus: '',
  adLink: '',
  startDate: null,
  endDate: null,
  imageName: '',
  image: null,
  base64: '',
  toggleEditImage: false,
}),
created() {
  var vm = this;
  let data = {}
  data.id = vm.$route.params.id
  vm.id = data.id

  axios.post(process.env.VUE_APP_SERVER_URL + "/get_ad", {data})
    .then(
    (response) => {
        console.log(response.data)
        vm.ad = response.data
        // setTimeout(() => { if(!vm.image) location.reload(); }, 2000);
        vm.imageName = response.data.adImage
        vm.adType = response.data.adType
        vm.ad.adImage = process.env.VUE_APP_SERVER_URL + /images/ + response.data.adImage
    },
    (err) => {
        console.error(err)
    }
    )

},
methods: {
  submitAd() {
    var vm = this
    const { coordinates, canvas } = this.$refs.cropper.getResult();
    if (!canvas) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Reklam Resmini Kontrol Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.imageName) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Reklam Resim Ismini Kontrol Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.ad.adTitle) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Reklam Ismini Kontrol Ediniz!',
          duration: 3000,
      });
      return
    }
    if (canvas) {
      const formData = new FormData();
      canvas.toBlob(blob => {
        vm.blobToBase64(blob).then(res => {
          const formData = new FormData();
          formData.append('file', res);
          formData.append('fileName', vm.imageName);
          formData.append("owner", vm.owner)
          formData.append("adTitle", vm.ad.adTitle)
          formData.append("adType", vm.adType)
          formData.append("status", '')
          formData.append("id", vm.id)

          console.log(formData)

          axios
            .post(process.env.VUE_APP_SERVER_URL + "/update_ad/", formData, {
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
                    text: 'Etkinlik Guncellendi!'
                });
              }
            });
        });
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
  getImage() {
    var vm = this
    fetch(process.env.VUE_APP_SERVER_URL + '/images/' + vm.imageName)
      .then(res => res.blob())
      .then(blob => {
          let objectURL = URL.createObjectURL(blob);
          let myImage = new Image();
          myImage.src = objectURL;
          vm.image = myImage.src
      })
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
  deleteAd() {
    var vm = this
    let data = {id: vm.id}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/delete_ad/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'error',
                text: 'Reklam Silindi!'
            });
        }
      });
  }
}
};
</script>

<style>

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

.activity_item_center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.activity_item_center img {
  flex: 0 0 70%;
  margin-bottom: 20px;
  max-width: 600px;
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
  width: 160px;
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

.activity_status {
  margin-top: -18px;
}

</style>