[JS能力测评经典题](https://www.nowcoder.com/ta/js-assessment?page=1)

> 使用闭包
    实现函数 makeClosures，调用之后满足如下条件：
    1、返回一个函数数组 result，长度与 arr 相同
    2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同

```js
function makeClosures(arr, fn) {
    var ret = []
    arr.forEach(function(item) {
        ret.push(function (item) {
            return function () {
                return fn(item);
            }
        }(item))
    })
    return ret
}
```

> 柯里化
    已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
    1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
    2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
    3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
    4、调用 c 之后，返回的结果与调用 fn 的返回值一致
    5、fn 的参数依次为函数 a, b, c 的调用参数

```js
function curryIt(fn) {
    var len = fn.length;
    var arr = [];
    var _fn = function(arg) {
        arr.push(arg);
        return --len > 0 ? _fn : fn.apply(arr, arr);
    }
    return _fn
}
```

> new 

```js

```

