(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e7fcd6ac"],{"3f63":function(t,e,i){},4057:function(t,e,i){"use strict";i("3f63")},"5fee":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("div",{staticClass:"activity_item_center"},[i("img",{attrs:{src:t.activity.activityImage}}),t._v(" "),i("h4",[t._v(t._s(t.activity.activityTitle))])]),t._v(" "),i("div",{staticClass:"col-lg-12 mb-4"},[i("b-card",{attrs:{title:"Etkinlik Güncelle"}},[i("b-card-body",[i("b-row",[i("b-col",[i("b-form-group",{attrs:{label:"Etkinlik Adı"}},[i("b-input",{attrs:{label:"Etkinlik Adı",placeholder:"Etkinlik Adı"},model:{value:t.activity.activityTitle,callback:function(e){t.$set(t.activity,"activityTitle",e)},expression:"activity.activityTitle"}})],1)],1),t._v(" "),i("b-col",[i("b-form-group",{attrs:{label:"Etkinlik Türü"}},[i("b-select",{staticClass:"mb-4",model:{value:t.activity.activityType,callback:function(e){t.$set(t.activity,"activityType",e)},expression:"activity.activityType"}},t._l(t.activityTypeList,(function(e,a){return i("option",{key:a,domProps:{value:e}},[t._v(" \n                      "+t._s(t.activity.activityType)+"\n                    ")])})),0)],1)],1),t._v(" "),i("b-col",{staticClass:"mt-4",attrs:{cols:"1"}},[i("div",{staticClass:"edit_buttons"},[i("span",{staticClass:"ion ion-ios-settings",attrs:{title:"Ekle"},on:{click:function(e){return t.toggleActivitySettings()}}})])])],1),t._v(" "),i("b-row",[i("b-col",{staticClass:"activity-text",attrs:{cols:"6"}},[i("b-form-group",{attrs:{label:"Etkinlik Açıklaması"}},[i("b-textarea",{attrs:{label:"Etkinlik Açıklaması",placeholder:"Etkinlik Açıklaması",rows:"5"},model:{value:t.activity.activityText,callback:function(e){t.$set(t.activity,"activityText",e)},expression:"activity.activityText"}})],1)],1),t._v(" "),i("b-col",{attrs:{cols:"6"}},[i("b-col",{attrs:{cols:"12"}},[i("b-form-group",{attrs:{label:"Etkinlik Dili"}},[i("b-select",{model:{value:t.activity.activityLanguage,callback:function(e){t.$set(t.activity,"activityLanguage",e)},expression:"activity.activityLanguage"}},t._l(t.languages,(function(e,a){return i("option",{key:a,domProps:{value:e}},[t._v(" \n                            "+t._s(t.activity.activityLanguage)+"\n                        ")])})),0)],1)],1),t._v(" "),i("b-col",{attrs:{cols:"12"}},[i("b-form-group",{attrs:{label:"İnternet Sayfası Linki"}},[i("b-input-group",{staticClass:"mt-2",attrs:{placeholder:"İnternet Sayfası Linki"}},[i("b-form-input",{model:{value:t.activity.activityLink,callback:function(e){t.$set(t.activity,"activityLink",e)},expression:"activity.activityLink"}})],1)],1)],1)],1)],1),t._v(" "),t.activitySettings?i("b-row",{staticClass:"mb-3"},[i("hr",{staticClass:"model-hr"}),t._v(" "),i("b-col",{attrs:{cols:"12"}},[i("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Etkinlik Türü"}},[i("b-form-input",{model:{value:t.activityType,callback:function(e){t.activityType=e},expression:"activityType"}}),t._v(" "),i("div",{staticClass:"edit_buttons"},[i("span",{staticClass:"fa fa-check",attrs:{title:"Ekle"},on:{click:function(e){return t.addToActivityTypeList(t.activityType)}}})])],1)],1),t._v(" "),t._l(t.activityTypeList,(function(e,a){return i("b-col",{key:a,attrs:{cols:"2"}},[i("span",{staticClass:"identityItem"},[t._v(t._s(e)+" \n                    "),i("i",{staticClass:"fa fa-times",on:{click:function(e){return t.removeFromActivityTypeList(a)}}})])])})),t._v(" "),i("hr",{staticClass:"model-hr"}),t._v(" "),i("b-col",{staticClass:"offset-10"},[i("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:t.updateActivityTypeList}},[t._v("Etkinlik Türü Listesini Guncelle")])],1)],2):t._e(),t._v(" "),i("b-row",[i("b-col",[i("b-form-group",{attrs:{label:"Başlangıç Tarihi"}},[i("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Başlangıç Tarihi"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1)],1),t._v(" "),i("b-col",[i("b-form-group",{attrs:{label:"Bitiş Tarihi"}},[i("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Bitiş Tarihi"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)],1),t._v(" "),i("b-col",[i("b-form-group",{attrs:{label:"Reklamda Göster"}},[i("b-select",{model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},t._l(t.visibleOptions,(function(e,a){return i("option",{key:a,domProps:{value:e}},[t._v(" \n                      "+t._s(e)+"\n                    ")])})),0)],1)],1)],1),t._v(" "),i("b-row",[i("b-col",{attrs:{cols:"12"}},[i("div",{staticClass:"upload-example"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}]},[i("cropper",{ref:"cropper",attrs:{src:t.image}})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}],staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(e){return t.reset()}}},[i("i",{staticClass:"fa fa-times"})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}],staticClass:"img-name-text",attrs:{title:"Image Name"}},[t._v("\n                    "+t._s(t.imageName)+"\n                  ")]),t._v(" "),i("b-col",{attrs:{cols:"6",offset:"3"}},[i("div",{staticClass:"img-name"},[i("b-form-group",{attrs:{label:"Görsel İsmi"}},[i("b-form-input",{attrs:{placeholder:"Görsel İsmi"},model:{value:t.imageName,callback:function(e){t.imageName=e},expression:"imageName"}})],1)],1)]),t._v(" "),i("div",{staticClass:"button-wrapper"},[i("span",{staticClass:"button",on:{click:function(e){return t.$refs.file.click()}}},[i("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(e){return t.loadImage(e)}}}),t._v("\n                    Görsel Ekle\n                  ")]),t._v(" "),i("span",{staticClass:"button ml-5",on:{click:t.crop}},[t._v("\n                    Kırp \n                  ")]),t._v(" "),i("label",{staticClass:"switch"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.toggleEditImage)?t._i(t.toggleEditImage,null)>-1:t.toggleEditImage},on:{change:function(e){var i=t.toggleEditImage,a=e.target,s=!!a.checked;if(Array.isArray(i)){var n=null,l=t._i(i,n);a.checked?l<0&&(t.toggleEditImage=i.concat([n])):l>-1&&(t.toggleEditImage=i.slice(0,l).concat(i.slice(l+1)))}else t.toggleEditImage=s}}}),t._v(" "),i("span",{staticClass:"slider round"}),t._v(" "),i("span",{staticClass:"switch_text",class:{switch_closed:t.toggleEditImage}},[t._v("Resmi Düzenle")])])])],1)])],1),t._v(" "),i("b-row",[i("b-col",{staticClass:"offset-10"},[i("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:t.submitActivity}},[t._v("Etkinlik Ekle")])],1)],1)],1)],1)],1)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row"},[i("div",{staticClass:"col-lg-12"},[i("h4",{staticClass:"font-weight-bold py-3 mb-1"},[i("span",{staticClass:"text-muted font-weight-light"},[t._v("Etkinlik Güncelle")])])])])}],n=(i("d3b7"),i("2b3d"),i("3ca3"),i("ddb0"),i("bc3a")),l=i.n(n),c=(i("c46f"),i("a2c1")),o=(i("f7aa"),i("fa33")),r=i("97fc"),d=i.n(r),u=(i("1e11"),{name:"Activity",components:{Cropper:c["a"],Datepicker:o["a"],VueTimepicker:d.a},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦","Hepsi 🌍"],activity:{activityImage:""},expandTab:"",publishDate:"",publishHour:"",statusList:["Onay Bekliyor","Onayli","Red"],activityTypeList:["Konferans","Panel","Söyleşi"],activityType:"",status:"",toggleEditImage:!1,imageName:"",image:null,startDate:null,endDate:null,activitySettings:!1,visibleOptions:["Reklamda Göster","Reklamdan Kaldır"],visible:"",coordinates:{width:0,height:0,left:0,top:0},result:{coordinates:null,image:null}}},created:function(){var t=this,e={};e.id=t.$route.params.id,t.id=e.id,l.a.post("https://defensehere.herokuapp.com/get_activity",{data:e}).then((function(e){console.log(e.data),t.activity=e.data,t.imageName=e.data.activityImage,t.startDate=e.data.startDate,t.endDate=e.data.endDate,t.activityType=e.data.activityType,t.activity.activityImage="https://defensehere.herokuapp.com/images/"+e.data.activityImage,console.log(t.post)}),(function(t){console.error(t)}))},methods:{submitActivity:function(){var t=this,e=this.$refs.cropper.getResult(),i=(e.coordinates,e.canvas);if(i)if(t.imageName)if(t.activity.activityTitle)if(t.startDate)if(t.endDate)if(t.status){if(i){new FormData;i.toBlob((function(e){t.blobToBase64(e).then((function(e){var i=new FormData;i.append("file",e),i.append("fileName",t.imageName),i.append("owner",t.owner),i.append("activityTitle",t.activity.activityTitle),"Onay Bekliyor"==t.status?i.append("status","unconfirmed"):"Onayli"==t.status?i.append("status","confirmed"):"Red"==t.status&&i.append("status","unconfirmed"),i.append("activityType",t.activityType),i.append("startDate",t.startDate),i.append("endDate",t.endDate),i.append("id",t.id),console.log(i),l.a.post("https://defensehere.herokuapp.com/update_activity/",i,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var i=e.data;console.log(i),"success"==e.data&&t.$notify({type:"success",text:"Etkinlik Guncellendi!"})}))}))}),"image/jpeg")}}else t.$notify({type:"warn",text:"Lutfen Etkinlik Statusunu Kontrol Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Bitis Tarihini Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Baslangic Tarihini Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Ismini Kontrol Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Resim Ismini Kontrol Ediniz!",duration:3e3});else t.$notify({type:"warn",text:"Lutfen Etkinlik Resmini Kontrol Ediniz!",duration:3e3})},onReady:function(t){t.ui.getEditableElement().parentElement.insertBefore(t.ui.view.toolbar.element,t.ui.getEditableElement())},crop:function(){var t=this.$refs.cropper.getResult(),e=t.coordinates,i=t.canvas;this.coordinates=e,this.image=i.toDataURL()},reset:function(){this.image=null},getImage:function(){var t=this;fetch("https://defensehere.herokuapp.com/images/"+t.imageName).then((function(t){return t.blob()})).then((function(e){var i=URL.createObjectURL(e),a=new Image;a.src=i,t.image=a.src}))},loadImage:function(t){var e=this,i=t.target;if(i.files&&i.files[0]){var a=new FileReader;a.onload=function(t){e.image=t.target.result,e.base64=e.image},a.readAsDataURL(i.files[0])}},blobToBase64:function(t){var e=new FileReader;return e.readAsDataURL(t),new Promise((function(t){e.onloadend=function(){t(e.result)}}))},confirmActivity:function(){var t=this,e={id:t.id};l.a.post("https://defensehere.herokuapp.com/confirm_activity/",{data:e}).then((function(e){console.log(e.data),"success"==e.data&&(t.$notify({type:"success",text:"Etkinlik Onaylandi!"}),t.activity.status="confirmed")}))},unconfirmActivity:function(){var t=this,e={id:t.id};l.a.post("https://defensehere.herokuapp.com/unconfirm_activity/",{data:e}).then((function(e){console.log(e.data),"success"==e.data&&(t.$notify({type:"warning",text:"Etkinlik Reddedildi!"}),t.activity.status="unconfirmed")}))},deleteActivity:function(){var t=this,e={id:t.id};l.a.post("https://defensehere.herokuapp.com/delete_activity/",{data:e}).then((function(e){console.log(e.data),"success"==e.data&&t.$notify({type:"error",text:"Etkinlik Silindi!"})}))}}}),v=u,p=(i("4057"),i("2877")),m=Object(p["a"])(v,a,s,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-e7fcd6ac.f124677b.js.map