# Curry Function

> 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

## 适用场景

- 减少重复传递参数

```javascript
function getUrl(protocol, domain, path) {
    return protocol + "://" + domain + "/" + path;
}

// 避免每次调用重复传参
const httpsUrl = _.curry(getUrl)('https', 'myserver');
const home = httpsUrl('home.html');   

const httpUrl = _.curry(simpleURL)('http', 'myserver');
const about = myURL2('about.html');   
```

- 拓展map,filter等功能性

```javascript
const getProp = _.curry(function (key, obj) {
    return obj[key]
})

const persons = [{name: 'kevin', age: 11}, {name: 'daisy', age: 24}]

const names = persons.map(getProp('name'))

const ages = persons.map(getProp('age'))
```

- 不定参数的累加  
> 实现一个add方法，使计算结果能够满足如下预期:   
> add(1)(2)(3) => 6  
> add(1, 2, 3)(4) => 10  
> add(1)(2)(3)(4)(5) => 15  

```javascript
const add = (...args) => {
    let result = 0
    const adder = (...params) => {
        result = params.reduce((r, v) => {
            r += v
            return r
        }, result)
        return adder
    }
    adder.toString = () => result
    return adder(...args)
}
```

## 实现

```javascript
export const curry = (func, ...arity) => (...args) => (
    (...values) => values.length === func.length ?
        func(...values) :
        curry(func, ...values)
)(...arity, ...args)
```

<CodeTest mode='curry' />

参考链接:  [简述几个非常有用的柯里化函数使用场景](https://segmentfault.com/a/1190000015281061),[用场景去理解函数柯里化](https://www.yuque.com/robinson/jser/tqlyp1)

<vTalk />