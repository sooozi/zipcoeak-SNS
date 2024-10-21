const arrowFunction = function () {
    return 'Hello, Babel!';
};
const promiseExample = new Promise(function (resolve, reject) {
    setTimeout(function () {
        return resolve('Promise resolved!');
    }, 1000);
});
promiseExample.then(console.log);
console.log(arrowFunction());
