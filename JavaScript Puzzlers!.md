1. 
["1", "2", "3"].map(parseInt)

答案：[1, NaN, NaN] 

因为：parseInt 接受两个参数（val, radix），以及 map 传递三个参数（item, index, array）

拓展：颜色转换，16进制10进制互转：parseInt('FF', 10) 和 (255).toString(16)

    parseInt(3, 0) 返回 3，不合法的第二参数当作是默认10

    "1 2 3".replace(/\d/g, parseInt) // "1 NaN 3"
2.
[typeof null, null instanceof Object]

答案：["object", false] 

因为：typeof 会返回基本数据类型 number, boolean, string, undefined, function, symbol（es6） 加上 object; null 不是以 Object 为原型创建出来的

拓展：区分 null 和 undefined

3.
[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]

答案：an error

因为：reduce 遍历一个空数组没有初始值就会报错

4.
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');

答案：'Something'，+ 运算符优先级更高

扩展：TODO

5.
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

答案：'Goodbye Jack'

6.
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);

答案：死循环，2的53次方加1 还是 2的53次方

7.
[ new String('hello') === 'hello', String('hello') === 'hello' ]

答案：[ false, true ]

8.
function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);

答案：[true, true, true, false, false]， Infinity % 2 = NaN, -9 % 2 = -1 

9.
Array.isArray( Array.prototype )

答案：true

10.
'5' + 3
'5' - 3

答案：53 和 2

11.
[1 < 2 < 3, 3 < 2 < 1]

答案：[true, true] 隐式转换 true => 1 ,false => 0