(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0887a55a"],{a478:function(e,t,a){},ca6e:function(e,t,a){"use strict";a("a478")},f5485:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{overflow:"hidden"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("h4",[e._v("Create Post")]),e._v(" "),a("span",[e._v("Selected Categories: ")]),e._v(e._s(e.selectedCategories)+"\n    ")])]),e._v(" "),a("b-row",[a("b-col",{staticClass:"categories__container"},e._l(e.categoryTitles,(function(t,s){return a("div",{key:s,staticClass:"categories__single-category",class:{expand_category:e.clickedCategory==s,collapse_category:e.clickedCategory!=s},on:{click:function(t){return e.clickCategory(s)}}},[a("h3",{staticClass:"category__title"},[e._v(e._s(t))]),e._v(" "),a("ul",{staticClass:"category__list"},e._l(e.categoriesData[t],(function(t,s){return a("li",{key:s,staticClass:"category__list-item"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedCategories,expression:"selectedCategories"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.selectedCategories)?e._i(e.selectedCategories,t)>-1:e.selectedCategories},on:{change:function(a){var s=e.selectedCategories,o=a.target,i=!!o.checked;if(Array.isArray(s)){var r=t,n=e._i(s,r);o.checked?n<0&&(e.selectedCategories=s.concat([r])):n>-1&&(e.selectedCategories=s.slice(0,n).concat(s.slice(n+1)))}else e.selectedCategories=i}}}),e._v(" \n            "+e._s(t)+"\n          ")])})),0)])})),0)],1),e._v(" "),a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("div",{staticClass:"upload-example"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.image,expression:"image"}]},[a("cropper",{ref:"cropper",attrs:{src:e.image,transitions:!0},on:{change:e.updateSize}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.image,expression:"image"}],staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(t){return e.reset()}}},[a("i",{staticClass:"fa fa-times"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.image,expression:"image"}],staticClass:"img-name-text",attrs:{title:"Image Name"}},[e._v("\n          "+e._s(e.imageName)+"\n        ")]),e._v(" "),a("b-col",{attrs:{cols:"6",offset:"3"}},[a("div",{staticClass:"img-name"},[a("b-form-group",{attrs:{label:"Foto Ismi"}},[a("b-form-input",{attrs:{placeholder:"Foto Ismi"},model:{value:e.imageName,callback:function(t){e.imageName=t},expression:"imageName"}})],1)],1)]),e._v(" "),a("div",{staticClass:"button-wrapper"},[a("span",{staticClass:"button",on:{click:function(t){return e.$refs.file.click()}}},[a("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(t){return e.loadImage(t)}}}),e._v("\n          Load image\n        ")]),e._v(" "),a("span",{staticClass:"button ml-5",on:{click:e.crop}},[e._v("\n          Crop \n        ")]),e._v(" "),a("label",{staticClass:"switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.toggleEditImage)?e._i(e.toggleEditImage,null)>-1:e.toggleEditImage},on:{change:function(t){var a=e.toggleEditImage,s=t.target,o=!!s.checked;if(Array.isArray(a)){var i=null,r=e._i(a,i);s.checked?r<0&&(e.toggleEditImage=a.concat([i])):r>-1&&(e.toggleEditImage=a.slice(0,r).concat(a.slice(r+1)))}else e.toggleEditImage=o}}}),e._v(" "),a("span",{staticClass:"slider round"}),e._v(" "),a("span",{staticClass:"switch_text",class:{switch_closed:e.toggleEditImage}},[e._v("Resmi Duzenle")])]),e._v(" "),a("label",{staticClass:"switch2 mr-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.saveAsDraft,expression:"saveAsDraft"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.saveAsDraft)?e._i(e.saveAsDraft,null)>-1:e.saveAsDraft},on:{change:function(t){var a=e.saveAsDraft,s=t.target,o=!!s.checked;if(Array.isArray(a)){var i=null,r=e._i(a,i);s.checked?r<0&&(e.saveAsDraft=a.concat([i])):r>-1&&(e.saveAsDraft=a.slice(0,r).concat(a.slice(r+1)))}else e.saveAsDraft=o}}}),e._v(" "),a("span",{staticClass:"slider round"}),e._v(" "),a("p",{staticClass:"switch_text2",class:{switch_closed:e.saveAsDraft}},[e._v("Taslak")])])])],1)]),e._v(" "),a("b-row",[a("b-col",{staticClass:"publish_date mt-4 ml-3",attrs:{cols:"12"}},[a("b-col",{staticClass:"offset-8",attrs:{cols:"11"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Haber Basligi"}},[a("b-form-input",{model:{value:e.postTitle,callback:function(t){e.postTitle=t},expression:"postTitle"}})],1)],1),e._v(" "),a("b-col",{attrs:{cols:"3"}},[a("b-form-group",{attrs:{label:"Yayinlanma Tarihi"}},[a("datepicker",{attrs:{"bootstrap-styling":!0,"monday-first":!0,"full-month-name":!0,placeholder:"Yayin Tarihi"},model:{value:e.publishDate,callback:function(t){e.publishDate=t},expression:"publishDate"}})],1)],1),e._v(" "),a("b-col",{attrs:{cols:"3"}},[a("b-form-group",{attrs:{label:"Yayinlanma Saati"}},[a("vue-timepicker",{attrs:{"close-on-complete":""},model:{value:e.publishHour,callback:function(t){e.publishHour=t},expression:"publishHour"}})],1)],1)],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Haber URL'si"}},[a("b-form-input",{model:{value:e.postCustomUrl,callback:function(t){e.postCustomUrl=t},expression:"postCustomUrl"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Haber Anahtar Kelimeler"}},[a("b-form-input",{model:{value:e.postKeywords,callback:function(t){e.postKeywords=t},expression:"postKeywords"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Seo Anahtar Kelimeler"}},[a("b-form-input",{model:{value:e.postSeoWords,callback:function(t){e.postSeoWords=t},expression:"postSeoWords"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Seo Url Adresi"}},[a("b-form-input",{model:{value:e.postSeoUrl,callback:function(t){e.postSeoUrl=t},expression:"postSeoUrl"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Seo Baslik Aciklamasi"}},[a("b-form-input",{model:{value:e.postSeoHeader,callback:function(t){e.postSeoHeader=t},expression:"postSeoHeader"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"divider mt-4 mb-4"}),e._v(" "),a("b-row",[a("b-col",[a("div",{staticClass:"editor-center mt-2"},[a("ckeditor",{attrs:{editor:e.editor,config:e.editorConfig},model:{value:e.editorData,callback:function(t){e.editorData=t},expression:"editorData"}})],1)])],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Baglantili Ingilizce Haber 🇬🇧"}},[a("b-form-input",{model:{value:e.postEnglishLink,callback:function(t){e.postEnglishLink=t},expression:"postEnglishLink"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Baglantili Arapca Haber 🇸🇦"}},[a("b-form-input",{model:{value:e.postArabicLink,callback:function(t){e.postArabicLink=t},expression:"postArabicLink"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Baglantili Rusca Haber 🇷🇺"}},[a("b-form-input",{model:{value:e.postRussianLink,callback:function(t){e.postRussianLink=t},expression:"postRussianLink"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Baglantili Ukraynaca Haber 🇺🇦"}},[a("b-form-input",{model:{value:e.postUkranianLink,callback:function(t){e.postUkranianLink=t},expression:"postUkranianLink"}})],1)],1)],1),e._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Baglantili Fransizca Haber 🇫🇷"}},[a("b-form-input",{model:{value:e.postFrenchLink,callback:function(t){e.postFrenchLink=t},expression:"postFrenchLink"}})],1)],1)],1),e._v(" "),a("b-row",{staticClass:"mt-4"},[a("b-col",{attrs:{offset:"9"}},[a("b-btn",{staticClass:"new-post-btn",attrs:{variant:"primary rounded-pill"},on:{click:e.submitPost}},[a("span",{staticClass:"fas fa-plus-circle"}),e._v(" Haberi Kaydet\n       ")])],1)],1)],1)},o=[],i=a("2909"),r=(a("4d63"),a("ac1f"),a("25f0"),a("a15b"),a("1276"),a("159b"),a("6062"),a("d3b7"),a("3ca3"),a("ddb0"),a("b0c0"),a("2b0e")),n=a("bc3a"),l=a.n(n),p=(a("c46f"),a("a2c1")),c=(a("f7aa"),a("fa33")),d=a("97fc"),u=a.n(d),g=(a("1e11"),a("9da1")),m=a("fb3d"),f=a.n(m),h=a("6930"),b=a.n(h);r["default"].use(b.a);var v={name:"PostsCreate",components:{Cropper:p["a"],Datepicker:c["a"],VueTimepicker:u.a},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦"],categoriesData:{},clickedCategory:void 0,toggleEditImage:!1,secondTryForBugFix:!1,saveAsDraft:!1,categoryTitles:[],selectedCategories:[],postTitle:"",editor:f.a,editorData:"<p>Content of the editor.</p>",editorConfig:{},coordinates:{width:0,height:0,left:0,top:0},result:{coordinates:null,image:null},base64:"",message:"",file:null,image:null,imageWidth:0,imageHeight:0,imageName:"",postCustomUrl:"",publishDate:"",publishHour:"",postKeywords:"",postSeoWords:"",postSeoUrl:"",postSeoHeader:"",postEnglishLink:"",postArabicLink:"",postRussianLink:"",postUkranianLink:"",postFrenchLink:""}},created:function(){var e=this,t={};t.id=e.$route.params.id,e.id=t.id;var a=new RegExp("^[0-9a-fA-F]{24}$");if(1==a.test(e.id))l.a.post("https://defensehere.herokuapp.com/post_by_id",{data:t}).then((function(t){e.post=t.data,console.log(e.post),e.editorData=e.post.content,e.publishDate=e.post.date,e.publishHour=e.post.publishHour,e.postTitle=e.post.postTitle,e.clickedCategory=e.post.categories,e.imageName=e.post.postImage,e.postCustomUrl=e.post.postCustomUrl,e.postKeywords=e.post.postKeywords,e.postSeoWords=e.post.postSeoWords,e.postSeoUrl=e.post.postSeoUrl,e.postSeoHeader=e.post.postSeoHeader,e.postEnglishLink=e.post.postEnglishLink,e.postArabicLink=e.post.postArabicLink,e.postRussianLink=e.post.postRussianLink,e.postUkranianLink=e.post.postUkranianLink;new FileReader;var a=File.createFromFileName("../../server/images/"+e.post.postImage);console.log(a)}),(function(e){console.error(e)}));else if(0==a.test(e.id)){var s={};console.log(e.$route.params.id),s.postTitle=e.post.postTitle||e.$route.params.id.split("-").join(" "),l.a.post("https://defensehere.herokuapp.com/post_by_title",{data2:s}).then((function(t){console.log(t.data),e.post=t.data,e.post.postImage="https://defensehere.herokuapp.com/images/"+e.post.postImage,console.log(e.post)}),(function(e){console.error(e)}))}e.categoryTitles=Object.keys(g["a"]),l.a.post("https://defensehere.herokuapp.com/get_categories/",{}).then((function(t){e.categoriesData=t.data[0],console.log(e.categoriesData.updatedCategories),e.categoriesData.updatedCategories.forEach((function(t){e.categoryTitles.push(t.topCategory)}));var a=Object(i["a"])(new Set(e.categoryTitles));e.categoryTitles=a,e.categoriesData.updatedCategories.forEach((function(t){e.categoriesData[t.topCategory]?e.categoriesData[t.topCategory].push(t.bottomCategory):(e.categoriesData[t.topCategory]=new Array,""==!t.bottomCategory&&e.categoriesData[t.topCategory].push(t.bottomCategory))}))}))},methods:{submitPost:function(){var e=this,t=this,a=this.$refs.cropper.getResult(),s=a.coordinates,o=a.canvas;if(t.toggleEditImage&&o){console.log(s);new FormData;o.toBlob((function(e){t.blobToBase64(e).then((function(e){var a=new FormData;a.append("file",e),a.append("fileName",t.imageName),a.append("toggleEditImage",t.toggleEditImage),a.append("editorData",t.editorData),a.append("postTitle",t.postTitle),a.append("categories",t.selectedCategories),a.append("publishDate",t.publishDate),a.append("publishHour",t.publishHour),a.append("postKeywords",t.postKeywords),a.append("postCustomUrl",t.postCustomUrl),a.append("postSeoWords",t.postSeoWords),a.append("postSeoUrl",t.postSeoUrl),a.append("postSeoHeader",t.postSeoHeader),a.append("postEnglishLink",t.postEnglishLink),a.append("postArabicLink",t.postArabicLink),a.append("postRussianLink",t.postRussianLink),a.append("postUkranianLink",t.postUkranianLink),a.append("postFrenchLink",t.postFrenchLink),l.a.post("https://defensehere.herokuapp.com/create_post/",a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var a=e.data;console.log(a),"success"==e.data&&t.$notify({type:"success",text:"Haber Resmi Yuklendi!"})}))}))}),"image/jpeg")}else 0==this.toggleEditImage&&0==this.secondTryForBugFix?(this.$refs.cropper.setCoordinates({width:t.imageWidth,height:t.imageHeight,left:0,top:0}),this.$refs.cropper.setCoordinates((function(e){e.coordinates;var t=e.imageSize;return{width:t.width,height:t.height}})),t.secondTryForBugFix=!0,t.$notify({type:"warn",text:"Resim hazirlaniyor, lutfen tekrar deneyin"})):0==this.toggleEditImage&&1==this.secondTryForBugFix&&o.toBlob((function(a){t.blobToBase64(a).then((function(a){console.log(s);var o=new FormData;o.append("file",a),o.append("fileName",t.imageName),o.append("toggleEditImage",t.toggleEditImage),o.append("editorData",t.editorData),o.append("postTitle",t.postTitle),o.append("categories",t.selectedCategories),o.append("publishDate",t.publishDate),o.append("publishHour",t.publishHour),o.append("postKeywords",t.postKeywords),o.append("postCustomUrl",t.postCustomUrl),o.append("postSeoWords",t.postSeoWords),o.append("postSeoUrl",t.postSeoUrl),o.append("postSeoHeader",t.postSeoHeader),o.append("postEnglishLink",t.postEnglishLink),o.append("postArabicLink",t.postArabicLink),o.append("postRussianLink",t.postRussianLink),o.append("postUkranianLink",t.postUkranianLink),o.append("postFrenchLink",t.postFrenchLink),l.a.post("https://defensehere.herokuapp.com/create_post/",o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(a){var s=a.data;console.log(s),"success"==a.data&&(e.secondTryForBugFix=!1,t.$notify({type:"success",text:"Haber Resmi Yuklendi!"}))}))}))}),"image/jpeg")},updateSize:function(e){var t=e.coordinates;this.size.width=Math.round(t.width),this.size.height=Math.round(t.height)},crop:function(){var e=this.$refs.cropper.getResult(),t=e.coordinates,a=e.canvas;this.coordinates=t,this.image=a.toDataURL()},reset:function(){this.image=null},loadImage:function(e){var t=this,a=e.target,s=this;if(a.files&&a.files[0]){console.log(a.files[0]);var o=new FileReader,i=new FileReader;i.onload=function(){var e=new Image;e.onload=function(){s.imageWidth=e.width,s.imageHeight=e.height},e.src=i.result},i.readAsDataURL(a.files[0]),o.onload=function(e){t.image=e.target.result,t.base64=t.image},o.readAsDataURL(a.files[0])}},blobToBase64:function(e){var t=new FileReader;return t.readAsDataURL(e),new Promise((function(e){t.onloadend=function(){e(t.result)}}))},uploadImage:function(){var e=this,t=this,a=this.$refs.cropper.getResult(),s=a.canvas;if(s){var o=this.$refs.file.files[0],i=new FormData;s.toBlob((function(a){e.blobToBase64(a).then((function(e){i.append("file",e),i.append("fileName",o.name.split(".").shift()),i.append("editorData",t.editorData),i.append("postTitle",t.postTitle),i.append("categories",t.selectedCategories),l.a.post("https://defensehere.herokuapp.com/create_post",i,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e.data),"success"==e.data&&t.$notify({type:"success",text:"Haber Resmi Yuklendi!"})}),(function(e){console.log(e)}))}))}),"image/jpeg")}},clickCategory:function(e){var t=this;t.clickedCategory==e?t.clickedCategory=100:t.clickedCategory=e}}},k=v,C=(a("ca6e"),a("2877")),y=Object(C["a"])(k,s,o,!1,null,null,null);t["default"]=y.exports}}]);
//# sourceMappingURL=chunk-0887a55a.650e8c08.js.map