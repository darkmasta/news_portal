<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">{{ $t('ads.create ad') }}</span>
        </h4>
      </div>


      <div class="col-lg-12 mb-4">
        <b-card>
          <h4>{{ $t('ads.new ad form') }}</h4>
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('ads.ad header') }}</legend>
                  <b-input v-model="adTitle" 
                              placeholder="Başlık">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('ads.ad type') }}</legend>
                  <b-select v-model="adType" class="mb-4">
                    <option v-for="(adType, index) in adTypeList" 
                      :key="index" :value="adType"> 
                      {{adType}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('ads.ad language') }}</legend>
                  <b-select v-model="adLanguage" class="">
                    <option v-for="(adLanguage, index) in languages" 
                        :key="index" :value="adLanguage"> 
                        {{adLanguage}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('ads.ad link') }}</legend>
                  <b-input v-model="adLink" 
                              label="Reklam Linki"
                              placeholder="Link">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('ads.ad position') }}</legend>
                  <b-select v-model="adLocation" class="mb-4">
                    <option v-for="(adLocation, index) in adLocationList" 
                      :key="index" :value="adLocation"> 
                      {{adLocation}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('ads.ad status') }}</legend>
                  <b-select v-model="adStatus" class="mb-4">
                    <option v-for="(adStatus, index) in adStatusList" 
                      :key="index" :value="adStatus"> 
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
                        <b-form-group>
                          <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('posts.photo name') }}</legend>
                          <b-form-input v-model="imageName" placeholder="Görsel İsmi"></b-form-input>  
                        </b-form-group>
                    </div>
                  </b-col>
                  <div class="button-wrapper">
                
                  <span class="button" @click="$refs.file.click()">
                    <input ref="file" type="file" accept="image/*" @change="loadImage($event)">
                    {{ $t('posts.add image') }}
                  </span>

                  <span class="button ml-5" @click="crop">
                    {{ $t('posts.crop') }}
                  </span>

                  <label class="switch">
                    <input v-model="toggleEditImage" type="checkbox">
                    <span class="slider round"></span>
                    <span :class="{switch_closed: toggleEditImage}" class="switch_text">{{ $t('posts.edit image') }}</span>
                  </label>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitAd">{{ $t('ads.create ad') }}</b-btn>
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
    adTypeList: ['Ana Sayfa', 'Haber Detay', 'Diger', 'Röportaj'],
    adType: '',
    adLocationList: ['Ana Sayfa En Üst', 'Ana Sayfa Üst', 'Ana Sayfa Orta', 'Ana Sayfa Alt'],
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
  computed: {

  },
  created() {
      var vm = this

      vm.owner = this.$store.getters.getUser
      console.log(vm.owner)

          /*
            axios
              .post(process.env.VUE_APP_SERVER_URL + "/get_posts_most_read_yesterday", {
              })
              .then(
                (response) => {
                  console.log("MOST READ", response.data);
                })
                */
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
            formData.append("adLocation", vm.adLocation)

            console.log(formData)

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