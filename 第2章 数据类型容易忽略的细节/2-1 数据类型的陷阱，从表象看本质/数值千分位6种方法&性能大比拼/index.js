/*
 * @Author: your name
 * @Date: 2022-05-04 10:42:20
 * @LastEditTime: 2022-05-04 11:06:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \CrackingJavaScriptAdvancedGameplay\第2章 数据类型容易忽略的细节\2-1 数据类型的陷阱，从表象看本质\数值千分位6种方法&性能大比拼\index.js
 */
/**
 * 第一种思路
 * @param {*} number 
 * @returns 
 */
function format_with_array(number) {
    // 转为字符串，并按照.拆分
    var arr = (number + '').split('.');
    // 整数部分再拆分
    var int = arr[0].split('');
    // 小数部分
    var fraction = arr[1] || '';
    // 返回的变量
    var r = '';
    var len = int.length;
    // 倒叙并遍历
    int.reverse().forEach(function(v, i) {
        console.log('reverse', v)
        // 非第一位并且是位值是3的倍数，添加","
        if (i !== 0 && i % 3 === 0) {
            r = v + ',' + r;
        } else {
            // 正常添加字符
            r = v + r;
        }
    })
    // 整数部分和小数部分拼接
    return r + (!!fraction ? '.' + fraction : '');
}
console.log('千分位', format_with_array(134567.01))

/**
 * 方法二：字符串+substring截取
 * 整体思路：数字转字符串，分为整数和小数部分，整数部分高位往低位遍历，三位分组
 * 1 数字转字符串，并按照.分割
 * 2 整数部分对3求模，获取多余部分
 * 3 按照3截取，并添加','
 * 4 拼接整数部分+小数部分
 */
function format_with_substring(number) {
    // 数字转字符串，并按照.分割
    var arr = (number + '').split('.');
    var int = arr[0] + '';
    var fraction = arr[1] || '';
    // 多余的位数
    var f = int.length % 3;
    // 获取多余的位数，f可能是0，即r可能是空字符串
    var r = int.substring(0, f);
    // 每三位添加","和对应的字符
    for (var i = 0; i < Math.floor(int.length / 3);i++) {
        r += ',' + int.substring(f + i * 3, f + (i + 1) * 3);
    }
    debugger
    // 若整数刚满三位数没有多余的位的话，比如这里的123.00，整数位通过上面
    // 的运算得到,123，所以当刚满三位数的话，就要去除最前面的逗号，所以
    // 进行如下判断删除逗号
    if (f === 0) {
        r = r.substring(1);
    }
    // 整数部分和小数部分拼接
    return r + (!!fraction ? "." + fraction : '');
}
format_with_substring(123.00)

/**
 * 方法三：除法+求模
 * 整体思路：求模获得高位的值拼接并添加符号，求余值（是否大于1），计算是否结束
 *          1）值对1000求模，获得最高三位
 *          2）值除以1000，值是否大于1判定是否结束
 *          3）重复1.2，直到退出
 *          4）拼接整数部分+小数部分
 */
function format_with_mod(number) {
    var n = number;
    var r = '';
    var temp;
    do {
        // 求模的值，用于获取高三位，这里可能有小数，所以在后面需要取整，获取高三位
        mod = n % 1000;
        // 值是不是大于1，若是则进行下一次循环
        n = n / 1000;
        // 取整数，第一步：把运算数转换为32位的二进制整数，按位取反，然后再转换为十进制，算出最高位
        temp = ~~mod;
        r = (n >= 1 ? `${temp}`.padStart(3, "0") : temp) + (!!r ? "," + r : "");
    } while (n >= 1);
    var strNumber = number + "";
    var index = strNumber.indexOf(".");
    // 拼接小数部分
    if (index >= 0) {
        r += strNumber.substring(index);
    }
}


