"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));
var arrowFunction = function arrowFunction() {
  return 'Hello, Babel!';
};
var promiseExample = new _promise["default"](function (resolve, reject) {
  (0, _setTimeout2["default"])(function () {
    return resolve('Promise resolved!');
  }, 1000);
});
promiseExample.then(console.log);
console.log(arrowFunction());