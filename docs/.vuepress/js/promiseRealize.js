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