<template>
  <div id="app">
    <router-view/>
    <notifications position="top right" />
  </div>
</template>

<style src="@/vendor/styles/bootstrap.scss" lang="scss"></style>
<style src="@/vendor/styles/appwork.scss" lang="scss"></style>
<style src="@/vendor/styles/theme-nexus.scss" lang="scss"></style>
<style src="@/vendor/styles/colors.scss" lang="scss"></style>
<style src="@/vendor/styles/uikit.scss" lang="scss"></style>
<style src="./style.scss" lang="scss"></style>

<script>
import axios from "axios";

export default {
  name: 'app',
  metaInfo: {
    title: 'Index',
    titleTemplate: '%s - Defensehere'
  },
  updated () {
    // Remove loading state
    setTimeout(() => document.body.classList.remove('app-loading'), 1)
  },
  created() {
    var vm = this
    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_english")
      .then((response) => {
        // console.log(response)
        const messages = response.data
        messages.forEach(message => {
          let category = message.category
          let text = message.text.toLowerCase()
          let translation = message.translation
          let outer_tmp_obj = {}
          let inner_tmp_obj = {}
          inner_tmp_obj[text] = translation
          outer_tmp_obj[category] = inner_tmp_obj
          // console.log(outer_tmp_obj)
          console.log(String(message.language), outer_tmp_obj);

          vm.$i18n.mergeLocaleMessage(message.language, outer_tmp_obj)
        });
      })
  }
}
</script>

<style>
body::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

body::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

body::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #282F65;
}

.vue-notification-group {
  top: 20px !important;
  right: 20px !important;
}


</style>
