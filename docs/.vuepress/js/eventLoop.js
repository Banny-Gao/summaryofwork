// 1.js是单线程 2. event loop 2.同步，microTasks, macrotasks
// 栈（stack) 、队列(queue) 、 堆(heap)
// 宏任务： script , setTimeput, setInterval, I/O, 事件, postMessage, MessageChannel, setImmediate(node)
// 微任务: Promise.then/catch, MutaionObsever(监听DOM树), process.nextTick(node)， async/await
/**
 * 执行栈(读取任务队列任务) - 同步代码 - 执行 - 执行当前队列微任务 - 读取任务队列下一任务
 *        - 微任务 - 当前执行队列中末 优先级：process.nextTick()>Promise.then() > await
 *        - 宏任务 -  下一任务队列  优先级：setTimeout>setImmediate。
 */
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
  reject('promise3 reject')
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
/**
 * 执行栈
 * 执行队列 1.console.log(script start) 2.console.log(promise1) 3.console.log('async1 start'); 4.console.log('async2'); 5.console.log('script end'); 6.promise3 resolve (console.log('promise3 resolve')) ; 7.await async2() （console.log(''promise2)）;8.console.log('async3')  9. promise3.catch (console.log('new promise3 reject'))   10.await async3() (console.log(async1 end)) 
 * 等待队列 1.console.log('timeout1')
 * 等待与队列 1.console.log('timeout2') 2.console.log('promise1') 3.console.log('async1 return')
 * 等待队列 console.log('timeout3');
 */

// script start 
// promise1
//  async1 start 
// async2
// script end
// promise3 resolve
// promise2
// async3
// new promise3 reject
// async1 end
// timeout1
// timeout2
// promise1 resolve
// async1 return
// timeout3