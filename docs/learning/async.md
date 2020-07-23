# Async全解

## async function

- async关键字声明或者使用异步函数表达式
- 隐式的返回Promise结果，成功执行resolve，抛出异常执行reject
- 函数体可使用await关键字暂停函数执行，等待promise，然后继续执行

### Syntax

> async function name([param[, param[, ... param]]]) { statements }

### Example

```javascript
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

// 声明一个异步函数
async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  return !Math.ceil(Math.random() - 0.5) ? true : Promise.reject(false)
}

// 使用函数表达式
const asyncExpressFunc = async (promise) => {
    let result
    try{ 
        result = await promise
    } catch(err) {
        result = err
    }
    return result
}

asyncCall().then(promise => {
    return asyncExpressFunc(promise)
}).then((resolved) => {
    console.log(resolved, 'from asyncExpressFunc')
}).catch((rejected) => {
    console.log(rejected, 'from asyncExpressFunc')
})
```

## await 

- await Promise
- await Thenable objects
- 和for搭配使用
- 与一些内置对象的方法一起使用（方法前加关键词async）

### await Promise

```javascript
async function awaitPromise() {
    await new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  })
}
```

### await Thenale Object

```javascript
async function awaitThenable() {
  const thenableObj= {
    then: function(resolve, _reject) {
      setTimeout(() => {
          resolve(1)
      }, 2000)
    }
  }
  console.log(await thenableObj)
}
```

### 与for一起使用

```javascript
async function asyncFor() {
    for (let i = 0; i < 4; i++) {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(i ** 2)
            }, 1000)
        })
        console.log(result)
    }
}
```

- 并发，eslint建议写法

```javascript
async function asyncConcurrencyFor() {
    const results = []
    for (let i = 0; i < 4; i++) {
        const result = new Promise((resolve) => {
            setTimeout(() => {
                resolve(i ** 2)
            }, 1000)
        })
        results.push(result)
    }
    await Promise.all(results).then(res => {
        console.log(res)
    })
}
```

- **for await...of**, 与内置 String, Array, ArrayLike objects (e.g., arguments or NodeList), TypedArray, Map, Set和自定义Iterable使用

<BrowserTable chrome='63' firefox='57' safari='11'/>

```javascript
async function asyncForawait() {
    const awaitArrs = [
        Promise.resolve(1),
        2,
        Promise.reject(3),
        Promise.resolve(4),
        Promise.reject(5),
    ]
    try {
        for await (let item of awaitArrs) {
            console.log(item)
        }
    } catch(err) {
        console.log(err)
    }   
}
```
抛出的异常会中断循环

- 在异步迭代中使用[Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)

```javascript
const asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return Promise.resolve({ value: this.i++, done: false })
        }
        return Promise.resolve({ done: true })
      }
    }
  }
}

async function asyncForIterable() {
   for await (let num of asyncIterable) {
     console.log(num)
   }
}
```

- 在async generator函数中使用

```javascript
async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    yield i++;
  }
}

async function asyncForGenerator() {
  for await (let num of asyncGenerator()) {
    console.log(num);
  }
}
```

## AsyncFunction

- 用来创建异步函数，JavaScript 中每个异步函数都是  AsyncFunction 的对象
- AsyncFunction 并不是一个全局对象，需要通过 Object.getPrototypeOf(async function(){}).constructor 来获取

### Syntax 

> new AsyncFunction([arg1[, arg2[, ...argN]],] functionBody)

### 通过 AsyncFunction 构造器创建一个异步函数

```javascript
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const a = new AsyncFunction('a', 'b', 'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);');
a(10, 20).then(v => {
  console.log(v); // 4 秒后打印 30
});
```
<font style='color: red;'>不建议使用AsyncFunction，因为还得通过async function去拿AsyncFunction</font>

## async function实现原理

- Promise + Generator
- 默认返回promise
- 抛出异常处理
- await -> yield等待promise执行

模拟实现：

```javascript
export const generatorRun = (genFunc) => {
    return new Promise((resolve, reject) => {
        const gen = genFunc()
        const step = (nextF) => {
            let next
            try {
                next = nextF()
            } catch (e) {
                return reject(e)
            }
            if (next.done) {
                return resolve(next.value)
            }
            Promise.resolve(next.value).then((v) => {
                step(() => {
                    return gen.next(v)
                })
            }, (e) => {
                step(() => {
                    return gen.throw(e)
                })
            })
        }
        step(() => {
            return gen.next(undefined)
        })
    })
}
```


<CodeTest mode='asyncRealize' />

<vTalk />