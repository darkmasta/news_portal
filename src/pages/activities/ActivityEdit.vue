<template>
<div>

  <div class="row">
    <div class="col-lg-12">
      <h4 class="font-weight-bold py-3 mb-1">
        <span class="text-muted font-weight-light">Etkinlik Güncelle</span>
      </h4>
    </div>
  </div> 

  <div class="activity_item_center">
    <img :src="activity.activityImage" />
    <h4>{{activity.activityTitle}}</h4>
  </div>

      <div class="col-lg-12 mb-4">
        <b-card title="Etkinlik Güncelle">
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group label="Etkinlik Adı">
                  <b-input v-model="activity.activityTitle" 
                              label="Etkinlik Adı"
                              placeholder="Etkinlik Adı">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Etkinlik Türü">
                  <b-select v-model="activity.activityType" class="mb-4">
                    <option v-for="(activityType, index) in activityTypeList" 
                      :key="index" :value="activityType"> 
                      {{activity.activityType}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col cols="1" class="mt-4">
                  <div class="edit_buttons">
                    <span title="Ekle" class="ion ion-ios-settings" @click="toggleActivitySettings()"></span>
                  </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6" class="activity-text">
                <b-form-group label="Etkinlik Açıklaması">
                  <b-textarea v-model="activity.activityText" 
                              label="Etkinlik Açıklaması"
                              placeholder="Etkinlik Açıklaması"
                              rows="5">
                  </b-textarea>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                  <b-col cols="12">
                    <b-form-group label="Etkinlik Dili">
                      <b-select v-model="activity.activityLanguage" class="">
                        <option v-for="(activityLanguage, index) in languages" 
                            :key="index" :value="activityLanguage"> 
                            {{activity.activityLanguage}}
                        </option>
                      </b-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group label="İnternet Sayfası Linki">
                      <b-input-group  class="mt-2"
                        placeholder="İnternet Sayfası Linki">
                        <b-form-input v-model="activity.activityLink"></b-form-input>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
              </b-col>
            </b-row>

            <b-row v-if="activitySettings" class="mb-3">
                <hr class="model-hr">
                <b-col cols="12" class="">
                  <b-input-group prepend="Etkinlik Türü" class="mt-2">
                    <b-form-input v-model="activityType"></b-form-input>
                    <div class="edit_buttons">
                      <span title="Ekle" class="fa fa-check" @click="addToActivityTypeList(activityType)"></span>
                    </div>
                  </b-input-group>
                </b-col>

                <b-col v-for="(activityType, index) in activityTypeList" :key="index" class="" cols="2">
                  <span class="identityItem">{{activityType}} 
                    <i class="fa fa-times" @click="removeFromActivityTypeList(index)"></i></span>
                </b-col>
                <hr class="model-hr">
                <b-col class="offset-10">
                  <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="updateActivityTypeList">Etkinlik Türü Listesini Guncelle</b-btn>
                </b-col>
            </b-row>

            <b-row>
              <b-col>
                    <b-form-group label="Başlangıç Tarihi">
                      <datepicker v-model="startDate" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Başlangıç Tarihi" />
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group label="Bitiş Tarihi">
                      <datepicker v-model="endDate" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Bitiş Tarihi" />
                    </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Reklamda Göster">
                  <b-select v-model="visible" class="">
                    <option v-for="(visible, index) in visibleOptions" 
                      :key="index" :value="visible"> 
                      {{visible}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
            </b-row>


            <b-row>
              <b-col cols="12">
                <div class="upload-example">
                  <div v-show="image">
                      <cropper
                        ref="cropper"
                        :src="image"
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
                        <b-form-group label="Görsel İsmi">
                          <b-form-input v-model="imageName" placeholder="Görsel İsmi"></b-form-input>  
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
                    <span :class="{switch_closed: toggleEditImage}" class="switch_text">Resmi Düzenle</span>
                  </label>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    v-if="isConfirmed == false" @click="isConfirmed = true">Onayla</b-btn>
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" 
                    v-if="isConfirmed == true" @click="isConfirmed = false">Red</b-btn>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitActivity">Etkinlik Guncelle</b-btn>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
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
name: "activity",
components: {
  Cropper,
  Datepicker,
  VueTimepicker
},
data: () => ({
  languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦', 'Hepsi 🌍'],
  activity: {
    activityImage: ''
  },
  expandTab: '',
  publishDate: '',
  publishHour: '',
  statusList: ['Onay Bekliyor', 'Onayli', 'Red'],
  activityTypeList: ['Konferans', 'Panel', 'Söyleşi'],
  activityType: '',
  status: '',
  isConfirmed: false,
  toggleEditImage: false,
  imageName: '',
  image: null,
  startDate: null,
  endDate: null,
  activitySettings: false,
  visibleOptions: ['Reklamda Göster', 'Reklamdan Kaldır'],
  visible: '',
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
}),
created() {
  var vm = this;
  let data = {}
  data.id = vm.$route.params.id
  vm.id = data.id

  axios.post(process.env.VUE_APP_SERVER_URL + "/get_activity", {data})
    .then(
    (response) => {
        console.log(response.data)
        vm.activity = response.data
        // setTimeout(() => { if(!vm.image) location.reload(); }, 2000);
        vm.imageName = response.data.activityImage
        vm.startDate = response.data.startDate
        vm.endDate = response.data.endDate
        vm.activityType = response.data.activityType
        vm.activity.activityImage = process.env.VUE_APP_SERVER_URL + /images/ + response.data.activityImage
        console.log(vm.post);
    },
    (err) => {
        console.error(err)
    }
    )

},
methods: {
  submitActivity() {
    var vm = this
    const { coordinates, canvas } = this.$refs.cropper.getResult();
    if (!canvas) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Etkinlik Resmini Kontrol Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.imageName) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Etkinlik Resim Ismini Kontrol Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.activity.activityTitle) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Etkinlik Ismini Kontrol Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.startDate) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Etkinlik Baslangic Tarihini Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.endDate) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Etkinlik Bitis Tarihini Ediniz!',
          duration: 3000,
      });
      return
    }
    if (!vm.status) {
      vm.$notify({
          type: 'warn',
          text: 'Lutfen Etkinlik Statusunu Kontrol Ediniz!',
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
          formData.append("activityTitle", vm.activity.activityTitle)
          if (vm.status == 'Onay Bekliyor') {
            formData.append("status", 'unconfirmed')
          } else if (vm.status == 'Onayli') {
            formData.append("status", 'confirmed')
          } else if (vm.status == 'Red') {
            formData.append("status", 'unconfirmed')
          }
          formData.append("activityType", vm.activityType)
          formData.append("startDate", vm.startDate)
          formData.append("endDate", vm.endDate)
          formData.append("id", vm.id)

          console.log(formData)

          axios
            .post(process.env.VUE_APP_SERVER_URL + "/update_activity/", formData, {
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
  onReady( editor )  {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
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
  confirmActivity() {
    var vm = this
    let data = {id: vm.id}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/confirm_activity/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'success',
                text: 'Etkinlik Onaylandi!'
            });
            vm.activity.status = 'confirmed'
        }
      });
  },
  unconfirmActivity() {
    var vm = this
    let data = {id: vm.id}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/unconfirm_activity/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'warning',
                text: 'Etkinlik Reddedildi!'
            });
            vm.activity.status = 'unconfirmed'
        }
      });
  },
  deleteActivity() {
    var vm = this
    let data = {id: vm.id}
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/delete_activity/", {data})
      .then((response) => {
        console.log(response.data);
        if (response.data == "success") {
            vm.$notify({
                type: 'error',
                text: 'Etkinlik Silindi!'
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