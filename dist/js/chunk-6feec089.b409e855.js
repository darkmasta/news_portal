(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6feec089"],{"41e9":function(t,e,a){},"6bd0":function(t,e,a){},"73d0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",[a("b-col",[a("h3",[t._v("Update Quote")])])],1),t._v(" "),a("b-row",[a("b-col",{attrs:{cols:"8"}},[a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-3",attrs:{"no-body":""}},[a("b-card-header",{staticClass:"pb-0"},[a("h4",[t._v("Vehicle")])]),t._v(" "),a("b-card-body",[a("b-form-row",[a("b-col",{attrs:{cols:"9"}},[a("b-form-group",{attrs:{label:"VIN  Number","label-size":"lg"}},[a("b-input",{attrs:{size:"lg",placeholder:"2GCJC13ZX71140438"},model:{value:t.vin,callback:function(e){t.vin=e},expression:"vin"}})],1)],1),t._v(" "),a("b-col",{attrs:{cols:"3"}},[a("b-form-group",{attrs:{"label-size":"lg"}},[a("b-btn",{staticClass:"mt-4",attrs:{size:"lg",variant:"warning"},on:{click:function(e){return t.decode(t.vin)}}},[t._v("Decode Number")])],1)],1)],1),t._v(" "),a("b-form-row",[a("b-col",[a("b-form-group",{attrs:{label:"Year","label-size":"lg"}},[a("b-input",{attrs:{label:"Year",placeholder:"Year"},model:{value:t.year,callback:function(e){t.year=e},expression:"year"}})],1)],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Make","label-size":"lg"}},[a("b-input",{attrs:{label:"Make",placeholder:"Make"},model:{value:t.make,callback:function(e){t.make=e},expression:"make"}})],1)],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Model","label-size":"lg"}},[a("b-input",{attrs:{label:"Model",placeholder:"Model"},model:{value:t.carModel,callback:function(e){t.carModel=e},expression:"carModel"}})],1)],1)],1)],1)],1)],1)],1),t._v(" "),a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-4",attrs:{"no-body":""}},[a("b-card-header",{staticClass:"pb-0"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("h4",[t._v("Origin")])]),t._v(" "),a("div",{staticClass:"offset-md-4 col-md-4"},[a("b-btn",{staticClass:"editOrigin",attrs:{variant:"primary",size:"sm"},on:{click:function(e){t.editOrigin=!t.editOrigin}}},[t._v("Edit")])],1)])]),t._v(" "),a("b-card-body",[a("b-form-row",[a("b-col",[a("b-form-group",{attrs:{label:"Zip","label-size":"lg"}},[t.editOrigin?t._e():a("b-input",{attrs:{size:"lg",label:"Origin Zip",disabled:""},model:{value:t.zipCode,callback:function(e){t.zipCode=e},expression:"zipCode"}}),t._v(" "),t.editOrigin?a("b-input",{attrs:{size:"lg",label:"Origin Zip",placeholder:"Origin Zip"},model:{value:t.zipCode,callback:function(e){t.zipCode=e},expression:"zipCode"}}):t._e()],1)],1)],1),t._v(" "),a("b-form-row",[a("b-col",[a("b-form-group",{attrs:{label:"City","label-size":"lg"}},[t.editOrigin?t._e():a("b-input",{attrs:{size:"lg",label:"Origin City",disabled:""},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}}),t._v(" "),t.editOrigin?a("b-input",{attrs:{label:"Origin City",placeholder:"Origin City"},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}}):t._e()],1)],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"State","label-size":"lg"}},[t.editOrigin?t._e():a("b-input",{attrs:{size:"lg",label:"Origin State",disabled:""},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}}),t._v(" "),t.editOrigin?a("b-input",{attrs:{label:"Origin State",placeholder:"Origin State"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}}):t._e()],1)],1)],1)],1)],1)],1),t._v(" "),a("b-col",[a("b-card",{staticClass:"mt-4",attrs:{"no-body":""}},[a("b-card-header",{staticClass:"pb-0"},[a("h4",[t._v("Destination")])]),t._v(" "),a("b-card-body",[a("b-form-row",[a("b-col",[a("b-form-group",{attrs:{label:"Zip","label-size":"lg"}},[a("b-input",{attrs:{size:"lg",label:"Destination Zip",placeholder:"Destination Zip"},model:{value:t.dZipCode,callback:function(e){t.dZipCode=e},expression:"dZipCode"}})],1)],1)],1),t._v(" "),a("b-form-row",[a("b-col",[a("b-form-group",{attrs:{label:"City","label-size":"lg"}},[a("b-input",{attrs:{label:"Destination City",placeholder:"Destiantion City"},model:{value:t.dCity,callback:function(e){t.dCity=e},expression:"dCity"}})],1)],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"State","label-size":"lg"}},[a("b-input",{attrs:{label:"Destination State",placeholder:"Destination State"},model:{value:t.dState,callback:function(e){t.dState=e},expression:"dState"}})],1)],1)],1)],1)],1)],1)],1),t._v(" "),a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-4",attrs:{"no-body":""}},[a("b-card-header",{staticClass:"pb-0"},[a("h4",[t._v("Notes")])]),t._v(" "),a("b-card-body",[a("b-form-group",{attrs:{label:"","label-size":"lg"}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.model.notes,expression:"model.notes"}],staticClass:"form-control",attrs:{rows:"4",cols:"80",placeholder:"Notes..."},domProps:{value:t.model.notes},on:{input:function(e){e.target.composing||t.$set(t.model,"notes",e.target.value)}}})])],1)],1)],1)],1)],1),t._v(" "),a("b-col",{attrs:{cols:"4"}},[a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-3",attrs:{"no-body":""}},[a("b-card-header",{staticClass:"pb-0"},[a("h4",[t._v("Search Customers")])]),t._v(" "),a("b-card-body",[a("b-input-group",{attrs:{size:"lg"}},[t.loading?a("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[a("i",{staticClass:"ion ion-md-sync"})]):t._e(),t._v(" "),t.loading?t._e():a("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[a("i",{staticClass:"ion ion-ios-search"})]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Customer Name",autocomplete:"off"},domProps:{value:t.value},on:{keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.down(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.up(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.hit(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.reset(e)}],blur:t.reset,input:[function(e){e.target.composing||(t.value=e.target.value)},t.updateQuery]}}),t._v(" "),t.value?a("b-input-group-text",{attrs:{slot:"append"},on:{click:t.resetInput},slot:"append"},[a("i",{staticClass:"ion ion-md-close"})]):t._e()],1)],1)],1)],1)],1),t._v(" "),a("b-row",[a("b-col",[a("b-card",{staticClass:"mt-4",attrs:{"no-body":""}},[a("b-card-header",{staticClass:"pb-0"},[a("h4",[t._v("Quote")])]),t._v(" "),a("b-card-body",[a("b-row",[a("b-col",[a("b-button-group",{attrs:{vertical:""}},[a("b-button",{attrs:{variant:"info"},on:{click:function(e){t.selectedPrice=t.economyPrice}}},[a("b-form-radio",{staticClass:"mt-2",attrs:{size:"lg",variant:"warning",name:"some-radios",value:"100"}},[t._v("Economy "),a("b-badge",{staticClass:"ml-2",attrs:{size:"lg",variant:"warning"}},[a("b",[t._v(t._s(t.economyPrice))])])],1)],1),t._v(" "),a("b-button",{attrs:{variant:"info"},on:{click:function(e){t.selectedPrice=t.standardPrice}}},[a("b-form-radio",{staticClass:"mt-2",attrs:{size:"lg",variant:"warning",name:"some-radios",value:"200"}},[t._v("Standard "),a("b-badge",{staticClass:"ml-2",attrs:{variant:"warning"}},[a("b",[t._v(t._s(t.standardPrice))])])],1)],1),t._v(" "),a("b-button",{attrs:{variant:"info"},on:{click:function(e){t.selectedPrice=t.expeditedPrice}}},[a("b-form-radio",{staticClass:"mt-2",attrs:{size:"lg",variant:"warning",name:"some-radios",value:"300"}},[t._v("Expedited "),a("b-badge",{staticClass:"ml-2",attrs:{variant:"warning"}},[a("b",[t._v(t._s(t.expeditedPrice))])])],1)],1)],1)],1),t._v(" "),a("b-col",[a("b-list-group",{staticClass:"mt-4"},[a("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[t._v("\n                        Price :\n                        "),a("b-badge",{staticClass:"px-4 py-2 profit-badge",attrs:{variant:"info"}},[t._v(t._s(t.selectedPrice))])],1),t._v(" "),a("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[t._v("\n                        Profit :\n                        "),a("b-badge",{staticClass:"px-4 py-2 profit-badge",attrs:{variant:"info"}},[a("b-input",{staticClass:"profit-input",attrs:{placeholder:"Profit"},model:{value:t.profit,callback:function(e){t.profit=e},expression:"profit"}})],1)],1),t._v(" "),a("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[a("b",[t._v("Total :")]),t._v(" "),a("b-badge",{staticClass:"px-4 py-2 profit-badge",attrs:{variant:"info"}},[a("b",[t._v(t._s(t.totalPriceCalc()))])])],1)],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"d-flex flex-row-reverse"},[a("b-btn",{staticClass:"p-3 px-5 mt-4",attrs:{size:"lg",variant:"danger"},on:{click:function(e){return t.updateQuote(t.model,t.profit)}}},[t._v("Update Quote!")]),t._v(" "),a("b-btn",{staticClass:"p-3 px-5 mt-4 mr-4",attrs:{size:"lg",variant:"warning"},on:{click:function(e){return t.getQuote(t.model)}}},[t._v("Get Quote")])],1)],1)],1)],1)],1),t._v(" "),a("hr",{staticClass:"mt-4"})],1)},o=[],s=(a("159b"),a("fb6a"),a("a9e3"),a("4de4"),a("c975"),a("a15b"),a("d81d"),a("2b0e")),n=a("bc3a"),r=a.n(n),l=a("049c"),c=a.n(l),d=a("c46f"),u=a("1157"),p=a.n(u),b=a("0969");a("ff5a"),a("41e9");s["default"].use(r.a),r.a.defaults.withCredentials=!0,s["default"].use(c.a),s["default"].prototype.$http=r.a;var v={name:"quotes",metaInfo:{title:"Quotes"},props:{model:{type:Object,default:function(){return{}}}},data:function(){return{value:"",loading:!1,editOrigin:!1,limit:5,minChars:3,zipCode:"",city:"",state:"",dZipCode:"",dCity:"",dState:"",year:null,carModel:"",make:"",address:"",customers:[],vin:"",showPriceTab:!1,economyPrice:0,standardPrice:0,expeditedPrice:0,totalPrice:0,selectedPrice:0,quoteId:0,ownerEmail:"",owner:"",quotes:[],prices:[{text:"Economy",value:"0"},{text:"Standard",value:"1"},{text:"Expedited",value:"2"}],selectedPriceOption:"",profit:0,items:{value:"",text:""}}},mixins:[b["a"]],components:{},created:function(){var t=this;r.a.post("https://defensehere.herokuapp.com/get_customers/").then((function(e){var a=e.data;t.customers=a,d["a"].each(a,(function(e,a){var i={value:0,text:""};i.value=a,i.text=e.fullName,t.options.push(i)}))}));var e={};e.id=t.$route.params.id,r.a.post("https://defensehere.herokuapp.com/get_quote_by_id",{data:e}).then((function(e){var a=e.data[0];console.log(a),t.vin=a.vin,t.carModel=a.model,t.year=a.year,t.profit=a.profit,t.selectedPrice=a.price,t.city=a.originCity,t.state=a.originState,t.zipCode=a.originZipCode,t.dZipCode=a.destinationZipCode,t.dCity=a.destinationCity,t.dState=a.destinationState}))},events:{click:function(t){console.log(t)}},watch:{vin:function(){var t=this;if(t.vin.length>6)var e=this.vin+";";p.a.ajax({url:"https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",type:"POST",data:{format:"json",data:e},dataType:"json",success:function(e){var a=e.Results[0];t.year=a.ModelYear,t.make=a.Make,t.carModel=a.Model,console.log(e),t.$nextTick()},error:function(t,e,a){console.log(t.status),console.log(a)}})},zipCode:function(){this.model.city="",this.zipCode&&5==this.zipCode.length&&this.lookupZip()},dZipCode:function(){this.model.dCity="",this.dZipCode&&5==this.dZipCode.length&&this.lookupZip2()},item:function(){var t=this;"Select Customer"==this.item.text?this.address="":this.customers.forEach((function(e){t.item.text==e.fullName&&(t.dCity=e.city,t.dState=e.state,t.dZipCode=e.zipCode)}))}},methods:{saveSelectedQuotes:function(t){var e=this,a=[];t.forEach((function(t){e.quotes.forEach((function(e){e._id.slice(-4)==t.Id&&a.push(e)}))})),this.$store.commit("setSelectedQuotes",a),this.$router.push("orders")},rowSelected:function(t){this.selectedQuotes=t,console.log(t)},clickRows:function(t){var e=this.$refs.myTable.$el,a=e.getElementsByTagName("tbody")[0],i=a.getElementsByTagName("tr");t.forEach((function(t){i[t].click()})),console.log("items")},totalPriceCalc:function(){var t=this;return Number(t.profit)+Number(t.selectedPrice)},updateQuery:function(){this.query=this.value,this.update()},onHit:function(t){this.value=t.screen_name,this.reset()},resetInput:function(){this.value="",this.reset()},lookupZip:d["a"].debounce((function(){var t=this;t.city="Searching...";var e={zipCode:t.zipCode};r.a.post("https://defensehere.herokuapp.com/decode_zip/",{data:e}).then((function(e){t.city=e.data.city,t.state=e.data.state})).catch((function(e){t.city="Invalid Zipcode",t.state="Invalid Zipcode"}))}),1e3),lookupZip2:d["a"].debounce((function(){var t=this;t.dCity="Searching...";var e={zipCode:t.dZipCode};r.a.post("https://defensehere.herokuapp.com/decode_zip/",{data:e}).then((function(e){t.dCity=e.data.city,t.dState=e.data.state})).catch((function(e){t.dCity="Invalid Zipcode",t.dState="Invalid Zipcode"}))}),1e3),getQuote:function(t){var e=this,a={};a=t,a.vin=e.vin,a.year=e.year,a.model=e.carModel,a.make=e.make,a.destinationCity=e.dCity,a.destinationState=e.dState,a.destinationZipCode=e.dZipCode,a.zipCode=e.zipCode,a.state=e.state,a.city=e.city,console.log(a);var i={carCondition:"1",transportType:"1",vehicleMake:a.make,vehicleModel:a.model,vehicleYear:a.year,zipDrop:a.destinationZipCode,zipPick:a.zipCode};r.a.post("https://nexusv.d.brainwork.lv/api/calculations",i).then((function(t){console.log(t),e.economyPrice=t.data.data.result.quote.economy,e.standardPrice=t.data.data.result.quote.standard,e.expeditedPrice=t.data.data.result.quote.expedited,e.showPriceTab=!0}),(function(t){}))},updateQuote:function(t){var e=this,a={};a.vin=e.vin,a.year=e.year,a.model=e.carModel,a.make=e.make,a.destinationCity=e.dCity,a.destinationState=e.dState,a.destinationZipCode=e.dZipCode,a.zipCode=e.zipCode,a.state=e.state,a.city=e.city,a.price=e.selectedPrice,a.profit=e.profit,a.id=e.$route.params.id,console.log(a),r.a.post("https://defensehere.herokuapp.com/update_quote/",{data:a}).then((function(t){console.log(t.data)}),(function(t){}))},decode:function(t){var e=this;if(void 0!=t&&t.length>5){var a=this.vin+";";p.a.ajax({url:"https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",type:"POST",data:{format:"json",data:a},dataType:"json",success:function(t){var a=t.Results[0];e.year=a.ModelYear,e.make=a.Make,e.carModel=a.Model,console.log(t),e.$nextTick()},error:function(t,e,a){console.log(t.status),console.log(a)}})}},showDetails:function(){return!0},myRowClickHandler:function(t,e){console.log(t),this.selectedQuote=t},reset:function(){this.item={}},filter:function(t){var e=t.toLowerCase();console.log(t);var a=this.originalQuotesTableData.filter((function(t){return-1!==Object.keys(t).map((function(e){return String(t[e])})).join("|").toLowerCase().indexOf(e)||!e}));this.quotesTableData=a}},computed:{totalItems:function(){return this.quotesTableData.length},totalPages:function(){return Math.floor(this.totalItems/this.perPage)||(this.totalItems?1:0)},tableFields:function(){var t=this;return this.jsonData[0]?Object.keys(this.quotesTableData[0]).map((function(e){return{key:e,sortable:t.isSortable}})):[]}}},f=v,m=(a("7723"),a("2877")),h=Object(m["a"])(f,i,o,!1,null,null,null);e["default"]=h.exports},7723:function(t,e,a){"use strict";a("6bd0")}}]);
//# sourceMappingURL=chunk-6feec089.b409e855.js.map