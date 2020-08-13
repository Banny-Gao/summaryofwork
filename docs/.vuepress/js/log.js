import Timer from './timer'

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
        const timer = this[`timer${ name }`] = new Timer(name)
        timer.add(() => {
            timer.updateTime()
        })
        _console.time.call(this, name)
        timer.start()
    },
    timeEnd(name = 'default') {
        this[`timer${ name }`].stop()
        _console.timeEnd.call(this, name)
        setTimeout(() => {
            const timestamp = this[`timer${ name }`].timestamp
            this.logInfo.push(timestamp)
        }, 0)

    },
    clearLog() {
        this.logInfo = []
    },
    watch(fn) {
        this.logInfo = new Proxy([], {
            get: function (target, propKey, receiver) {
                const val = Reflect.get(target, propKey, receiver)
                fn(target)
                return val
            },
            set: function (target, propKey, value, receiver) {
                return Reflect.set(target, propKey, value, receiver)
            }
        })
    }
}
export default console