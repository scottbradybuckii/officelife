(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"3IRN":function(t,e,s){"use strict";s.r(e);var a={props:{employee:{type:Object,default:null}},data:function(){return{}},methods:{}},n=(s("gX/8"),s("KHd+")),i=Object(n.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mb4 relative"},[s("span",{staticClass:"db fw5 mb2"},[t._v("\n    🌴 Holidays\n  ")]),t._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:t.$page.auth.employee.permission_level<=200,expression:"$page.auth.employee.permission_level <= 200"}],staticClass:"box-plus-button absolute br-100 pa2 bg-white pointer",attrs:{src:"/img/plus_button.svg","data-cy":"add-holiday-button",width:"22",height:"22"},on:{click:function(e){return e.preventDefault(),t.toggleModals()}}}),t._v(" "),s("div",{staticClass:"br3 bg-white box z-1 pa3"},[t._m(0),t._v(" "),s("p",{staticClass:"f7 grey tc mb1"},[t._v("\n      "+t._s(t.employee.holidays.amount_of_allowed_holidays)+" days of holidays earned in a year\n    ")]),t._v(" "),s("div",{staticClass:"range mb1"}),t._v(" "),s("div",{staticClass:"cf"},[s("div",{staticClass:"fl",style:"width: "+t.employee.holidays.percent_year_completion_rate+"%"},[t._v("\n         \n      ")]),t._v(" "),s("div",{staticClass:"fl",style:"width: "+t.employee.holidays.reverse_percent_year_completion_rate+"%"},[s("p",{staticClass:"f7 grey tc mb1 mt1"},[t._v("\n          "+t._s(t.employee.holidays.number_holidays_left_to_earn_this_year)+" days left to earn\n        ")]),t._v(" "),s("div",{staticClass:"range mb1"})])]),t._v(" "),s("div",{staticClass:"progress relative"},[s("div",{staticClass:"inside",style:"width: "+t.employee.holidays.percent_year_completion_rate+"%"}),t._v(" "),s("div",{staticClass:"holiday absolute",staticStyle:{width:"2%",left:"90%"}}),t._v(" "),s("div",{staticClass:"holiday absolute",staticStyle:{width:"4%",left:"12%"}})]),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"flex items-start-ns flex-wrap flex-nowrap-ns"},[t._m(2),t._v(" "),s("div",{staticClass:"mb1 w-25-ns w-50 mr4-ns"},[s("p",{staticClass:"db mb2 mt0 f3"},[t._v("\n          "+t._s(t.employee.holidays.holidays_earned_each_month)+" days\n        ")]),t._v(" "),s("p",{staticClass:"f7 mt0 fw3 grey"},[t._v("\n          New holidays earned each month\n        ")])]),t._v(" "),t._m(3),t._v(" "),t._m(4)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex justify-between mb4 mt3"},[e("div",{staticClass:"w-50 f4 fw3"},[this._v("\n        Available balance\n      ")]),this._v(" "),e("div",{staticClass:"w-50 tr f3"},[this._v("\n        25 days\n      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex justify-between mb4"},[e("div",{staticClass:"w-50 f7 date mt2"},[this._v("\n        Jan 1\n      ")]),this._v(" "),e("div",{staticClass:"w-50 f7 date mt2 tr"},[this._v("\n        Dec 31\n      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mb1 w-25-ns w-50 mr4-ns"},[e("p",{staticClass:"db mb2 mt0 f3 fw3"},[this._v("\n          25 days\n        ")]),this._v(" "),e("p",{staticClass:"f7 mt0 fw3 grey"},[this._v("\n          Days taken so far this year\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mb1 w-25-ns w-50 mr4-ns"},[e("p",{staticClass:"db mb2 mt0 f3 fw3"},[this._v("\n          25 days\n        ")]),this._v(" "),e("p",{staticClass:"f7 mt0 fw3 grey"},[this._v("\n          Last taken holidays\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mb1 w-25-ns w-50"},[e("p",{staticClass:"db mb2 mt0 f3 fw3"},[this._v("\n          25 days\n        ")]),this._v(" "),e("p",{staticClass:"f7 mt0 fw3 grey"},[this._v("\n          Estimated balance at the end of the year\n        ")])])}],!1,null,"34700486",null);e.default=i.exports},"9KDC":function(t,e,s){var a=s("Mpsp");"string"==typeof a&&(a=[[t.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,n);a.locals&&(t.exports=a.locals)},"KHd+":function(t,e,s){"use strict";function a(t,e,s,a,n,i,r,o){var l,d="function"==typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=s,d._compiled=!0),a&&(d.functional=!0),i&&(d._scopeId="data-v-"+i),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=l):n&&(l=o?function(){n.call(this,this.$root.$options.shadowRoot)}:n),l)if(d.functional){d._injectStyles=l;var c=d.render;d.render=function(t,e){return l.call(e),c(t,e)}}else{var _=d.beforeCreate;d.beforeCreate=_?[].concat(_,l):[l]}return{exports:t,options:d}}s.d(e,"a",(function(){return a}))},Mpsp:function(t,e,s){(t.exports=s("I1BE")(!1)).push([t.i,".grey[data-v-34700486] {\n  color: #6e6e71;\n}\n.range[data-v-34700486] {\n  display: block;\n  height: 5px;\n  width: 100%;\n  border-top: 1px solid #e8e8e8;\n  border-left: 1px solid #e8e8e8;\n  border-right: 1px solid #e8e8e8;\n}\n.days-left[data-v-34700486] {\n  float: right;\n}\n.progress[data-v-34700486] {\n  background-color: #edf2f7;\n  border-radius: 3px;\n}\n.progress .inside[data-v-34700486] {\n  background-color: #CAD5E1;\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n  height: 16px;\n}\n.progress .holiday[data-v-34700486] {\n  background-color: #68D391;\n  height: 16px;\n  top: 0;\n}\n.date[data-v-34700486] {\n  color: #999999;\n}",""])},"gX/8":function(t,e,s){"use strict";var a=s("9KDC");s.n(a).a}}]);
//# sourceMappingURL=25.js.map?id=0c8d310977353db1466b