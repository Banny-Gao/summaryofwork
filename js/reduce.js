Array.prototype.fakeReduce = function fakeReduce(fn, base) {
  if (typeof fn !== "function") throw new TypeError("arguments[0] is not a function");
  let initialArr = this;
  let arr = initialArr.concat();
  let index, newValue;
	if (base) arr.unshift(base);
  while (arr.length > 1) {
    index = initialArr.length - arr.length + 1;
    newValue = fn.call(null, arr[0], arr[1], index, initialArr);
    arr.splice(0, 2, newValue); // 直接用 splice 实现替换
  }
  return newValue;
};
