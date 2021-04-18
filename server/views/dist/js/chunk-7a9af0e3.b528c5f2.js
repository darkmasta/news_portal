(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a9af0e3"],{"8e26":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row"},[t._m(0),t._v(" "),a("div",{staticClass:"col-lg-12 mb-4"},[a("b-card",{attrs:{title:"Yeni Etkinlik Formu"}},[a("b-card-body",[a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Basligi"}},[a("b-input",{attrs:{label:"Etkinlik Basligi",placeholder:"Baslik"},model:{value:t.activityTitle,callback:function(e){t.activityTitle=e},expression:"activityTitle"}})],1)],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Türü"}},[a("b-select",{staticClass:"mb-4",model:{value:t.activityType,callback:function(e){t.activityType=e},expression:"activityType"}},t._l(t.activityTypeList,(function(e,i){return a("option",{key:i,domProps:{value:e}},[t._v(" \n                    "+t._s(e)+"\n                  ")])})),0)],1)],1)],1),t._v(" "),a("b-row",[a("b-col",{attrs:{cols:"8"}},[a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Baslangici"}},[a("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Baslangic Tarihi"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1)],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Etkinlik Bitisi"}},[a("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Bitis Tarihi"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)],1)],1)],1)],1),t._v(" "),a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("div",{staticClass:"upload-example"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}]},[a("cropper",{ref:"cropper",attrs:{src:t.image}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}],staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(e){return t.reset()}}},[a("i",{staticClass:"fa fa-times"})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.image,expression:"image"}],staticClass:"img-name-text",attrs:{title:"Image Name"}},[t._v("\n                  "+t._s(t.imageName)+"\n                ")]),t._v(" "),a("b-col",{attrs:{cols:"6",offset:"3"}},[a("div",{staticClass:"img-name"},[a("b-form-group",{attrs:{label:"Foto Ismi"}},[a("b-form-input",{attrs:{placeholder:"Foto Ismi"},model:{value:t.imageName,callback:function(e){t.imageName=e},expression:"imageName"}})],1)],1)]),t._v(" "),a("div",{staticClass:"button-wrapper"},[a("span",{staticClass:"button",on:{click:function(e){return t.$refs.file.click()}}},[a("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(e){return t.loadImage(e)}}}),t._v("\n                  Load image\n                ")]),t._v(" "),a("span",{staticClass:"button ml-5",on:{click:t.crop}},[t._v("\n                  Crop \n                ")]),t._v(" "),a("label",{staticClass:"switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.toggleEditImage)?t._i(t.toggleEditImage,null)>-1:t.toggleEditImage},on:{change:function(e){var a=t.toggleEditImage,i=e.target,s=!!i.checked;if(Array.isArray(a)){var n=null,o=t._i(a,n);i.checked?o<0&&(t.toggleEditImage=a.concat([n])):o>-1&&(t.toggleEditImage=a.slice(0,o).concat(a.slice(o+1)))}else t.toggleEditImage=s}}}),t._v(" "),a("span",{staticClass:"slider round"}),t._v(" "),a("span",{staticClass:"switch_text",class:{switch_closed:t.toggleEditImage}},[t._v("Resmi Duzenle")])])])],1)])],1),t._v(" "),a("b-row",[a("b-col",{staticClass:"offset-10"},[a("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:t.submitActivity}},[t._v("Etkinlik Ekle")])],1)],1)],1)],1)],1)])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-lg-12"},[a("h4",{staticClass:"font-weight-bold py-3 mb-4"},[a("span",{staticClass:"text-muted font-weight-light"},[t._v("Etkinlik Olustur")])])])}],n=(a("d3b7"),a("1276"),a("ac1f"),a("b0c0"),a("bc3a")),o=a.n(n),l=a("fa33"),r=a("a2c1"),c=(a("f7aa"),{name:"activity-create",metaInfo:{title:"Activity Create"},components:{Datepicker:l["a"],Cropper:r["a"]},data:function(){return{activityName:"",activityTitle:"",activityImage:"",activityTypeList:["Konferans","Panel","Söyleşi"],activityType:"",startDate:null,endDate:null,imageName:"",image:null,base64:"",toggleEditImage:!1}},created:function(){var t=this;t.owner=this.$store.getters.getUser,console.log(t.owner)},methods:{submitActivity:function(){var t=this,e=this;console.log(e.toggleEditImage);var a=this.$refs.cropper.getResult(),i=a.canvas;if(e.toggleEditImage&&i){new FormData;i.toBlob((function(a){t.blobToBase64(a).then((function(t){var a=new FormData;a.append("file",t),a.append("fileName",e.imageName),a.append("activityTitle",e.activityTitle),a.append("activityType",e.activityType),a.append("startDate",e.startDate),a.append("endDate",e.endDate),a.append("owner",e.owner),o.a.post("https://defensehere.herokuapp.com/create_activity",a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){console.log(t.data)}),(function(t){console.log(t)}))}))}),"image/jpeg")}else if(0==e.toggleEditImage){var s=new FormData;s.append("file",e.base64),s.append("fileName",e.imageName),s.append("activityTitle",e.activityTitle),s.append("activityType",e.activityType),s.append("startDate",e.startDate),s.append("endDate",e.endDate),s.append("owner",e.owner),o.a.post("https://defensehere.herokuapp.com/create_activity/",s,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){var a=t.data;console.log(a),"success"==t.data&&e.$notify({type:"success",text:"Yeni Etkinlik Basariyla Olusturuldu!"})}))}},crop:function(){var t=this.$refs.cropper.getResult(),e=t.coordinates,a=t.canvas;this.coordinates=e,this.image=a.toDataURL()},reset:function(){this.image=null},loadImage:function(t){var e=this,a=t.target;if(a.files&&a.files[0]){var i=new FileReader;i.onload=function(t){e.image=t.target.result,e.base64=e.image},i.readAsDataURL(a.files[0])}},blobToBase64:function(t){var e=new FileReader;return e.readAsDataURL(t),new Promise((function(t){e.onloadend=function(){t(e.result)}}))},uploadImage:function(){var t=this,e=this,a=this.$refs.cropper.getResult(),i=a.canvas;if(i){var s=this.$refs.file.files[0],n=new FormData;i.toBlob((function(a){t.blobToBase64(a).then((function(t){n.append("file",t),n.append("fileName",s.name.split(".").shift()),n.append("editorData",e.editorData),n.append("postTitle",e.postTitle),n.append("categories",e.selectedCategories)}))}),"image/jpeg")}}},computed:{}}),p=c,m=(a("a9f0"),a("2877")),d=Object(m["a"])(p,i,s,!1,null,null,null);e["default"]=d.exports},a9f0:function(t,e,a){"use strict";a("f4cb")},f4cb:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7a9af0e3.b528c5f2.js.map