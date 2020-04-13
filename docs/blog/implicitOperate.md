# 隐式转换知多少

Js中的隐式转换常常是前端开发的痛点，日常开发中，我们大概知道不同数据类型在不同操作中会有隐式转换的概念。那么，隐式转换的规则到底是什么，以及具体到细节的隐式转换的场景有哪些？  
带着疑问，翻了翻MDN，整理了一些基础的东西。

- 原始类型的转换（[string，number，bigint，boolean，null，undefined，symbol]），通常使用转换函数String， Number， Boolean
- 当一个对象转换为对应的原始值时，根据运算符和上下文，调用函数[ToPrimitive](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- 预期转换类型为Number或默认值时，依次尝试valueOf与toString进行转换
- 预期值为String时，依次尝试toString和valueOf进行转换
- [Symbol.toPrimitive]方法存在时会干扰预期转换
- symbol 原始值不能转换为字符串和number，所以只能先转换成它的包装对象，再调用 toString() 方法转换成字符串

```javascript
Symbol(1) + 1  // TypeError: Cannot convert a Symbol value to a number

Symbol(1) + 'hello' // TypeError: Cannot convert a Symbol value to a string

Symbol(1).toString() + 1 // "Symbol(1)1"
```

## Symbol.toPrimitive

> 内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值（预期为string，number和default）时，会调用此函数。  
> 参数 hint ，表示要转换到的原始值的预期类型

```javascript
const object1 = {
  [Symbol.toPrimitive](hint) {
    console.log(hint)  // number, default, string
    if (hint == 'number') {
      return 42;
    }
    return null;
  }
};

console.log(+object1);
console.log(object1);
console.log(1 + object1);
console.log(String(object1));

console.log(!object1) // 不会打印hint值
```

## 单运算符对隐式转换的影响

### 一元运算 (+/-)
- 预期转number

```javascript
+undefined //NaN
+null //0
+'-1' // -1
+[]  // 0
+{}  //NaN
+false // 0
+true // 1
+Symbol(1).toString() // NaN
+(() => {}) // NaN
+Date() // NaN
+new Date() // 1586502202192
+Infinity // Infinity
+NaN // NaN
```

### 按位非 (~)
- 预期转number
- 对任一数值 x 进行按位非操作的结果为 -(x + 1)

```javascript
~undefined //-1
~null // -1
~'-1' // 0
~[]  // -1
~{}  // -1
~false // -1
~true // -2
~Symbol(1).toString() // -1
~(() => {}) // -1
~Date() // -1
~new Date() // -1662234207
~Infinity // -1
~-Infinity // -1
~NaN // -1
~0 // -1
```

### 逻辑非 (!)

- 预期转Boolean

```javascript
!undefined // true
!null // true
!'-1' // false
!'' // true
![]  // false
!{}  // false
!false // true
!true // false
!Symbol().toString() // false
!Symbol() // false
!(() => {}) // false
!Date() // false
!new Date() // false
!Infinity // false
!NaN // true
```
### 递增 (++) | 递减 (--)

- 预期转number

```javascript
let a = [], b = {}, c = () => {}, d = null, e = false, f = '1'
a++ // 1
b++ // NaN
c++ // NaN
d++ // 1
e++ // 1
f++ // 2
```

## 表达式中的隐式转换

### 加 (+)

> 加法运算符的作用是数值求和，或者字符串拼接。

- 上下文中有字符串时表达字符串拼接

```javascript
0 + '1'  // '01'
'0' + null // '0null'
'0' + undefined // '0undefined'
'0' + true // '0true'
'0' + Symbol(1) // Uncaught TypeError: Cannot convert a Symbol value to a string
```
- 上下文无字符串时，原始数据类型预期转number, 非原始数据类型预期转string, toPrimitive的hint参数为default

```javascript
0 + null // 0
0 + undefined // NaN
1 + Infinity // Infinity
1 + false // 1
0 + true // 1
1 + Symbol(1) // Uncaught TypeError: Cannot convert a Symbol value to a number
1 + null // 1
undefined + null // NaN
false + null // 0
true + null // 1
1 + (() => {}) // "1() => {}"
1 + function a() {} // "1function a() {}"
0 + {} // "0[object Object]"
{} + undefined // "[object Object]undefined"
null + {} // "null[object Object]"
{} + (() => {}) //"[object Object]() => {}"
{} + [] // "[object Object]"
[] + undefined // 'undefined'
[] + null // 'null'
[1] + 2 // '12'
[] + (() => {}) //  "() => {}"
```

### 减 (-) | 乘 (*) | 除 (/) | 求余 (%) | 幂 (**)

- 预期转number

```javascript
0 - null // 0
0 / undefined // NaN
1 % Infinity // 1
true ** false // 1
undefined * null // NaN
1 - (() => {}) // NaN
0 * {} // NaN
{} / (() => {}) // NaN
{} % [] // NaN
[2] ** 2 // 4
[1, 2] - {} // NaN
```

### 按位与 (&) | 按位或 (|) | 按位异或 (^) | 左移 (<<) | 有符号右移 (>>) | 无符号右移 (>>>)

- <font color='#ff0000'>预期转number后，按位操作数</font>

<Table :tableProp="{
    columns: [
    { title: '运算符', key: 'index', width: 220 },
    { title: '用法', key: 'base', width: 220 },
    { title: '描述', key: 'desc'},
  ],
  data: [
    {index: '按位与(AND)', base: 'a & b', desc: '对于每一个比特位，只有两个操作数相应的比特位都是1时，结果才为1，否则为0。'},
    {index: '按位或(OR)', base: 'a | b', desc: '对于每一个比特位，当两个操作数相应的比特位至少有一个1时，结果为1，否则为0。'},
    {index: '按位异或(XOR)', base: 'a ^ b', desc: '对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。'},
    {index: '左移(Left shift)', base: 'a &lt;&lt; b', desc: '将 a 的二进制形式向左移 b (< 32) 比特位，右边用0填充。'},
    {index: '有符号右移', base: 'a &gt;&gt; b', desc: '将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位。'},
    {index: '无符号右移', base: 'a &gt;&gt;&gt; b', desc: '将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充。'},
  ],
  border: false
}" />
**按位操作符（Bitwise operators）将其操作数（operands）当作32位的比特序列（由0和1组成）**  
**所有的按位操作符的操作数都会被转成补码（two's complement）形式的有符号32位整数。**

