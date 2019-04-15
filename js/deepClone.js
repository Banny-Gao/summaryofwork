function deepClone(obj) {
  return new Promise(resolve => {
    const {
      port1,
      port2
    } = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

// @ts-ignore
var obj = {
  a: 1,
  b: {
    c: 'b'
  }
}
// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
(async () => {
  const cloneObj = await deepClone(obj)
})()