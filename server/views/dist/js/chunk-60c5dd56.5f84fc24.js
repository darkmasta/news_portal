(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60c5dd56"],{"4f10":function(e,t,a){"use strict";a("7841")},7841:function(e,t,a){},dcef:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-row",[a("b-col",[a("h3",[e._v("Kullanıcı Listesi")])])],1),e._v(" "),a("b-row",[a("b-col",{attrs:{offset:"10"}},[a("b-btn",{staticClass:"align-self-start new-user-btn",attrs:{variant:"primary rounded-pill"},on:{click:e.goToNewUser}},[a("span",{staticClass:"fas fa-plus-circle"}),e._v(" Yeni Kullanıcı Ekle")])],1)],1),e._v(" "),a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-2",attrs:{"no-body":""}},[a("b-card-body",[a("b-row",[a("b-col",[a("b-form-group",[a("b-input",{staticClass:"d-inline-block w-auto float-sm-right",attrs:{size:"sm",placeholder:"Search..."},on:{input:function(t){return e.filter(t)}}})],1)],1)],1),e._v(" "),a("b-table",{ref:"myTable",staticClass:"table nexus-table mt-2",attrs:{hover:"",borderless:"",items:e.usersTableData,"per-page":e.perPage,"current-page":e.currentPage,fields:e.fields},scopedSlots:e._u([{key:"cell(details)",fn:function(t){return[a("span",{staticClass:"far fa-user mr-2 text-primary",attrs:{title:"View User"},on:{click:function(a){return e.goToUser(t)}}}),e._v(" "),a("span",{staticClass:"far fa-edit mr-2 text-primary",attrs:{title:"Edit User"},on:{click:function(a){return e.goToUserWithEdit(t)}}}),e._v(" "),a("span",{staticClass:"fas fa-times text-danger",attrs:{title:"Delete User"},on:{click:function(a){return e.deleteUser(t)}}})]}}])}),e._v(" "),a("b-row",[a("b-col",[a("div",{staticClass:"col-sm text-sm-left text-center mb-3 mb-sm-0"},[e.totalPages?a("span",{staticClass:"text-muted"},[e._v("Page "+e._s(e.currentPage)+" of "+e._s(e.totalPages))]):e._e()]),e._v(" "),a("div",{staticClass:"col-sm"},[e.totalItems?a("b-pagination",{staticClass:"justify-content-center justify-content-sm-end",attrs:{"total-rows":e.totalItems,"per-page":e.perPage,size:"sm"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}):e._e()],1)])],1)],1)],1)],1)],1)],1)},r=[],i=(a("159b"),a("a9e3"),a("4de4"),a("c975"),a("a15b"),a("d81d"),a("bc3a")),l=a.n(i),n=(a("049c"),a("c46f"),a("1157"),a("0969"),a("ff5a"),a("c1df")),o=a.n(n);o.a.locale("tr");var c={name:"AdminUsers",metaInfo:{title:"Users"},data:function(){return{value:"",fields:[{key:"order",label:"Kullanıcı Sırası",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"name",label:"İsim Soyisim",sortable:"true",class:"text-center align-middle"},{key:"Email",label:"E-posta Adresi",sortable:!0},{key:"userRole",label:"Kullanıcı Rolü",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"Son_Gorulme",sortable:!0,label:"Son Aktif Olma Zamanı"},{key:"Kullanici_Dili",label:"Kullanıcı Dili",sortable:!0},{key:"details",label:"İşlemler",sortable:"true",class:"text-center align-middle"}],usersTableData:[],originalUsersTableData:[],loading:!1,editOrigin:!1,selectedUsers:[],limit:5,minChars:3,address:"",customers:[],vin:"",showPriceTab:!1,economyPrice:0,standardPrice:0,expeditedPrice:0,totalPrice:0,selectedPrice:0,quoteId:0,ownerEmail:"",owner:"",quotes:[],profit:0,items:{value:"",text:""},striped:!1,bordered:!1,borderless:!1,outlined:!0,small:!1,hover:!0,dark:!1,fixed:!1,footClone:!1,headVariant:"light",tableVariant:"",noCollapse:!1,perPageOptions:[2,4,6,8,10],perPage:2,currentPage:1}},created:function(){var e=this;l.a.get("https://defensehere.herokuapp.com/users/").then((function(t){var a=t.data;console.log(a),e.users=a,a.forEach((function(t,a){var s={order:a+1,name:t.firstName+" "+t.lastName,userRole:t.userRole,Email:t.email,Kullanici_Dili:t.defaultLang,Son_Gorulme:o()(t.lastLogin).format("DD/MM/YYYY, h:mm:ss a"),details:t._id};e.usersTableData.push(s)})),e.originalUsersTableData=e.usersTableData}))},methods:{goToNewUser:function(){this.$router.push({name:"AdminUserCreate"})},rowSelected:function(e){this.selectedUsers=e,console.log(e)},clickRows:function(e){var t=this.$refs.myTable.$el,a=t.getElementsByTagName("tbody")[0],s=a.getElementsByTagName("tr");e.forEach((function(e){s[e].click()}))},totalPriceCalc:function(){var e=this;return Number(e.profit)+Number(e.selectedPrice)},updateQuery:function(){this.query=this.value,this.update()},onHit:function(e){this.value=e.screen_name,this.reset()},resetInput:function(){this.value="",this.reset()},showDetails:function(){return!0},myRowClickHandler:function(e,t){console.log(e),this.selectedQuote=e},reset:function(){this.item={}},goToUser:function(e){console.log(e),this.$router.push({name:"AdminUser",params:{id:e.item.details}})},goToUserWithEdit:function(e){console.log(e),e.item.details+="~",e.item.details+="edit",this.$router.push({name:"AdminUser",params:{id:e.item.details}})},filter:function(e){var t=e.toLowerCase();console.log(e);var a=this.originalUsersTableData.filter((function(e){return-1!==Object.keys(e).map((function(t){return String(e[t])})).join("|").toLowerCase().indexOf(t)||!t}));this.usersTableData=a}},computed:{totalItems:function(){return this.usersTableData.length},totalPages:function(){return Math.floor(this.totalItems/this.perPage)||(this.totalItems?1:0)},tableFields:function(){var e=this;return this.jsonData[0]?Object.keys(this.quotesTableData[0]).map((function(t){return{key:t,sortable:e.isSortable}})):[]}}},u=c,d=(a("4f10"),a("2877")),m=Object(d["a"])(u,s,r,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-60c5dd56.5f84fc24.js.map