/*
 * @Author: your name
 * @Date: 2022-04-28 22:36:10
 * @LastEditTime: 2022-04-28 22:47:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \CrackingJavaScriptAdvancedGameplay\第二章 数据类型容易忽略的细节\2-1 数据类型的陷阱，从表象看本质\index.js
 */
// 判断是不是Object
// function isObject(obj) {
//     if (typeof obj === 'object') {
//         return true;
//     }
//     return false;
// }
// 上面的问题是，null也是一个Object，为什么typeof null == Object?这是个历史问题，
// 可以更深入地了解，它可以追溯到JS的第一个版本，单个值是占用32位的存储单元，它分为
// 2个部分，一个是标记位，一个是表示数据，如：
// 000： object
// 001： integer
// 010： double
// 100： string
// 110： boolean
// 而null从1到第32位都是0，那么它就是000，所以被误认为是object，不过现在v8引擎不是这样的，不修复这个问题是因为兼容性问题