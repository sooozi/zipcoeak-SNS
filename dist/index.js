"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
const arrowFunction = () => {
  return 'Hello, Babel!';
};
const promiseExample = new _promise.default((resolve, reject) => {
  setTimeout(() => resolve('Promise resolved!'), 1000);
});
promiseExample.then(console.log);
console.log(arrowFunction());