<template>
  <div style="overflow: hidden;">
    <div class="row">
      <div class="col-md-12">
          <h2 style="text-decoration: underline;">{{ $t('main.language settings') }}</h2>
      </div>
    </div>

    <b-row>
      <b-col class="col-md-9 offset-1">
          <b-form-group>
            <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('language.language') }}</legend>
            <b-select v-model="selectedLanguage" class="" @change="changeLang">
              <option v-for="(selectedLanguage, index) in languages" 
                  :key="index" :value="selectedLanguage"> 
                  {{selectedLanguage}}
              </option>
            </b-select>
          </b-form-group>
      </b-col>
    </b-row>

    <div class="nav-tabs-left" v-if="selectedLanguage[0] == 'I'">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(messageCategory, index) in messageCategories" :key="index">
          <a class="nav-link" 
           data-toggle="tab" href="/#/language/edit" :class="{active: expandTab == messageCategory}"
                      @click="expandTab = messageCategory.title">{{ messageCategory.text }}</a>
        </li>
      </ul>
      <div class="tab-content">
          <div id="navs-left-home" class="tab-pane fade" v-for="(messageCategory, index) in messageCategories" :key="index"
            :class="{active: expandTab == messageCategory.title, show: expandTab == messageCategory.title}">

            <b-row>
              <b-col class="col-md-8 ml-5 mt-2" v-for="(message, index) in Object.keys(enMessages[messageCategory.title])" :key="index">
                <div class="language-box">
                  <span>{{message}}</span>
                  <b-form-input class="ml-5" v-model="editedMessage"></b-form-input>
                  <span title="Submit Translation" class="fas fa-check text-info ml-3" 
                    @click="submitLanguage(message, editedMessage, messageCategory)"></span>
                </div>
                <hr />
              </b-col>

            </b-row>
          
          </div>
      </div>
    </div>

    <div class="nav-tabs-left" v-if="selectedLanguage[0] != 'I'">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(messageCategory, index) in messageCategories" :key="index">
          <a class="nav-link" 
           data-toggle="tab" href="/#/language/edit" :class="{active: expandTab == messageCategory}"
                      @click="expandTab = messageCategory.title">{{ messageCategory.text }}</a>
        </li>
      </ul>
      <div class="tab-content">
          <div id="navs-left-home" class="tab-pane fade" v-for="(messageCategory, index) in messageCategories" :key="index"
            :class="{active: expandTab == messageCategory.title, show: expandTab == messageCategory.title}">

            <b-row>
              <b-col class="col-md-8 ml-5 mt-2" v-for="(message, index) in trMessages[messageCategory.title]" :key="index">
                <div class="language-box">
                  <span>{{message}}</span>
                  <b-form-input class="ml-5" v-model="editedMessage"></b-form-input>
                  <span title="Submit Translation" class="fas fa-check text-info ml-3" 
                    @click="submitLanguage(message, editedMessage, messageCategory, index)"></span>
                </div>
                <hr />
              </b-col>

            </b-row>
          
          </div>
      </div>
    </div>
    


    <b-row class="mt-6">
      <b-col offset="9">
         <b-btn variant="primary rounded-pill" class="new-post-btn mt-5" @click="submitLanguage">
          <span class="fas fa-plus-circle"></span> {{ $t('language.save language settings')}}
         </b-btn>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";

import enMessages from '../../locales/en.json'
import trMessages from '../../locales/tr.json'

export default {
  name: "about",
  components: {
  },
  data() {
    return {
      languages: ['Turkce 🇹🇷', 'Ingilizce 🇬🇧', 'Fransizca 🇫🇷', 'Arapca 🇸🇦', 'Ukraynaca 🇺🇦'],
      selectedLanguage: '',
      expandTab: '',
      messageCategories: [],
      enMessages: {},
    }
  },
  created() {
    var vm = this;
    vm.enMessages = enMessages;
    vm.trMessages = trMessages;

    console.log(Object.keys(enMessages['main']))
    /*
    var serverMessages = {
      "main": {
        "post management": "test"
      }
    }
    vm.$i18n.mergeLocaleMessage("en", serverMessages)
    */




  },
  methods: {
    submitLanguage(message, editedMessage, messageCategory, index) {
      var vm = this
      // console.log(message, editedMessage, messageCategory);
      let language = '' 
      if (this.selectedLanguage[0] == "T") {
        language = 'tr'
        // console.log(message, editedMessage, messageCategory, index);
        console.log(index)
        // console.log(Object.keys(vm.trMessages[messageCategory.title]).indexOf(index));
        var data = {language: language, 
                      category:messageCategory.title,
                      text: index,
                      translation: editedMessage
                      }
      } else if (this.selectedLanguage[0] == "I") {
        language = 'en'
        var data = {language: language, 
                      category:messageCategory.title,
                      text: message,
                      translation: editedMessage
                      }
      } else if (this.selectedLanguage[0] == "F") {
        language = 'fr'
        var data = {language: language, 
                      category:messageCategory.title,
                      text: message,
                      translation: editedMessage
                      }
      } else if (this.selectedLanguage[0] == "A") {          
        language = 'ar'
        var data = {language: language, 
                      category:messageCategory.title,
                      text: message,
                      translation: editedMessage
                      }
      } else if (this.selectedLanguage[0] == 'U') {
        language = 'uk'
        var data = {language: language, 
                      category:messageCategory.title,
                      text: message,
                      translation: editedMessage
                      }
      }
      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_translation", {data})
        .then((response) => {
          console.log(response)
          if (response.data == "success") {
            vm.$notify({
                type: 'success',
                text: 'Ceviri basariyla guncellendi!'
            });
          }
        })


    },
    changeLang() {
      var vm = this
      console.log(vm.selectedLanguage[0])

      vm.messageCategories = []

      if (vm.selectedLanguage[0] == 'T') {
        vm.messageCategories = [{ text:"Ana Kelimeler", title: 'main'}, { text: "Haberler", title: 'posts'}, { text: "Etkinliker", title: 'activities'},
            {text: "Reklamlar", title: 'ads'}, {text: "Künye", title: 'identity'}, {text: "İletişim", title: 'contact'}, 
            {text: "Hakkımızda", title: 'about'}, {text: "Kullanıcılar", title: 'users'}, {text: "Kategoriler", title: 'categories'},
            {text: "Etiketler", title: 'tags'}, {text: "SEO", title: 'seo'}, {text: "Diller", title: 'language'}]
      } else if (vm.selectedLanguage[0] == 'I') {
        const keys = Object.keys(enMessages)
        keys.forEach(key => {
          vm.messageCategories.push({text: key, title: key})
        })
      } else {
        vm.messageCategories = [{ text:"Ana Kelimeler", title: 'main'}, { text: "Haberler", title: 'posts'}, { text: "Etkinliker", title: 'activities'},
            {text: "Reklamlar", title: 'ads'}, {text: "Künye", title: 'identity'}, {text: "İletişim", title: 'contact'}, 
            {text: "Hakkımızda", title: 'about'}, {text: "Kullanıcılar", title: 'users'}, {text: "Kategoriler", title: 'categories'},
            {text: "Etiketler", title: 'tags'}, {text: "SEO", title: 'seo'}, {text: "Diller", title: 'language'}]
      }

    }
  },
};
</script>

<style>
.language-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.language-box span {
  flex: 0 0 20%;
}

.language-box .fas {
  cursor: pointer;
}

</style>