'use strict';

var _Object$defineProperty = require('@babel/runtime-corejs3/core-js-stable/object/define-property');
_Object$defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;
// export default function sum(a: number, b: number): number {
//     return a + b;
// }
const sum = (a, b) => {
    return Number(a) + b; // 문자열을 숫자로 변환
};
var _default = (exports.default = sum);
