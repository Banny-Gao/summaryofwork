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
const debounce  = (func, wait = 0, immediate = false) => {
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
  wait = 0,
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

## _.debounce

```javascript
const isObject = (value) => {
  const type = typeof value
  return value != null && (type == "object" || type == "function")
}

export default function debounce(func, wait = 0, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true

  if (typeof func !== "function") throw new TypeError("Expected a function")

  if (isObject(options)) {
    leading = !!options.leading
    maxing = "maxWait" in options
    maxWait = maxing ? Math.max(options.maxWait || 0, wait) : maxWait
    trailing = "trailing" in options ? !!options.trailing : trailing
  }

  // 执行func函数
  const invokeFunc = (time) => {
    const args = lastArgs,
      thisArg = lastThis
    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  // 判断func是否可以执行
  const shouldInvoke = (time) => {
    const timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  // 尾部执行
  const trailingEdge = (time) => {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  // 获取还需要等待的时间
  const remainingWait = (time) => {
    const timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  // 异步执行函数体
  const timerExpired = () => {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  // 头部执行
  const leadingEdge = (time) => {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    // 如果是leading，同步执行invokeFunc，重置lastArgs = lastThis = undefined，则上面异步不会执行invokeFunc
    return leading ? invokeFunc(time) : result
  }

  const cancel = () => {
    if (timerId !== undefined) clearTimeout(timerId)
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  const flush = () => {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  const debouced = function(...args) {
    const time = Date.now(),
      isInvoking = shouldInvoke(time)
    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) return leadingEdge(lastCallTime)

      if (maxing) {
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }

    if (timerId === undefined) timerId = setTimeout(timerExpired, wait)
    return result
  }

  debouced.cancel = cancel
  debouced.flush = flush
  return debouced
}
```

## _.throttle

```javascript
import debounce from "./_.debounce"

const isObject = (value) => {
  const type = typeof value
  return value != null && (type == "object" || type == "function")
}

export default function throttle(func, wait = 0, options) {
  let leading = true,
    trailing = true

  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading
    trailing = "trailing" in options ? !!options.trailing : trailing
  }

  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  })
}
```

<CodeTest mode='debounce' />

<vTalk />