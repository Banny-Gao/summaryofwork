export * from './_.cloneDeep'

export const cloneDeep_JSON = (obj) => JSON.parse(JSON.stringify(obj))

export const cloneDeep_Assign = (obj) => Object.assign({}, obj)

export const cloneDeep_MessageChannel = (obj) => new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = e => resolve(e.data)
    port2.postMessage(obj)
})

export const cloneDeep_DFS = (obj, visitedArr = []) => {
    let _obj = {}
    const type = Object.prototype.toString.call(obj)
    if (['[object Array]', '[object Object]'].includes(type)) {
        let index = visitedArr.indexOf(obj)
        _obj = type === '[object Array]' ? [] : {}
        if (~index) { // 判断环状数据
            _obj = visitedArr[index]
        } else {
            visitedArr.push(obj)
            for (let item in obj) {
                _obj[item] = cloneDeep_DFS(obj[item], visitedArr)
            }
        }
    } else if (type === '[object Function]') {
        _obj = new Function('return ' + obj.toString())
    } else {
        _obj = obj
    }
    return _obj
}

export const cloneDeep_BFS = (obj) => {
    const queue = [obj]

    const copyObj = {}
    const copyQueue = [copyObj]
    const visitedArr = []

    while (queue.length > 0) {
        const items = queue.shift()
        const _obj = copyQueue.shift()
        const type = Object.prototype.toString.call(items)
        if (['[object Array]', '[object Object]'].includes(type)) {
            for (let key in items) {
                const value = items[key]
                if (Object.prototype.toString.call(value) === '[object Object]') {
                    const index = visitedArr.indexOf(value)
                    if (!~index) {
                        _obj[key] = {}
                        //下次while循环使用给空对象提供数据
                        queue.push(value)
                        // 推入引用对象
                        copyQueue.push(_obj[key])
                        visitedArr.push(value);
                    } else {
                        _obj[key] = visitedArr[index]
                    }
                } else if (Object.prototype.toString.call(value) === '[object Array]') {
                    // 数组类型在这里创建了一个空数组
                    _obj[key] = []
                    queue.push(value)
                    copyQueue.push(_obj[key])
                } else if (Object.prototype.toString.call(value) === '[object Function]') {
                    _obj[key] = new Function('return ' + value.toString())
                } else {
                    _obj[key] = value
                }
            }
        } else if (type === '[object Function]') {
            _obj = new Function('return ' + items.toString())
        } else {
            _obj = obj
        }
    }
    return copyObj
}