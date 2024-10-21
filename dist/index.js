'use strict';

var arrowFunction = function arrowFunction() {
    return 'Hello, Babel!';
};
var promiseExample = new Promise(function (resolve, reject) {
    setTimeout(function () {
        return resolve('Promise resolved!');
    }, 1000);
});
promiseExample.then(console.log);
console.log(arrowFunction());
