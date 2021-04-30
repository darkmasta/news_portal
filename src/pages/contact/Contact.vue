<template>
  <div style="overflow: hidden;">
    <div class="row">
      <div class="col-md-12">
          <h2 style="text-decoration: underline;">İLETİŞİM</h2>
      </div>
    </div>

    <b-row>
      <b-col cols="10" class="offset-1 mb-3">
        <b-input-group prepend="Iletisim Baslik" class="mt-2">
          <b-form-input v-model="contactHeading"></b-form-input>
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
         <b-btn @click="submitContact" variant="primary rounded-pill" class="new-post-btn mt-5">
          <span class="fas fa-plus-circle"></span> Iletişim Kaydet
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
      editorData: '<p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>defensehere_tr@defensehere.com</strong></span></p>' +
                  '<p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>+90 539 484 99 02</strong></span></p><p style="text-align:center;">' +
                  '<span style="background-color:white;color:#434343;"><strong>+90 312 354 99 02</strong></span></p><p style="text-align:center;"><span style="background-color:white;color:#434343;">' +
                  '<strong>Ostim OSB Mahallesi, 100. Yıl Bulvarı, No:55</strong></span></p><p style="text-align:center;"><span style="background-color:white;color:#434343;">' +
                  '<strong>B blok / 36, Yenimahalle / Ankara</strong></span></p>',
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
      contactHeading: ''
    }
  },
  created() {
    var vm = this;


    vm.owner = this.$store.getters.getUser



    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_identity/")
      .then((response) => {
        // console.log(response.data);
        vm.editorData = response.data.pop().contactContent
      })

  },
  methods: {
    submitContact: function () {
      var vm = this
      console.log(vm.editorData)

      let data = {
        contactContent: vm.editorData
      }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/update_contact/", {data})
        .then((response) => {
          vm.$notify({
              type: 'success',
              text: 'İletişim Başarıyla Güncellendi!'
          });
        })
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