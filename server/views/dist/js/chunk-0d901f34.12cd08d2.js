(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d901f34"],{"04bf":function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[a._m(0),a._v(" "),t("div",{staticClass:"activity_item_center"},[t("img",{attrs:{src:a.ad.adImage}}),a._v(" "),t("h4",[a._v(a._s(a.ad.adTitle))])]),a._v(" "),t("div",{staticClass:"col-lg-12 mb-4"},[t("b-card",{attrs:{title:"Reklam Güncelle"}},[t("b-card-body",[t("b-row",[t("b-col",[t("b-form-group",{attrs:{label:"Reklam Başlığı"}},[t("b-input",{attrs:{label:"Reklam Başlığı",placeholder:"Başlık"},model:{value:a.ad.adTitle,callback:function(e){a.$set(a.ad,"adTitle",e)},expression:"ad.adTitle"}})],1)],1),a._v(" "),t("b-col",[t("b-form-group",{attrs:{label:"Reklam Sayfası"}},[t("b-select",{staticClass:"mb-4",model:{value:a.adType,callback:function(e){a.adType=e},expression:"adType"}},a._l(a.adTypeList,(function(e,n){return t("option",{key:n,domProps:{value:e}},[a._v(" \n                    "+a._s(e)+"\n                  ")])})),0)],1)],1),a._v(" "),t("b-col",[t("b-form-group",{attrs:{label:"Reklam Dili"}},[t("b-select",{model:{value:a.adLanguage,callback:function(e){a.adLanguage=e},expression:"adLanguage"}},a._l(a.languages,(function(e,n){return t("option",{key:n,domProps:{value:e}},[a._v(" \n                      "+a._s(e)+"\n                  ")])})),0)],1)],1)],1),a._v(" "),t("b-row",[t("b-col",[t("b-form-group",{attrs:{label:"Reklam Linki"}},[t("b-input",{attrs:{label:"Reklam Linki",placeholder:"Link"},model:{value:a.adLink,callback:function(e){a.adLink=e},expression:"adLink"}})],1)],1),a._v(" "),t("b-col",[t("b-form-group",{attrs:{label:"Reklam Konumu"}},[t("b-select",{staticClass:"mb-4",model:{value:a.adLocation,callback:function(e){a.adLocation=e},expression:"adLocation"}},a._l(a.adLocationList,(function(e,n){return t("option",{key:n,domProps:{value:e}},[a._v(" \n                    "+a._s(e)+"\n                  ")])})),0)],1)],1),a._v(" "),t("b-col",[t("b-form-group",{attrs:{label:"Reklam Durumu"}},[t("b-select",{staticClass:"mb-4",model:{value:a.adStatus,callback:function(e){a.adStatus=e},expression:"adStatus"}},a._l(a.adStatusList,(function(e,n){return t("option",{key:n,domProps:{value:e}},[a._v(" \n                    "+a._s(e)+"\n                  ")])})),0)],1)],1)],1),a._v(" "),t("b-row",[t("b-col",{attrs:{cols:"12"}},[t("div",{staticClass:"upload-example"},[t("div",{directives:[{name:"show",rawName:"v-show",value:a.image,expression:"image"}]},[t("cropper",{ref:"cropper",attrs:{src:a.image}})],1),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.image,expression:"image"}],staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(e){return a.reset()}}},[t("i",{staticClass:"fa fa-times"})]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.image,expression:"image"}],staticClass:"img-name-text",attrs:{title:"Image Name"}},[a._v("\n                  "+a._s(a.imageName)+"\n                ")]),a._v(" "),t("b-col",{attrs:{cols:"6",offset:"3"}},[t("div",{staticClass:"img-name"},[t("b-form-group",{attrs:{label:"Görsel İsmi"}},[t("b-form-input",{attrs:{placeholder:"Görsel İsmi"},model:{value:a.imageName,callback:function(e){a.imageName=e},expression:"imageName"}})],1)],1)]),a._v(" "),t("div",{staticClass:"button-wrapper"},[t("span",{staticClass:"button",on:{click:function(e){return a.$refs.file.click()}}},[t("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(e){return a.loadImage(e)}}}),a._v("\n                  Görsel Ekle\n                ")]),a._v(" "),t("span",{staticClass:"button ml-5",on:{click:a.crop}},[a._v("\n                  Kırp\n                ")]),a._v(" "),t("label",{staticClass:"switch"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(a.toggleEditImage)?a._i(a.toggleEditImage,null)>-1:a.toggleEditImage},on:{change:function(e){var t=a.toggleEditImage,n=e.target,i=!!n.checked;if(Array.isArray(t)){var s=null,o=a._i(t,s);n.checked?o<0&&(a.toggleEditImage=t.concat([s])):o>-1&&(a.toggleEditImage=t.slice(0,o).concat(t.slice(o+1)))}else a.toggleEditImage=i}}}),a._v(" "),t("span",{staticClass:"slider round"}),a._v(" "),t("span",{staticClass:"switch_text",class:{switch_closed:a.toggleEditImage}},[a._v("Resmi Duzenle")])])])],1)])],1),a._v(" "),t("b-row",[t("b-col",{staticClass:"offset-10"},[t("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:a.submitAd}},[a._v("Reklam Güncelle")])],1)],1)],1)],1)],1)])},i=[function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-12"},[t("h4",{staticClass:"font-weight-bold py-3 mb-1"},[t("span",{staticClass:"text-muted font-weight-light"},[a._v("Reklam Güncelle")])])])])}],s=(t("9911"),t("d3b7"),t("2b3d"),t("3ca3"),t("ddb0"),t("bc3a")),o=t.n(s),l=(t("c46f"),t("a2c1")),d=(t("f7aa"),t("fa33")),r=t("97fc"),c=t.n(r),u=(t("1e11"),{name:"ad",components:{Cropper:l["a"],Datepicker:d["a"],VueTimepicker:c.a},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦","Hepsi 🌍"],ad:{adImage:""},adLanguage:"",expandTab:"",publishDate:"",publishHour:"",statusList:["Onay Bekliyor","Onaylı","Red"],status:"",coordinates:{width:0,height:0,left:0,top:0},result:{coordinates:null,image:null},adName:"",adTitle:"",adImage:"",adTypeList:["Ana Sayfa","Haber Detay","Diger","Röportaj"],adType:"",adLocationList:["Ana Sayfa En Üst","Ana Sayfa Üst","Ana Sayfa Orta","Ana Sayfa Alt"],adLocation:"",adStatusList:["Aktif","Pasif","Beklemede","Vakti Gecti"],adStatus:"",adLink:"",startDate:null,endDate:null,imageName:"",image:null,base64:"",views:0,toggleEditImage:!1}},created:function(){var a=this,e={};e.id=a.$route.params.id,a.id=e.id,o.a.post("https://defensehere.herokuapp.com/get_ad",{data:e}).then((function(e){console.log(e.data),a.ad=e.data,a.imageName=e.data.adImage,a.adType=e.data.adType,a.adTitle=e.data.adName,a.views=e.data.views,a.adLanguage=a.ad.adLanguage,a.adLink=e.data.link,a.ad.adImage="https://defensehere.herokuapp.com/images/"+e.data.adImage,a.adStatus=e.data.status,a.adLocation=e.data.adLocation}),(function(a){console.error(a)}))},methods:{submitAd:function(){var a=this,e=this.$refs.cropper.getResult(),t=(e.coordinates,e.canvas);if(a.imageName)if(a.ad.adTitle)if(t){if(t){new FormData;t.toBlob((function(e){a.blobToBase64(e).then((function(e){var t=new FormData;t.append("file",e),t.append("fileName",a.imageName),t.append("owner",a.owner),t.append("adTitle",a.ad.adTitle),t.append("adType",a.adType),t.append("adLocation",a.adLocation),t.append("adLanguage",a.adLanguage),t.append("adLink",a.adLink),t.append("status",a.adStatus),t.append("id",a.id),console.log(t),o.a.post("https://defensehere.herokuapp.com/update_ad/",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var t=e.data;console.log(t),"success"==e.data&&(a.$notify({type:"success",text:"Reklam Guncellendi!"}),location.reload())}))}))}),"image/jpeg")}}else{var n=new FormData;n.append("file","null"),n.append("fileName",a.imageName),n.append("owner",a.owner),n.append("adTitle",a.ad.adTitle),n.append("adType",a.adType),n.append("adLocation",a.adLocation),n.append("adLanguage",a.adLanguage),n.append("adLink",a.adLink),n.append("status",a.adStatus),n.append("id",a.id),console.log(n),o.a.post("https://defensehere.herokuapp.com/update_ad/",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var t=e.data;console.log(t),"success"==e.data&&(a.$notify({type:"success",text:"Reklam Guncellendi!"}),location.reload())}))}else a.$notify({type:"warn",text:"Lutfen Reklam Ismini Kontrol Ediniz!",duration:3e3});else a.$notify({type:"warn",text:"Lutfen Reklam Resim Ismini Kontrol Ediniz!",duration:3e3})},crop:function(){var a=this.$refs.cropper.getResult(),e=a.coordinates,t=a.canvas;this.coordinates=e,this.image=t.toDataURL()},reset:function(){this.image=null},getImage:function(){var a=this;fetch("https://defensehere.herokuapp.com/images/"+a.imageName).then((function(a){return a.blob()})).then((function(e){var t=URL.createObjectURL(e),n=new Image;n.src=t,a.image=n.src}))},loadImage:function(a){var e=this,t=a.target;if(t.files&&t.files[0]){var n=new FileReader;n.onload=function(a){e.image=a.target.result,e.base64=e.image},n.readAsDataURL(t.files[0])}},blobToBase64:function(a){var e=new FileReader;return e.readAsDataURL(a),new Promise((function(a){e.onloadend=function(){a(e.result)}}))},confirmAd:function(){var a=this,e={id:a.id};o.a.post("https://defensehere.herokuapp.com/confirm_ad/",{data:e}).then((function(e){console.log(e.data),"success"==e.data&&(a.$notify({type:"success",text:"Reklam Onaylandi!"}),a.ad.status="confirmed")}))},unconfirmAd:function(){var a=this,e={id:a.id};o.a.post("https://defensehere.herokuapp.com/unconfirm_ad/",{data:e}).then((function(e){console.log(e.data),"success"==e.data&&(a.$notify({type:"error",text:"Reklam Reddedildi!"}),a.ad.status="unconfirmed")}))},deleteAd:function(){var a=this,e={id:a.id};o.a.post("https://defensehere.herokuapp.com/delete_ad/",{data:e}).then((function(e){console.log(e.data),"success"==e.data&&a.$notify({type:"error",text:"Reklam Silindi!"})}))}}}),p=u,m=(t("e1a4"),t("2877")),g=Object(m["a"])(p,n,i,!1,null,null,null);e["default"]=g.exports},"1ded":function(a,e,t){},e1a4:function(a,e,t){"use strict";t("1ded")}}]);
//# sourceMappingURL=chunk-0d901f34.12cd08d2.js.map