(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0865598a"],{"0ccc":function(t,a,e){},ca29:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{overflow:"hidden"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("h2",{staticStyle:{"text-decoration":"underline"}},[t._v("Haber Olustur")]),t._v(" "),e("span",{staticClass:"info_message"},[t._v(t._s(t.info_message))])])]),t._v(" "),e("div",{staticClass:"nav-tabs-left"},[e("ul",{staticClass:"nav nav-tabs"},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",class:{active:"google"==t.expandTab},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(a){t.expandTab="google"}}},[t._v("SEO Ayarlari")])]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",class:{active:"social"==t.expandTab},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(a){t.expandTab="social"}}},[t._v("Sosyal Medya Linkleri")])]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",class:{active:"seoImage"==t.expandTab},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(a){t.expandTab="seoImage"}}},[t._v("Görsel")])]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",class:{active:"logo"==t.expandTab},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(a){t.expandTab="logo"}}},[t._v("Logo")])]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",class:{active:"favicon"==t.expandTab},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(a){t.expandTab="favicon"}}},[t._v("Favicon")])])]),t._v(" "),e("div",{staticClass:"tab-content"},[e("div",{staticClass:"tab-pane fade",class:{active:"google"==t.expandTab,show:"google"==t.expandTab},attrs:{id:"navs-left-home"}},[e("b-row",{staticClass:"edit_log"},[e("b-col",{staticClass:"offset-3 mt-2",attrs:{cols:"6"}},[e("h3",[t._v("SEO Ayarları")])]),t._v(" "),e("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[e("b-form-group",{attrs:{label:"Google Baslik"}},[e("b-form-input",{attrs:{placeholder:"Google Baslik"},model:{value:t.googleHeading,callback:function(a){t.googleHeading=a},expression:"googleHeading"}})],1)],1),t._v(" "),e("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[e("b-form-group",{attrs:{label:"Google Aciklama"}},[e("b-form-textarea",{attrs:{placeholder:"Google Aciklama"},model:{value:t.googleStatement,callback:function(a){t.googleStatement=a},expression:"googleStatement"}})],1)],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"offset-3",attrs:{cols:"10"}},[e("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Seo Anahtar Kelimeler"}},[e("b-form-input",{model:{value:t.seoKeyword,callback:function(a){t.seoKeyword=a},expression:"seoKeyword"}}),t._v(" "),e("div",{staticClass:"edit_buttons"},[e("span",{staticClass:"fa fa-check",attrs:{title:"Ekle"},on:{click:function(a){return t.addToSeoKeywords(t.seoKeyword)}}})])],1)],1),t._v(" "),t._l(t.seoKeywords,(function(a,s){return e("b-col",{key:s,staticClass:"offset-2",attrs:{cols:"2"}},[e("span",{staticClass:"identityItem"},[t._v(t._s(a)+" \n                  "),e("i",{staticClass:"fa fa-times",on:{click:function(a){return t.removeFromSeoKeywords(s)}}})])])}))],2)],1)],1),t._v(" "),e("div",{staticClass:"tab-pane fade ",class:{active:"social"==t.expandTab,show:"social"==t.expandTab},attrs:{id:"navs-left-profile"}},[e("b-col",{staticClass:"offset-3 mt-2",attrs:{cols:"6"}},[e("h3",[t._v("Sosyal Medya Ayarlari")])]),t._v(" "),e("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[e("b-form-group",{attrs:{label:"Twitter Link"}},[e("b-form-input",{attrs:{placeholder:"Twitter Link"},model:{value:t.twitterLink,callback:function(a){t.twitterLink=a},expression:"twitterLink"}})],1)],1),t._v(" "),e("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[e("b-form-group",{attrs:{label:"Facebook Link"}},[e("b-form-input",{attrs:{placeholder:"Facebook Link"},model:{value:t.facebookLink,callback:function(a){t.facebookLink=a},expression:"facebookLink"}})],1)],1),t._v(" "),e("b-col",{staticClass:"offset-1",attrs:{cols:"10"}},[e("b-form-group",{attrs:{label:"Instagram Link"}},[e("b-form-input",{attrs:{placeholder:"Instagram Link"},model:{value:t.instagramLink,callback:function(a){t.instagramLink=a},expression:"instagramLink"}})],1)],1)],1),t._v(" "),e("div",{staticClass:"tab-pane fade ",class:{active:"favicon"==t.expandTab,show:"favicon"==t.expandTab},attrs:{id:"navs-left-profile"}},[e("b-col",{staticClass:"offset-3 mt-2",attrs:{cols:"6"}},[e("h3",[t._v("Favicon")])]),t._v(" "),e("b-col",{attrs:{cols:"12"}},[e("div",{staticClass:"upload-example"},[e("div",[e("cropper",{ref:"cropper3",attrs:{src:t.image,transitions:!0}})],1),t._v(" "),e("div",{staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(a){return t.reset()}}},[e("i",{staticClass:"fa fa-times"})]),t._v(" "),e("div",{staticClass:"get-image-button",attrs:{title:"Get Image"}},[e("i",{staticClass:"fas fa-download"})]),t._v(" "),e("div",{staticClass:"button-wrapper"},[e("span",{staticClass:"button",on:{click:function(a){return t.$refs.file.click()}}},[e("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(a){return t.loadFavicon(a)}}}),t._v("\n             Favicon Yükle \n            ")]),t._v(" "),e("span",{staticClass:"button ml-5",on:{click:t.crop}},[t._v("\n              Kırp\n            ")]),t._v(" "),e("label",{staticClass:"switch"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.toggleEditImage)?t._i(t.toggleEditImage,null)>-1:t.toggleEditImage},on:{change:function(a){var e=t.toggleEditImage,s=a.target,i=!!s.checked;if(Array.isArray(e)){var o=null,n=t._i(e,o);s.checked?n<0&&(t.toggleEditImage=e.concat([o])):n>-1&&(t.toggleEditImage=e.slice(0,n).concat(e.slice(n+1)))}else t.toggleEditImage=i}}}),t._v(" "),e("span",{staticClass:"slider round"}),t._v(" "),e("span",{staticClass:"switch_text",class:{switch_closed:t.toggleEditImage}},[t._v("Resmi Duzenle")])]),t._v(" "),e("b-btn",{staticClass:"change-logo ml-5 mb-1",attrs:{variant:"primary rounded-pill"},on:{click:t.changeFavicon}},[e("span",{staticClass:"fas fa-plus-circle"}),t._v(" Faviconu Güncelle\n              ")])],1)])])],1),t._v(" "),e("div",{staticClass:"tab-pane fade ",class:{active:"logo"==t.expandTab,show:"logo"==t.expandTab},attrs:{id:"navs-left-profile"}},[e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-col",{staticClass:"offset-5 mt-3 kategoriler",attrs:{cols:"6"}},[e("h3",[t._v("Logo")])]),t._v(" "),e("div",{staticClass:"upload-example"},[e("div",[e("cropper",{ref:"cropper2",attrs:{src:t.image,transitions:!0}})],1),t._v(" "),e("div",{staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(a){return t.reset()}}},[e("i",{staticClass:"fa fa-times"})]),t._v(" "),e("div",{staticClass:"get-image-button",attrs:{title:"Get Image"}},[e("i",{staticClass:"fas fa-download"})]),t._v(" "),e("div",{staticClass:"button-wrapper"},[e("span",{staticClass:"button",on:{click:function(a){return t.$refs.file.click()}}},[e("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(a){return t.loadLogo(a)}}}),t._v("\n             Logo Yükle \n            ")]),t._v(" "),e("span",{staticClass:"button ml-5",on:{click:t.crop}},[t._v("\n              Kırp\n            ")]),t._v(" "),e("label",{staticClass:"switch"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.toggleEditImage)?t._i(t.toggleEditImage,null)>-1:t.toggleEditImage},on:{change:function(a){var e=t.toggleEditImage,s=a.target,i=!!s.checked;if(Array.isArray(e)){var o=null,n=t._i(e,o);s.checked?n<0&&(t.toggleEditImage=e.concat([o])):n>-1&&(t.toggleEditImage=e.slice(0,n).concat(e.slice(n+1)))}else t.toggleEditImage=i}}}),t._v(" "),e("span",{staticClass:"slider round"}),t._v(" "),e("span",{staticClass:"switch_text",class:{switch_closed:t.toggleEditImage}},[t._v("Resmi Duzenle")])]),t._v(" "),e("b-btn",{staticClass:"change-logo ml-5 mb-1",attrs:{variant:"primary rounded-pill"},on:{click:t.changeLogo}},[e("span",{staticClass:"fas fa-plus-circle"}),t._v(" Logoyu Güncelle\n              ")])],1)])],1)],1)],1),t._v(" "),e("div",{staticClass:"tab-pane fade images_tab",class:{active:"seoImage"==t.expandTab,show:"seoImage"==t.expandTab},attrs:{id:"navs-left-messages"}},[e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-col",{staticClass:"offset-5 mt-3 kategoriler",attrs:{cols:"6"}},[e("h3",[t._v("SEO Resmi")])]),t._v(" "),e("div",{staticClass:"upload-example"},[e("div",[e("cropper",{ref:"cropper",attrs:{src:t.image,transitions:!0}})],1),t._v(" "),e("div",{staticClass:"reset-button",attrs:{title:"Reset Image"},on:{click:function(a){return t.reset()}}},[e("i",{staticClass:"fa fa-times"})]),t._v(" "),e("div",{staticClass:"get-image-button",attrs:{title:"Get Image"}},[e("i",{staticClass:"fas fa-download"})]),t._v(" "),e("div",{staticClass:"img-name-text",attrs:{title:"Image Name"}},[t._v("\n              "+t._s(t.imageName)+"\n            ")]),t._v(" "),e("b-col",{attrs:{cols:"6",offset:"3"}},[e("div",{staticClass:"img-name"},[e("b-form-group",{attrs:{label:"Foto Ismi"}},[e("b-form-input",{attrs:{placeholder:"Foto Ismi"},model:{value:t.imageName,callback:function(a){t.imageName=a},expression:"imageName"}})],1)],1)]),t._v(" "),e("div",{staticClass:"button-wrapper"},[e("span",{staticClass:"button",on:{click:function(a){return t.$refs.file.click()}}},[e("input",{ref:"file",attrs:{type:"file",accept:"image/*"},on:{change:function(a){return t.loadImage(a)}}}),t._v("\n              Görsel Ekle\n            ")]),t._v(" "),e("span",{staticClass:"button ml-5",on:{click:t.crop}},[t._v("\n              Kırp \n            ")]),t._v(" "),e("label",{staticClass:"switch"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.toggleEditImage,expression:"toggleEditImage"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.toggleEditImage)?t._i(t.toggleEditImage,null)>-1:t.toggleEditImage},on:{change:function(a){var e=t.toggleEditImage,s=a.target,i=!!s.checked;if(Array.isArray(e)){var o=null,n=t._i(e,o);s.checked?n<0&&(t.toggleEditImage=e.concat([o])):n>-1&&(t.toggleEditImage=e.slice(0,n).concat(e.slice(n+1)))}else t.toggleEditImage=i}}}),t._v(" "),e("span",{staticClass:"slider round"}),t._v(" "),e("span",{staticClass:"switch_text",class:{switch_closed:t.toggleEditImage}},[t._v("Resmi Duzenle")])])])],1)],1)],1)],1)])]),t._v(" "),e("div",{staticClass:"divider mt-4 mb-4"}),t._v(" "),e("b-row",{staticClass:"mt-4"},[e("b-col",{attrs:{offset:"9"}},[e("b-btn",{staticClass:"new-post-btn",attrs:{variant:"primary rounded-pill"},on:{click:t.submitSettings}},[e("span",{staticClass:"fas fa-plus-circle"}),t._v(" Ayarları Kaydet\n       ")])],1)],1)],1)},i=[],o=(e("d3b7"),e("a434"),e("bc3a")),n=e.n(o),l=(e("c46f"),e("a2c1")),c=(e("f7aa"),{name:"PostsCreate",components:{Cropper:l["a"]},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦"],expandTab:"",info_message:"",toggleEditImage:!1,secondTryForBugFix:!1,seoKeyword:"",seoKeywords:[],googleHeading:"",twitterLink:"",instagramLink:"",facebookLink:"",coordinates:{width:0,height:0,left:0,top:0},result:{coordinates:null,image:null},base64:"",message:"",file:null,image:null,imageWidth:0,imageHeight:0,imageName:"",owner:"",googleStatement:"",logo:"",base64logo:"",favicon:"",base64favicon:""}},created:function(){var t=this;n.a.post("https://defensehere.herokuapp.com/get_seo/").then((function(a){var e=a.data.pop();t.seoKeywords=e.seoKeywords,t.googleHeading=e.googleHeading,t.twitterLink=e.twitterLink,t.facebookLink=e.facebookLink,t.instagramLink=e.instagramLink})),t.owner=this.$store.getters.getUser},methods:{submitSettings:function(){var t=this,a={seoKeywords:t.seoKeywords,googleHeading:t.googleHeading,googleImage:t.imageName||"",twitterLink:t.twitterLink,facebookLink:t.facebookLink,instagramLink:t.instagramLink};n.a.post("https://defensehere.herokuapp.com/update_seo/",{data:a}).then((function(a){t.$notify({type:"success",text:"SEO Ayarları Başarıyla Güncellendi!"})}))},updateSize:function(t){var a=t.coordinates;this.size.width=Math.round(a.width),this.size.height=Math.round(a.height)},crop:function(){var t=this.$refs.cropper.getResult(),a=t.coordinates,e=t.canvas;this.coordinates=a,this.image=e.toDataURL()},reset:function(){this.image=null},loadImage:function(t){var a=this,e=t.target,s=this;if(e.files&&e.files[0]){console.log(e.files[0]);var i=new FileReader,o=new FileReader;o.onload=function(){var t=new Image;t.onload=function(){s.imageWidth=t.width,s.imageHeight=t.height},t.src=o.result},o.readAsDataURL(e.files[0]),i.onload=function(t){a.image=t.target.result,a.base64=a.image},i.readAsDataURL(e.files[0])}},loadLogo:function(t){var a=this,e=t.target,s=this;if(e.files&&e.files[0]){console.log(e.files[0]);var i=new FileReader,o=new FileReader;o.onload=function(){var t=new Image;t.onload=function(){s.imageWidth=t.width,s.imageHeight=t.height},t.src=o.result},o.readAsDataURL(e.files[0]),i.onload=function(t){a.logo=t.target.result,a.base64logo=a.image},i.readAsDataURL(e.files[0])}},loadFavicon:function(t){var a=this,e=t.target,s=this;if(e.files&&e.files[0]){console.log(e.files[0]);var i=new FileReader,o=new FileReader;o.onload=function(){var t=new Image;t.onload=function(){s.imageWidth=t.width,s.imageHeight=t.height},t.src=o.result},o.readAsDataURL(e.files[0]),i.onload=function(t){a.favicon=t.target.result,a.base64favicon=a.image},i.readAsDataURL(e.files[0])}},blobToBase64:function(t){var a=new FileReader;return a.readAsDataURL(t),new Promise((function(t){a.onloadend=function(){t(a.result)}}))},changeLogo:function(){var t=this,a=this,e=this.$refs.cropper2.getResult(),s=e.canvas;if(s){this.$refs.file.files[0];var i=new FormData;s.toBlob((function(e){t.blobToBase64(e).then((function(t){i.append("file",t),n.a.post("https://defensehere.herokuapp.com/change_logo",i,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){console.log(t.data),"success"==t.data&&(a.$notify({type:"success",text:"Logo Yuklendi!"}),setTimeout((function(){location.reload()}),2e3))}),(function(t){console.log(t)}))}))}),"image/png")}},changeFavicon:function(){var t=this,a=this,e=this.$refs.cropper3.getResult(),s=e.canvas;if(s){this.$refs.file.files[0];var i=new FormData;s.toBlob((function(e){t.blobToBase64(e).then((function(t){i.append("file",t),n.a.post("https://defensehere.herokuapp.com/change_favicon",i,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){console.log(t.data),"success"==t.data&&(a.$notify({type:"success",text:"Favicon Yuklendi!"}),setTimeout((function(){location.reload()}),2e3))}),(function(t){console.log(t)}))}))}),"image/png")}},clickCategory:function(t){var a=this;a.clickedCategory==t?a.clickedCategory=100:a.clickedCategory=t},addToSeoKeywords:function(t){var a=this;a.seoKeywords.push(t)},removeFromSeoKeywords:function(t){var a=this;a.seoKeywords.splice(t,1)}}}),r=c,g=(e("fba2"),e("2877")),d=Object(g["a"])(r,s,i,!1,null,null,null);a["default"]=d.exports},fba2:function(t,a,e){"use strict";e("0ccc")}}]);
//# sourceMappingURL=chunk-0865598a.6ca98482.js.map