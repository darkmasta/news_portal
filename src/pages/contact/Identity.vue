<template>
  <div style="overflow: hidden;">
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

    <b-row class="editor-container mt-3">
      <b-col cols="6" class="offset-7">
        <div class="editor-center mt-2">
          <ckeditor :editor="editor" @ready="onReady" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-6">
      <b-col offset="9">
         <b-btn @click="submitPost" variant="primary rounded-pill" class="new-post-btn mt-5">
          <span class="fas fa-plus-circle"></span> Künye Kaydet
         </b-btn>
      </b-col>
    </b-row>
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
      //   toolbar: {
      //   items: [
      //     'heading',
      //     '|',
      //     'fontSize',
      //     'fontFamily',
      //     'fontColor',
      //     'fontBackgroundColor',
      //     '|',
      //     'bold',
      //     'italic',
      //     'underline',
      //     'strikethrough',
      //     '|',
      //     'alignment',
      //     '|',
      //     'numberedList',
      //     'bulletedList',
      //     '|',
      //     'indent',
      //     'outdent',
      //     '|',
      //     'link',
      //     'blockQuote',
      //     'imageUpload',
      //     'insertTable',
      //     'mediaEmbed',
      //     '|',
      //     'undo',
      //     'redo',
      //   ]
      // },
      },
      kunyeHeading: ''
    }
  },
  created() {
    var vm = this;


    vm.owner = this.$store.getters.getUser

  },
  methods: {
    submitPost: function () {
      var vm = this
      console.log(vm.editorData)

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
</style>