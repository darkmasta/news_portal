<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">Activities/ Create </span>
        </h4>
      </div>


      <div class="col-lg-12 mb-4">
        <b-card title="Yeni Etkinlik Formu">
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group label="Etkinlik Adi">
                  <b-input label="Etkinlik Adi" 
                              placeholder="Etkinlik Adi"
                              v-model="activityName">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Etkinlik Basligi">
                  <b-input label="Etkinlik Basligi" 
                              placeholder="Baslik"
                              v-model="activityTitle">
                  </b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Etkinlik Pozisyonu">
                  <b-select v-model="activityPosition" class="mb-4">
                    <option v-for="(activityPosition, index) in acitivityPositions" 
                      :key="index" v-bind:value="activityPosition"> 
                      {{activityPosition}}
                    </option>
                  </b-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="8">
                <b-row>
                  <b-col>
                    <b-form-group label="Etkinlik Baslangici">
                      <datepicker v-model="startDate" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Baslangic Tarihi" />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Etkinlik Bitisi">
                      <datepicker v-model="endDate" :bootstrap-styling="true" :monday-first="true" :full-month-name="true" placeholder="Bitis Tarihi" />
                    </b-form-group>
                  </b-col>
                </b-row>
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

                  <span class="button ml-5" @click="uploadImage">
                      Upload Image
                  </span>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitActivity()">Etkinlik Ekle</b-btn>
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
  name: "activity-create",
  metaInfo: {
    title: "Activity Create",
  },
  components: {
    Datepicker
  },
  data: () => ({
    activityName: '',
    activityTitle: '',
    activityPosition: '',
    acitivityPositions: ['Ana Sayfa Ust Ilk', 'Ana Sayfa Ust Iki', 'Ana Sayfa Ust Uc'],
    activityImage: '',
    startDate: null,
    endDate: null,
    imageName: '',
    image: null,
  }),
  created() {

  },
  methods: {
    submitActivity: function () {
      var vm = this
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const formData = new FormData();
				canvas.toBlob(blob => {
          this.blobToBase64(blob).then(res => {
            const formData = new FormData();
            formData.append('file', res);
            formData.append('fileName', vm.imageName);
            formData.append("activityTitle", vm.activityTitle)
            formData.append("activityName", vm.activityName)
            formData.append("activityPosition", vm.activityPosition)
            formData.append("startDate", vm.startDate)
            formData.append("endDate", vm.endDate)

            axios
              .post(process.env.VUE_APP_SERVER_URL + "/create_activity", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(
                (response) => {
                  console.log(response.data)
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
    uploadImage2: function() {
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
  },
  computed: {

  }
} 
</script>