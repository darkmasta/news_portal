(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c75faef"],{"1b8b":function(e,t,s){"use strict";s("e996")},"263d":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("b-row",[s("b-col",{staticClass:"d-flex justify-content-between "},[s("div",{staticClass:"page-header"},[s("h4",[e._v("Haber Listesi")])]),e._v(" "),s("b-btn",{staticClass:"align-self-start",attrs:{variant:"primary rounded-pill",to:"/posts/create"}},[s("span",{staticClass:"fas fa-plus-circle"}),e._v(" Create Post")])],1)],1),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("b-form-group",[s("b-input",{staticClass:"d-inline-block w-auto float-sm-right",attrs:{size:"sm",placeholder:"Search..."},on:{input:function(t){return e.filter(t)}}})],1)],1)]),e._v(" "),s("b-table",{ref:"myTable",staticClass:"table nexus-table",attrs:{hover:"",selectable:"",borderless:"",items:e.postsTableData,fields:e.tableFields},on:{"row-selected":e.rowSelected},scopedSlots:e._u([{key:"cell(postImage)",fn:function(t){return[s("img",{staticClass:"post-table-image",attrs:{src:t.value,with:"75",height:"75"},on:{click:function(s){return e.previewImage(t.value)}}})]}},{key:"cell(details)",fn:function(t){return["Taslak"==t.item.status?s("span",{staticClass:"fas fa-broadcast-tower",attrs:{title:"Publish"},on:{click:function(s){return e.goToPostLink(t)}}}):e._e(),e._v(" "),"Aktif"==t.item.status?s("span",{staticClass:"fab fa-firstdraft mr-2 text-primary",attrs:{title:"Draft"},on:{click:function(s){return e.goToPostLink(t)}}}):e._e(),e._v(" "),s("span",{staticClass:"far fa-edit mr-2 text-primary",attrs:{title:"Edit Post"},on:{click:function(s){return e.goToPost(t)}}}),e._v(" "),s("span",{staticClass:"fas fa-times text-danger",attrs:{title:"Delete Post"},on:{click:function(s){return e.deletePost(t)}}})]}}])}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.previewToggle,expression:"previewToggle"}],staticClass:"preview-container",on:{click:function(t){e.previewToggle=!1}}},[s("span",{staticClass:"close"},[e._v("×")]),e._v(" "),s("div",{attrs:{id:"preview"}},[s("img",{attrs:{src:e.previewImageUrl},on:{click:function(t){e.previewToggle=!1}}})]),e._v(" "),s("div",{staticClass:"caption"},[e._v("\n    "+e._s(e.previewImageName)+" \n  ")])])],1)},i=[],o=(s("159b"),s("fb6a"),s("1276"),s("ac1f"),s("4de4"),s("c975"),s("a15b"),s("d81d"),s("bc3a")),l=s.n(o),r=s("c1df"),n=s.n(r);s("41e9");n.a.locale("tr");var c={name:"Posts",metaInfo:{title:"Posts"},data:function(){return{tableFields:[{key:"order",label:"Haber Sirasi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"postImage",label:"Haber Resmi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"Baslik",label:"Başlık",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"date",label:"Eklenme Tarihi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"owner",label:"Ekleyen Kişi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"views",label:"Okunma Sayısı",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"language",label:"Haber Dilleri",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"status",label:"Durumu",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"details",label:"İşlemler",sortable:!0,sortDirection:"desc",class:"text-center align-middle"}],posts:[],postsTableData:[],previewImageUrl:null,previewImageName:"",previewToggle:!1,selectedRows:[]}},created:function(){var e=this;l.a.post("https://defensehere.herokuapp.com/get_posts/",{}).then((function(t){console.log(t.data),e.posts=t.data,e.posts.forEach((function(t){var s={id:t._id.slice(-4),date:n()(t.date).format("DD/MM/YYYY, h:mm:ss a"),status:t.isDraft?"Taslak":"Aktif",postImage:"https://defensehere.herokuapp.com/images/"+t.postImage,Baslik:t.postTitle,details:t._id,order:t.postOrder||"---",owner:t.owner||"---",views:""+t.views||"---",language:String(null===t||void 0===t?void 0:t.postLanguage).slice(-4)||"---"};e.postsTableData.push(s)})),e.originalPostsTableData=e.postsTableData}))},computed:{},methods:{rowSelected:function(e){this.selectedRows=e,console.log(e)},goToPost:function(){var e=this,t=[];e.selectedRows.forEach((function(s){console.log(s),e.posts.forEach((function(e){e._id.slice(-4)==s.id&&t.push(e)}))})),1==t.length&&(console.log(t),this.$router.push({name:"Posts Edit",params:{id:t[0]._id}}))},deletePost:function(e){if(confirm("Kullanici Siliniyor. Emin Misiniz?")){var t=this,s={};s.id=e.value,l.a.post("https://defensehere.herokuapp.com/delete_post",{data:s}).then((function(e){console.log(e.data),"success"==e.data&&t.$notify({type:"success",text:"Haber Basariyle Silindi!"})}))}},goToPostLink:function(e){console.log(e);var t=this.$router.resolve({name:"Post",params:{id:e.value}});window.open(t.href,"_blank")},clickRows:function(e){var t=this.$refs.myTable.$el,s=t.getElementsByTagName("tbody")[0],a=s.getElementsByTagName("tr");e.forEach((function(e){a[e].click()})),console.log("items")},previewImage:function(e){var t=this;t.previewToggle=!t.previewToggle,t.previewImageUrl&&(t.previewImageUrl=null),t.previewImageUrl=e,t.previewImageName=e.split("/").pop()},filter:function(e){var t=e.toLowerCase(),s=this.originalPostsTableData.filter((function(e){return-1!==Object.keys(e).map((function(t){return String(e[t])})).join("|").toLowerCase().indexOf(t)||!t}));this.postsTableData=s}}},d=c,u=(s("1b8b"),s("2877")),p=Object(u["a"])(d,a,i,!1,null,"6c9c540a",null);t["default"]=p.exports},"41e9":function(e,t,s){},e996:function(e,t,s){}}]);
//# sourceMappingURL=chunk-1c75faef.277a322b.js.map