```javascript
14 & {} 
//     NaN = 00000000000000000000000000000000
//      14 = 00000000000000000000000000001110
//  14 & 9 = 00000000000000000000000000000000 = 0

14 | -1
//      -1 = 11111111111111111111111111111111
//  14 | -1 = 11111111111111111111111111111111 = -1

14 ^ true 
//       1 = 00000000000000000000000000000001
//  14 ^ 1 = 00000000000000000000000000001111 = 15

14 << 4
// 14 << 4 = 00000000000000000000000011100000 // 2 ** 7 + 2 ** 6 + 2 ** 5 = 224

14 >> Date()
// 14 >> NaN = 00000000000000000000000000001110 // 14
// 14 >> new Date() = 0 // 0

14 >>> [2]
// 14 >> 2 = 00000000000000000000000000000011 // 3
```

## 相等 (==) 与 不相等 (!=)

- 两个操作数转换成相同的类型, 再做比较
- 对于关系运算符（比如 <=)来说，会先将操作数转为原始值，使它们类型相同，再进行比较运算。
- 类型相同的非原始类型，比较内存中的地址

```javascript
false == [] // true
'[object Object]' == {}   // true
(function a() {}) >= ({})   // true
[1] == 1   //  true
NaN == NaN  // false
{} != NaN  // false
[] == []  // false, 内存地址不同
{} == {} // false，内存地址不同
![] == [] // true, hint为number -> false == 0 -> 0 == 0
!{} == {} // false, false == NaN -> 0 == NaN
```

<font color='#597ef7'>隐式转换知多少？隐式转换不知道还有多少！</font>

<vTalk />