# Promise实现原理

```javascript
new Promise((resolve, reject) => {})
```

## Promise的内部状态和值  

PromiseStatus：
- PENDING
- FULFILLED
- REJECTED

> 状态的只能在pending时由resolve和reject改变为fulfilled或rejected

PromiseValue：  
- resolve和reject所接收的参数 

## 状态和值的修改

状态常量：

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
```

内部的_resolve和_reject -> 改变状态和存储值：

```javascript
run(status, value) {
    this.PromiseStatus = status
    this.PromiseValue = value
}

_resolve(value) {
    if (this.PromiseStatus !== PENDING) return
    this.run(FULFILLED, value, this.FulfilledQueues)
}

_reject(error) {
    if (this.status !== PENDING) return
    this.run(REJECTED, error, this.RejectedQueues)
}
```

## promise的then

```javascript
promise.then(onFulfilled, onRejected)
```

then的两个参数皆是回调函数，若不是，则忽略

then的特征：
* onFulfilled在fulilled状态被调用，onRejected在rejected状态被调用
* 支持链式调用，且依次回调，即回调返回promise并且有专门的执行队列来管理回调
* pending时不可调用，加入队列

定义status、value、回调管理队列，new 的时候执行handller：

```javascript
export class FakePromise {
    constructor(handller) {
        if (!(handller instanceof Function)) throw new Error('Mypromise must accept a functio as a parameter')
        Object.defineProperties(this, {
            PromiseStatus: {
                writable: true,
                value: PENDING
            },
            PromiseValue: {
                writable: true,
            },
            FulfilledQueues: {
                writable: true,
                value: []
            },
            RejectedQueues: {
                writable: true,
                value: []
            }
        })
        try {
            handller(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            handller(this._reject.bind(this))
        }
    }
}
```

所以then大概有这么个意思：

```javascript
then(onFulfilled, onRejected) {
  const { PromiseStatus, PromiseValue } = this
  switch(PromiseStatus) {
    // 当状态为pending时，将then方法回调函数加入执行队列等待执行
    case PENDING:
      this.FulfilledQueues.push(onFulfilled)
      this.RejectedQueues.push(onRejected)
      break
    case FULFILLED:
      onFulfilled(PromiseValue)
      break
    case REJECTED:
      onRejected(PromiseValue)
      break
  }
  return new MyPromise((resolveNext, rejectNext) => {
  })
}
```

handller内部执行(异步或者同步)到resolve或reject执行时要保证onFulfilled或者onRejected被调用(单个或者多个)，则在then内部执行时，需要在恰当的时机想队列中添加回调，resolve或者reject时从队列中取得。
完善_resolve和_reject

```javascript
run(status, value, queues) {
    this.PromiseStatus = status
    this.PromiseValue = value

    let callback
    while (callback = queues.shift()) {
        callback(value)
    }
}

_resolve(value) {
    if (this.PromiseStatus !== PENDING) return
    if (value instanceof FakePromise) {
        return value.then(this._resolve.bind(this), this._reject.bind(this))
    }
    // 为了支持同步的promise，即让同步的promise.then在同步代码最后执行
    setTimeout(() => {
        this.run(FULFILLED, value, this.FulfilledQueues)
    }, 0)
}

_reject(error) {
    if (this.status !== PENDING) return
    setTimeout(() => {
        this.run(REJECTED, error, this.RejectedQueues)
    }, 0)
}
```

then返回的promise对象状态的改变，依赖于当前then的参数，是否为函数，返回是否是promise，而参数回调的执行也依赖当前promise的状态  
完善then：

```javascript
then(onFulfilled, onRejected) {
    const { PromiseStatus, PromiseValue } = this
    // 返回promise
    return new FakePromise((resolveNext, rejectNext) => {
        const fulfilled = value => {
            try {
                if (!(onFulfilled instanceof Function)) {
                    // 不是函数是乡下传递上一个返回的promise
                    resolveNext(value)
                } else {
                    const res = onFulfilled(value)
                    // 根绝函数返回结果，判断下个then传递什么
                    if (res instanceof FakePromise) {
                        res.then(resolveNext, rejectNext)
                    } else {
                        resolveNext(res)
                    }
                }
            } catch (error) {
                // 异常处理
                rejectNext(error)
            }
        }
        const rejected = error => {
            try {
                if (!(onRejected instanceof Function)) {
                    rejectNext(error)
                } else {
                    let res = onRejected(error)
                    if (res instanceof MyPromise) {
                        res.then(resolveNext, rejectNext)
                    } else {
                        resolveNext(res)
                    }
                }
            } catch (err) {
                rejectNext(err)
            }
        }
        // 函调函数的统一处理
        switch (PromiseStatus) {
            case PENDING:
                this.FulfilledQueues.push(fulfilled)
                this.RejectedQueues.push(rejected)
                break
            case FULFILLED:
                fulfilled(PromiseValue)
                break
            default: rejected(PromiseValue)
        }
    })
}
```

## Promise的完整代码

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

export class FakePromise {
    static resolve(value) {
        if (value instanceof FakePromise) return value
        return new FakePromise(resolve => resolve(value))
    }
    static reject(error) {
        return new FakePromise((resolve, reject) => reject(error))
    }
    static race(iterable) {
        return new FakePromise((resolve, reject) => {
            for (let p of iterable) {
                this.resolve(p).then(resolve, reject)
            }
        })
    }
    static all(iterable) {
        return new FakePromise((resolve, reject) => {
            const values = []
            let count = 0
            for (let [i, p] of iterable.entries()) {
                this.resolve(p).then(
                    res => {
                        values[i] = res
                        count++
                        if (count === iterable.length) resolve(values)
                    },
                    reject
                )
            }
        })
    }

    toString() {
        return '[object Promise]'
    }

    constructor(handller) {
        if (!(handller instanceof Function)) throw new Error('Mypromise must accept a functio as a parameter')

        Object.defineProperties(this, {
            PromiseStatus: {
                writable: true,
                value: PENDING
            },
            PromiseValue: {
                writable: true,
            },
            FulfilledQueues: {
                writable: true,
                value: []
            },
            RejectedQueues: {
                writable: true,
                value: []
            }
        })

        try {
            handller(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            handller(this._reject.bind(this))
        }
    }


    run(status, value, queues = []) {
        this.PromiseStatus = status
        this.PromiseValue = value

        let callback
        while (callback = queues.shift()) {
            callback(value)
        }
    }

    _resolve(value) {
        if (this.PromiseStatus !== PENDING) return
        if (value instanceof FakePromise) {
            return value.then(this._resolve.bind(this), this._reject.bind(this))
        }
        setTimeout(() => {
            this.run(FULFILLED, value, this.FulfilledQueues)
        }, 0)
    }

    _reject(error) {
        if (this.status !== PENDING) return
        setTimeout(() => {
            this.run(REJECTED, error, this.RejectedQueues)
        }, 0)
    }

    then(onFulfilled, onRejected) {
        const { PromiseStatus, PromiseValue } = this

        return new FakePromise((resolveNext, rejectNext) => {

            const fulfilled = value => {
                try {
                    if (!(onFulfilled instanceof Function)) {
                        resolveNext(value)
                    } else {
                        const res = onFulfilled(value)
                        if (res instanceof FakePromise) {
                            res.then(resolveNext, rejectNext)
                        } else {
                            resolveNext(res)
                        }
                    }
                } catch (error) {
                    rejectNext(error)
                }
            }

            const rejected = error => {
                try {
                    if (!(onRejected instanceof Function)) {
                        rejectNext(error)
                    } else {
                        let res = onRejected(error)
                        if (res instanceof MyPromise) {
                            res.then(resolveNext, rejectNext)
                        } else {
                            resolveNext(res)
                        }
                    }
                } catch (err) {
                    rejectNext(err)
                }
            }

            switch (PromiseStatus) {
                case PENDING:
                    this.FulfilledQueues.push(fulfilled)
                    this.RejectedQueues.push(rejected)
                    break
                case FULFILLED:
                    fulfilled(PromiseValue)
                    break
                default: rejected(PromiseValue)
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(callback) {
        return this.then(
            result => FakePromise.resolve(callback()).then(() => result),
            error => FakePromise.resolve(callback()).then(() => { throw error })
        )
    }
}
```

<CodeTest mode='Promise' />  

<vTalk />