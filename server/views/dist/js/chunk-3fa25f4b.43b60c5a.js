(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fa25f4b"],{"6e05":function(t,e,a){"use strict";a("a1c1")},a1c1:function(t,e,a){},a60c:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{overflow:"hidden"}},[t._m(0),t._v(" "),a("b-row",[a("b-col",{staticClass:"offset-1 mb-3",attrs:{cols:"10"}},[a("b-input-group",{staticClass:"mt-2",attrs:{prepend:"Iletisim Baslik"}},[a("b-form-input",{model:{value:t.contactHeading,callback:function(e){t.contactHeading=e},expression:"contactHeading"}})],1)],1)],1),t._v(" "),a("b-row",{staticClass:"editor-container mt-3"},[a("b-col",{staticClass:"offset-7",attrs:{cols:"6"}},[a("div",{staticClass:"editor-center mt-2"},[a("ckeditor",{attrs:{editor:t.editor,config:t.editorConfig},on:{ready:t.onReady},model:{value:t.editorData,callback:function(e){t.editorData=e},expression:"editorData"}})],1)])],1),t._v(" "),a("b-row",{staticClass:"mt-6"},[a("b-col",{attrs:{offset:"9"}},[a("b-btn",{staticClass:"new-post-btn mt-5",attrs:{variant:"primary rounded-pill"},on:{click:t.submitContact}},[a("span",{staticClass:"fas fa-plus-circle"}),t._v(" Iletişim Kaydet\n       ")])],1)],1)],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("h2",{staticStyle:{"text-decoration":"underline"}},[t._v("İLETİŞİM")])])])}],s=a("2b0e"),r=a("bc3a"),c=a.n(r),i=(a("c46f"),a("2996")),l=a.n(i),d=a("6930"),p=a.n(d);s["default"].use(p.a);var u={name:"Contact",components:{},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦"],editor:l.a,editorData:'<p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>defensehere_tr@defensehere.com</strong></span></p><p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>+90 539 484 99 02</strong></span></p><p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>+90 312 354 99 02</strong></span></p><p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>Ostim OSB Mahallesi, 100. Yıl Bulvarı, No:55</strong></span></p><p style="text-align:center;"><span style="background-color:white;color:#434343;"><strong>B blok / 36, Yenimahalle / Ankara</strong></span></p>',editorConfig:{},contactHeading:""}},created:function(){var t=this;t.owner=this.$store.getters.getUser,c.a.post("https://defensehere.herokuapp.com/get_identity/").then((function(e){t.editorData=e.data.pop().contactContent}))},methods:{submitContact:function(){var t=this;console.log(t.editorData);var e={contactContent:t.editorData};c.a.post("https://defensehere.herokuapp.com/update_contact/",{data:e}).then((function(e){t.$notify({type:"success",text:"İletişim Başarıyla Güncellendi!"})}))},onReady:function(t){t.ui.getEditableElement().parentElement.insertBefore(t.ui.view.toolbar.element,t.ui.getEditableElement())}}},f=u,g=(a("6e05"),a("2877")),b=Object(g["a"])(f,n,o,!1,null,null,null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-3fa25f4b.43b60c5a.js.map