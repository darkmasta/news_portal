(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43d6dce0"],{"41e9":function(e,t,a){},f320:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-row",[a("b-col",[a("h3",[e._v("Admin View/Update Quote")])])],1),e._v(" "),a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-2",attrs:{"no-body":""}},[a("b-card-body",[a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col"}),e._v(" "),a("div",{staticClass:"col"},[a("b-form-group",[a("b-input",{staticClass:"d-inline-block w-auto float-sm-right",attrs:{size:"sm",placeholder:"Search..."},on:{input:function(t){return e.filter(t)}}})],1)],1)]),e._v(" "),a("b-table",{ref:"myTable",attrs:{selectable:"",striped:e.striped,bordered:e.bordered,borderless:e.borderless,outlined:e.outlined,small:e.small,hover:e.hover,dark:e.dark,fixed:e.fixed,"foot-clone":e.footClone,"no-border-collapse":e.noCollapse,items:e.quotesTableData,fields:e.fields,"head-variant":e.headVariant,"table-variant":e.tableVariant},on:{"row-selected":e.rowSelected}}),e._v(" "),1==e.selectedQuotes.length?a("b-btn",{staticClass:"p-3 px-5 mt-4",staticStyle:{float:"right","margin-left":"25px"},attrs:{size:"lg",variant:"warning"},on:{click:function(t){return e.goToQuote()}}},[e._v("Edit Selected Quote!")]):e._e()],1)])],1)],1)],1)],1)},i=[],n=(a("159b"),a("fb6a"),a("a9e3"),a("4de4"),a("c975"),a("a15b"),a("d81d"),a("2b0e")),s=a("bc3a"),r=a.n(s),l=a("049c"),c=a.n(l),d=a("c46f"),u=(a("1157"),a("0969")),p=(a("ff5a"),a("c1df")),f=a.n(p);a("41e9");n["default"].use(r.a),r.a.defaults.withCredentials=!0,n["default"].use(c.a),n["default"].prototype.$http=r.a;var h={name:"quotes",metaInfo:{title:"Quotes"},props:{model:{type:Object,default:function(){return{}}}},data:function(){return{value:"",fields:[{key:"Id",sortable:!0},{key:"Created",sortable:!0},{key:"Shipper",sortable:!0},{key:"Vehicle",sortable:!0},{key:"Origin_Destination",sortable:!0},{key:"First_Avalaible",sortable:!0},{key:"Tariff",sortable:!0},{key:"Carrier_Pay",sortable:!0},{key:"Status",sortable:!0}],quotesTableData:[],originalQuotesTableData:[],loading:!1,editOrigin:!1,selectedQuotes:[],limit:5,minChars:3,zipCode:"",city:"",state:"",dZipCode:"",dCity:"",dState:"",year:null,carModel:"",make:"",address:"",customers:[],vin:"",showPriceTab:!1,economyPrice:0,standardPrice:0,expeditedPrice:0,totalPrice:0,selectedPrice:0,quoteId:0,ownerEmail:"",owner:"",quotes:[],prices:[{text:"Economy",value:"0"},{text:"Standard",value:"1"},{text:"Expedited",value:"2"}],selectedPriceOption:"",profit:0,items:{value:"",text:""},striped:!1,bordered:!1,borderless:!1,outlined:!0,small:!1,hover:!0,dark:!1,fixed:!1,footClone:!1,headVariant:"light",tableVariant:"",noCollapse:!1}},mixins:[u["a"]],components:{},created:function(){var e=this;r.a.post("https://defensehere.herokuapp.com/get_customers/").then((function(t){var a=t.data;e.customers=a,d["a"].each(a,(function(t,a){var o={value:0,text:""};o.value=a,o.text=t.fullName,e.options.push(o)}))})),r.a.post("https://defensehere.herokuapp.com/get_quotes/").then((function(t){var a=t.data;console.log(a),e.quotes=a,a.forEach((function(t){var a={Id:t._id.slice(-4),Created:f()(t.date).fromNow(),Origin_Destination:t.originZipCode+" -> "+t.destinationZipCode,First_Avalaible:"----",Tariff:"$"+t.profit,Carrier_Pay:"$"+t.price,Status:"active",Shipper:t.ownerEmail,Vehicle:t.vin};e.quotesTableData.push(a)})),e.originalQuotesTableData=e.quotesTableData})),r.a.get("https://defensehere.herokuapp.com/user").then((function(t){var a=t.data;e.profit=a.defaultProfit,e.city=a.city,e.state=a.state,e.zipCode=a.zip}),(function(e){console.log(e)}))},events:{click:function(e){console.log(e)}},watch:{},methods:{goToQuote:function(){var e=this,t=[];e.selectedQuotes.forEach((function(a){e.quotes.forEach((function(e){e._id.slice(-4)==a.Id&&t.push(e)}))})),1==t.length&&this.$router.push({name:"Quote",params:{id:t[0]._id}})},rowSelected:function(e){this.selectedQuotes=e,console.log(e)},clickRows:function(e){var t=this.$refs.myTable.$el,a=t.getElementsByTagName("tbody")[0],o=a.getElementsByTagName("tr");e.forEach((function(e){o[e].click()})),console.log("items")},totalPriceCalc:function(){var e=this;return Number(e.profit)+Number(e.selectedPrice)},updateQuery:function(){this.query=this.value,this.update()},onHit:function(e){this.value=e.screen_name,this.reset()},resetInput:function(){this.value="",this.reset()},lookupZip:d["a"].debounce((function(){var e=this;e.city="Searching...";var t={zipCode:e.zipCode};r.a.post("https://defensehere.herokuapp.com/decode_zip/",{data:t}).then((function(t){e.city=t.data.city,e.state=t.data.state})).catch((function(t){e.city="Invalid Zipcode",e.state="Invalid Zipcode"}))}),1e3),lookupZip2:d["a"].debounce((function(){var e=this;e.dCity="Searching...";var t={zipCode:e.dZipCode};r.a.post("https://defensehere.herokuapp.com/decode_zip/",{data:t}).then((function(t){e.dCity=t.data.city,e.dState=t.data.state})).catch((function(t){e.dCity="Invalid Zipcode",e.dState="Invalid Zipcode"}))}),1e3),getQuote:function(e){var t=this,a={};a=e,a.vin=t.vin,a.year=t.year,a.model=t.carModel,a.make=t.make,a.destinationCity=t.dCity,a.destinationState=t.dState,a.destinationZipCode=t.dZipCode,a.zipCode=t.zipCode,a.state=t.state,a.city=t.city,console.log(a);var o={carCondition:"1",transportType:"1",vehicleMake:a.make,vehicleModel:a.model,vehicleYear:a.year,zipDrop:Number(a.destinationZipCode),zipPick:a.zipCode};console.log(o),r.a.post("https://nexusv.d.brainwork.lv/api/calculations",o).then((function(e){console.log(e),t.economyPrice=e.data.data.result.quote.economy,t.standardPrice=e.data.data.result.quote.standard,t.expeditedPrice=e.data.data.result.quote.expedited,t.showPriceTab=!0}),(function(e){}))},showDetails:function(){return!0},myRowClickHandler:function(e,t){console.log(e),this.selectedQuote=e},reset:function(){this.item={}},filter:function(e){var t=e.toLowerCase();console.log(e);var a=this.originalQuotesTableData.filter((function(e){return-1!==Object.keys(e).map((function(t){return String(e[t])})).join("|").toLowerCase().indexOf(t)||!t}));this.quotesTableData=a}},computed:{totalItems:function(){return this.quotesTableData.length},totalPages:function(){return Math.floor(this.totalItems/this.perPage)||(this.totalItems?1:0)},tableFields:function(){var e=this;return this.jsonData[0]?Object.keys(this.quotesTableData[0]).map((function(t){return{key:t,sortable:e.isSortable}})):[]}}},b=h,v=a("2877"),m=Object(v["a"])(b,o,i,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-43d6dce0.d61247ef.js.map