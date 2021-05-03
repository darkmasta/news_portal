<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">Reklam Oluştur</span>
        </h4>
      </div>


      <div class="col-lg-12 mb-4">
        <b-card title="Yeni Reklam Formu">
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group label="Reklam Başlığı">
                  <b-input label="Reklam Başlığı" 
                              placeholder="Başlık"
                              v-model="adTitle">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Reklam Sayfası">
                  <b-select v-model="adType" class="mb-4">
                    <option v-for="(adType, index) in adTypeList" 
                      :key="index" v-bind:value="adType"> 
                      {{adType}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Reklam Dili">
                  <b-select v-model="adLanguage" class="">
                    <option v-for="(adLanguage, index) in languages" 
                        :key="index" v-bind:value="adLanguage"> 
                        {{adLanguage}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group label="Reklam Linki">
                  <b-input label="Reklam Linki" 
                              placeholder="Link"
                              v-model="adLink">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Reklam Konumu">
                  <b-select v-model="adLocation" class="mb-4">
                    <option v-for="(adLocation, index) in adLocationList" 
                      :key="index" v-bind:value="adLocation"> 
                      {{adLocation}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Reklam Durumu">
                  <b-select v-model="adStatus" class="mb-4">
                    <option v-for="(adStatus, index) in adStatusList" 
                      :key="index" v-bind:value="adStatus"> 
                      {{adStatus}}
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
                        <b-form-group label="Görsel İsmi">
                          <b-form-input v-model="imageName" placeholder="Görsel İsmi"></b-form-input>  
                        </b-form-group>
                    </div>
                  </b-col>
                  <div class="button-wrapper">
                
                  <span class="button" @click="$refs.file.click()">
                    <input type="file" ref="file" @change="loadImage($event)" accept="image/*">
                    Görsel Ekle
                  </span>

                  <span class="button ml-5" @click="crop">
                    Kırp
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

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitAd">Reklam Ekle</b-btn>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Datepicker from "vuejs-datepicker";
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: "ad-create",
  metaInfo: {
    title: "Ad Create",
  },
  components: {
    Datepicker,
    Cropper
  },
  data: () => ({
    languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦', 'Hepsi 🌍'],
    adLanguage: '',
    adName: '',
    adTitle: '',
    adImage: '',
    adTypeList: ['Ana Sayfa', 'Haber Detay', 'Diger'],
    adType: '',
    adLocationList: ['Ana Sayfa Ust Sag', 'Ana Sayfa Ust Sol', 'Haber Detay 1', 'Haber Detay  2'],
    adLocation: '',
    adStatusList: ['Aktif', 'Pasif' ],
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
      var vm = this

      vm.owner = this.$store.getters.getUser
      console.log(vm.owner)
  },
  methods: {
    submitAd: function () {
      var vm = this
      vm.toggleEditImage = true
			const { canvas } = this.$refs.cropper.getResult();
			if (vm.toggleEditImage && canvas) {
				const formData = new FormData();
				canvas.toBlob(blob => {
          this.blobToBase64(blob).then(res => {
            const formData = new FormData();
            formData.append('file', res);
            formData.append('fileName', vm.imageName);
            formData.append("adName", vm.adTitle)
            formData.append("adType", vm.adType)
            formData.append("owner", vm.owner)
            formData.append("link", vm.adLink)
            formData.append("adLanguage", vm.adLanguage)

            axios
              .post(process.env.VUE_APP_SERVER_URL + "/create_ad", formData, {
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
                        text: 'Yeni Reklam Basariyla Olusturuldu!'
                    });
                  }
                },
                (response) => {
                  console.log(response);
                }
              );
          });
				}, 'image/jpeg');
			} else if (vm.toggleEditImage == false) {

        const formData = new FormData();

        formData.append("file", vm.base64)
        formData.append('fileName', vm.imageName);
        formData.append("adName", vm.adTitle)
        formData.append("adType", vm.adType)
        formData.append("owner", vm.owner)
        formData.append("link", vm.adLink)
        formData.append("adLanguage", vm.adLanguage)

        axios
          .post(process.env.VUE_APP_SERVER_URL + "/create_ad/", formData, {
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
                  text: 'Yeni Reklam Basariyla Olusturuldu!'
              });
            }
          });
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
  },
  computed: {

  }
} 
</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  margin-left: 50px;
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
  left: 75px;
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
  left: 0;
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
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>