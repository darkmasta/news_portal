(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49144d96"],{"7fb5":function(e,t,i){},8078:function(e,t,i){"use strict";i("7fb5")},"8e71":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"row"},[e._m(0),e._v(" "),i("b-col",{staticClass:"offset-10"},[i("b-btn",{staticClass:"align-self-start",attrs:{variant:"primary rounded-pill",to:"/activities/create"}},[i("span",{staticClass:"fas fa-plus-circle"}),e._v(" Yeni Aktivite Ekle")])],1)],1),e._v(" "),i("b-table",{staticClass:"table nexus-table mt-2",attrs:{hover:"","select-mode":"multi",borderless:"",selectable:"",items:e.activitiesTableData,fields:e.tableFields},scopedSlots:e._u([{key:"cell(activityImage)",fn:function(t){return[i("img",{attrs:{src:t.value,with:"75",height:"75"},on:{click:function(i){return e.previewImage(t.value)}}})]}},{key:"cell(details)",fn:function(t){return[i("a",{attrs:{href:"#"},on:{click:function(i){return e.goToActivity(t)}}},[e._v("Etkinlige Git >")])]}}])}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.previewToggle,expression:"previewToggle"}],staticClass:"preview-container",on:{click:function(t){e.previewToggle=!1}}},[i("span",{staticClass:"close"},[e._v("×")]),e._v(" "),i("div",{attrs:{id:"preview"}},[i("img",{attrs:{src:e.previewImageUrl},on:{click:function(t){e.previewToggle=!1}}})]),e._v(" "),i("div",{staticClass:"caption"},[e._v("\n      "+e._s(e.previewImageName)+" \n    ")])])],1)},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"col-lg-12"},[i("h4",{staticClass:"font-weight-bold py-3 mb-1"},[i("span",{staticClass:"text-muted font-weight-light"},[e._v("Activities")])])])}],l=i("ade3"),r=(i("159b"),i("fb6a"),i("1276"),i("ac1f"),i("bc3a")),c=i.n(r),n=i("c1df"),o=i.n(n),v={name:"activities",metaInfo:{title:"Activities"},data:function(){var e;return e={tableFields:[{key:"id",label:"ID",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"activityImage",label:"Etkinlik Resmi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"Baslik",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"position",label:"Pozisyon",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"startDate",label:"Baslangic Tarihi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"endDate",label:"Bitis Tarihi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"status",label:"Status",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"details",sortable:"true"}],activities:[],activitiesTableData:[],originalActivitiesTableData:[],previewImageUrl:null,previewImageName:"",previewToggle:!1},Object(l["a"])(e,"previewImageUrl",null),Object(l["a"])(e,"previewImageName",""),Object(l["a"])(e,"previewToggle",!1),e},created:function(){var e=this;c.a.post("https://defensehere.herokuapp.com/get_activities/",{}).then((function(t){console.log(t.data),e.activities=t.data,e.activities.forEach((function(t){var i={id:t._id.slice(-4),startDate:o()(t.startDate).fromNow(),endDate:o()(t.endDate).fromNow(),status:"active",position:t.activityPosition,activityImage:"https://defensehere.herokuapp.com/images/"+t.activityImage,Baslik:t.activityTitle,details:t._id};e.activitiesTableData.push(i)})),e.originalActivitiesTableData=e.activitiesTableData}))},computed:{},methods:{goToActivity:function(e){this.$router.push({name:"Activity",params:{id:e.value}})},previewImage:function(e){var t=this;t.previewToggle=!t.previewToggle,t.previewImageUrl&&(t.previewImageUrl=null),t.previewImageUrl=e,t.previewImageName=e.split("/").pop()}}},d=v,u=(i("8078"),i("2877")),g=Object(u["a"])(d,a,s,!1,null,null,null);t["default"]=g.exports},ade3:function(e,t,i){"use strict";function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}i.d(t,"a",(function(){return a}))}}]);
//# sourceMappingURL=chunk-49144d96.f2bfeff6.js.map