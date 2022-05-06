/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2022-04-29 14:11:58
 * @LastEditors: cy
 * @LastEditTime: 2022-04-29 16:26:42
 */

/**
 * NaN和Number.NaN
 * 特点： 1）typeof是数字
 *       2）我不等于我自己
 *       3）不能被删除，为何不能被删除？是因为Object.getOwnPropertyDescriptor(window, 'NaN')的configurable和writable都为false
 */

/**
 * isNaN
 * 检查toNumber返回值，如果是NaN,就返回true
 * 如下例子：Object.is判断两个值是否相同的值
 * 如果下列任何一项成立，则两个值相同：
 * 两个值都是 undefined
 * 两个值都是 null
 * 两个值都是 true 或者都是 false
 * 两个值是由相同个数的字符按照相同的顺序组成的字符串
 * 两个值指向同一个对象
 * 两个值都是数字并且
 * 都是正零 +0
 * 都是负零 -0
 * 都是 NaN
 * 都是除零和 NaN 外的其它同一个数字
 */
// const isNaN = function (val) {
//     return Object.is(Number(val), NaN);
// }
// console.log(isNaN('2'))
/**
 * 但是isNaN并不是一个安全的方法，参数类型为Symbol何BigInt的时候会异常
 */
// isNaN(10n);


/**
 * Number.isNaN
 * ES6新增的方法，判断一个值是否是数字，并且值等于NaN,语义化代码如下
 * isNaN其本意是通过Number方法把参数转换成数字类型，若成功则为true，不能
 * 用来严格判断等于NaN，它根本没进行转换，它只是判断类型，然后进行值比对
 */
Number.isNaN=function(val) {
    if (typeof val !== "number") {
        return false;
    }
    return Object.is(val, NaN);
}
console.log(Number.isNaN(NaN))
/**
 * 严格判断NaN汇总
 * Number.isNaN:有这个方法最好，否则用第二种
 * Object.is
 * 自身比较
 * typeof+NaN
 */
function isNaNVal(val) {
    return Object.is(val, NaN);
}
function isNaNVal2(val) {
    // 只有NaN自己不等于自己
    return val !== val;
}
function isNaN3(val) {
    // 是数字类型但是却不能转换成数字类型就只能是NaN
    return typeof val === 'number' && isNaN(val);
}
// 综合垫片
if (!'isNaN' in Number) {
    // 如果Number这个对象若有isNaN这个属性的话，就不需要进行这个垫片
    Number.isNaN = function (val) {
        return typeof val === 'number' && isNaN(val);
    }
}


/**
 * 通过陷阱看本质:ES5的indexOf不能识别NaN, ES6的includes能识别
 * includes内部调用的是Number::sameValueZero，
 * 而indexOf内部调用的是Number::equal方法，看标准:
 *  Number::equal(x,y):
 *   1) if x is NaN, return false
 *   2) if y is NaN, return false
 * 表示任何一个值是NaN，则返回false
 * 我们再看一下Number::sameValueZero:
 *  1) if x is NaN and y is NaN, return true
 * 说明它是严格的，于是它能找出NaN
 */
var arr = [NaN];
arr.indexOf(NaN); // -1
arr.includes(NaN) // true