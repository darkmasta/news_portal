(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12f96cf8"],{"314f":function(s,a,t){},ca73:function(s,a,t){"use strict";t.r(a);var e=function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",[t("b-row",[t("b-col",{staticClass:"box",attrs:{cols:"7"}},[t("b-card",{staticClass:"mb-2 salesperson-box"},[t("b-card-title",{staticClass:"admin-card-title"},[s._v("\n        "+s._s(s.salesperson.fullname)+" ---\x3e "+s._s(s.salesperson.email)+"\n      ")]),s._v(" "),t("div",{staticClass:"sales-card-info"},[t("span",{staticClass:"admin-info-number"},[t("i",{staticClass:"admin-icon fa fa-clock",attrs:{"aria-hidden":"true"}}),s._v("\n                 "+s._s(s.salesperson.date)+" \n          ")])]),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Email:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.email)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Business Name:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.businessName)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Dba Name:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.dbaName)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Address:")])]),s._v(" "),t("b-col",{attrs:{cols:"5"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.address)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("City:")])]),s._v(" "),t("b-col",{attrs:{cols:"5"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.city)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("State:")])]),s._v(" "),t("b-col",{attrs:{cols:"5"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.state)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Zip Code:")])]),s._v(" "),t("b-col",{attrs:{cols:"5"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.zipCode)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Tax Number:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.taxNumber)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Primary Phone:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.primaryPhone)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Dealership Type:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.dealershipType)+" \n            ")])])],1),s._v(" "),t("b-row",{staticClass:"info-text"},[t("b-col",{attrs:{cols:"3"}},[t("span",[s._v("Verified:")])]),s._v(" "),t("b-col",{attrs:{cols:"6"}},[t("span",[s._v("\n                   "+s._s(s.salesperson.isVerified)+" \n            ")])])],1)],1)],1),s._v(" "),t("b-col",[t("b-card",{staticClass:"verify-btn"},[t("b-btn",{attrs:{id:"verify-first-btn",variant:"warning"},on:{click:function(a){return s.verify(s.salesperson._id)}}},[s._v("Verify")]),s._v(" "),t("b-btn",{attrs:{id:"verify-second-btn",variant:"danger"}},[s._v("Delete")])],1)],1)],1),s._v(" "),t("b-row",[t("b-col",[t("b-card",{staticStyle:{width:"55rem"}},[t("h4",{staticClass:"card-title"},[s._v("File 1")]),s._v(" "),t("img",{staticClass:"doc-img",attrs:{src:"/images/"+s.salesperson.file1name,alt:"Card image cap"}})])],1)],1),s._v(" "),t("b-row",[t("b-col",[t("b-card",{staticStyle:{width:"55rem"}},[t("h4",{staticClass:"card-title"},[s._v("File 2")]),s._v(" "),t("img",{staticClass:"doc-img",attrs:{src:"/images/"+s.salesperson.file2name,alt:"Card image cap"}})])],1)],1)],1)},n=[],o=(t("5e15"),t("2b0e")),l=t("bc3a"),r=t.n(l),c=t("049c"),i=t.n(c),_=(t("c46f"),t("c1df")),v=t.n(_);o["default"].use(r.a),r.a.defaults.withCredentials=!0,o["default"].use(i.a);var p={name:"SalesPerson",metaInfo:{title:"Sales Person"},data:function(){return{owner:{},ticket:{},salesperson:{}}},created:function(){var s=this,a={};a.id=s.$route.params.id,r.a.get("https://defensehere.herokuapp.com/salespersons/"+a.id).then((function(a){a.data[0].date=v()(a.data[0].date).fromNow(),s.salesperson=a.data[0],console.log(a.data)}))},methods:{verify:function(s){var a={id:s};r.a.post("https://defensehere.herokuapp.com/verify_salesperson/",{data:a}).then((function(s){s.data[0].date=v()(s.data[0].date).fromNow(),vm.salesperson=s.data[0],console.log(s.data)}))}}},d=p,b=(t("e929"),t("2877")),f=Object(b["a"])(d,e,n,!1,null,null,null);a["default"]=f.exports},e929:function(s,a,t){"use strict";t("314f")}}]);
//# sourceMappingURL=chunk-12f96cf8.92e05d78.js.map