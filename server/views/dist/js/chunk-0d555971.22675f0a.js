(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d555971","chunk-e7fcd6ac"],{"3f63":function(t,i,e){},4057:function(t,i,e){"use strict";e("3f63")},"5fee":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[t._m(0),t._v(" "),e("div",{staticClass:"activity_item_center"},[e("img",{attrs:{src:t.activity.activityImage}}),t._v(" "),e("h4",[t._v(t._s(t.activity.activityTitle))])]),t._v(" "),e("div",{staticClass:"col-lg-12 mb-4"},[e("b-card",{attrs:{title:"Etkinlik Güncelle"}},[e("b-card-body",[e("b-row",[e("b-col",[e("b-form-group",{attrs:{label:"Etkinlik Adı"}},[e("b-input",{attrs:{label:"Etkinlik Adı",placeholder:"Etkinlik Adı"},model:{value:t.activity.activityTitle,callback:function(i){t.$set(t.activity,"activityTitle",i)},expression:"activity.activityTitle"}})],1)],1),t._v(" "),e("b-col",[e("b-form-group",{attrs:{label:"Etkinlik Türü"}},[e("b-select",{staticClass:"mb-4",model:{value:t.activity.activityType,callback:function(i){t.$set(t.activity,"activityType",i)},expression:"activity.activityType"}},t._l(t.activityTypeList,(function(i,a){return e("option",{key:a,domProps:{value:i}},[t._v(" \n                      "+t._s(t.activity.activityType)+"\n                    ")])})),0)],1)],1),t._v(" "),e("b-col",{staticClass:"mt-4",attrs:{cols:"1"}},[e("div",{staticClass:"edit_buttons"},[e("span",{staticClass:"ion ion-ios-settings",attrs:{title:"Ekle"},on:{click:function(i){return t.toggleActivitySettings()}}})])])],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"activity-text",attrs:{cols:"6"}},[e("b-form-group",{attrs:{label:"Etkinlik Açıklaması"}},[e("b-textarea",{attrs:{label:"Etkinlik Açıklaması",placeholder:"Etkinlik Açıklaması",rows:"5"},model:{value:t.activity.activityText,callback:function(i){t.$set(t.activity,"activityText",i)},expression:"activity.activityText"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"6"}},[e("b-col",{attrs:{cols:"12"}},[e("b-form-group",{attrs:{label:"Etkinlik Dili"}},[e("b-select",{model:{value:t.activity.activityLanguage,callback:function(i){t.$set(t.activity,"activityLanguage",i)},expression:"activity.activityLanguage"}},t._l(t.languages,(function(i,a){return e("option",{key:a,domProps:{value:i}},[t._v(" \n                            "+t._s(t.activity.activityLanguage)+"\n                        ")])})),0)],1)],1),t._v(" "),e("b-col",{attrs:{cols:"12"}},[e("b-form-group",{attrs:{label:"İnternet Sayfası Linki"}},[e("b-input-group",{staticClass:"mt-2",attrs:{placeholder:"İnternet Sayfası Linki"}},[e("b-form-input",{model:{value:t.activity.activityLink,callback:function(i){t.$set(t.activity,"activityLink",i)},expression:"activity.activityLink"}})],1)],1)],1)],1)],1),t._v(" "),t.activitySettings?e("b-row",{staticClass:"mb-3"},[e("hr",{staticClass:"model-hr"}),t._v(" "),e("b-col",{attrs:{cols:"12"}},[e("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Etkinlik Türü"}},[e("b-form-input",{model:{value:t.activityType,callback:function(i){t.activityType=i},expression:"activityType"}}),t._v(" "),e("div",{staticClass:"edit_buttons"},[e("span",{staticClass:"fa fa-check",attrs:{title:"Ekle"},on:{click:function(i){return t.addToActivityTypeList(t.activityType)}}})])],1)],1),t._v(" "),t._l(t.activityTypeList,(function(i,a){return e("b-col",{key:a,attrs:{cols:"2"}},[e("span",{staticClass:"identityItem"},[t._v(t._s(i)+" \n                    "),e("i",{staticClass:"fa fa-times",on:{click:function(i){return t.removeFromActivityTypeList(a)}}})])])})),t._v(" "),e("hr",{staticClass:"model-hr"}),t._v(" "),e("b-col",{staticClass:"offset-10"},[e("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:t.updateActivityTypeList}},[t._v("Etkinlik Türü Listesini Guncelle")])],1)],2):t._e(),t._v(" "),e("b-row",[e("b-col",[e("b-form-group",{attrs:{label:"Başlangıç Tarihi"}},[e("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Başlangıç Tarihi"},model:{value:t.startDate,callback:function(i){t.startDate=i},expression:"startDate"}})],1)],1),t._v(" "),e("b-col",[e("b-form-group",{attrs:{label:"Bitiş Tarihi"}},[e("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Bitiş Tarihi"},model:{value:t.endDate,callback:function(i){t.endDate=i},expression:"endDate"}})],1)],1),t._v(" "),e("b-col",[e("b-form-group",{attrs:{label:"Reklamda Göster"}},[e("b-select",{model:{value:t.visible,callback:function(i){t.visible=i},expression:"visible"}},t._l(t.visibleOptions,(function(i,a){return e("option",{key:a,domProps:{value:i}},[t._v(" \n                      "+t._s(i)+"\n                    ")])})),0)],1)],1)],1),t._v(" "),e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("div",{staticClass:"upload-example"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}]},[e("cropper",{ref:"cropper",attrs:{src:t.image}})],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}],staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(i){return t.reset()}}},[e("i",{staticClass:"fa fa-times"})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}],staticClass:"img-name-text",attrs:{title:"Image Name"}},[t._v("\n                    "+t._s(t.imageName)+"\n                  ")]),t._v(" "),e("b-col",{attrs:{cols:"6",offset:"3"}},[e("div",{staticClass:"img-name"},[e("b-form-group",{attrs:{label:"Görsel İsmi"}},[e("b-form-input",{attrs:{placeholder:"Görsel İsmi"},model:{value:t.imageName,callback:function(i){t.imageName=i},expression:"imageName"}})],1)],1)]),t._v(" "),e("div",{staticClass:"button-wrapper"},[e("span",{staticClass:"button",on:{click:function(i){return t.$refs.file.click()}}},[e("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(i){return t.loadImage(i)}}}),t._v("\n                    Görsel Ekle\n                  ")]),t._v(" "),e("span",{staticClass:"button ml-5",on:{click:t.crop}},[t._v("\n                    Kırp \n                  ")]),t._v(" "),e("label",{staticClass:"switch"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.toggleEditImage)?t._i(t.toggleEditImage,null)>-1:t.toggleEditImage},on:{change:function(i){var e=t.toggleEditImage,a=i.target,s=!!a.checked;if(Array.isArray(e)){var n=null,c=t._i(e,n);a.checked?c<0&&(t.toggleEditImage=e.concat([n])):c>-1&&(t.toggleEditImage=e.slice(0,c).concat(e.slice(c+1)))}else t.toggleEditImage=s}}}),t._v(" "),e("span",{staticClass:"slider round"}),t._v(" "),e("span",{staticClass:"switch_text",class:{switch_closed:t.toggleEditImage}},[t._v("Resmi Düzenle")])])])],1)])],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"offset-10"},[0==t.isConfirmed?e("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:function(i){t.isConfirmed=!0}}},[t._v("Onayla")]):t._e(),t._v(" "),1==t.isConfirmed?e("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:function(i){t.isConfirmed=!1}}},[t._v("Red")]):t._e()],1)],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"offset-10"},[e("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:t.submitActivity}},[t._v("Etkinlik Guncelle")])],1)],1)],1)],1)],1)])},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-12"},[e("h4",{staticClass:"font-weight-bold py-3 mb-1"},[e("span",{staticClass:"text-muted font-weight-light"},[t._v("Etkinlik Güncelle")])])])])}],n=(e("d3b7"),e("2b3d"),e("3ca3"),e("ddb0"),e("bc3a")),c=e.n(n),o=(e("c46f"),e("a2c1")),l=(e("f7aa"),e("fa33")),r=e("97fc"),v=e.n(r),d=(e("1e11"),{name:"activity",components:{Cropper:o["a"],Datepicker:l["a"],VueTimepicker:v.a},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦","Hepsi 🌍"],activity:{activityImage:""},expandTab:"",publishDate:"",publishHour:"",statusList:["Onay Bekliyor","Onayli","Red"],activityTypeList:["Konferans","Panel","Söyleşi"],activityType:"",status:"",isConfirmed:!1,toggleEditImage:!1,imageName:"",image:null,startDate:null,endDate:null,activitySettings:!1,visibleOptions:["Reklamda Göster","Reklamdan Kaldır"],visible:"",coordinates:{width:0,height:0,left:0,top:0},result:{coordinates:null,image:null}}},created:function(){var t=this,i={};i.id=t.$route.params.id,t.id=i.id,c.a.post("https://defensehere.herokuapp.com/get_activity",{data:i}).then((function(i){console.log(i.data),t.activity=i.data,t.imageName=i.data.activityImage,t.startDate=i.data.startDate,t.endDate=i.data.endDate,t.activityType=i.data.activityType,t.activity.activityImage="https://defensehere.herokuapp.com/images/"+i.data.activityImage,console.log(t.post)}),(function(t){console.error(t)}))},methods:{submitActivity:function(){var t=this,i=this.$refs.cropper.getResult(),e=(i.coordinates,i.canvas);if(e)if(t.imageName)if(t.activity.activityTitle)if(t.startDate)if(t.endDate)if(t.status){if(e){new FormData;e.toBlob((function(i){t.blobToBase64(i).then((function(i){var e=new FormData;e.append("file",i),e.append("fileName",t.imageName),e.append("owner",t.owner),e.append("activityTitle",t.activity.activityTitle),"Onay Bekliyor"==t.status?e.append("status","unconfirmed"):"Onayli"==t.status?e.append("status","confirmed"):"Red"==t.status&&e.append("status","unconfirmed"),e.append("activityType",t.activityType),e.append("startDate",t.startDate),e.append("endDate",t.endDate),e.append("id",t.id),console.log(e),c.a.post("https://defensehere.herokuapp.com/update_activity/",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(i){var e=i.data;console.log(e),"success"==i.data&&t.$notify({type:"success",text:"Etkinlik Guncellendi!"})}))}))}),"image/jpeg")}}else t.$notify({type:"warn",text:"Lutfen Etkinlik Statusunu Kontrol Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Bitis Tarihini Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Baslangic Tarihini Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Ismini Kontrol Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Resim Ismini Kontrol Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Resmini Kontrol Ediniz!",duration:3e3})},onReady:function(t){t.ui.getEditableElement().parentElement.insertBefore(t.ui.view.toolbar.element,t.ui.getEditableElement())},crop:function(){var t=this.$refs.cropper.getResult(),i=t.coordinates,e=t.canvas;this.coordinates=i,this.image=e.toDataURL()},reset:function(){this.image=null},getImage:function(){var t=this;fetch("https://defensehere.herokuapp.com/images/"+t.imageName).then((function(t){return t.blob()})).then((function(i){var e=URL.createObjectURL(i),a=new Image;a.src=e,t.image=a.src}))},loadImage:function(t){var i=this,e=t.target;if(e.files&&e.files[0]){var a=new FileReader;a.onload=function(t){i.image=t.target.result,i.base64=i.image},a.readAsDataURL(e.files[0])}},blobToBase64:function(t){var i=new FileReader;return i.readAsDataURL(t),new Promise((function(t){i.onloadend=function(){t(i.result)}}))},confirmActivity:function(){var t=this,i={id:t.id};c.a.post("https://defensehere.herokuapp.com/confirm_activity/",{data:i}).then((function(i){console.log(i.data),"success"==i.data&&(t.$notify({type:"success",text:"Etkinlik Onaylandi!"}),t.activity.status="confirmed")}))},unconfirmActivity:function(){var t=this,i={id:t.id};c.a.post("https://defensehere.herokuapp.com/unconfirm_activity/",{data:i}).then((function(i){console.log(i.data),"success"==i.data&&(t.$notify({type:"warning",text:"Etkinlik Reddedildi!"}),t.activity.status="unconfirmed")}))},deleteActivity:function(){var t=this,i={id:t.id};c.a.post("https://defensehere.herokuapp.com/delete_activity/",{data:i}).then((function(i){console.log(i.data),"success"==i.data&&t.$notify({type:"error",text:"Etkinlik Silindi!"})}))}}}),u=d,m=(e("4057"),e("2877")),p=Object(m["a"])(u,a,s,!1,null,null,null);i["default"]=p.exports},"660e":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"main_container"},[a("header",[a("div",{staticClass:"logo"},[a("router-link",{attrs:{to:"/"}},[a("img",{attrs:{src:e("9d64")}})])],1),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"select_container"},[a("b-select",{staticClass:"language_box",model:{value:t.language,callback:function(i){t.language=i},expression:"language"}},t._l(t.languages,(function(i,e){return a("option",{key:e,domProps:{value:i}},[t._v(" \n                    "+t._s(i)+"\n                ")])})),0),t._v(" "),a("i",{staticClass:"fas fa-sort-down icon"})],1)]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),a("b-row",{staticClass:"top_activities_container"},t._l(t.ads.slice(0,3),(function(i,e){return a("b-col",{key:e,staticClass:"top_activity_item",attrs:{cols:"4"},on:{click:function(e){return t.incrementClick(i)}}},[a("img",{attrs:{src:i.adImage}}),t._v(" "),a("h3",{staticClass:"ad-title"},[t._v(t._s(i.adName))])])})),1),t._v(" "),a("b-row",{staticClass:"top_slider_container"},[a("b-col",{staticClass:"top_slider",attrs:{cols:"7"}},[a("div",[t._v("SLIDER")])]),t._v(" "),a("b-col",{staticClass:"top_slider_right_box"},[a("b-row",{staticClass:"test_box"},[a("b-col",{staticClass:"slider_right_single_item"},[a("img",{attrs:{src:t.activities[0].activityImage}}),t._v(" "),a("h4",[t._v(t._s(t.activities[0].activityTitle))])]),t._v(" "),a("b-col",{staticClass:"slider_right_single_item"},[a("img",{attrs:{src:t.activities[1].activityImage}}),t._v(" "),a("h4",[t._v(t._s(t.activities[1].activityTitle))])])],1),t._v(" "),a("b-row",{staticClass:"test_box"},[a("b-col",{staticClass:"slider_right_single_item"},[a("img",{attrs:{src:t.activities[3].activityImage}}),t._v(" "),a("h4",[t._v(t._s(t.activities[3].activityTitle))])]),t._v(" "),a("b-col",{staticClass:"slider_right_single_item"})],1),t._v(" "),a("b-row",{staticClass:"test_box"},[a("b-col",{staticClass:"bottom_full_width_ad",attrs:{cols:"12"}})],1)],1)],1),t._v(" "),a("b-row",{staticClass:"top_slider_container"},[a("b-col",{staticClass:"top_slider",attrs:{cols:"7"}},[a("div",[t._v("SLIDER")])]),t._v(" "),a("b-col",{staticClass:"top_slider_right_box"},[a("b-row",{staticClass:"most_views_news"},[a("h3",[t._v("ÇOK OKUNAN HABERLER")])]),t._v(" "),a("b-row",[a("b-col",{staticClass:"view_time"},[a("div",[t._v("Son 24 Saat")])]),t._v(" "),a("b-col",{staticClass:"view_time"},[a("div",[t._v("Son  7 Gün")])]),t._v(" "),a("b-col",{staticClass:"view_time"},[a("div",[t._v("Son 30 Gün")])])],1)],1)],1),t._v(" "),a("b-row",{staticClass:"top_activities_container"},[a("b-col",{staticClass:"top_activity_item",attrs:{cols:"4"}},[a("div",[t._v("SLIDER")])]),t._v(" "),a("b-col",{staticClass:"top_activity_item",attrs:{cols:"4"}},[a("div",[t._v("SLIDER")])]),t._v(" "),a("b-col",{staticClass:"top_activity_item",attrs:{cols:"4"}},[a("div",[t._v("SLIDER")])])],1),t._v(" "),a("b-row",{staticClass:"mt-5"})],1)},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"search"},[e("input"),t._v(" "),e("i",{staticClass:"fa fa-search icon"})])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"news_texts"},[e("ul",[e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")]),t._v(" "),e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")]),t._v(" "),e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")]),t._v(" "),e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")])])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"categories_box"},[e("ul",[e("li",[t._v("Savunma Sanayi")]),t._v(" "),e("li",[t._v("Siber Guvenlik")]),t._v(" "),e("li",[t._v("Uzay")]),t._v(" "),e("li",[t._v("Nukleer")]),t._v(" "),e("li",[t._v("Yapay Zeka")]),t._v(" "),e("li",[t._v("Teknoloji")]),t._v(" "),e("li",[t._v("Catisma Bolgeleri")]),t._v(" "),e("li",[t._v("Sivil Havacilik")]),t._v(" "),e("li",[t._v("Tarih")]),t._v(" "),e("li",[t._v("Diger "),e("span",[e("i",{staticClass:"fas fa-sort-down icon"})])])])])}],n=(e("159b"),e("1276"),e("ac1f"),e("bc3a")),c=e.n(n),o=e("5fee"),l={name:"home-page",metaInfo:{title:"Home Page"},components:{Activity:o["default"]},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦"],language:"Turkce 🇹🇷",activities:[],ads:[]}},created:function(){var t=this;c.a.post("https://defensehere.herokuapp.com/get_ads/",{}).then((function(i){console.log(i.data),t.ads=i.data,t.ads.forEach((function(t){t.adImage="https://defensehere.herokuapp.com/images/"+t.adImage}))})),c.a.post("https://defensehere.herokuapp.com/get_activities/",{}).then((function(i){console.log(i.data),t.activities=i.data,t.activities.forEach((function(t){t.activityImage="https://defensehere.herokuapp.com/images/"+t.activityImage,c.a.get(t.activityImage).then((function(t){})).catch((function(i){i&&(t.activityImage="https://defensehere.herokuapp.com/images/"+t.activityImage.split("/").pop())}))}))}))},methods:{incrementClick:function(t){var i=this,e={id:t._id};c.a.post("https://defensehere.herokuapp.com/click_ad/",{data:e}).then((function(t){console.log(t.data),i.$notify({type:"success",text:"Reklam Tiklandi!"})}))}}},r=l,v=(e("89b1"),e("2877")),d=Object(v["a"])(r,a,s,!1,null,null,null);i["default"]=d.exports},"89b1":function(t,i,e){"use strict";e("edf3")},"9d64":function(t,i,e){t.exports=e.p+"img/logo.e7dc30c6.png"},edf3:function(t,i,e){}}]);
//# sourceMappingURL=chunk-0d555971.22675f0a.js.map