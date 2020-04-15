export default class Timer {
  constructor(name) {
      this.timerId = 0
      this.timers = []
      this.timestamp = {
          type: 'time',
          name,
          value: new Date().getTime()
      }
  }
  updateTime() {
      this.timestamp.value = new Date().getTime() - this.timestamp.value
  }
  add(fn) {
      this.timers.push(fn)
  }
  start() {
      const that = this
      if (this.timerId) {
          return
      }
      that.timerId = setTimeout(() => {
          for (var i = 0; i < that.timers.length; i++) {
              if (that.timers[i]() === false) {
                  that.timers.splice(i, 1)
                  i--
              }
          }
          this.start()
      }, 0)
  }
  stop(f) {
      if (f) clearTimeout(this.timerId)
      else setTimeout(() => {
          clearTimeout(this.timerId)
      }, 0)
      this.timerId = 0
  }
}

export class TimerTask {
  constructor() {
    this.timers = []
    this.timerId = undefined
    this.wait = 0
    this.stack = this.initStack()
  }
  initStack() {
    const that = this
    return new Proxy([], {
      get(target, propKey) {
        const val = Reflect.get(target, propKey)
        if (propKey === "push") that.shiftStack()
        return val
      },
      set(target, propKey, value, receiver) {
        return Reflect.set(target, propKey, value, receiver)
      }
    })
  }
  run(fn, wait = 0) {
    const task = {
      fn: fn.bind(this)
    }
    this.wait = wait
    this.stack.push(task)
    task.timerId = this.timerId
    return this.timerId
  }
  shiftStack() {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      const i = this.timers.indexOf(timer)
      if (i !== -1) this.timers.splice(i, 1)
      const task = this.stack.find(item => item.timerId === timer)
      if (task.fn instanceof Function) task.fn()
    }, this.wait)
    this.timers.push(timer)
    this.timerId = timer
  }
  cacel(timer) {
    if (timer) {
      const i = this.timers.indexOf(timer)
      if (i !== -1) {
        this.timers.splice(i, 1)
        clearTimeout(timer)
      }
    } else if (timer === "clearAll") {
      this.timers.forEach(item => {
        clearTimeout(item)
      })
      this.timers = []
      this.stack = this.initStack()
    }
  }
}