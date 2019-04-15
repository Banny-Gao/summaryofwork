Function.prototype._call = function (content = window, ...args) {
  content.fn = this;
  const result = content.fn(...args);
  delete content.fn;
  return result;
}

Function.prototype._bind = function (content, ...args) {
  if (typeof this != "function") {
    throw Error("not a function")
  }
  const fn = this,
    foo = new Function()
  const resFn = () => fn.call(this instanceof resFn ? this : content, ...args)
  foo.prototype = this.prototype
  resFn.prototype = new foo()
  return resFn
}