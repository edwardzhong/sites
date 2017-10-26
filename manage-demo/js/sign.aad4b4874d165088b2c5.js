webpackJsonp([1],{

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Sign_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Sign_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Sign_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_2eb53926_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Sign_vue__ = __webpack_require__(56);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_script_index_0_Sign_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_4_vue_loader_lib_template_compiler_index_id_data_v_2eb53926_hasScoped_false_node_modules_vue_loader_13_0_4_vue_loader_lib_selector_type_template_index_0_Sign_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Sign.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Sign.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(1)
  hotAPI.install(__webpack_require__(0), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2eb53926", Component.options)
  } else {
    hotAPI.reload("data-v-2eb53926", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	data: function data() {
		return {
			show: false,
			nameInvalid: false,
			passInvalid: false,
			text: "",
			user: {
				name: '',
				pass: ''
			}
		};
	},

	directives: {
		focus: {
			inserted: function inserted(el, _ref) {
				var value = _ref.value;

				console.log(value);
				if (value) {
					el.focus();
				}
			}
		}
	},
	methods: {
		submit: function submit() {
			this.show = false;
			this.text = '';
			this.nameInvalid = false;
			this.passInvalid = false;
			if (!this.user.name) {
				this.showError('the user name is null');
				this.nameInvalid = true;
				return false;
			}
			if (!this.user.pass) {
				this.showError('this user password is null');
				this.passInvalid = true;
				return false;
			}
			if (this.user.name !== 'admin') {
				this.showError('this user name is not exist');
				this.nameInvalid = true;
				return false;
			}
			if (this.user.pass !== '8888') {
				this.showError('this user password is wrong');
				this.passInvalid = true;
				return false;
			}
			location.href = '/';
		},
		showError: function showError(text) {
			this.show = true;
			this.text = text;
		}
	}
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _Sign = __webpack_require__(17);

var _Sign2 = _interopRequireDefault(_Sign);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
	el: '#content',
	components: { Sign: _Sign2.default }
});

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "sign-form form"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "alert alert-danger"
  }, [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _c('fieldset', {
    staticClass: "group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.name),
      expression: "user.name"
    }, {
      name: "focus",
      rawName: "v-focus",
      value: (_vm.nameInvalid),
      expression: "nameInvalid"
    }],
    staticClass: "input-1",
    class: {
      invalid: _vm.nameInvalid
    },
    attrs: {
      "type": "text",
      "placeholder": "Username"
    },
    domProps: {
      "value": (_vm.user.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.pass),
      expression: "user.pass"
    }, {
      name: "focus",
      rawName: "v-focus",
      value: (_vm.nameInvalid),
      expression: "nameInvalid"
    }],
    staticClass: "input-1",
    class: {
      invalid: _vm.passInvalid
    },
    attrs: {
      "type": "password",
      "placeholder": "Password"
    },
    domProps: {
      "value": (_vm.user.pass)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.pass = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('button', {
    staticClass: "button input-1 button-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("Sign in")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(1).rerender("data-v-2eb53926", esExports)
  }
}

/***/ })

},[23]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NpZ24udnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL1NpZ24udnVlIiwid2VicGFjazovLy8uL2VudHJpZXMvc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NpZ24udnVlPzFkNWQiXSwibmFtZXMiOlsiZWwiLCJjb21wb25lbnRzIiwiU2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZKO0FBQzdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFdBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7dUJDMUJBOztTQUVBO2dCQUNBO2dCQUNBO1NBQ0E7O1VBRUE7VUFHQTtBQUpBO0FBTEE7QUFVQTs7Ozs7QUFHQTs7Z0JBQ0E7ZUFDQTtRQUNBO0FBQ0E7QUFHQTtBQVJBO0FBREE7OzRCQVdBO2VBQ0E7ZUFDQTtzQkFDQTtzQkFDQTt3QkFDQTttQkFDQTt1QkFDQTtXQUNBO0FBQ0E7d0JBQ0E7bUJBQ0E7dUJBQ0E7V0FDQTtBQUNBO21DQUNBO21CQUNBO3VCQUNBO1dBQ0E7QUFDQTtrQ0FDQTttQkFDQTt1QkFDQTtXQUNBO0FBQ0E7bUJBRUE7QUFDQTtzQ0FDQTtlQUNBO2VBQ0E7QUFFQTtBQWpDQTtBQXZCQSxFOzs7Ozs7Ozs7O0FDWkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsa0JBQVE7QUFDUEEsS0FBSSxVQURHO0FBRVBDLGFBQVksRUFBRUMsb0JBQUY7QUFGTCxDQUFSLEU7Ozs7Ozs7O0FDSkEsMEJBQTBCLGFBQWEsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJqcy9zaWduLmFhZDRiNDg3NGQxNjUwODhiMmM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9fdnVlLWxvYWRlckAxMy4wLjRAdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xuaW1wb3J0IF9fdnVlX3NjcmlwdF9fIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi9ub2RlX21vZHVsZXMvX3Z1ZS1sb2FkZXJAMTMuMC40QHZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TaWduLnZ1ZVwiXG4vKiB0ZW1wbGF0ZSAqL1xuaW1wb3J0IF9fdnVlX3RlbXBsYXRlX18gZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL192dWUtbG9hZGVyQDEzLjAuNEB2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTJlYjUzOTI2XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL192dWUtbG9hZGVyQDEzLjAuNEB2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TaWduLnZ1ZVwiXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9TaWduLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gU2lnbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWxvYWRlci9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMmViNTM5MjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yZWI1MzkyNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvU2lnbi52dWVcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIjx0ZW1wbGF0ZT5cbjxmb3JtIGNsYXNzPVwic2lnbi1mb3JtIGZvcm1cIj5cblx0PGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHYtc2hvdz1cInNob3dcIj57e3RleHR9fTwvZGl2PlxuICAgIDxmaWVsZHNldCBjbGFzcz1cImdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQtMVwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB2LW1vZGVsPVwidXNlci5uYW1lXCIgdi1iaW5kOmNsYXNzPVwie2ludmFsaWQ6bmFtZUludmFsaWR9XCIgdi1mb2N1cz1cIm5hbWVJbnZhbGlkXCIvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3M9XCJpbnB1dC0xXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHYtbW9kZWw9XCJ1c2VyLnBhc3NcIiB2LWJpbmQ6Y2xhc3M9XCJ7aW52YWxpZDpwYXNzSW52YWxpZH1cIiAgdi1mb2N1cz1cIm5hbWVJbnZhbGlkXCIvPlxuICAgIDwvZmllbGRzZXQ+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gaW5wdXQtMSBidXR0b24taW5mb1wiIEBjbGljaz1cInN1Ym1pdFwiPlNpZ24gaW48L2J1dHRvbj5cbjwvZm9ybT5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuXHRleHBvcnQgZGVmYXVsdCB7XG5cdFx0ZGF0YSgpe1xuXHRcdFx0cmV0dXJue1xuXHRcdFx0XHRzaG93OmZhbHNlLFxuXHRcdFx0XHRuYW1lSW52YWxpZDpmYWxzZSxcblx0XHRcdFx0cGFzc0ludmFsaWQ6ZmFsc2UsXG5cdFx0XHRcdHRleHQ6XCJcIixcblx0XHRcdFx0dXNlcjp7XG5cdFx0XHRcdFx0bmFtZTonJyxcblx0XHRcdFx0XHRwYXNzOicnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGRpcmVjdGl2ZXM6IHtcblx0XHRcdGZvY3VzOiB7XG5cdFx0XHQgIGluc2VydGVkOiBmdW5jdGlvbiAoZWwse3ZhbHVlfSkge1xuXHRcdFx0ICBcdGNvbnNvbGUubG9nKHZhbHVlKTtcblx0XHRcdCAgICBpZih2YWx1ZSl7XG5cdFx0XHQgICAgXHRlbC5mb2N1cygpO1xuXHRcdFx0ICAgIH1cblx0XHRcdCAgfVx0XHRcdFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bWV0aG9kczp7XG5cdFx0XHRzdWJtaXQoKXtcblx0XHRcdFx0dGhpcy5zaG93PWZhbHNlO1xuXHRcdFx0XHR0aGlzLnRleHQ9Jyc7XG5cdFx0XHRcdHRoaXMubmFtZUludmFsaWQ9ZmFsc2U7XG5cdFx0XHRcdHRoaXMucGFzc0ludmFsaWQ9ZmFsc2U7XG5cdFx0XHRcdGlmKCF0aGlzLnVzZXIubmFtZSl7XG5cdFx0XHRcdFx0dGhpcy5zaG93RXJyb3IoJ3RoZSB1c2VyIG5hbWUgaXMgbnVsbCcpO1xuXHRcdFx0XHRcdHRoaXMubmFtZUludmFsaWQ9dHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRoaXMudXNlci5wYXNzKXtcblx0XHRcdFx0XHR0aGlzLnNob3dFcnJvcigndGhpcyB1c2VyIHBhc3N3b3JkIGlzIG51bGwnKTtcblx0XHRcdFx0XHR0aGlzLnBhc3NJbnZhbGlkPXRydWU7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMudXNlci5uYW1lIT09J2FkbWluJyl7XG5cdFx0XHRcdFx0dGhpcy5zaG93RXJyb3IoJ3RoaXMgdXNlciBuYW1lIGlzIG5vdCBleGlzdCcpO1xuXHRcdFx0XHRcdHRoaXMubmFtZUludmFsaWQ9dHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy51c2VyLnBhc3MhPT0nODg4OCcpe1xuXHRcdFx0XHRcdHRoaXMuc2hvd0Vycm9yKCd0aGlzIHVzZXIgcGFzc3dvcmQgaXMgd3JvbmcnKTtcblx0XHRcdFx0XHR0aGlzLnBhc3NJbnZhbGlkPXRydWU7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxvY2F0aW9uLmhyZWY9Jy8nO1xuXG5cdFx0XHR9LFxuXHRcdFx0c2hvd0Vycm9yKHRleHQpe1xuXHRcdFx0XHR0aGlzLnNob3c9dHJ1ZTtcblx0XHRcdFx0dGhpcy50ZXh0PXRleHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gY29tcG9uZW50cy9TaWduLnZ1ZT83NzBiZmZhMyIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFNpZ24gZnJvbSAnLi4vY29tcG9uZW50cy9TaWduLnZ1ZSdcbmltcG9ydCAnLi4vbGVzcy9tYWluLmxlc3MnXG5cbm5ldyBWdWUoe1xuXHRlbDogJyNjb250ZW50Jyxcblx0Y29tcG9uZW50czogeyBTaWduIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZW50cmllcy9zaWduLmpzIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdmb3JtJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInNpZ24tZm9ybSBmb3JtXCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgIHZhbHVlOiAoX3ZtLnNob3cpLFxuICAgICAgZXhwcmVzc2lvbjogXCJzaG93XCJcbiAgICB9XSxcbiAgICBzdGF0aWNDbGFzczogXCJhbGVydCBhbGVydC1kYW5nZXJcIlxuICB9LCBbX3ZtLl92KF92bS5fcyhfdm0udGV4dCkpXSksIF92bS5fdihcIiBcIiksIF9jKCdmaWVsZHNldCcsIHtcbiAgICBzdGF0aWNDbGFzczogXCJncm91cFwiXG4gIH0sIFtfYygnaW5wdXQnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgdmFsdWU6IChfdm0udXNlci5uYW1lKSxcbiAgICAgIGV4cHJlc3Npb246IFwidXNlci5uYW1lXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcImZvY3VzXCIsXG4gICAgICByYXdOYW1lOiBcInYtZm9jdXNcIixcbiAgICAgIHZhbHVlOiAoX3ZtLm5hbWVJbnZhbGlkKSxcbiAgICAgIGV4cHJlc3Npb246IFwibmFtZUludmFsaWRcIlxuICAgIH1dLFxuICAgIHN0YXRpY0NsYXNzOiBcImlucHV0LTFcIixcbiAgICBjbGFzczoge1xuICAgICAgaW52YWxpZDogX3ZtLm5hbWVJbnZhbGlkXG4gICAgfSxcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIlVzZXJuYW1lXCJcbiAgICB9LFxuICAgIGRvbVByb3BzOiB7XG4gICAgICBcInZhbHVlXCI6IChfdm0udXNlci5uYW1lKVxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiaW5wdXRcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykgeyByZXR1cm47IH1cbiAgICAgICAgX3ZtLnVzZXIubmFtZSA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnaW5wdXQnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgdmFsdWU6IChfdm0udXNlci5wYXNzKSxcbiAgICAgIGV4cHJlc3Npb246IFwidXNlci5wYXNzXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcImZvY3VzXCIsXG4gICAgICByYXdOYW1lOiBcInYtZm9jdXNcIixcbiAgICAgIHZhbHVlOiAoX3ZtLm5hbWVJbnZhbGlkKSxcbiAgICAgIGV4cHJlc3Npb246IFwibmFtZUludmFsaWRcIlxuICAgIH1dLFxuICAgIHN0YXRpY0NsYXNzOiBcImlucHV0LTFcIixcbiAgICBjbGFzczoge1xuICAgICAgaW52YWxpZDogX3ZtLnBhc3NJbnZhbGlkXG4gICAgfSxcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwicGFzc3dvcmRcIixcbiAgICAgIFwicGxhY2Vob2xkZXJcIjogXCJQYXNzd29yZFwiXG4gICAgfSxcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJ2YWx1ZVwiOiAoX3ZtLnVzZXIucGFzcylcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIF92bS51c2VyLnBhc3MgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9XG4gICAgfVxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBpbnB1dC0xIGJ1dHRvbi1pbmZvXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBfdm0uc3VibWl0XG4gICAgfVxuICB9LCBbX3ZtLl92KFwiU2lnbiBpblwiKV0pXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG52YXIgZXNFeHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuZXhwb3J0IGRlZmF1bHQgZXNFeHBvcnRzXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1sb2FkZXIvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0yZWI1MzkyNlwiLCBlc0V4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L192dWUtbG9hZGVyQDEzLjAuNEB2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTJlYjUzOTI2XCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi4vfi9fdnVlLWxvYWRlckAxMy4wLjRAdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vY29tcG9uZW50cy9TaWduLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==