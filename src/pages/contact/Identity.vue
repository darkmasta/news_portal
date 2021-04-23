<template>
  <div style="overflow-x: hidden; overflow-y: scroll;">
    <div class="row">
      <div class="col-md-12">
          <h2 style="text-decoration: underline;">KÜNYE</h2>
      </div>
    </div>


    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Künye Başlık" class="mt-2">
          <b-form-input v-model="kunyeHeading"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Eddifa şirketi adına imtiyaz sahibi" class="mt-2">
          <b-form-input v-model="kunyeImtiyaz"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToKunyeImtiyaz(kunyeImtiyaz)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(kunyeImtiyaz, index) in kunyeImtiyazList" :key="index">
        <span class="identityItem">{{kunyeImtiyaz}} 
          <i class="fa fa-times" @click="removeFromKunyeImtiyaz(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Genel Yayın Yönetmeni" class="mt-2">
          <b-form-input v-model="genelYayinYonetmeni"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToGenelYayinYonetmeni(genelYayinYonetmeni)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(genelYayinYonetmeni, index) in genelYayinYonetmeniList" :key="index">
        <span class="identityItem">{{genelYayinYonetmeni}} 
          <i class="fa fa-times" @click="removeFromGenelYayinYonetmeni(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Arapça Haberler" class="mt-2">
          <b-form-input v-model="arabicNews"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToArabicNews(arabicNews)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(arabicNews, index) in arabicNewsList" :key="index">
        <span class="identityItem">{{arabicNews}} 
          <i class="fa fa-times" @click="removeFromArabicNews(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="İngilizce Haberler" class="mt-2">
          <b-form-input v-model="englishNews"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToEnglishNews(englishNews)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(englishNews, index) in englishNewsList" :key="index">
        <span class="identityItem">{{englishNews}} 
          <i class="fa fa-times" @click="removeFromEnglishNews(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Rusça Haberler" class="mt-2">
          <b-form-input v-model="russianNews"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToRussianNews(russianNews)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(russianNews, index) in russianNewsList" :key="index">
        <span class="identityItem">{{russianNews}} 
          <i class="fa fa-times" @click="removeFromRussianNews(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Türkçe Haberler" class="mt-2">
          <b-form-input v-model="turkishNews"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToTurkishNews(turkishNews)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(turkishNews, index) in turkishNewsList" :key="index">
        <span class="identityItem">{{turkishNews}} 
          <i class="fa fa-times" @click="removeFromTurkishNews(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Kurgu ve Kamera" class="mt-2">
          <b-form-input v-model="camera"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToCamera(camera)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(camera, index) in cameraList" :key="index">
        <span class="identityItem">{{camera}} 
          <i class="fa fa-times" @click="removeFromCamera(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Post Prodüksiyon" class="mt-2">
          <b-form-input v-model="postProduction"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToPostProduction(postProduction)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(postProduction, index) in postProductionList" :key="index">
        <span class="identityItem">{{postProduction}} 
          <i class="fa fa-times" @click="removeFromPostProduction(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Seslendirme" class="mt-2">
          <b-form-input v-model="sound"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToSound(sound)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(sound, index) in soundList" :key="index">
        <span class="identityItem">{{sound}} 
          <i class="fa fa-times" @click="removeFromSound(index)"></i></span>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" class="offset-1">
        <b-input-group prepend="Hukuk Danışmanı" class="mt-2">
          <b-form-input v-model="lawyer"></b-form-input>
          <div class="edit_buttons">
            <span title="Ekle" class="fa fa-check" @click="addToLawyer(lawyer)"></span>
          </div>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row class="offset-1">
      <b-col class="" cols="2" v-for="(lawyer, index) in lawyerList" :key="index">
        <span class="identityItem">{{lawyer}} 
          <i class="fa fa-times" @click="removeFromLawyer(index)"></i></span>
      </b-col>
    </b-row>

    <b-row class="mt-6">
      <b-col offset="8">
         <b-btn @click="showModalFunc" variant="secondary rounded-pill" class="mr-3 new-post-btn mt-5">
          Künye Önizleme
         </b-btn>
         <b-btn @click="submitIdentity" variant="primary rounded-pill" class="new-post-btn mt-5">
          <span class="fas fa-plus-circle"></span> Künye Kaydet
         </b-btn>
      </b-col>
    </b-row>


    <b-row class="editor-container mt-3">
      <b-col cols="6" class="offset-7">
        <div class="editor-center mt-2">
          <ckeditor :editor="editor" @ready="onReady" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
      </b-col>
    </b-row>

    <div role="dialog" aria-modal="true" :class="{'showModal show': showModal }" class="fade modal " tabindex="-1" >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">KÜNYE</h5>
            <button @click="showModal = false" type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
          </div>
          <div class="modal-body">
            <b-row>
              <div class="kunye_box ml-3">
                <h7>Eddifa şirketi adına imtiyaz sahibi</h7>
                <p>{{kunyeImtiyaz || ''}}</p>
              </div>
              <div class="kunye_box">
                <h7>Genel Yayın Yönetmeni</h7>
                <p>{{genelYayinYonetmeni || ""}}</p>
              </div>
              <div class="kunye_box">
                <h7>Finans ve Halkla İlişkiler</h7>
                <p>Furkan Güldemir</p>
              </div>
              <div class="kunye_box">
                <h7>Medya Danışmanı</h7>
                <p>Muhammed Davut Ünalmış</p>
              </div>
            </b-row>
            <hr class="modal-hr">
            <b-row>
              <div class="kunye_box ml-3">
                <h7>Arapça Haberler</h7>
                <p v-for="(arapca,index) in arabicNewsList" :key="index">{{arapca}}</p>
              </div>
              <div class="kunye_box">
                <h7>İngilizce Haberler</h7>
                <p v-for="(ingilizce, index) in englishNewsList" :key="index">{{ingilizce}}</p>
              </div>
              <div class="kunye_box">
                <h7>Rusça Haberler</h7>
                <p v-for="(russian, index) in russianNewsList" :key="index">{{russian}}</p>
              </div>
              <div class="kunye_box">
                <h7>Türkçe Haberler</h7>
                <p v-for="(turkish, index) in turkishNewsList" :key="index">{{turkish}}</p>
              </div>
            </b-row>
            <hr class="modal-hr">
            <b-row>
              <div class="kunye_box ml-3">
                <h7>Kurgu ve Kamera</h7>
                <p v-for="(camera,index) in cameraList" :key="index">{{camera}}</p>
              </div>
              <div class="kunye_box">
                <h7>Post Prodüksiyon</h7>
                <p v-for="(production, index) in postProductionList" :key="index">{{production}}</p>
              </div>
              <div class="kunye_box">
                <h7>Seslendirme</h7>
                <p v-for="(ses, index) in soundList" :key="index">{{ses}}</p>
              </div>
              <div class="kunye_box">
                <h7>Hukuk Danışmanı</h7>
                <p v-for="(law, index) in lawyerList" :key="index">{{law}}</p>
              </div>
            </b-row>
          </div>
          <div class="modal-footer">
            <button @click="showModal = false" type="button" class="btn btn-default">Kapat</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import _ from "underscore";

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use(CKEditor)

