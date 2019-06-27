# Facing Smart

[TOC]

### Question
> [1.字符串乱序](./js/shuffle.js)  
> [2.数组reduce实现](./js/reduce.js)  
> [3.两数和求下标](./js/twoSum.js)  
> [4.十大经典排序](./js/sort.js)  
> [5.大顶堆实现](./js/maxHeap.js)  
> [6.parseInt深入调研](./js/parseInt.js)  
> [7.position: sticky ?](./html/position_sticky.html)  
> [8.promise实现](./js/promiseReal.js)  
> [9.Grid布局小试](./js/grid.js)  
> [10.简单走一波深拷贝](./js/deepClone.js)  
> [11.async&await实现](./js/async&await.js)  
> [12.Js函数柯里化](./js/curry.js)  
> [13.call&bind实现](./js/call&bind.js)  
> [14.Debounce&Throttle](./js/debounce&throttle.js)  
> [15.深度优先还是广度优先？](./js/DFS&BFS.js)  
> [16.运算与隐式转换了解一下？](./js/operate&implicitCast.js)  
> [17.异步与同步](./js/eventLoop.js)  

### Solution

#### 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？  
> key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。

#### ES5/ES6 的继承除了写法以外还有什么区别？
> 1) class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
> ``` javascript
> const bar = new Bar(); // it's ok
> function Bar() {
>   this.bar = 42;
> }
> const foo = new Foo(); // ReferenceError: Foo is not defined
> class Foo {
>   constructor() {
>     this.foo = 42;
>   }
> }
> ```
> 2) class 声明内部会启用严格模式。
> 3) class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
> 4) class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
> 5) 必须使用 new 调用 class。
> 6) class 内部无法重写类名