(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60c5dd56"],{"4f10":function(e,t,s){"use strict";s("7841")},7841:function(e,t,s){},dcef:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("b-row",[s("b-col",[s("h3",[e._v("Admin View/Update User")])])],1),e._v(" "),s("b-row",[s("b-col",{attrs:{offset:"10"}},[s("b-btn",{staticClass:"align-self-start new-user-btn",attrs:{variant:"primary rounded-pill"},on:{click:e.goToNewUser}},[s("span",{staticClass:"fas fa-plus-circle"}),e._v(" Yeni Kullanici Ekle")])],1)],1),e._v(" "),s("b-row",[s("b-col",[s("b-card",{staticClass:"mt-2",attrs:{"no-body":""}},[s("b-card-body",[s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col"}),e._v(" "),s("div",{staticClass:"col"},[s("b-form-group",[s("b-input",{staticClass:"d-inline-block w-auto float-sm-right",attrs:{size:"sm",placeholder:"Search..."},on:{input:function(t){return e.filter(t)}}})],1)],1)]),e._v(" "),s("b-table",{ref:"myTable",attrs:{selectable:"",striped:e.striped,bordered:e.bordered,borderless:e.borderless,outlined:e.outlined,small:e.small,hover:e.hover,dark:e.dark,fixed:e.fixed,"foot-clone":e.footClone,"no-border-collapse":e.noCollapse,items:e.usersTableData,fields:e.fields,"head-variant":e.headVariant,"table-variant":e.tableVariant},on:{"row-selected":e.rowSelected}}),e._v(" "),1==e.selectedUsers.length?s("b-btn",{staticClass:"p-3 px-5 mt-4",staticStyle:{float:"right","margin-left":"25px"},attrs:{size:"lg",variant:"warning"},on:{click:function(t){return e.goToUser()}}},[e._v("Edit Selected User!")]):e._e()],1)])],1)],1)],1)],1)},r=[],i=(s("159b"),s("fb6a"),s("a9e3"),s("4de4"),s("c975"),s("a15b"),s("d81d"),s("2b0e")),o=s("bc3a"),n=s.n(o),l=s("049c"),c=s.n(l),u=(s("c46f"),s("1157"),s("0969")),d=(s("ff5a"),s("c1df")),f=s.n(d);i["default"].use(n.a),n.a.defaults.withCredentials=!0,i["default"].use(c.a);var b={name:"AdminUsers",metaInfo:{title:"Users"},props:{model:{type:Object,default:function(){return{}}}},data:function(){return{value:"",fields:[{key:"Id",sortable:!0},{key:"Email",sortable:!0},{key:"Son_Gorulme",sortable:!0},{key:"Password",sortable:!0},{key:"Kullanici_Dili",sortable:!0},{key:"Status",sortable:!0}],usersTableData:[],originalUsersTableData:[],loading:!1,editOrigin:!1,selectedUsers:[],limit:5,minChars:3,address:"",customers:[],vin:"",showPriceTab:!1,economyPrice:0,standardPrice:0,expeditedPrice:0,totalPrice:0,selectedPrice:0,quoteId:0,ownerEmail:"",owner:"",quotes:[],profit:0,items:{value:"",text:""},striped:!1,bordered:!1,borderless:!1,outlined:!0,small:!1,hover:!0,dark:!1,fixed:!1,footClone:!1,headVariant:"light",tableVariant:"",noCollapse:!1}},mixins:[u["a"]],components:{},created:function(){var e=this;n.a.get("https://defensehere.herokuapp.com/users/").then((function(t){var s=t.data;console.log(s),e.users=s,s.forEach((function(t){var s={Id:t._id.slice(-4),Status:t.userRole,Email:t.email,Kullanici_Dili:t.defaultLang,Son_Gorulme:f()(t.lastLogin).fromNow(),Password:t.password};e.usersTableData.push(s)})),e.originalUsersTableData=e.usersTableData}))},events:{click:function(e){console.log(e)}},watch:{},methods:{goToNewUser:function(){this.$router.push({name:"AdminUserCreate"})},goToUser:function(){var e=this,t=[];e.selectedUsers.forEach((function(s){e.users.forEach((function(e){e._id.slice(-4)==s.Id&&t.push(e)}))})),1==t.length&&this.$router.push({name:"AdminUser",params:{id:t[0]._id}})},rowSelected:function(e){this.selectedUsers=e,console.log(e)},clickRows:function(e){var t=this.$refs.myTable.$el,s=t.getElementsByTagName("tbody")[0],a=s.getElementsByTagName("tr");e.forEach((function(e){a[e].click()})),console.log("items")},totalPriceCalc:function(){var e=this;return Number(e.profit)+Number(e.selectedPrice)},updateQuery:function(){this.query=this.value,this.update()},onHit:function(e){this.value=e.screen_name,this.reset()},resetInput:function(){this.value="",this.reset()},showDetails:function(){return!0},myRowClickHandler:function(e,t){console.log(e),this.selectedQuote=e},reset:function(){this.item={}},filter:function(e){var t=e.toLowerCase();console.log(e);var s=this.originalUsersTableData.filter((function(e){return-1!==Object.keys(e).map((function(t){return String(e[t])})).join("|").toLowerCase().indexOf(t)||!t}));this.usersTableData=s}},computed:{totalItems:function(){return this.quotesTableData.length},totalPages:function(){return Math.floor(this.totalItems/this.perPage)||(this.totalItems?1:0)},tableFields:function(){var e=this;return this.jsonData[0]?Object.keys(this.quotesTableData[0]).map((function(t){return{key:t,sortable:e.isSortable}})):[]}}},h=b,m=(s("4f10"),s("2877")),p=Object(m["a"])(h,a,r,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-60c5dd56.17544c89.js.map