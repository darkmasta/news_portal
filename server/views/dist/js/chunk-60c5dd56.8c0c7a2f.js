(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60c5dd56"],{"4f10":function(e,t,s){"use strict";s("7841")},7841:function(e,t,s){},dcef:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("b-row",[s("b-col",[s("h3",[e._v("Kullanıcı Listesi")])])],1),e._v(" "),s("b-row",[s("b-col",{attrs:{offset:"10"}},[s("b-btn",{staticClass:"align-self-start new-user-btn",attrs:{variant:"primary rounded-pill"},on:{click:e.goToNewUser}},[s("span",{staticClass:"fas fa-plus-circle"}),e._v(" Yeni Kullanici Ekle")])],1)],1),e._v(" "),s("b-row",[s("b-col",[s("b-card",{staticClass:"mt-2",attrs:{"no-body":""}},[s("b-card-body",[s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col"}),e._v(" "),s("div",{staticClass:"col"},[s("b-form-group",[s("b-input",{staticClass:"d-inline-block w-auto float-sm-right",attrs:{size:"sm",placeholder:"Search..."},on:{input:function(t){return e.filter(t)}}})],1)],1)]),e._v(" "),s("b-table",{ref:"myTable",staticClass:"table nexus-table mt-2",attrs:{hover:"",borderless:"",items:e.usersTableData,fields:e.fields},scopedSlots:e._u([{key:"cell(details)",fn:function(t){return[s("span",{staticClass:"far fa-edit mr-2 text-primary",attrs:{title:"Edit User"},on:{click:function(s){return e.goToUser(t)}}}),e._v(" "),s("span",{staticClass:"fas fa-times text-danger",attrs:{title:"Delete User"},on:{click:function(s){return e.deleteUser(t)}}})]}}])})],1)])],1)],1)],1)],1)},r=[],i=(s("159b"),s("a9e3"),s("4de4"),s("c975"),s("a15b"),s("d81d"),s("bc3a")),l=s.n(i),n=(s("049c"),s("c46f"),s("1157"),s("0969")),o=(s("ff5a"),s("c1df")),c=s.n(o);c.a.locale("tr");var u={name:"AdminUsers",metaInfo:{title:"Users"},props:{model:{type:Object,default:function(){return{}}}},data:function(){return{value:"",fields:[{key:"order",label:"Kullanici Sirasi",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"name",label:"Isim Soyisim",sortable:"true",class:"text-center align-middle"},{key:"Email",sortable:!0},{key:"userRole",label:"Kullanici Rolu",sortable:!0,sortDirection:"desc",class:"text-center align-middle"},{key:"Son_Gorulme",sortable:!0},{key:"Password",sortable:!0},{key:"Kullanici_Dili",sortable:!0},{key:"details",label:"İşlemler",sortable:"true",class:"text-center align-middle"}],usersTableData:[],originalUsersTableData:[],loading:!1,editOrigin:!1,selectedUsers:[],limit:5,minChars:3,address:"",customers:[],vin:"",showPriceTab:!1,economyPrice:0,standardPrice:0,expeditedPrice:0,totalPrice:0,selectedPrice:0,quoteId:0,ownerEmail:"",owner:"",quotes:[],profit:0,items:{value:"",text:""},striped:!1,bordered:!1,borderless:!1,outlined:!0,small:!1,hover:!0,dark:!1,fixed:!1,footClone:!1,headVariant:"light",tableVariant:"",noCollapse:!1}},mixins:[n["a"]],components:{},created:function(){var e=this;l.a.get("https://defensehere.herokuapp.com/users/").then((function(t){var s=t.data;console.log(s),e.users=s,s.forEach((function(t,s){var a={order:s+1,name:t.firstName+" "+t.lastName,userRole:t.userRole,Email:t.email,Kullanici_Dili:t.defaultLang,Son_Gorulme:c()(t.lastLogin).format("DD/MM/YYYY, h:mm:ss a"),Password:t.password,details:t._id};e.usersTableData.push(a)})),e.originalUsersTableData=e.usersTableData}))},events:{click:function(e){console.log(e)}},watch:{},methods:{goToNewUser:function(){this.$router.push({name:"AdminUserCreate"})},rowSelected:function(e){this.selectedUsers=e,console.log(e)},clickRows:function(e){var t=this.$refs.myTable.$el,s=t.getElementsByTagName("tbody")[0],a=s.getElementsByTagName("tr");e.forEach((function(e){a[e].click()}))},totalPriceCalc:function(){var e=this;return Number(e.profit)+Number(e.selectedPrice)},updateQuery:function(){this.query=this.value,this.update()},onHit:function(e){this.value=e.screen_name,this.reset()},resetInput:function(){this.value="",this.reset()},showDetails:function(){return!0},myRowClickHandler:function(e,t){console.log(e),this.selectedQuote=e},reset:function(){this.item={}},goToUser:function(e){console.log(e),this.$router.push({name:"AdminUser",params:{id:e.item.details}})},filter:function(e){var t=e.toLowerCase();console.log(e);var s=this.originalUsersTableData.filter((function(e){return-1!==Object.keys(e).map((function(t){return String(e[t])})).join("|").toLowerCase().indexOf(t)||!t}));this.usersTableData=s}},computed:{totalItems:function(){return this.quotesTableData.length},totalPages:function(){return Math.floor(this.totalItems/this.perPage)||(this.totalItems?1:0)},tableFields:function(){var e=this;return this.jsonData[0]?Object.keys(this.quotesTableData[0]).map((function(t){return{key:t,sortable:e.isSortable}})):[]}}},d=u,f=(s("4f10"),s("2877")),m=Object(f["a"])(d,a,r,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-60c5dd56.8c0c7a2f.js.map