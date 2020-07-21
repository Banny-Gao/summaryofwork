# Daily Question

## 1.React/Vue 列表渲染 key 的作用？

<MarkdownCard>

- key 是给每一个 vnode 的唯一 id
- 可以依靠 key,更准确, 更快的拿到 oldVnode 中对应的 vnode 节点.

</MarkdownCard>

## 2.ES5/ES6 继承除写法以外的区别？

<MarkdownCard>

1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。

```javascript
const bar = new Bar() // it's ok
function Bar() {
  this.bar = 42
}
const foo = new Foo() // ReferenceError: Foo is not defined
class Foo {
  constructor() {
    this.foo = 42
  }
}
```

2. class 声明内部会启用严格模式。
3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
5. 必须使用 new 调用 class。
6. class 内部无法重写类名

</MarkdownCard>

## 3.简单实现一个 eval

<MarkdownCard>

通过**Function** 构造函数 创建一个新的 Function 对象。 在 JavaScript 中, 每个函数实际上都是一个 Function 对象。

> new Function ([arg1[, arg2[, ...argN]],] functionBody). [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

```JavaScript
function cEval(exp) {
  return new Function('return '+ exp).call(this)
}
const str = '1+1'
cEval(str)
```

</MarkdownCard>

## 4.parseInt 深入

<MarkdownCard>

> parseInt(string, radix)

对于第一个参数 string：

- 如果参数不是一个字符串，则将其转换为字符串(使用 ToString 抽象操作)
- 字符串开头的空白符将会被忽略

对于第二个参数 radix:

- 一个介于 2 和 36 之间的整数(数学系统的基础)，表示上述字符串的基数

radix 为 undefined,0 或者没有指定的情况下:

- 以"0x"或者"0X"开头, 则基数是 16
- string 以"0"开头, 基数是 8（八进制）或者 10（十进制）
- string 以其它任何值开头，则基数是 10 (十进制)

**如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN**  
**radix 参数为 n 将会把第一个参数看作是一个数的 n 进制表示，而返回的值则是十进制的**

注意：

- 使用 parseInt 去截取包含 e 字符数值部分会造成难以预料的结果
- 如果 parseInt 遇到了不属于 radix 参数所指定的基数中的字符那么该字符和其后的字符都将被忽略。接着返回已经解析的整数部分
- 基数是 1，返回 NaN

</MarkdownCard>

### base 转换规则表

<Table :tableProp="{
  columns: [
    { title: 'String', dataIndex: 'index', fixed: 'left', width: 80,},
    { title: 'Base36', dataIndex: 'Base36'},
    { title: '...', dataIndex: 'middle'},
    { title: 'Base10', dataIndex: 'Base10'},
    { title: '...', dataIndex: 'end'},
    { title: 'Base2', dataIndex: 'Base2'},
  ],
  data: [
    { 'index': '0', 'Base36': '0', 'middle': '...', 'Base10': '0', 'end': '...', 'Base2': '0', key: '0' },
    { 'index': '1', 'Base36': '1', 'middle': '...', 'Base10': '1', 'end': '...', 'Base2': '1', key: '0' },
    { 'index': '2', 'Base36': '2', 'middle': '...', 'Base10': '2', 'end': '...', 'Base2': '2', key: '0' },
    { 'index': '3', 'Base36': '3', 'middle': '...', 'Base10': '3', 'end': '...', 'Base2': 'NaN', key: '1' },
    { 'index': '4', 'Base36': '4', 'middle': '...', 'Base10': '4', 'end': '...', 'Base2': 'NaN', key: '2' },
    { 'index': '5', 'Base36': '5', 'middle': '...', 'Base10': '5', 'end': '...', 'Base2': 'NaN', key: '3' },
    { 'index': '6', 'Base36': '6', 'middle': '...', 'Base10': '6', 'end': '...', 'Base2': 'NaN', key: '4' },
    { 'index': '7', 'Base36': '7', 'middle': '...', 'Base10': '7', 'end': '...', 'Base2': 'NaN', key: '5' },
    { 'index': '8', 'Base36': '8', 'middle': '...', 'Base10': '8', 'end': '...', 'Base2': 'NaN', key: '6' },
    { 'index': '9', 'Base36': '9', 'middle': '...', 'Base10': '9', 'end': '...', 'Base2': 'NaN', key: '7' },
    { 'index': 'a', 'Base36': '10', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '8' },
    { 'index': 'b', 'Base36': '11', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '9' },
    { 'index': 'c', 'Base36': '12', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '10' },
    { 'index': 'd', 'Base36': '13', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '11' },
    { 'index': 'e', 'Base36': '14', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '12' },
    { 'index': 'f', 'Base36': '15', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '13' },
    { 'index': 'g', 'Base36': '16', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '14' },
    { 'index': 'h', 'Base36': '17', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '15' },
    { 'index': 'i', 'Base36': '18', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '16' },
    { 'index': 'j', 'Base36': '19', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '17' },
    { 'index': 'k', 'Base36': '20', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '18' },
    { 'index': 'l', 'Base36': '21', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '19' },
    { 'index': 'm', 'Base36': '22', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '20' },
    { 'index': 'n', 'Base36': '23', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '21' },
    { 'index': 'o', 'Base36': '24', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '22' },
    { 'index': 'p', 'Base36': '25', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '23' },
    { 'index': 'q', 'Base36': '26', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '24' },
    { 'index': 'r', 'Base36': '27', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '25' },
    { 'index': 's', 'Base36': '28', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '26' },
    { 'index': 't', 'Base36': '29', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '27' },
    { 'index': 'u', 'Base36': '30', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '28' },
    { 'index': 'v', 'Base36': '31', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '29' },
    { 'index': 'w', 'Base36': '32', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '30' },
    { 'index': 'x', 'Base36': '33', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '31' },
    { 'index': 'y', 'Base36': '34', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '32' },
    { 'index': 'z', 'Base36': '35', 'middle': '...', 'Base10': 'NaN', 'end': '...', 'Base2': 'NaN', key: '33' },
  ],
  border: false
}" />

<CodeTest mode='parseInt' />

## 5.position sticky ?

> 相对用户的滚动位置定位

<iframe
     src="https://codesandbox.io/embed/suspicious-kilby-wrbc3?fontsize=14&hidenavigation=1&theme=light"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="position-sticky"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   >
</iframe>

## 6.call & apply & bind 实现

- call
```javascript
Function.prototype._call = function(context, ...args) {
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}
```

- apply
```javascript
Function.prototype._apply = function(context, arg = []) {
  context = context || window
  context.fn = this
  const result = context.fn(...arg)
  delete context.fn
  return result
}
```

- bind
```javascript
Function.prototype._bind = function(context, ...args) {
  return () => this.apply(context, args)
}
```

<vTalk />
