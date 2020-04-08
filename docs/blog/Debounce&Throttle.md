# 防抖和节流

* 防抖顾名思义防止抖动，即让在某个时间段内本该因为<抖动>执行多次函数，只在最后一次执行。
* 节流是将多次执行变成每隔一段时间执行。

## debounce

* 定时器setTimeoout 
* 闭包
* 等待时间wait
* 返回一个函数，this绑定
* 函数是否立即执行immediate

```javascript
const debounce  = (func, wait = 500, immediate = false) => {
  let timer, context

  const later = (...args) => setTimeout(() => {
    timer = null
    if (!immediate) {
      func.apply(context, args)
    }
  }, wait)

  return function (...args) {
    if (!timer) {
      if (immediate) func.apply(this, params)
      
      context = this
      timer = later(...args)
    } else {
      clearTimeout(timer)
      timer = later(...args)
    }
  }
}
```

## throttle

* leading: 函数是否开始调用
* trailing: 函数是否结尾调用
* leading和trailing不能共存
* 与debounce区别在于非trailing时，只是比较当前时间戳与上次执行时的差值是否大于了需要等待的时间
* tailing存在且不与leading共存时，开启一个剩余等待时间的定时器


```javascript
const throttle = (
  func,
  wait = 500,
  { leading = false, trailing = false } = {}
) => {
  let context, result
  let timer = null,
    prevTimestamp = 0

  const later = (...args) => {
    prevTimestamp = !leading ? 0 : Date.now()
    timer = null
    result = func.apply(context, args)
  }

  return function (...args) {
    const timestamp = Date.now()
    context = this

    // 若要第一次不执行，就将上次时间戳设置为当前
    if (!prevTimestamp && !leading) prevTimestamp = timestamp
    // 计算剩余时间
    const remaining = wait - (timestamp - prevTimestamp)
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      prevTimestamp = timestamp
      result = func.apply(context, args)
    } else if (!timer && trailing && !leading) {
      timer = setTimeout(later, remaining)
    }
    return result
  }
}
```

<CodeTest mode='debounce' />