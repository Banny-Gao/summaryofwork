# 正则小记

## 创建

```javascript
// /pattern/flags
// new RegExp(pattern [, flags])
// RegExp(pattern [, flags])
const re0 = /abc+d/ //字面量
const re1 = new RegExp('abc+d')  //构造函数
const re2 = RegExp('abc+d')

//ES6新增 new RegExp(re, flag)
const re3 = new RegExp(re0, i)
```

### pattern

* 特殊字符需要转义 -> **new RegExp("\\w+");**

### flags

* **g**: 全局匹配
* **i**: 忽略大小写
* **m**: (^和$)的多行
* **u**: Unicode模式
* **y**: 粘性匹配
* **s**: dotAll, .匹配所有 [transform-modern-regexp]

* flags -> re.flags  [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags)

### 特殊含义字符

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#character-classes)

<RegExpTable />

## 方法

### exec

在字符串中搜索匹配的正则，返回一个数组或者null

```javascript
const str = 'Kobe is a good boy'
const re = /(?<o>o)/
console.log(re.exec(str))
```

在flag为g或y的情况下，实例的lastIndex（指定下一次匹配的索引）属性会被记录。  

**exec执行匹配成功会返回一个数组**
**0:** 所匹配的字符  
**1-n**: 捕获  
**index**: 匹配到字符的索引，g/y下的lastIndex  
**input**: 原始字符串  
**groups**: 命名捕获组【Chrome 64, Firfox 全挂】  

```javascript
const str = 'akshaskaakasjdsubaw9oqaacnmc'
const re = /a/g

const getCount = (str, re) => {
  let i = 0
  while(re.exec(str)) i++
  return i
}
getCount(str, re)
```

与**String.prototype.match**的区别

* 如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组，与exec相同
* 如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组

```javascript
const re = /[0-9]+/g
const str = '2016-01-02'

str.match(re)

```

match本质是内部调用RegExp[Symbol.match]

```javascript
const html = '<p><span>text1</span><span>text2</span></p>'

/(?<=<(span)>).*?(?=<\/\1>)/g[Symbol.match](html)
```

### test

查看正则表达式与指定的字符串是否匹配,返回一个Boolean

```javascript
const idCard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[\dxX]$/
idCard.test('51382219690927302X')
```

### [@@replace]

即String.prototype.replace执行时内部调用RegExp.prototype[Symbol.replace]
> regexp[Symbol.replace](str, newSubStr|function)

```javascript
const str = `  sadsa sa sda f  `
str.replace(/\s/, '')
str.replace(/\s/g, '')

str.replace(/\s*(\w*?)(a?)/g, '$1')

str.replace(/\s*(\w*?)(?<a>a?)/g, (input, $1, $2, index, str, namedGroup) => {
  // console.log(input, $1, $2, index, str, namedGroup)
  const A = $2.toUpperCase()
  return `${$1 + A + A}`
})
```

### [@@search]

返回第一个匹配项索引，flag不影响结果，没有则返回-1

```javascript
const text = 'demo1 demo2 demo3'
text.seach(/\d/)
```

### [@@split]

**String.prototype.split**参数为RegExp对象是，执行时内部调用
> regexp[Symbol.split](str[, limit])

```javascript
'a-b-c'.split(/-/);

/-/[Symbol.split]('a-b-c');
```

## 实例属性和静态属性

RegExp静态属性：

* **$1-$9：** 每次exec执行后的捕获
* **input|$_：** 所匹配的字符串
* **lastMatch|$&：** 最后匹配到的字符串
* **lastParen|$+：** 匹配到的最后一个子串
* **leftContext|$`：** 匹配项的左边
* **rightContext:$'：** 匹配项的右边

RegExp实例属性：

* **global：** 是否用了g修饰符
* **ignoreCase：** 是否用了i修饰
* **multiline：** 是否用了m修饰
* **sticky：** 是否用了y修饰
* **unicode：** 是否用了u修饰
* **dotAll：** 是否用了s修饰
* **flags：** 返回一个字符串，由当前正则表达式对象的标志组成。
* **source：** 返回当前正则表达式对象的pattern

## Sticky - /y

```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```

## Unicode - /u

“Unicode模式”，用来正确处理**大于\uFFFF**的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码  

```javascript
/^\uD83D/u.test('\uD83D\uDC2A')
// false
/^\uD83D/.test('\uD83D\uDC2A')
```  

### 点字符  

```javascript
var s = '????';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```

### Unicode字符表示法  

```javascript
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
```

### 量词

```javascript
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/????{2}/.test('????????') // false
/????{2}/u.test('????????') // true
```

### 预定义模式

```javascript
/^\S$/.test('????') // false
/^\S$/u.test('????') // true
```

## 新特性补充

### 命名捕获用法示例

```javascript
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
'2017-11-21'.replace(reg, '$<month>/$<day>/$<year>')
```

### 断言中的捕获

'后行断言'的反引用顺序与通常相反

```javascript
/(?<=(o)d\1)r/.exec('hodor')  // null

/(?<=\1d(o))r/.exec('hodor')  // ["r", "o"]
```
<vTalk />