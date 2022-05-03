/*
 * @Author: your name
 * @Date: 2022-04-28 22:50:08
 * @LastEditTime: 2022-04-28 23:14:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \CrackingJavaScriptAdvancedGameplay\第二章 数据类型容易忽略的细节\2-1 数据类型的陷阱，从表象看本质\+转为数字.js
 */
const print = console.log;
function ToNumber(val) {
    const result = +val;
    print(result);
    return result;
}
// 传统数据类型
ToNumber(null) //NaN
ToNumber(undefined) //NaN
ToNumber(1) //1
ToNumber('123aa') //NaN
ToNumber({}) //NaN
ToNumber(true) //NaN

// ToNumber(10n);
let p = 1n;
for (let i = 1n; i < 170n; i++) {
    p*=i;

}
console.log(2n)