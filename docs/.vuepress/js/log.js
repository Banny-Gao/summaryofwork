class Timer {
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
    this.timers.push(fn);
  }
  start() {
      const that = this
      if (this.timerId) {
        return;
      }
      that.timerId = setTimeout(() => {
        for (var i = 0; i < that.timers.length; i++) {
          if (that.timers[i]() === false) {
            that.timers.splice(i, 1);
            i--;
          }
        }
        this.start()
      }, 0);
    }
    stop(f) {
      if(f) clearTimeout(this.timerId)
      else setTimeout(() => {
        clearTimeout(this.timerId)
      }, 0);
      this.timerId = 0
    }
}

const _console = window.console

export const console = {
  logInfo: [],
  log(...args) {
    this.logInfo.push(...args)
    _console.log.apply(this, args)
  },
  info(...args) {
    this.logInfo.push(...args)
    _console.info.apply(this, args)
  },
  debug(...args) {
    this.logInfo.push(...args)
    _console.debug.apply(this, args)
  },
  warn(value) {
    this.logInfo.push({
      type: 'warn',
      value
    })
    _console.warn.call(this, value)
  },
  error(value) {
    this.logInfo.push({
      type: 'error',
      value
    })
    _console.error.call(this, value)
  },
  dir(...args) {
    this.logInfo.push(...args)
    _console.dir.apply(this, args)
  },
  table(value) {
    this.logInfo.push({
      type: 'table',
      value
    })
    _console.table.call(this, value)
  },
  time(name = 'default') {
    const timer = this[`timer${name}`] = new Timer(name)
    timer.add(() => {
      timer.updateTime()
    })
    _console.time.call(this, name)
    timer.start()
  },
  timeEnd(name = 'default') {
    this[`timer${name}`].stop()
    _console.timeEnd.call(this, name)
    const timestamp = this[`timer${name}`].timestamp
    this.logInfo.push(timestamp)
  },
  getLog() {
    const log = [...this.logInfo]
    return log
  },
  clearLog() {
    this.logInfo = []
  }
}
export default console