(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fab67e9"],{"1cc2":function(e,a,t){e.exports=t.p+"img/profile-avatar.0ce5c75c.webp"},5214:function(e,a,t){},"7bd2":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-12"},[s("div",{staticClass:"media align-items-center py-3 mb-3"},[s("div",{staticClass:"d-flex justify-content-center mb-3"},[e.userData.photo?s("img",{staticClass:"d-block ui-w-100 rounded-circle",attrs:{src:e.backendUrl+"storage/agents/"+e.userData.photo,alt:""}}):s("img",{staticClass:"d-block ui-w-100 rounded-circle",attrs:{src:t("1cc2"),alt:""}})]),e._v(" "),s("div",{staticClass:"media-body ml-4"},[s("h4",{staticClass:"font-weight-bold mb-0"},[e._v(e._s(e.userData.firstName)+" "+e._s(e.userData.lastName))]),e._v(" "),s("b-btn",{staticClass:"mt-2",attrs:{variant:"primary",size:"sm"},on:{click:function(a){e.edit=!e.edit}}},[e._v("Edit")])],1)])]),e._v(" "),s("div",{staticClass:"col-lg-12 mb-4"},[s("b-card",{attrs:{title:"User Details"}},[s("b-card-body",[s("b-row",[s("b-col",[s("b-form-group",{attrs:{label:"Isim"}},[e.edit?e._e():s("span",[e._v(e._s(e.userData.firstName))]),e._v(" "),e.edit?s("b-input",{attrs:{label:"Isim",placeholder:"Isim"},model:{value:e.userData.firstName,callback:function(a){e.$set(e.userData,"firstName",a)},expression:"userData.firstName"}}):e._e()],1)],1),e._v(" "),s("b-col",[s("b-form-group",{attrs:{label:"Soy Isim"}},[e.edit?e._e():s("span",[e._v(" "+e._s(e.userData.lastName)+" ")]),e._v(" "),e.edit?s("b-input",{attrs:{label:"Soy Isim",placeholder:"Soy Isim"},model:{value:e.userData.lastName,callback:function(a){e.$set(e.userData,"lastName",a)},expression:"userData.lastName"}}):e._e()],1)],1)],1),e._v(" "),s("b-row",[s("b-col",[s("b-form-group",{attrs:{label:"E-mail"}},[e.edit?e._e():s("span",[e._v(e._s(e.userData.email))]),e._v(" "),e.edit?s("b-input",{attrs:{label:"Email",placeholder:"Email"},model:{value:e.userData.email,callback:function(a){e.$set(e.userData,"email",a)},expression:"userData.email"}}):e._e()],1)],1),e._v(" "),s("b-col",[s("b-form-group",{attrs:{label:"Kullanici Dili"}},[e.edit?e._e():s("span",[e._v(e._s(e.defaultLang))]),e._v(" "),e.edit?s("b-select",{model:{value:e.defaultLang,callback:function(a){e.defaultLang=a},expression:"defaultLang"}},e._l(e.languages,(function(a,t){return s("option",{key:t,domProps:{value:a}},[e._v(" \n                      "+e._s(a)+"\n                  ")])})),0):e._e()],1)],1)],1),e._v(" "),s("b-row",[s("b-col",{attrs:{cols:"12"}},[s("b-form-group",{attrs:{label:"Son Gorulme"}},[s("span",[e._v(e._s(e.userData.lastLogin))])])],1)],1),e._v(" "),s("b-row",[s("b-col",{attrs:{cols:"6"}},[s("b-form-group",{attrs:{label:"Kullanici Rolu"}},[e.edit?e._e():s("span",[e._v(e._s(e.userData.userRole))]),e._v(" "),e.edit?s("b-select",{model:{value:e.userRole,callback:function(a){e.userRole=a},expression:"userRole"}},e._l(e.userRoles,(function(a,t){return s("option",{key:t,domProps:{value:a}},[e._v(" \n                      "+e._s(a)+"\n                  ")])})),0):e._e()],1)],1)],1),e._v(" "),s("b-row",[s("b-col",{attrs:{cols:"3"}},[s("b-btn",{on:{click:function(a){return e.submitProfile(e.userData)}}},[e._v("Save")]),e._v(" "),s("b-btn",{staticClass:"ml-5",attrs:{variant:"danger"},on:{click:function(a){return e.deleteUser()}}},[e._v("Delete User")])],1)],1)],1)],1)],1)])])},l=[],i=(t("1276"),t("ac1f"),t("bc3a")),o=t.n(i),r=t("c1df"),n=t.n(r),u={name:"profile",metaInfo:{title:"Profile"},data:function(){return{formSubmit:!1,file:null,id:0,imgPreview:null,edit:!1,userRoles:["Admin","Editor","Writer"],userRole:"",languages:["Turkce","Ingilizce","Arapca","Rusca","Ukraynaca","Fransizca"],defaultLang:"",userData:{userRole:"",photo:"",firstName:"",lastName:"",name:"",email:"",lastLogin:"",id:null},sources:{options:[],selected:[]}}},created:function(){var e=this,a={};a.id=e.$route.params.id,"edit"==a.id.split("~").pop()?(e.edit=!0,e.id=a.id.split("~")[0],a.id=e.id,o.a.post("https://defensehere.herokuapp.com/user_by_id",{data:a}).then((function(a){var t=a.data;e.userData.email=t.email,e.userData.firstName=t.firstName,e.userData.lastName=t.lastName,e.userData.userRole=t.userRole,e.userRole=t.userRole,e.defaultLang=t.defaultLang,e.userData.lastLogin=n()(t.lastLogin).fromNow(),console.log(a)}),(function(e){console.log(e)}))):(a.id=e.$route.params.id,o.a.post("https://defensehere.herokuapp.com/user_by_id",{data:a}).then((function(a){var t=a.data;e.userData.email=t.email,e.userData.firstName=t.firstName,e.userData.lastName=t.lastName,e.userData.userRole=t.userRole,e.userRole=t.userRole,e.defaultLang=t.defaultLang,e.userData.lastLogin=n()(t.lastLogin).fromNow(),console.log(a)}),(function(e){console.log(e)}))),console.log(e.$props)},methods:{setUserData:function(e){for(var a in this.userData)Object.prototype.hasOwnProperty.call(e,a)&&(this.userData[a]=e[a])},submitProfile:function(e){var a=this,t=a.userData;if(t.id=a.id,console.log(t),a.userRole.length<2)a.$notify({type:"warn",text:"Kullanici Rolu Bos Olamaz!"});else if(a.userData.firstName<2)a.$notify({type:"warn",text:"Kullanici Adi Bos Olamaz!"});else if(a.userData.email<2)a.$notify({type:"warn",text:"Email Bos Olamaz!"});else if(a.userData.password<2)a.$notify({type:"warn",text:"Sifre Bos Olamaz!"});else{t=a.userData;t.userRole=a.userRole,t.defaultLang=a.defaultLang,console.log(t),o.a.post("https://defensehere.herokuapp.com/update_user_profile",{data:t}).then((function(e){var t=e.data;a.edit=!1,console.log(t),t._id.length>7&&a.$notify({type:"success",text:"Kullanici Basariyla Guncellendi!"})}),(function(e){console.log(e)}))}},deleteUser:function(){var e=this,a=this,t=a.userData;t.id=a.id,confirm("Kullanici Siliniyor. Emin Misiniz?")&&o.a.post("https://defensehere.herokuapp.com/delete_user",{data:t}).then((function(t){var s=t.data;a.edit=!1,console.log(s),s._id.length>7&&(a.$notify({type:"success",text:"Kullanici Basariyla Silindi!"}),setTimeout((function(){e.$router.push({name:"AdminUsers"})}),2e3))}),(function(e){console.log(e)}))}}},c=u,d=(t("fc58"),t("8844"),t("2877")),m=Object(d["a"])(c,s,l,!1,null,null,null);a["default"]=m.exports},8844:function(e,a,t){"use strict";t("c803")},c803:function(e,a,t){},fc58:function(e,a,t){"use strict";t("5214")}}]);
//# sourceMappingURL=chunk-7fab67e9.1caad524.js.map