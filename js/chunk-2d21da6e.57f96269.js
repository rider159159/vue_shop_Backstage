(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21da6e"],{d1e0:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{},[t._v("測試")]),s("div",{staticClass:"my-5 row justify-content-center"},[s("form",{staticClass:"col-md-6",on:{submit:function(e){return e.preventDefault(),t.payOrder(e)}}},[s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.order.products,(function(e){return s("tr",{key:e.id},[s("td",{staticClass:"align-middle"},[t._v(t._s(e.product.title))]),s("td",{staticClass:"align-middle"},[t._v(t._s(e.qty)+"/"+t._s(e.product.unit))]),s("td",{staticClass:"align-middle text-right"},[t._v(t._s(e.final_total))])])})),0),s("tfoot",[s("tr",[s("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("總計")]),s("td",{staticClass:"text-right"},[t._v(t._s(t.order.total))])])])]),s("table",{staticClass:"table"},[s("tbody",[s("tr",[s("th",{attrs:{width:"100"}},[t._v("Email")]),s("td",[t._v(t._s(t.order.user.email))])]),s("tr",[s("th",[t._v("姓名")]),s("td",[t._v(t._s(t.order.user.name))])]),s("tr",[s("th",[t._v("收件人電話")]),s("td",[t._v(t._s(t.order.user.tel))])]),s("tr",[s("th",[t._v("收件人地址")]),s("td",[t._v(t._s(t.order.user.address))])]),s("tr",[s("th",[t._v("付款狀態")]),s("td",[t.order.is_paid?s("span",{staticClass:"text-success"},[t._v("付款完成")]):s("span",[t._v("尚未付款")])])])])]),!1===t.order.is_paid?s("div",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-danger"},[t._v("確認付款去")])]):t._e()])])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("th",[t._v("品名")]),s("th",[t._v("數量")]),s("th",[t._v("單價")])])}],d=(s("99af"),{data:function(){return{order:{user:{}},orderId:" "}},methods:{getOrder:function(){var t=this,e="".concat(Object({NODE_ENV:"production",BASE_URL:"/vue_shop_Backstage/"}).VUE_APP_APIPATH,"/api/").concat(Object({NODE_ENV:"production",BASE_URL:"/vue_shop_Backstage/"}).VUE_APP_CUSTOMPATH,"/order/").concat(t.orderId);t.isLoading=!0,this.$http.get(e).then((function(e){console.log(e.data.order),t.order=e.data.order,t.isLoading=!1}))},payOrder:function(){var t=this,e="".concat(Object({NODE_ENV:"production",BASE_URL:"/vue_shop_Backstage/"}).VUE_APP_APIPATH,"/api/").concat(Object({NODE_ENV:"production",BASE_URL:"/vue_shop_Backstage/"}).VUE_APP_CUSTOMPATH,"/pay/").concat(t.orderId);t.isLoading=!0,this.$http.post(e).then((function(e){console.log(e),e.data.success&&t.getOrder(),t.isLoading=!1}))}},created:function(){this.orderId=this.$route.params.orderId,this.getOrder()}}),o=d,i=s("2877"),n=Object(i["a"])(o,r,a,!1,null,null,null);e["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d21da6e.57f96269.js.map