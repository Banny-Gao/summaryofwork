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
