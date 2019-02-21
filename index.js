const sum = (n) => {
    const arr = [];
    for(let i = 1;i<=n;i++) {
        arr.push(i);
    }
    return arr.reduce((a,b) => a+b);
}
let res = sum(100);
function randomString(str) {
    const arr = str.split('');
    arr.sort(() => Math.random() - 0.5);
    return arr.join('');
}
function noRepeat(arr) {
    const [...result] = new Set(arr);
    return result;
}
function strCount(str) {
    const arr = str.split('');
    return arr.reduce((obj,t,i) => {
        arr.indexOf(t) === i ? obj[t] = 1 : ++obj[t];
        return obj;
    },{});
}
console.log(strCount('ssdddmhhhhh'))
function trim(str) {
    return str.replace(/\s/g,'');
}
let str = '       sssddd         ';
console.log(trim(str));
//es6功能 箭头函数 promise 模块化 解构赋值 Reflect Proxy 扩展运算符/剩余运算符 默认参数
//字符串数组正则和Math对象新增api

//箭头函数不绑定this  通过 call 或 apply 调用不绑定this
//箭头函数不绑定Arguments 对象。 箭头函数不能用作构造器，和 new一起用会抛出错误
//箭头函数没有prototype属性。

//apply call 立即调用该函数 第一个参数是this指向的对象  apply第二个参数是伪数组 call是正常的参数
//bind 第一个参数也是this指向的对象 不过bind返回一个新函数

/* 
以观察者模式分析promise原理
通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，
同时返回一个新的Promise对象，以便可以链式调用。
被观察者管理内部pending、fulfilled和rejected的状态转变，
同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。
*/

/* 
    babel 编译原理 
    babylon将es6/es7代码解析成AST
    babel-traverse对AST进行遍历转译，得到新的AST
    新AST通过babel-generator转换成ES5
*/