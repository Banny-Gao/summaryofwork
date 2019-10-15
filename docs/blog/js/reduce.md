# reduce实现

```javascript
export const fakeReduce = function fakeReduce(fn, base) {
  if (typeof fn !== "function") throw new TypeError("arguments[0] is not a function");
  let arr = this.concat(), //返回副本
    index, newValue;
  if (base) arr.unshift(base);
  while (arr.length > 1) {
    index = this.length - arr.length + 1;
    newValue = fn.call(null, arr[0], arr[1], index, this); //函数执行参数始终是副本数组前两个
    arr.splice(0, 2, newValue); // 从0开始删除俩插入newValue
  }
  return newValue;
}

Array.prototype.fakeReduce = fakeReduce
```
<CodeTest mode='reduce' />