export default {
  name: "Contact",
  components: {
  },
  data() {
    return {
      languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
      editor: DecoupledEditor,
      editorData:  '<p style="text-align:center;"><strong>Eddifa şirketi adına imtiyaz sahibi</strong></p><p style="text-align:center;">Mehmet Alğan</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Genel Yayın Yönetmeni</strong></p><p style="text-align:center;">Muhammed Ali Akman</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Arapça Haberler</strong></p><p style="text-align:center;">Muhammed Davut Ünalmış (Editör)</p><p style="text-align:center;">İskender Cansever (Muhabir)</p><p style="text-align:center;">Şuayb Irmak (Muhabir)</p><p style="text-align:center;">Ümame Ünalmış (Muhabir)</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>İngilizce Haberler</strong></p><p style="text-align:center;">Furkan Güldemir (Editör)</p><p style="text-align:center;">Yousef Elganzoury&nbsp;(Muhabir)</p><p style="text-align:center;">Can Yazar (Muhabir)</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Rusça Haberler</strong></p><p style="text-align:center;">Nazgül Kenzhetay (Editör)</p><p style="text-align:center;">Ömer Faruk Türk (Muhabir)</p><p style="text-align:center;">Botir Teshabaev (Muhabir)</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Türkçe Haberler</strong></p><p style="text-align:center;">Meriç Yurt (Muhabir)</p><p style="text-align:center;">Said Çelik (Muhabir)</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Kurgu ve Kamera</strong></p><p style="text-align:center;">Sinan Kocaer</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Post Prodüksiyon</strong></p><p style="text-align:center;">Muhammed Fatih Tokgöz (3D Animasyon Uzmanı)</p><p style="text-align:center;">Mustafa Arıkan Şahin (VFX uzmanı)</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Seslendirme</strong></p><p style="text-align:center;">Mahmut Parlak</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>Hukuk Danışmanı</strong></p><p style="text-align:center;">Av. Esat Kocaoğlu</p>',
      editorConfig: {
      },
      kunyeHeading: '',
      kunyeImtiyaz: '',
      kunyeImtiyazList: [],
      genelYayinYonetmeni: '',
      genelYayinYonetmeniList: [],
      arabicNews: '',
      arabicNewsList: [],
      englishNews: '',
      englishNewsList: [],
      russianNews: '',
      russianNewsList: [],
      turkishNews: '',
      turkishNewsList: [],
      camera: '',
      cameraList: [],
      postProduction: '',
      postProductionList: [],
      lawyer: '',
      lawyerList: [],
      sound: '',
      soundList: [],
      showModal: false,
    }
  },
  created() {
    var vm = this;
    vm.owner = this.$store.getters.getUser


    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_identity/")
      .then((response) => {
        console.log(response.data);
        let kunyeData = response.data.pop()

        vm.kunyeHeading = kunyeData.kunyeHeading
        vm.kunyeImtiyazList = kunyeData.kunyeImtiyaz
        vm.genelYayinYonetmeniList = kunyeData.genelYayinYonetmeni
        vm.arabicNewsList = kunyeData.arabicNews
        vm.englishNewsList = kunyeData.englishNews
        vm.russianNewsList = kunyeData.russianNews
        vm.turkishNewsList = kunyeData.turkishNews
        vm.cameraList = kunyeData.camera 
        vm.postProductionList = kunyeData.postProduction
        vm.lawyerList = kunyeData.lawyer
        vm.soundList = kunyeData.sound
      })



  },
  methods: {
    submitIdentity: function () {
      var vm = this
      let data = {
        kunyeHeading: vm.kunyeHeading,
        kunyeImtiyaz: vm.kunyeImtiyazList,
        genelYayinYonetmeni: vm.genelYayinYonetmeniList,
        arabicNews: vm.arabicNewsList,
        englishNews: vm.englishNewsList,
        russianNews: vm.russianNewsList,
        turkishNews: vm.turkishNewsList,
        camera: vm.cameraList,
        postProduction: vm.postProductionList,
        lawyer: vm.lawyerList,
        sound: vm.soundList,
      }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/update_identity/", {data})
        .then((response) => {
          vm.$notify({
              type: 'success',
              text: 'Künye Başarıyla Güncellendi!'
          });
        })

    },
    showModalFunc() {
      var vm = this
      vm.showModal = true
      console.log("sada");
    },
    addToKunyeImtiyaz(text) {
      var vm = this
      vm.kunyeImtiyazList.push(text)
    },
    removeFromKunyeImtiyaz(index) {
      var vm = this
      vm.kunyeImtiyazList.splice(index, 1)
    },
    addToGenelYayinYonetmeni(text) {
      var vm = this
      vm.genelYayinYonetmeniList.push(text)
    },
    removeFromGenelYayinYonetmeni(index) {
      var vm = this
      vm.genelYayinYonetmeniList.splice(index, 1)
    },
    addToArabicNews(text) {
      var vm = this
      vm.arabicNewsList.push(text)
    },
    removeFromArabicNews(index) {
      var vm = this
      vm.arabicNewsList.splice(index, 1)
    },
    addToEnglishNews(text) {
      var vm = this
      vm.englishNewsList.push(text)
    },
    removeFromEnglishNews(index) {
      var vm = this
      vm.englishNewsList.splice(index, 1)
    },
    addToRussianNews(text) {
      var vm = this
      vm.russianNewsList.push(text)
    },
    removeFromRussianNews(index) {
      var vm = this
      vm.russianNewsList.splice(index, 1)
    },
    addToTurkishNews(text) {
      var vm = this
      vm.turkishNewsList.push(text)
    },
    removeFromTurkishNews(index) {
      var vm = this
      vm.turkishNewsList.splice(index, 1)
    },
    addToCamera(text) {
      var vm = this
      vm.cameraList.push(text)
    },
    removeFromCamera(index) {
      var vm = this
      vm.cameraList.splice(index, 1)
    },
    addToPostProduction(text) {
      var vm = this
      vm.postProductionList.push(text)
    },
    removeFromPostProduction(index) {
      var vm = this
      vm.postProductionList.splice(index, 1)
    },
    addToLawyer(text) {
      var vm = this
      vm.lawyerList.push(text)
    },
    removeFromLawyer(index) {
      var vm = this
      vm.lawyerList.splice(index, 1)
    },
    addToSound(text) {
      var vm = this
      vm.soundList.push(text)
    },
    removeFromSound(index) {
      var vm = this
      vm.soundList.splice(index, 1)
    },
    onReady( editor )  {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }
  },
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

.input-group>.input-group-prepend {
    flex: 0 0 22%;
}

.input-group .input-group-text {
    width: 100%;
}

.modal-xl {
  min-width: 90vw;
  min-height: 90vh;
}

.showModal {
  display: block;
}

.kunye_box {
  margin-right: 2em;
}

.kunye_box h7 {
  font-weight: bold;
}

.model-hr {
  height: 5px;
  color: blue;
}

hr {
  border-bottom: 5px solid #e5e5e5; 
}
</style>