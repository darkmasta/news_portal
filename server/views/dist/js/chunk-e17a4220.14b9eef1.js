(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e17a4220"],{1906:function(e,t,A){"use strict";var a=A("8293"),s=A.n(a);s.a},"3f51":function(e,t,A){"use strict";A.r(t);var a=function(){var e=this,t=e.$createElement,A=e._self._c||t;return A("div",[A("b-row",[A("b-col",{staticClass:"d-flex justify-content-between "},[A("div",{staticClass:"page-header"},[A("h4",[e._v("Kategoriler ")]),e._v("\n        selected categories: "+e._s(e.selectedCategories)+"\n      ")]),e._v(" "),A("b-btn",{staticClass:"align-self-start",attrs:{variant:"primary rounded-pill",to:"/category/create"}},[A("span",{staticClass:"fas fa-plus-circle"}),e._v(" Yeni Kategori Ekle")])],1)],1),e._v(" "),A("b-row",[A("b-col",{staticClass:"categories__container"},e._l(e.categoryTitles,(function(t,a){return A("div",{key:a,staticClass:"categories__single-category"},[A("h3",{staticClass:"category__title"},[e._v(e._s(t))]),e._v(" "),A("ul",{staticClass:"category__list"},e._l(e.categoriesData[t],(function(t,a){return A("li",{key:a,staticClass:"category__list-item"},[A("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedCategories,expression:"selectedCategories"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.selectedCategories)?e._i(e.selectedCategories,t)>-1:e.selectedCategories},on:{change:function(A){var a=e.selectedCategories,s=A.target,c=!!s.checked;if(Array.isArray(a)){var i=t,r=e._i(a,i);s.checked?r<0&&(e.selectedCategories=a.concat([i])):r>-1&&(e.selectedCategories=a.slice(0,r).concat(a.slice(r+1)))}else e.selectedCategories=c}}}),e._v(" \n            "+e._s(t)+"\n          ")])})),0)])})),0)],1)],1)},s=[],c=A("bc3a"),i=A.n(c),r=A("9da1"),o={name:"category-create",metaInfo:{title:"Kategoriler"},data:function(){return{categoriesData:{},categoryTitles:[],selectedCategories:[]}},created:function(){var e=this;e.categoryTitles=Object.keys(r["a"]),i.a.post("http://localhost:5000/get_categories/",{}).then((function(t){e.categoriesData=t.data[0],console.log(e.categoriesData)}))}},n=o,l=(A("1906"),A("2877")),E=Object(l["a"])(n,a,s,!1,null,null,null);t["default"]=E.exports},8293:function(e,t,A){},"9da1":function(e,t,A){"use strict";var a={companies:["STM","ASELSAN","ROKETSAN","BMC","TEKNOPARK İSTANBUL","METEKSAN","HAVELSAN","FNSS","TEI","TUSAS","BAYKAR SAVUNMA","OTOKAR","NUROL MAKİNA","TÜRKSAT"],clustering:["SİBER KÜMELENME","TSSK","SAHA İSTANBUL","OSSA","Vizyoner Genç","SaSaD"],countries:["TÜRKİYE","ABD","RUSYA","ÇİN","DİĞER","JAPONYA","LİBYA","İSRAİL","ALMANYA","HİNDİSTAN","KATAR","AZERBAYCAN","PAKİSTAN","MISIR","İRAN","SUUDİ ARABİSTAN","UKRAYNA","İNGİLTERE","YUNANİSTAN","Güney Kore","FRANSA","İSPANYA","MALEZYA"],thinkTank:["SETA","ASSAM","İNSAMER","HARP TARİHİ","TASAM","EDAM","ThinkTech","SDE","ORSAM","SİYAH GRİ BEYAZ","İRAM"],sources:["DERGİLER","KİTAPLAR","MAKALELER","FİLMLER","MEKANLAR","TARİHİ MEKANLAR","RAPORLAR","BELGESELLER","ANALIZLER"],youtubers:["AYHAN TARAKÇI","TOLGA ÖZBEK","KEMAL GÖKSU","KIYAM","TEKNO SAVUNMA","SİYAH GRİ BEYAZ","UMUT YILDIZ","YUSUF AKBABA"],institutions:["SSB","MSB","TÜBİTAK","MKE","EYDEP","TSK","SANAYİ BAKANLIĞI"],mainCategories:["SAVUNMA SANAYİİ","SİBER GÜVENLİK","UZAY","NÜKLEER","YAPAY ZEKA","TEKNOLOJİ","ÇATIŞMA BÖLGELERİ","TARİH","FİRMALAR","YARIŞMALAR","EĞİTİMLER","TATBİKATLAR","SİVİL HAVACILIK","ÜNİVERSİTELER","AR-GE","Gündem","RÖPORTAJLAR"]};t["a"]=a}}]);
//# sourceMappingURL=chunk-e17a4220.14b9eef1.js.map