(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dfc29b22"],{a697:function(s,e,a){},b530:function(s,e,a){"use strict";a("a697")},d25d:function(s,e,a){"use strict";a.r(e);var t=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",[a("h2",[s._v("Salespersons Registers")]),s._v(" "),a("b-row",s._l(s.salespersons,(function(e){return a("b-col",{key:e._id,attrs:{cols:"4"}},[a("b-card",{staticClass:"mb-2 salesperson-box"},[a("b-card-title",{staticClass:"admin-card-title"},[s._v("\n            "+s._s(e.fullname)+" ---\x3e "+s._s(e.email)+"\n          ")]),s._v(" "),a("div",{staticClass:"sales-card-info"},[a("span",{staticClass:"sales-info-number"},[a("i",{staticClass:"admin-icon fa fa-clock",attrs:{"aria-hidden":"true"}}),s._v("\n                     "+s._s(e.date)+" \n                  ")]),s._v(" "),a("a",{staticClass:"salesperson-info-link",attrs:{href:"#"},on:{click:function(a){return s.goToSalesPerson(e._id)}}},[s._v("View Salesperson "),a("i",{staticClass:"fa fa-angle-right",attrs:{"aria-hidden":"true"}})])])],1)],1)})),1)],1)},n=[],o=(a("159b"),a("2b0e")),r=a("bc3a"),i=a.n(r),l=a("049c"),c=a.n(l),u=(a("c46f"),a("c1df")),d=a.n(u);o["default"].use(i.a),i.a.defaults.withCredentials=!0,o["default"].use(c.a);var f={name:"sales-persons",metaInfo:{title:"SalesPersons"},components:{},data:function(){return{messages:[],salespersons:[],owner:{},ticket:{},status:""}},created:function(){var s=this;i.a.get("https://defensehere.herokuapp.com/salespersons/").then((function(e){e.data.forEach((function(e){console.log(e.date),e.date=d()(e.date).fromNow(),s.salespersons.push(e)})),console.log(e.data)}))},methods:{goToSalesPerson:function(s){this.$router.push({name:"SalesPerson",params:{id:s}})}}},p=f,h=(a("b530"),a("2877")),b=Object(h["a"])(p,t,n,!1,null,null,null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-dfc29b22.c7be5f73.js.map