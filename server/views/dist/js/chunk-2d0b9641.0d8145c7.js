(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9641"],{"336a":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-12"},[e("h4",{staticClass:"font-weight-bold py-3 mb-4"},[e("span",{staticClass:"text-muted font-weight-light"},[t._v(t._s(t.$t("tags.create tag")))])])]),t._v(" "),e("div",{staticClass:"col-lg-12 mb-4"},[e("b-card",[e("h4",[t._v(t._s(t.$t("tags.new tag form")))]),t._v(" "),e("b-card-body",[e("b-row",[e("b-col",[e("b-form-group",[e("legend",{staticClass:"bv-no-focus-ring col-form-label pt-0"},[t._v(t._s(t.$t("tags.tag name")))]),t._v(" "),e("b-input",{attrs:{placeholder:"Etkiet İsmi"},model:{value:t.tagName,callback:function(a){t.tagName=a},expression:"tagName"}})],1)],1)],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"offset-10"},[e("b-btn",{staticClass:"font-weight-bold save-order mt-4",attrs:{variant:"primary"},on:{click:t.submitTag}},[t._v(t._s(t.$t("tags.add tag")))])],1)],1)],1)],1)],1)])])},n=[],o=e("bc3a"),c=e.n(o),i={name:"ad-create",metaInfo:{title:"Ad Create"},components:{},data:function(){return{tagName:"",tagText:""}},computed:{},created:function(){},methods:{submitTag:function(){var t=this,a={tagName:t.tagName};c.a.post("https://defensehere.herokuapp.com/create_tag/",{data:a}).then((function(a){"success"==a.data&&(t.$notify({type:"success",text:"Yeni Etiket Basariyla Olusturuldu!"}),setTimeout((function(){t.$router.push({name:"Tags"})}),1500))}))}}},l=i,r=e("2877"),u=Object(r["a"])(l,s,n,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0b9641.0d8145c7.js.map