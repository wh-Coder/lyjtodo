[深入理解javascript原型和闭包](http://www.cnblogs.com/wangfupeng1988/p/3977924.html)

### 1

- typeof 值类型 undefined, number, string, boolean；剩下的都是引用类型，包括函数、数组、对象、null；其中 function 可以被 typeof 识别；最后还有一种可以识别的是 es6 symbol

- 对象就是属性的集合

### 2

- 函数是一种对象，但是函数不像数组是对象的一个子集，有一种鸡生蛋蛋生鸡的逻辑

- 对象是函数创建的：var obj = new Object(); Object、Array 都是function

- 对象是函数创建的，而函数却又是一种对象

### 3

- 函数有个 prototype 属性值为一个对象，这个对象默认只有一个叫做 constructor 的属性，这个属性指向函数本身

- 每个对象都是函数 new 出来的，并且都有一个默认的属性 __proto__，这个属性引用了创建这个对象的函数的prototype，即：obj.__proto__ === Object.prototype

### 4

- 每个对象都有 __proto__，而 Object.prototype 也是个对象，也应该有个 __proto__，是个特例，指向了 null

- 普通的函数 Foo.__proto__ 指向 Function.prototype，有意思的是：Function.__proto__ 指向 Function.prototype循环了，即Function是被自身创建的

- 那么 Function.prototype是对象，它的__proto__ 指向Object.prototype

### 5

- A instanceof B 的判断队则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false

- Object instanceof Function; Function instanceof Object; Function instanceof Function; 都是true，可以推理出来

- ![](http://ww1.sinaimg.cn/large/a75caef7gy1fze8hsv94tj20dk0geq69.jpg)


### 6

- 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着 __proto__ 这条链向上找，这就是原型链。

- 实际使用中，用 hasOwnProperty 区分属性到底是自己的还是原型链上的

### 8

- 1）变量、函数表达式——-变量声明，默认赋值为undefined；2）this——-赋值；3）函数声明——-赋值；

### 9

- 函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域

### 10

- 在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了

- 如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象。

- 如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的this指向该对象。

- 如果对象的属性的函数被赋值到了另一个变量中，并没有作为对象的一个属性被调用，那么this的值就是window

- 当一个函数被call和apply调用时，this的值就取传入的对象的值。

- 普通函数在调用时，其中的this也都是window。注意：对象属性中的函数里面定义了一个函数，它仍然是普通函数

- 构造函数的prototype，即便是在整个原型链中，this代表的也都是当前对象的值。

### 12

- javascript除了全局作用域之外，只有函数可以创建的作用域。

### 15

- 要去创建这个函数的作用域取值，而不是“父作用域”

- 使用闭包会增加内容开销
