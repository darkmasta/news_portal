<template>
  <div style="overflow: hidden;">
    <div class="row">
      <div class="col-md-12">
          <h2 style="text-decoration: underline;">HAKKIMIZDA</h2>
      </div>
    </div>

    <b-row>
      <b-col cols="10" class="offset-1 mb-3">
        <b-input-group prepend="Hakkımızda" class="mt-2">
          <b-form-input v-model="aboutHeading"></b-form-input>
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
         <b-btn @click="submitAbout" variant="primary rounded-pill" class="new-post-btn mt-5">
          <span class="fas fa-plus-circle"></span> Kaydet
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
      editorData: '<p>Türkiye’nin 4 dilde yayın yapan ilk uluslararası savunma sanayii yayın platformu defensehere.com, tecrübeli gazeteci ve savunma sanayii uzmanı kadrosuyla,' +
       '22 Haziran 2020’de yayın hayatına başladı.</p><p>Son yıllarda hızla gelişen ve önemli adımlar atılan Türk savunma sanayiinin bu temposunu, basın alanına taşımayı ve ürettiği' +
       'özel ve son dakika haberleriyle savunma sanayii sektörünün haber kaynağı olmayı hedefleyen defensehere.com, milli teknoloji hamlesinin de önemli bir unsuru olmayı amaçlıyor.</p>' +
       '<p>Başta savunma sanayii olmak üzere siber güvenlik, uzay, nükleer, yapay zeka, teknoloji, çatışma bölgeleri, tarih, yarışmalar, eğitimler ve daha bir çok konuda çeşitli haberler' +
       've multimedya içerikleri üretecek olan defensehere.com, devlet kurumları, düşünce kuruluşları, sektör kümeleri ve çeşitli platformların ürettikleri savunma sanayii haberleri ve' +
       ' içeriklerini, farklı kategoriler altında takipçilerine aktarıyor.</p><p>Yerli ve milli firmaların ve geliştirdikleri ürünlerin tanıtılmasında etkin bir aktör olan defensehere.com, ' + 
       ' Arapça, Rusça ve İngilizce dillerinde hazırladığı haberlerle, Türkiye’deki savunma sanayii gelişmelerini yurt dışına aktarıyor ve böylece Türk savunma sanayii sektörünün de gelişmesine '+ 
       'önemli bir katkı sunuyor.</p><p>&nbsp;</p><blockquote><p>Uluslararası savunma sanayii yayın platformu <a href="https://t.co/gkuZ2pR58a">https://t.co/gkuZ2pR58a</a> yayın hayatına başladı.' + 
       '<a href="https://t.co/24ObfFfwAm">pic.twitter.com/24ObfFfwAm</a></p><p>— DefenseHere (@defensehere_tr) <a href="https://twitter.com/defensehere_tr/status/1275165820189057027?ref_src=twsrc%5Etfw">June 22, 2020</a></p></blockquote>', 
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
      aboutHeading: ''
    }
  },
  created() {
    var vm = this;


    vm.owner = this.$store.getters.getUser

  },
  methods: {
    submitAbout: function () {
      var vm = this
      console.log(vm.editorData)

      let data = {
        aboutContent: vm.editorData
      }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/update_about/", {data})
        .then((response) => {
          vm.$notify({
              type: 'success',
              text: 'Hakkımızda Başarıyla Güncellendi!'
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