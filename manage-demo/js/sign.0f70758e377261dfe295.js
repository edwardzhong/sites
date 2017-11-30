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
    staticClass: "sign-form form form-aligned"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "alert alert-danger"
  }, [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _c('fieldset', [_c('div', {
    staticClass: "control-group"
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
  })]), _vm._v(" "), _c('div', {
    staticClass: "control-group"
  }, [_c('input', {
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
  })])]), _vm._v(" "), _c('button', {
    staticClass: "button input-1 button-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("Sign in")]), _vm._v(" "), _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("Username is admin, Password is 8888")])])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NpZ24udnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL1NpZ24udnVlIiwid2VicGFjazovLy8uL2VudHJpZXMvc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NpZ24udnVlPzFkNWQiXSwibmFtZXMiOlsiZWwiLCJjb21wb25lbnRzIiwiU2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZKO0FBQzdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFdBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7dUJDckJBOztTQUVBO2dCQUNBO2dCQUNBO1NBQ0E7O1VBRUE7VUFHQTtBQUpBO0FBTEE7QUFVQTs7Ozs7QUFHQTs7Z0JBQ0E7ZUFDQTtRQUNBO0FBQ0E7QUFHQTtBQVJBO0FBREE7OzRCQVdBO2VBQ0E7ZUFDQTtzQkFDQTtzQkFDQTt3QkFDQTttQkFDQTt1QkFDQTtXQUNBO0FBQ0E7d0JBQ0E7bUJBQ0E7dUJBQ0E7V0FDQTtBQUNBO21DQUNBO21CQUNBO3VCQUNBO1dBQ0E7QUFDQTtrQ0FDQTttQkFDQTt1QkFDQTtXQUNBO0FBQ0E7bUJBRUE7QUFDQTtzQ0FDQTtlQUNBO2VBQ0E7QUFFQTtBQWpDQTtBQXZCQSxFOzs7Ozs7Ozs7O0FDakJBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLGtCQUFRO0FBQ1BBLEtBQUksVUFERztBQUVQQyxhQUFZLEVBQUVDLG9CQUFGO0FBRkwsQ0FBUixFOzs7Ozs7OztBQ0pBLDBCQUEwQixhQUFhLDBCQUEwQjtBQUNqRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoianMvc2lnbi4wZjcwNzU4ZTM3NzI2MWRmZTI5NS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvX3Z1ZS1sb2FkZXJAMTMuMC40QHZ1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL192dWUtbG9hZGVyQDEzLjAuNEB2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU2lnbi52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCBfX3Z1ZV90ZW1wbGF0ZV9fIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9fdnVlLWxvYWRlckAxMy4wLjRAdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yZWI1MzkyNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy9fdnVlLWxvYWRlckAxMy4wLjRAdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU2lnbi52dWVcIlxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvU2lnbi52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFNpZ24udnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1sb2FkZXIvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTJlYjUzOTI2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMmViNTM5MjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL1NpZ24udnVlXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCI8dGVtcGxhdGU+XG5cdDxmb3JtIGNsYXNzPVwic2lnbi1mb3JtIGZvcm0gZm9ybS1hbGlnbmVkXCI+XG5cdFx0PGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHYtc2hvdz1cInNob3dcIj57e3RleHR9fTwvZGl2PlxuXHRcdDxmaWVsZHNldD5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb250cm9sLWdyb3VwXCI+XG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQtMVwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB2LW1vZGVsPVwidXNlci5uYW1lXCIgdi1iaW5kOmNsYXNzPVwie2ludmFsaWQ6bmFtZUludmFsaWR9XCIgdi1mb2N1cz1cIm5hbWVJbnZhbGlkXCIvPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29udHJvbC1ncm91cFwiPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3M9XCJpbnB1dC0xXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHYtbW9kZWw9XCJ1c2VyLnBhc3NcIiB2LWJpbmQ6Y2xhc3M9XCJ7aW52YWxpZDpwYXNzSW52YWxpZH1cIiAgdi1mb2N1cz1cIm5hbWVJbnZhbGlkXCIvPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9maWVsZHNldD5cblx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBpbnB1dC0xIGJ1dHRvbi1pbmZvXCIgQGNsaWNrPVwic3VibWl0XCI+U2lnbiBpbjwvYnV0dG9uPlxuXHRcdDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1pbmZvXCI+VXNlcm5hbWUgaXMgYWRtaW4sIFBhc3N3b3JkIGlzIDg4ODg8L2Rpdj5cblx0PC9mb3JtPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5cdGV4cG9ydCBkZWZhdWx0IHtcblx0XHRkYXRhKCl7XG5cdFx0XHRyZXR1cm57XG5cdFx0XHRcdHNob3c6ZmFsc2UsXG5cdFx0XHRcdG5hbWVJbnZhbGlkOmZhbHNlLFxuXHRcdFx0XHRwYXNzSW52YWxpZDpmYWxzZSxcblx0XHRcdFx0dGV4dDpcIlwiLFxuXHRcdFx0XHR1c2VyOntcblx0XHRcdFx0XHRuYW1lOicnLFxuXHRcdFx0XHRcdHBhc3M6Jydcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGlyZWN0aXZlczoge1xuXHRcdFx0Zm9jdXM6IHtcblx0XHRcdCAgaW5zZXJ0ZWQ6IGZ1bmN0aW9uIChlbCx7dmFsdWV9KSB7XG5cdFx0XHQgIFx0Y29uc29sZS5sb2codmFsdWUpO1xuXHRcdFx0ICAgIGlmKHZhbHVlKXtcblx0XHRcdCAgICBcdGVsLmZvY3VzKCk7XG5cdFx0XHQgICAgfVxuXHRcdFx0ICB9XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRtZXRob2RzOntcblx0XHRcdHN1Ym1pdCgpe1xuXHRcdFx0XHR0aGlzLnNob3c9ZmFsc2U7XG5cdFx0XHRcdHRoaXMudGV4dD0nJztcblx0XHRcdFx0dGhpcy5uYW1lSW52YWxpZD1mYWxzZTtcblx0XHRcdFx0dGhpcy5wYXNzSW52YWxpZD1mYWxzZTtcblx0XHRcdFx0aWYoIXRoaXMudXNlci5uYW1lKXtcblx0XHRcdFx0XHR0aGlzLnNob3dFcnJvcigndGhlIHVzZXIgbmFtZSBpcyBudWxsJyk7XG5cdFx0XHRcdFx0dGhpcy5uYW1lSW52YWxpZD10cnVlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighdGhpcy51c2VyLnBhc3Mpe1xuXHRcdFx0XHRcdHRoaXMuc2hvd0Vycm9yKCd0aGlzIHVzZXIgcGFzc3dvcmQgaXMgbnVsbCcpO1xuXHRcdFx0XHRcdHRoaXMucGFzc0ludmFsaWQ9dHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy51c2VyLm5hbWUhPT0nYWRtaW4nKXtcblx0XHRcdFx0XHR0aGlzLnNob3dFcnJvcigndGhpcyB1c2VyIG5hbWUgaXMgbm90IGV4aXN0Jyk7XG5cdFx0XHRcdFx0dGhpcy5uYW1lSW52YWxpZD10cnVlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0aGlzLnVzZXIucGFzcyE9PSc4ODg4Jyl7XG5cdFx0XHRcdFx0dGhpcy5zaG93RXJyb3IoJ3RoaXMgdXNlciBwYXNzd29yZCBpcyB3cm9uZycpO1xuXHRcdFx0XHRcdHRoaXMucGFzc0ludmFsaWQ9dHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9jYXRpb24uaHJlZj0nLyc7XG5cblx0XHRcdH0sXG5cdFx0XHRzaG93RXJyb3IodGV4dCl7XG5cdFx0XHRcdHRoaXMuc2hvdz10cnVlO1xuXHRcdFx0XHR0aGlzLnRleHQ9dGV4dDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjb21wb25lbnRzL1NpZ24udnVlPzBhNmM5M2NjIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgU2lnbiBmcm9tICcuLi9jb21wb25lbnRzL1NpZ24udnVlJ1xuaW1wb3J0ICcuLi9sZXNzL21haW4ubGVzcydcblxubmV3IFZ1ZSh7XG5cdGVsOiAnI2NvbnRlbnQnLFxuXHRjb21wb25lbnRzOiB7IFNpZ24gfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9lbnRyaWVzL3NpZ24uanMiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2Zvcm0nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwic2lnbi1mb3JtIGZvcm0gZm9ybS1hbGlnbmVkXCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgIHZhbHVlOiAoX3ZtLnNob3cpLFxuICAgICAgZXhwcmVzc2lvbjogXCJzaG93XCJcbiAgICB9XSxcbiAgICBzdGF0aWNDbGFzczogXCJhbGVydCBhbGVydC1kYW5nZXJcIlxuICB9LCBbX3ZtLl92KF92bS5fcyhfdm0udGV4dCkpXSksIF92bS5fdihcIiBcIiksIF9jKCdmaWVsZHNldCcsIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNvbnRyb2wtZ3JvdXBcIlxuICB9LCBbX2MoJ2lucHV0Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgIHZhbHVlOiAoX3ZtLnVzZXIubmFtZSksXG4gICAgICBleHByZXNzaW9uOiBcInVzZXIubmFtZVwiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJmb2N1c1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LWZvY3VzXCIsXG4gICAgICB2YWx1ZTogKF92bS5uYW1lSW52YWxpZCksXG4gICAgICBleHByZXNzaW9uOiBcIm5hbWVJbnZhbGlkXCJcbiAgICB9XSxcbiAgICBzdGF0aWNDbGFzczogXCJpbnB1dC0xXCIsXG4gICAgY2xhc3M6IHtcbiAgICAgIGludmFsaWQ6IF92bS5uYW1lSW52YWxpZFxuICAgIH0sXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwicGxhY2Vob2xkZXJcIjogXCJVc2VybmFtZVwiXG4gICAgfSxcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJ2YWx1ZVwiOiAoX3ZtLnVzZXIubmFtZSlcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIF92bS51c2VyLm5hbWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9XG4gICAgfVxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNvbnRyb2wtZ3JvdXBcIlxuICB9LCBbX2MoJ2lucHV0Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgIHZhbHVlOiAoX3ZtLnVzZXIucGFzcyksXG4gICAgICBleHByZXNzaW9uOiBcInVzZXIucGFzc1wiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJmb2N1c1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LWZvY3VzXCIsXG4gICAgICB2YWx1ZTogKF92bS5uYW1lSW52YWxpZCksXG4gICAgICBleHByZXNzaW9uOiBcIm5hbWVJbnZhbGlkXCJcbiAgICB9XSxcbiAgICBzdGF0aWNDbGFzczogXCJpbnB1dC0xXCIsXG4gICAgY2xhc3M6IHtcbiAgICAgIGludmFsaWQ6IF92bS5wYXNzSW52YWxpZFxuICAgIH0sXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcInBhc3N3b3JkXCIsXG4gICAgICBcInBsYWNlaG9sZGVyXCI6IFwiUGFzc3dvcmRcIlxuICAgIH0sXG4gICAgZG9tUHJvcHM6IHtcbiAgICAgIFwidmFsdWVcIjogKF92bS51c2VyLnBhc3MpXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJpbnB1dFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7IHJldHVybjsgfVxuICAgICAgICBfdm0udXNlci5wYXNzID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBpbnB1dC0xIGJ1dHRvbi1pbmZvXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBfdm0uc3VibWl0XG4gICAgfVxuICB9LCBbX3ZtLl92KFwiU2lnbiBpblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImFsZXJ0IGFsZXJ0LWluZm9cIlxuICB9LCBbX3ZtLl92KFwiVXNlcm5hbWUgaXMgYWRtaW4sIFBhc3N3b3JkIGlzIDg4ODhcIildKV0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxudmFyIGVzRXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmV4cG9ydCBkZWZhdWx0IGVzRXhwb3J0c1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtbG9hZGVyL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMmViNTM5MjZcIiwgZXNFeHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9fdnVlLWxvYWRlckAxMy4wLjRAdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yZWI1MzkyNlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4uL34vX3Z1ZS1sb2FkZXJAMTMuMC40QHZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2NvbXBvbmVudHMvU2lnbi52dWVcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=