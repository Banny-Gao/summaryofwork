const PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED'
class Mypromise {
  static resolve(value) {
    if (value instanceof Mypromise) return value
    return new Mypromise(resolve => resolve(value))
  }
  static reject(err) {
    return new Mypromise((resolve, reject) => reject(err))
  }
  static all(list) {
    return new Mypromise((resolve, reject) => {
      const values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        this.resolve(p).then(
          res => {
            values[i] = res
            count++
            if (count === list.length) resolve(values)
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }
  static race(list) {
    return new Mypromise((resolve, reject) => {
      for (let p of list) {
        this.resolve(p).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }
  constructor(handller) {
    if (!(handller instanceof Function))
      throw new Error('Mypromise must accept a functio as a parameter')
    this.status = PENDING
    this.value = undefined
    this.fulfilledQueues = []
    this.rejectedQueues = []
    try {
      handller(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      handller(this.reject.bind(this))
    }
  }
  run(status, val, queues) {
    this.status = status
    this.value = val
    let cb
    while ((cb = queues.shift())) {
      cb(val)
    }
  }
  resolve(val) {
    if (this.status !== PENDING) return
    if (val instanceof Mypromise) {
      val.then(
        value => {
          this.run(FULFILLED, value, this.fulfilledQueues)
        },
        err => {
          this.run(FULFILLED, err, this.rejectedQueues)
        }
      )
    }
    setTimeout(() => this.run(FULFILLED, val, this.fulfilledQueues), 0)
  }
  reject(err) {
    if (this.status !== PENDING) return
    setTimeout(() => this.run(REJECTED, err, this.rejectedQueues), 0)
  }
  then(onFulfilled, onRejected) {
    const { status, value } = this
    return new Mypromise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = val => {
        try {
          if (!(onFulfilled instanceof Function)) {
            onFulfilledNext(val)
          } else {
            let res = onFulfilled(val)
            if (res instanceof Mypromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onRejectedNext(res)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }
      let rejected = error => {
        try {
          if (!(onRejected instanceof Function)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }
      switch (status) {
        case PENDING:
          this.fulfilledQueues.push(fulfilled)
          this.rejectedQueues.push(rejected)
          break
        case FULFILLED:
          fulfilled(value)
          break
        case REJECTED:
          rejected(value)
          break
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
