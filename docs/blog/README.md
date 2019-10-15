# 面试日常  

## 1.React/Vue列表渲染key的作用？  
<MarkdownCard>  

* key是给每一个vnode的唯一id 
* 可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点.

</MarkdownCard>  

## 2.ES5/ES6继承除写法以外的区别？  
<MarkdownCard>  

1) class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
``` javascript
 const bar = new Bar(); // it's ok
 function Bar() {
   this.bar = 42;
 }
 const foo = new Foo(); // ReferenceError: Foo is not defined
 class Foo {
   constructor() {
     this.foo = 42;
   }
 }
```
2) class 声明内部会启用严格模式。
3) class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
4) class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
5) 必须使用 new 调用 class。
6) class 内部无法重写类名  

</MarkdownCard>  

## 3.简单实现一个eval  
<MarkdownCard>  

通过**Function** 构造函数 创建一个新的Function对象。 在 JavaScript 中, 每个函数实际上都是一个Function对象。
  > new Function ([arg1[, arg2[, ...argN]],] functionBody).  [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
```JavaScript
function cEval(exp) {
  return new Function('return '+ exp).call(this)
}
const str = '1+1'
cEval(str)
```

</MarkdownCard>
