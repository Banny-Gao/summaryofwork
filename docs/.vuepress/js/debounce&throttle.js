export const debounce = (func, wait = 0, immediate = false) => {
  let timer, context

  const later = (...args) =>
    setTimeout(() => {
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

export const throttle = (
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
