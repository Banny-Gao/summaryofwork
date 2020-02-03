# 中央定时器

```javascript
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
```