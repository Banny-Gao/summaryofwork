const debounce = (func, wait = 500, immediate = false) => {
  let timeout, timestamp, result
  return (...args) => {
    timestamp = Date.now()
    const callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(() => {
        const last = Date.now() - timestamp
        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          if (!immediate) {
            result = func.apply(this, args)
          }
        }
      }, wait)
    }
    if (callNow) {
      result = func.apply(this, args)
    }
    return result
  }
}

const throttle = (fun, delay = 500) => {
  let timer = null
  let previous = 0
  return function(args) {
    let now = Date.now()
    let remaining = delay - (now - previous) //距离规定时间,还剩多少时间
    let that = this
    let _args = args
    clearTimeout(timer) //清除之前设置的定时器
    if (remaining <= 0) {
      fun.apply(that, _args)
      previous = Date.now()
    } else {
      timer = setTimeout(function() {
        fun.apply(that, _args)
      }, remaining) //因为上面添加的clearTimeout.实际这个定时器只有最后一次才会执行
    }
  }
}
