(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59503a80"],{"602c":function(e,t,a){},"96e7":function(e,t,a){"use strict";a("602c")},c20f:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12"},[a("h4",{staticClass:"font-weight-bold py-3 mb-1"},[a("span",{staticClass:"text-muted font-weight-light"},[e._v(e._s(e.$t("ads.ads")))])])]),e._v(" "),a("b-col",{staticClass:"offset-10"},[a("b-btn",{staticClass:"align-self-start",attrs:{variant:"primary rounded-pill",to:"/ads/create"}},[a("span",{staticClass:"fas fa-plus-circle"}),e._v(" "+e._s(e.$t("ads.create new ad")))])],1)],1),e._v(" "),a("b-card",{staticClass:"mt-2",attrs:{"no-body":""}},[a("b-card-body",[a("b-row",[a("b-col",[a("b-form-group",[a("b-input",{staticClass:"d-inline-block w-auto float-sm-right",attrs:{size:"sm",placeholder:"Search..."},on:{input:function(t){return e.filter(t)}}})],1)],1)],1),e._v(" "),a("b-table",{staticClass:"table nexus-table mt-2",attrs:{hover:"",borderless:"",items:e.adsTableData,"per-page":e.perPage,"current-page":e.currentPage,fields:e.tableFields},scopedSlots:e._u([{key:"cell(adImage)",fn:function(t){return[a("img",{staticClass:"post-table-image",attrs:{src:t.value,with:"75",height:"75"},on:{click:function(a){return e.previewImage(t.value)}}})]}},{key:"cell(details)",fn:function(t){return["Onaylandi"==t.item.status?a("span",{staticClass:"fa fa-ban",attrs:{title:"Red"},on:{click:function(a){return e.unconfirmAd(t)}}}):e._e(),e._v(" "),"Onay Bekliyor"==t.item.status?a("span",{staticClass:"fa fa-check mr-2 text-primary",attrs:{title:"Onay"},on:{click:function(a){return e.confirmAd(t)}}}):e._e(),e._v(" "),a("span",{staticClass:"far fa-edit mr-2 text-primary",attrs:{title:"Edit Reklam"},on:{click:function(a){return e.goToAd(t)}}}),e._v(" "),a("span",{staticClass:"fas fa-times text-danger",attrs:{title:"Delete Reklam"},on:{click:function(a){return e.deleteAd(t)}}})]}}])}),e._v(" "),a("b-row",[a("b-col",[a("div",{staticClass:"col-sm text-sm-left text-center mb-3 mb-sm-0"},[e.totalPages?a("span",{staticClass:"text-muted"},[e._v("Page "+e._s(e.currentPage)+" of "+e._s(e.totalPages))]):e._e()]),e._v(" "),a("div",{staticClass:"col-sm"},[e.totalItems?a("b-pagination",{staticClass:"justify-content-center justify-content-sm-end",attrs:{"total-rows":e.totalItems,"per-page":e.perPage,size:"sm"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}):e._e()],1)])],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.previewToggle,expression:"previewToggle"}],staticClass:"preview-container",on:{click:function(t){e.previewToggle=!1}}},[a("span",{staticClass:"close"},[e._v("×")]),e._v(" "),a("div",{attrs:{id:"preview"}},[a("img",{attrs:{src:e.previewImageUrl},on:{click:function(t){e.previewToggle=!1}}})]),e._v(" "),a("div",{staticClass:"caption"},[e._v("\n      "+e._s(e.previewImageName)+" \n    ")])])],1)},i=[],n=(a("159b"),a("9911"),a("a434"),a("1276"),a("ac1f"),a("4de4"),a("c975"),a("a15b"),a("d81d"),a("bc3a")),l=a.n(n),r=a("c1df"),o=a.n(r);o.a.locale("tr");var c={name:"ads",metaInfo:{title:"Ads"},components:{},data:function(){return{ads:[],adsTableData:[],originalAdsTableData:[],previewImageUrl:null,previewImageName:"",previewToggle:!1,perPage:10,currentPage:1}},computed:{tableFields:function(){return[{key:"adImage",label:this.translateCol("ad image"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"Baslik",label:this.translateCol("ad header"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"owner",label:this.translateCol("creator"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"link",label:this.translateCol("ad link"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"views",label:this.translateCol("views"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"clicks",label:this.translateCol("clicks"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"adType",label:this.translateCol("ad type"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"position",label:this.translateCol("position"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"status",label:this.translateCol("status"),sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"details",label:this.translateCol("details"),sortable:"true",class:"text-center align-middle"}]},totalItems:function(){return this.adsTableData.length},totalPages:function(){return Math.floor(this.totalItems/this.perPage)||(this.totalItems?1:0)}},created:function(){var e=this;l.a.head("https://defensehere.herokuapp.com/get_ads/").catch((function(t){t.response||(alert("AdBlock Tespit Edildi"),e.$notify({type:"warn",text:"Bu sayfanın düzgün çalışması için AdBlock'u devre dışı bırakmalısınız",duration:5e3}))})),l.a.post("https://defensehere.herokuapp.com/get_ads/",{}).then((function(t){console.log(t.data),e.ads=t.data,e.ads.forEach((function(t){console.log(t);var a={position:t.adLocation||"---",status:"unconfirmed"==t.status?e.$i18n.t("unconfirmed"):e.$i18n.t("confirmed"),owner:t.owner,adType:t.adType,views:t.views,clicks:t.clicks,link:t.link,adImage:"https://defensehere.herokuapp.com/images/"+t.adImage,Baslik:t.adTitle||t.adName,details:t._id};e.adsTableData.push(a)})),e.originalAdsTableData=e.adsTableData}))},methods:{translateCol:function(e){return this.$i18n.t("ads."+e)},goToAd:function(e){this.$router.push({name:"Ad",params:{id:e.value}})},confirmAd:function(e){var t=this,a={id:e.value};l.a.post("https://defensehere.herokuapp.com/confirm_ad/",{data:a}).then((function(a){console.log(a.data),"success"==a.data&&(t.$notify({type:"success",text:"Reklam Onaylandi!"}),t.adsTableData[e.index].status="Onaylandi")}))},unconfirmAd:function(e){var t=this,a={id:e.value};l.a.post("https://defensehere.herokuapp.com/unconfirm_ad/",{data:a}).then((function(a){console.log(a.data),"success"==a.data&&(t.$notify({type:"error",text:"Reklam Reddedildi!"}),t.adsTableData[e.index].status="Onay Bekliyor")}))},deleteAd:function(e){var t=this,a={id:e.value};l.a.post("https://defensehere.herokuapp.com/delete_ad/",{data:a}).then((function(a){console.log(a.data),"success"==a.data&&(t.$notify({type:"error",text:"Reklam Silindi!"}),t.adsTableData.splice(e.index,1))}))},previewImage:function(e){var t=this;t.previewToggle=!t.previewToggle,t.previewImageUrl&&(t.previewImageUrl=null),t.previewImageUrl=e,t.previewImageName=e.split("/").pop()},filter:function(e){var t=e.toLowerCase();console.log(e);var a=this.originalAdsTableData.filter((function(e){return-1!==Object.keys(e).map((function(t){return String(e[t])})).join("|").toLowerCase().indexOf(t)||!t}));this.adsTableData=a}}},d=c,u=(a("96e7"),a("2877")),p=Object(u["a"])(d,s,i,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-59503a80.95588df8.js.map