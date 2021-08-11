webpackHotUpdate_N_E("pages/index",{

/***/ "./components/LoginForm.js":
/*!*********************************!*\
  !*** ./components/LoginForm.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var _this = undefined,
    _jsxFileName = "F:\\Self Study_Coding\\Web\\Portfolio\\ShareThoughts\\front\\components\\LoginForm.js",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;




var LoginForm = function LoginForm() {
  _s();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      id = _useState[0],
      setId = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      password = _useState2[0],
      setPassword = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(""),
      passwordCheck = _useState3[0],
      setPasswordCheck = _useState3[1];

  var onChangeId = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (e) {
    setId(e.target.value);
  }, [id]);
  var onChangePassword = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (e) {
    setPassword(e.target.value);
  }, [password]);
  return __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Form"], {
    theme: "dark",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, __jsx("label", {
    htmlFor: "user-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }, "User ID"), __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, {
    style: {
      margin: 0
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Input"], {
    name: "user-id",
    value: id,
    onChange: onChangeId,
    required: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 11
    }
  }))), __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }, __jsx("label", {
    htmlFor: "user-password",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }, "User Password"), __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Form"].Item, {
    style: {
      margin: 0
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Input"], {
    name: "user-password",
    type: "password",
    value: password,
    onChange: onChangePassword,
    required: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 11
    }
  }))), __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    type: "primary",
    htmlType: "submit",
    loading: false,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }
  }, "Log In"), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/signup",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }, __jsx("a", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 11
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    htmlType: "submit",
    loading: false,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 13
    }
  }, "Sign Up")))));
};

_s(LoginForm, "XO9WYzPWYDtmchTs0gfxVUDaPek=");

_c = LoginForm;
/* harmony default export */ __webpack_exports__["default"] = (LoginForm);

var _c;

$RefreshReg$(_c, "LoginForm");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Mb2dpbkZvcm0uanMiXSwibmFtZXMiOlsiTG9naW5Gb3JtIiwidXNlU3RhdGUiLCJpZCIsInNldElkIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsInBhc3N3b3JkQ2hlY2siLCJzZXRQYXNzd29yZENoZWNrIiwib25DaGFuZ2VJZCIsInVzZUNhbGxiYWNrIiwiZSIsInRhcmdldCIsInZhbHVlIiwib25DaGFuZ2VQYXNzd29yZCIsIm1hcmdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLElBQU1BLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFBQTs7QUFDdEIsa0JBQW9CQyxzREFBUSxDQUFDLEVBQUQsQ0FBNUI7QUFBQSxNQUFPQyxFQUFQO0FBQUEsTUFBV0MsS0FBWDs7QUFDQSxtQkFBZ0NGLHNEQUFRLENBQUMsRUFBRCxDQUF4QztBQUFBLE1BQU9HLFFBQVA7QUFBQSxNQUFpQkMsV0FBakI7O0FBQ0EsbUJBQTBDSixzREFBUSxDQUFDLEVBQUQsQ0FBbEQ7QUFBQSxNQUFPSyxhQUFQO0FBQUEsTUFBc0JDLGdCQUF0Qjs7QUFDQSxNQUFNQyxVQUFVLEdBQUdDLHlEQUFXLENBQzVCLFVBQUNDLENBQUQsRUFBTztBQUNMUCxTQUFLLENBQUNPLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxLQUFWLENBQUw7QUFDRCxHQUgyQixFQUk1QixDQUFDVixFQUFELENBSjRCLENBQTlCO0FBTUEsTUFBTVcsZ0JBQWdCLEdBQUdKLHlEQUFXLENBQ2xDLFVBQUNDLENBQUQsRUFBTztBQUNMTCxlQUFXLENBQUNLLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxLQUFWLENBQVg7QUFDRCxHQUhpQyxFQUlsQyxDQUFDUixRQUFELENBSmtDLENBQXBDO0FBT0EsU0FDRSxNQUFDLHlDQUFEO0FBQU0sU0FBSyxFQUFDLE1BQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFPLFdBQU8sRUFBQyxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixFQUVFLE1BQUMseUNBQUQsQ0FBTSxJQUFOO0FBQVcsU0FBSyxFQUFFO0FBQUVVLFlBQU0sRUFBRTtBQUFWLEtBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLDBDQUFEO0FBQU8sUUFBSSxFQUFDLFNBQVo7QUFBc0IsU0FBSyxFQUFFWixFQUE3QjtBQUFpQyxZQUFRLEVBQUVNLFVBQTNDO0FBQXVELFlBQVEsTUFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLENBRkYsQ0FERixFQU9FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFPLFdBQU8sRUFBQyxlQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREYsRUFFRSxNQUFDLHlDQUFELENBQU0sSUFBTjtBQUFXLFNBQUssRUFBRTtBQUFFTSxZQUFNLEVBQUU7QUFBVixLQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwQ0FBRDtBQUNFLFFBQUksRUFBQyxlQURQO0FBRUUsUUFBSSxFQUFDLFVBRlA7QUFHRSxTQUFLLEVBQUVWLFFBSFQ7QUFJRSxZQUFRLEVBQUVTLGdCQUpaO0FBS0UsWUFBUSxNQUxWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQUZGLENBUEYsRUFtQkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMkNBQUQ7QUFBUSxRQUFJLEVBQUMsU0FBYjtBQUF1QixZQUFRLEVBQUMsUUFBaEM7QUFBeUMsV0FBTyxFQUFFLEtBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixFQUlFLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsU0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMkNBQUQ7QUFBUSxZQUFRLEVBQUMsUUFBakI7QUFBMEIsV0FBTyxFQUFFLEtBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixDQURGLENBSkYsQ0FuQkYsQ0FERjtBQWtDRCxDQW5ERDs7R0FBTWIsUzs7S0FBQUEsUztBQXFEU0Esd0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguMTk2MmM2OTc1ZDFiNGYwYjMzZTMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm0sIElucHV0LCBCdXR0b24sIENoZWNrYm94IH0gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBMb2dpbkZvcm0gPSAoKSA9PiB7XHJcbiAgY29uc3QgW2lkLCBzZXRJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwYXNzd29yZENoZWNrLCBzZXRQYXNzd29yZENoZWNrXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IG9uQ2hhbmdlSWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChlKSA9PiB7XHJcbiAgICAgIHNldElkKGUudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbaWRdXHJcbiAgKTtcclxuICBjb25zdCBvbkNoYW5nZVBhc3N3b3JkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZSkgPT4ge1xyXG4gICAgICBzZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW3Bhc3N3b3JkXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybSB0aGVtZT1cImRhcmtcIj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInVzZXItaWRcIj5Vc2VyIElEPC9sYWJlbD5cclxuICAgICAgICA8Rm9ybS5JdGVtIHN0eWxlPXt7IG1hcmdpbjogMCB9fT5cclxuICAgICAgICAgIDxJbnB1dCBuYW1lPVwidXNlci1pZFwiIHZhbHVlPXtpZH0gb25DaGFuZ2U9e29uQ2hhbmdlSWR9IHJlcXVpcmVkIC8+XHJcbiAgICAgICAgPC9Gb3JtLkl0ZW0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwidXNlci1wYXNzd29yZFwiPlVzZXIgUGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxGb3JtLkl0ZW0gc3R5bGU9e3sgbWFyZ2luOiAwIH19PlxyXG4gICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgIG5hbWU9XCJ1c2VyLXBhc3N3b3JkXCJcclxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VQYXNzd29yZH1cclxuICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Gb3JtLkl0ZW0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBodG1sVHlwZT1cInN1Ym1pdFwiIGxvYWRpbmc9e2ZhbHNlfT5cclxuICAgICAgICAgIExvZyBJblxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDxMaW5rIGhyZWY9XCIvc2lnbnVwXCI+XHJcbiAgICAgICAgICA8YT5cclxuICAgICAgICAgICAgPEJ1dHRvbiBodG1sVHlwZT1cInN1Ym1pdFwiIGxvYWRpbmc9e2ZhbHNlfT5cclxuICAgICAgICAgICAgICBTaWduIFVwXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvTGluaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L0Zvcm0+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luRm9ybTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==