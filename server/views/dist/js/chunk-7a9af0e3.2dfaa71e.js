(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a9af0e3"],{"8e26":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"row"},[e._m(0),e._v(" "),a("div",{staticClass:"col-lg-12 mb-4"},[a("b-card",{attrs:{title:"Yeni Etkinlik Formu"}},[a("b-card-body",[a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Adı"}},[a("b-input",{attrs:{label:"Etkinlik Adı",placeholder:"Etkinlik Adı"},model:{value:e.activityTitle,callback:function(t){e.activityTitle=t},expression:"activityTitle"}})],1)],1),e._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Türü"}},[a("b-select",{staticClass:"mb-4",model:{value:e.activityType,callback:function(t){e.activityType=t},expression:"activityType"}},e._l(e.activityTypeList,(function(t,i){return a("option",{key:i,domProps:{value:t}},[e._v(" \n                    "+e._s(t)+"\n                  ")])})),0)],1)],1)],1),e._v(" "),a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Baslangici"}},[a("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Baslangic Tarihi"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}})],1)],1),e._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Bitisi"}},[a("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Bitis Tarihi"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1)],1),e._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Reklamda Göster"}},[a("b-select",{model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},e._l(e.visibleOptions,(function(t,i){return a("option",{key:i,domProps:{value:t}},[e._v(" \n                    "+e._s(t)+"\n                  ")])})),0)],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("div",{staticClass:"upload-example"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.image,expression:"image"}]},[a("cropper",{ref:"cropper",attrs:{src:e.image}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.image,expression:"image"}],staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(t){return e.reset()}}},[a("i",{staticClass:"fa fa-times"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.image,expression:"image"}],staticClass:"img-name-text",attrs:{title:"Image Name"}},[e._v("\n                  "+e._s(e.imageName)+"\n                ")]),e._v(" "),a("b-col",{attrs:{cols:"6",offset:"3"}},[a("div",{staticClass:"img-name"},[a("b-form-group",{attrs:{label:"Foto Ismi"}},[a("b-form-input",{attrs:{placeholder:"Foto Ismi"},model:{value:e.imageName,callback:function(t){e.imageName=t},expression:"imageName"}})],1)],1)]),e._v(" "),a("div",{staticClass:"button-wrapper"},[a("span",{staticClass:"button",on:{click:function(t){return e.$refs.file.click()}}},[a("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(t){return e.loadImage(t)}}}),e._v("\n                   Resim Yükle\n                ")]),e._v(" "),a("span",{staticClass:"button ml-5",on:{click:e.crop}},[e._v("\n                  Kırp \n                ")]),e._v(" "),a("label",{staticClass:"switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.toggleEditImage)?e._i(e.toggleEditImage,null)>-1:e.toggleEditImage},on:{change:function(t){var a=e.toggleEditImage,i=t.target,s=!!i.checked;if(Array.isArray(a)){var n=null,l=e._i(a,n);i.checked?l<0&&(e.toggleEditImage=a.concat([n])):l>-1&&(e.toggleEditImage=a.slice(0,l).concat(a.slice(l+1)))}else e.toggleEditImage=s}}}),e._v(" "),a("span",{staticClass:"slider round"}),e._v(" "),a("span",{staticClass:"switch_text",class:{switch_closed:e.toggleEditImage}},[e._v("Resmi Düzenle")])])])],1)])],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-10"},[a("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:e.submitActivity}},[e._v("Etkinlik Ekle")])],1)],1)],1)],1)],1)])])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-lg-12"},[a("h4",{staticClass:"font-weight-bold py-3 mb-4"},[a("span",{staticClass:"text-muted font-weight-light"},[e._v("Etkinlik Olustur")])])])}],n=(a("d3b7"),a("1276"),a("ac1f"),a("b0c0"),a("bc3a")),l=a.n(n),o=a("fa33"),r=a("a2c1"),c=(a("f7aa"),{name:"activity-create",metaInfo:{title:"Activity Create"},components:{Datepicker:o["a"],Cropper:r["a"]},data:function(){return{activityName:"",activityTitle:"",activityImage:"",activityTypeList:["Konferans","Panel","Söyleşi"],activityType:"",startDate:null,endDate:null,imageName:"",image:null,base64:"",toggleEditImage:!1,visibleOptions:["Reklamda Göster","Reklamdan Kaldır"],visible:""}},created:function(){var e=this;e.owner=this.$store.getters.getUser,console.log(e.owner)},methods:{submitActivity:function(){var e=this,t=this;console.log(t.toggleEditImage);var a=this.$refs.cropper.getResult(),i=a.canvas;if(t.toggleEditImage&&i){new FormData;i.toBlob((function(a){e.blobToBase64(a).then((function(e){var a=new FormData;a.append("file",e),a.append("fileName",t.imageName),a.append("activityTitle",t.activityTitle),a.append("activityType",t.activityType),a.append("startDate",t.startDate),a.append("endDate",t.endDate),a.append("owner",t.owner),"Reklamda Göster"==t.visible?a.append("visible",!0):"Reklamdan Kaldır"==t.visible&&a.append("visible",!1),l.a.post("https://defensehere.herokuapp.com/create_activity",a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e.data)}),(function(e){console.log(e)}))}))}),"image/jpeg")}else if(0==t.toggleEditImage){var s=new FormData;s.append("file",t.base64),s.append("fileName",t.imageName),s.append("activityTitle",t.activityTitle),s.append("activityType",t.activityType),s.append("startDate",t.startDate),s.append("endDate",t.endDate),s.append("owner",t.owner),l.a.post("https://defensehere.herokuapp.com/create_activity/",s,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var a=e.data;console.log(a),"success"==e.data&&t.$notify({type:"success",text:"Yeni Etkinlik Basariyla Olusturuldu!"})}))}},crop:function(){var e=this.$refs.cropper.getResult(),t=e.coordinates,a=e.canvas;this.coordinates=t,this.image=a.toDataURL()},reset:function(){this.image=null},loadImage:function(e){var t=this,a=e.target;if(a.files&&a.files[0]){var i=new FileReader;i.onload=function(e){t.image=e.target.result,t.base64=t.image},i.readAsDataURL(a.files[0])}},blobToBase64:function(e){var t=new FileReader;return t.readAsDataURL(e),new Promise((function(e){t.onloadend=function(){e(t.result)}}))},uploadImage:function(){var e=this,t=this,a=this.$refs.cropper.getResult(),i=a.canvas;if(i){var s=this.$refs.file.files[0],n=new FormData;i.toBlob((function(a){e.blobToBase64(a).then((function(e){n.append("file",e),n.append("fileName",s.name.split(".").shift()),n.append("editorData",t.editorData),n.append("postTitle",t.postTitle),n.append("categories",t.selectedCategories)}))}),"image/jpeg")}}},computed:{}}),p=c,d=(a("a9f0"),a("2877")),m=Object(d["a"])(p,i,s,!1,null,null,null);t["default"]=m.exports},a9f0:function(e,t,a){"use strict";a("f4cb")},f4cb:function(e,t,a){}}]);
//# sourceMappingURL=chunk-7a9af0e3.2dfaa71e.js.map