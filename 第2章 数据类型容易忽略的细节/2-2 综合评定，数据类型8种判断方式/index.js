/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2022-04-29 10:39:24
 * @LastEditors: cy
 * @LastEditTime: 2022-04-29 14:10:19
 */

/**
 * 第一种：typeof
 * 主要用途：操作的类型，只能识别基础数据类型和引用类型
 * 注意：null返回的是object, Not a Number（NaN)返回的偏偏是一个Number, document.all返回的是当前页面上
 * 所有的节点，typeof document.all返回的是undefined，这是个梗，它不是web标准，各大浏览器都支持，IE11前
 * 它自己都返回object, 11之后改为返回undefined。
 * typeof之前是很安全的，现在也不安全了，ES6出现了新的概念叫暂时性死区，它的表现看如下代码
 * 只能用于基础数据类型，不能用于引用类型
 */
// function log() {
//     // 在let下，声明在typeof之后无法访问到a
//     typeof a;
//     let a = 10;
// }
// log()



/**
 * 第二种：constructor
 * 原理：constructor指向创建实例对象的构造函数，通过toString就可以知道是哪种类型，null和undefined并没有构造函数
 * 注意：constructor可以被改写，所以这个方法可以作为辅助判断方法，因为它可以被改写，所以不安全
 * 用于部分基础数据类型和引用类型
 */
String.prototype.toString = function a() {
    return {}
}
console.log('a', constructor);


/**
 * 第三种方法：instanceof
 * 原理：原型链上查找，查到即是其实例
 * 注意：1)右操作数必须是函数或者class,只有他们才能被new
 *      2)多全局对象，例如多window之间,比如跨窗口，那么类型判断就不准确，运行examples/instanceOf.html,
 *      这个例子中，页面跳转到instanceOf02，但是数组[]还是window.Array的实例，而不是instance02这个执行
 *      上下文的数组实例
 *      3）只能用于引用类型
 */


/**
 * 第四种方法：isPrototypeOf
 * 原理:是否出现在实例对象的原型链上，和instanceof很相似，区别在于instanceof右操作数是不是在左操作数的原型
 * 上面，而isPrototype正好相反，都能正常返回值的情况下，他俩基本等同，它比instanceof安全一些，说过instanceof
 * 右操作数必须是函数或者class，而isPrototypeOf并没有这要求
 * 使用场合：只能用于引用类型，它是调用call,那么nullh和undefined就会出问题
 */

/**
 * 第五种：Object.prototype.toString
 * 原理：通过函数的动态this,返回其数据类型，如[object Date]来截取这个字符串来得知某个类型，但是我们自定义的对象和
 * class的时候，object.toString()返回的是[object Object],如下的例子：
 * 使用所有数据类型，小心内置原型：Boolean.prototype返回的是boolean而不是object,所以对于内置的数据类型是一个坑
 */
var o = {}
console.log(typeof o, o.toString()) // object, [object Object]
/**
 * 思考题： 1）自定义对象如何获得[object MyArray]类型
 *         2）Object.prototype.toString.call(Boolean.prototype) 返回值是什么？typeof Boolean.prototype === 'object'
 *          而Boolean.prototype返回的是[object boolean],这是违法常理的地方。
*/


/**
 * 第六种：鸭子类型检测
 * 原理：检查自身，属性的类型或者执行结果的类型，例如：
 * export default isPromise(value) {
 *  return value instanceof Promise || 
 *      (
 *          isObject(value) && 
 *          typeof value.then === 'function' &&
 *          typeof value.catch === 'function
 *      )
 * }
 * 这个例子中检查value的then和catch是不是function来判断value是不是Promise类型，通常作为候选方案
 * 适用于引用类型
 */


/**
 * 第七种：Symbol.toStringTag
 * 原理： Object.prototype.toString会读取该值，ES6方法，内置的符号，这个字符串用来表示自定义的类型标签，
 * 通常只有内置的Object.prototype.toString会读取这个标签并返回回去，他可以回答如何实现：自定义对象如何获得[object MyArray]
 * 类型
 * 适用场景:需自定义类型，适用于引用类型，看如下代码
 * 注意事项：兼容性
 */
class MyArray {
    get [Symbol.toStringTag]() {
        return 'MyArray'
    }
}
var pf = console.log;
var a = new MyArray();
pf(Object.prototype.toString.call(a)) //[object MyArray]


/**
 * 第八种：等比较
 * 原理：与某个固定值进行比较
 * 使用场景：undefined window document null等
 * 例子：看看underscore.js代码：
 *      _.isUndefined = function(obj) {
 *          return obj === void 0;
 *      }
 * void 0，计算结果就是0，但是不会返回任何东西,void 0一定返回undefined这个值，void 100也一样。
 * 为什么现代浏览器undefined不可改写，可以看看：
 * Object.getOwnPropertyDescriptor(window, 'undefined')可以看到它的configurable和writable
 * 都为false,所以不可以被改写
 */

