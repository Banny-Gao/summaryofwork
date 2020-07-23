# Event Loop

## 宏观描述

- js单线程依次执行事件队列里的任务
- 执行事件队列里的任务的时候压入执行栈
- 执行栈内同步执行（销毁），异步挂起（后续任务不等待），当一个异步返回结果后，js会将这个事件加入另一个队列
- 当前执行栈清空后，再次读取事件队列里的任务来执行，循环往复

## Macrotask & Microtask

- 宏任务(macrotask)： **script , setTimeput, setInterval, I/O, 事件, postMessage, MessageChannel, setImmediate(node), UI rendering**
- 微任务(microtask): **Promise.then/catch, MutaionObsever, IntersectionObserver, process.nextTick(node)， async/await**

- 根据这个异步事件的类型，这个事件实际上会被分配到对应的宏任务队列或者微任务队列中去
- 永远都是先执行微任务，再执行宏任务
- 可以认为，微任务压入当前执行栈最后执行，宏任务返回结果后添加在事件队列末
- 优先级：process.nextTick()>Promise.then() > await , setTimeout>setImmediate

## 代码分析
```javascript
async function async1() {
  console.log('async1 start');
  const async2Res = await async2();
  console.log(async2Res)
  await async3()
  console.log('async1 end');
  return 'async1 return'
}
async function async2() {
  console.log('async2');
  setTimeout(() => {
    console.log('timeout1')
  }, 0)
  return Promise.resolve('promise2')
}
const async3 = async () => {
  console.log('async3')
}

console.log('script start');
const promise1 = new Promise((resolve) => {
  console.log('promise1');
  resolve('promise1 resolve');
})
const promise3 = new Promise((resolve, reject) => {
  resolve('promise3 resolve')
})
const asyncFoo = async1();
setTimeout(() => {
  console.log('timeout2')
  promise1.then(res => {
    console.log(res)
  })
  asyncFoo.then(res => {
    console.log(res)
  })
}, 0)
promise3.then(res => {
  console.log(res)
  return Promise.reject('new promise3 reject')
}).catch(err => {
  console.log(err)
})
setTimeout(function() {
  console.log('timeout3');
}, 0)
console.log('script end');
```
秉承先同步后异步，先微任务后宏任务的原则。我们来分析以上代码执行。

<img :src="`${$router.options.base}img/eventLoop.png`"/>  

<CodeTest />
