(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d9edb02","chunk-4466f64a"],{"20fe":function(t,i,e){"use strict";e("9ce9")},"660e":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"main_container"},[a("header",[a("div",{staticClass:"logo"},[a("img",{attrs:{src:e("9d64")}})]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"select_container"},[a("b-select",{staticClass:"language_box",model:{value:t.language,callback:function(i){t.language=i},expression:"language"}},t._l(t.languages,(function(i,e){return a("option",{key:e,domProps:{value:i}},[t._v(" \n                    "+t._s(i)+"\n                ")])})),0),t._v(" "),a("i",{staticClass:"fas fa-sort-down icon"})],1)]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"activities_center"},t._l(t.activities,(function(t,i){return a("activity",{key:i,attrs:{activity:t}})})),1),t._v(" "),a("b-row",[a("b-col",{staticClass:"box",attrs:{cols:"8"}}),t._v(" "),a("b-col",{staticClass:"box",attrs:{cols:"4"}})],1)],1)},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"search"},[e("input"),t._v(" "),e("i",{staticClass:"fa fa-search icon"})])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"news_texts"},[e("ul",[e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")]),t._v(" "),e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")]),t._v(" "),e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")]),t._v(" "),e("li",[t._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque!")])])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"categories_box"},[e("ul",[e("li",[t._v("Savunma Sanayi")]),t._v(" "),e("li",[t._v("Siber Guvenlik")]),t._v(" "),e("li",[t._v("Uzay")]),t._v(" "),e("li",[t._v("Nukleer")]),t._v(" "),e("li",[t._v("Yapay Zeka")]),t._v(" "),e("li",[t._v("Teknoloji")]),t._v(" "),e("li",[t._v("Catisma Bolgeleri")]),t._v(" "),e("li",[t._v("Sivil Havacilik")]),t._v(" "),e("li",[t._v("Tarih")]),t._v(" "),e("li",[t._v("Diger "),e("span",[e("i",{staticClass:"fas fa-sort-down icon"})])])])])}],c=(e("159b"),e("bc3a")),n=e.n(c),l=e("de54"),o={name:"home-page",metaInfo:{title:"Home Page"},components:{Activity:l["default"]},data:function(){return{languages:["Turkce 🇹🇷","Ingilizce 🇬🇧","Fransizca 🇫🇷","Arapca 🇸🇦","Ukraynaca 🇺🇦"],language:"Turkce 🇹🇷",activities:[]}},created:function(){var t=this;n.a.post("https://defensehere.herokuapp.com//get_activities/",{}).then((function(i){console.log(i.data),t.activities=i.data,t.activities.forEach((function(t){t.activityImage="https://defensehere.herokuapp.com//images/"+t.activityImage}))}))},methods:{}},r=o,u=(e("89b1"),e("2877")),v=Object(u["a"])(r,a,s,!1,null,null,null);i["default"]=v.exports},"89b1":function(t,i,e){"use strict";e("edf3")},"9ce9":function(t,i,e){},de54:function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"activity_item"},[e("img",{attrs:{src:t.activity.activityImage}}),t._v(" "),e("h4",[t._v(t._s(t.activity.activityTitle))])])},s=[],c=(e("bc3a"),{name:"Activity",props:{activity:Object},data:function(){return{activity:{}}},created:function(){},methods:{}}),n=c,l=(e("20fe"),e("2877")),o=Object(l["a"])(n,a,s,!1,null,null,null);i["default"]=o.exports},edf3:function(t,i,e){}}]);
//# sourceMappingURL=chunk-2d9edb02.54e23753.js.map