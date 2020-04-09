const MAX_SAFE_INTEGER = 9007199254740991

const argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    asyncTag = '[object AsyncFunction]',
    proxyTag = '[object Proxy]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]'


const arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `_.clone`. */
const cloneableTags = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false

const isObject = (value) => {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}

const initCloneArray = (array) => {
    const length = array.length,
        result = new array.constructor(length)

    if (length && typeof array[0] == 'string' && Object.prototype.hasOwnProperty.call(array, 'index')) {
        result.index = array.index
        result.input = array.input
    }
    return result
}

const symToStringTag = Symbol ? Symbol.toStringTag : undefined

const getTag = (value) => {
    const nullTag = '[object Null]',
        undefinedTag = '[object Undefined]'

    if (value == null) {
        return value === undefined ? undefinedTag : nullTag
    }
    return (symToStringTag && symToStringTag in Object(value)) ?
        getRawTag(value) :
        Object.prototype.toString.call(value)
}

const getRawTag = (value) => {
    const isOwn = Object.prototype.hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag]
    let unmasked

    try {
        value[symToStringTag] = undefined
        unmasked = true
    } catch (e) { }
    const result = Object.prototype.toString.call(value)
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag
        } else {
            delete value[symToStringTag]
        }
    }
    return result
}

const baseCreate = (proto) => {
    if (!isObject(proto)) {
        return {}
    }
    return Object.create(proto)
}

const initCloneObject = (object) => {
    const Ctor = object.constructor
    return (typeof Ctor == 'function' && !(Ctor === Ctor.prototype))
        ? baseCreate(Object.getPrototypeOf(Object(object)))
        : {}
}

const cloneArrayBuffer = (arrayBuffer) => {
    const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
    new Uint8Array(result).set(new Uint8Array(arrayBuffer))
    return result
}

const cloneDataView = (dataView) => {
    const buffer = cloneArrayBuffer(dataView.buffer)
    return new dataView.constructor(buffer, dataView.byteLength)
}

const cloneTypedArray = (typedArray) => {
    const buffer = cloneArrayBuffer(typedArray.buffer)
    return new typedArray.constructor(buffer, typedArray.byteLength)
}

const initCloneByTag = (object, tag) => {
    const Ctor = object.constructor
    switch (tag) {
        case arrayBufferTag:
            return cloneArrayBuffer(object)
        case boolTag:
        case dateTag:
            return new Ctor(+object)
        case dataViewTag:
            return cloneDataView(object)
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
            return cloneTypedArray(object)
        case mapTag:
        case setTag:
            return new Ctor
        case numberTag:
        case stringTag:
            return new Ctor(object)
        case symbolTag:
            return Object(Symbol.prototype.valueOf.call(object))
    }
}

const eq = (value, other) => {
    return value === other || (value !== value && other !== other)
}

const assocIndexOf = (array, key) => {
    let length = array.length
    while (length--) {
        const value = array[length][0]
        if (eq(value, key)) {
            return length
        }
    }
    return -1
}

class ListCache {
    constructor(entries) {
        let index = -1
        const length = entries == null ? 0 : entries.length
        this.clear()

        while (++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }
    clear() {
        this.__data__ = []
        this.size = 0
    }
    delete(key) {
        const data = this.__data__,
            index = assocIndexOf(data, key)

        if (index < 0) return false
        const lastIndex = data.length - 1
        if (index === lastIndex) data.pop()
        else Array.prototype.splice.call(data, index, 1)
        --this.size
        return true
    }
    get(key) {
        const data = this.__data__,
            index = assocIndexOf(data, key)

        return index < 0 ? undefined : data[index][1]
    }
    has(key) {
        return assocIndexOf(this.__data__, key) > -1
    }
    set(key, value) {
        const data = this.__data__,
            index = assocIndexOf(data, key)

        if (index < 0) {
            ++this.size
            data.push([key, value])
        } else {
            data[index][1] = value
        }
    }
}

const isKeyable = (value) => {
    const type = typeof value
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null)
}
const getMapData = (map, key) => {
    const data = map.__data__
    return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map
}

class Hash {
    constructor(entries) {
        let index = -1
        const length = entries == null ? 0 : entries.length

        this.clear()
        while (++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }
    clear() {
        this.__data__ = {}
    }
    delete(key) {
        const result = this.has(key) && delete this.__data__[key]
        this.size -= result ? 1 : 0
        return result
    }
    get(key) {
        const data = this.__data__
        return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : undefined
    }
    has(key) {
        return Object.prototype.hasOwnProperty.call(this.__data__, key)
    }
    set(key, value) {
        const data = this.__data__
        this.size += this.has(key) ? 0 : 1
        data[key] = value
        return this
    }
}

class MapCache {
    constructor(entries) {
        let index = -1
        const length = entries == null ? 0 : entries.length

        this.clear()
        while (++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }
    clear() {
        this.size = 0
        this.__data__ = {
            'hash': new Hash,
            'map': new Map,
            'string': new Hash
        }
    }
    delete(key) {
        const result = getMapData(this, key).delete(key)
        this.size -= result ? 1 : 0
        return result
    }
    get(key) {
        return getMapData(this, key).get(key)
    }
    has(key) {
        return getMapData(this, key).has(key)
    }
    set(key, value) {
        const data = getMapData(this, key),
            size = data.size

        data.set(key, value)
        this.size += data.size === size ? 0 : 1
        return this
    }
}

class Stack {
    constructor(entries) {
        this.__data__ = new ListCache(entries)
        this.size = this.__data__.size
    }
    clear() {
        this.__data__ = new ListCache
        this.size = 0
    }
    delete(key) {
        const data = this.__data__,
            result = data.delete(key)

        this.size = data.size
        return result
    }
    get(key) {
        return this.__data__.get(key)
    }
    has(key) {
        return this.__data__.has(key)
    }
    set(key, value) {
        let data = this.__data__
        if (data instanceof ListCache) {
            const pairs = data.__data__
            data = this.__data__ = new MapCache(pairs)
        }
        data.set(key, value)
        this.size = data.size
        return this
    }
}

const isObjectLike = (value) => (value != null && typeof value == 'object')

const isSet = (value) => isObjectLike(value) && getTag(value) == setTag

const isMap = (value) => isObjectLike(value) && getTag(value) == mapTag

const isLength = (value) => typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER

const isFunction = (value) => {
    if (!isObject(value)) return false
    const tag = getTag(value)
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
}

const isArrayLike = (value) => value != null && isLength(value.length) && !isFunction(value)

const isArguments = (value) => {
    const argsTag = '[object Arguments]'
    return isObjectLike(value) && getTag(value) == argsTag
}

const isPrototype = (value) => {
    const Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto

    return value === proto
}

const baseTimes = (n, iteratee) => {
    const result = Array(n)
    let index = -1
    while (++index < n) {
        result[index] = iteratee(index)
    }
    return result
}

const isIndex = (value, length) => {
    const type = typeof value
    length = length == null ? MAX_SAFE_INTEGER : length

    return !!length && (
        type == 'number' || (
            type != 'symbol' && (
                value > -1 && value % 1 == 0 && value < length
            )
        )
    )
}

const arrayLikeKeys = (value, inherited) => {
    const isArr = Array.isArray(value),
        isArg = !isArr && isArguments(value),
        skipIndexes = isArr || isArg,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length

    for (let key in value) {
        if ((inherited || Object.prototype.hasOwnProperty.call(value, key)) && !(
            skipIndexes && (
                key == 'length' ||
                isIndex(key, length)
            )
        )) {
            result.push(key)
        }
    }
    return result
}

const baseKeys = (object) => {
    if (!isPrototype(object)) return Object.keys(Object(object))

    const result = []
    for (let key in Object(object)) {
        if (Object.prototype.hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key)
        }
        return result
    }
}

const arrayFilter = (array, predicate) => {
    let index = -1,
        resIndex = 0
    const length = array == null ? 0 : array.length,
        result = []

    while (++index < length) {
        var value = array[index]
        if (predicate(value, index, array)) {
            result[resIndex++] = value
        }
    }
    return result
}

const getSymbols = (object) => {
    if (object == null) return []
    object = Object(object)
    return arrayFilter(Object.getOwnPropertySymbols(object), (symbol) => Object.prototype.propertyIsEnumerable.call(object, symbo))
}

const arrayPush = (array, values) => {
    let index = -1
    const length = values.length,
        offset = array.length

    while (++index < length) {
        array[offset + index] = values[index]
    }
    return array
}

const keysFunc = (object) => {
    const result = isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
    return Array.isArray(object) ? result : arrayPush(result, getSymbols(object))
}

const arrayEach = (array, iteratee) => {
    let index = -1
    const length = array == null ? 0 : array.length

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break
        }
    }
    return array
}

const assignValue = (object, key, value) => {
    const objValue = object[key]
    if (!(Object.prototype.hasOwnProperty.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
        if (key == '__proto__' && defineProperty) {
            defineProperty(object, key, {
                'configurable': true,
                'enumerable': true,
                'value': value,
                'writable': true
            })
        } else {
            object[key] = value
        }
    }
}

export const cloneDeep = (value, stack) => {
    let result
    if (!isObject(value)) {
        return value
    }
    const isArr = Array.isArray(value)
    if (isArr) {
        result = initCloneArray(value)
    } else {
        const tag = getTag(value)
        const isFunc = tag === funcTag || tag === genTag

        if (tag === objectTag || tag === argsTag || isFunc) {
            result = isFunc ? {} : initCloneObject(value)
        } else {
            if (!cloneableTags[tag]) {
                return {}
            }
            result = initCloneByTag(value, tag)
        }
    }

    // 检查循环渲染
    stack || (stack = new Stack)
    const stacked = stack.get(value)

    if (stacked) {
        return stacked
    }
    stack.set(value, result)
    if (isSet(value)) {
        value.forEach((subValue) => {
            result.add(cloneDeep(subValue, stack))
        })
    } else if (isMap(value)) {
        value.forEach((subValue, key) => {
            result.set(key, cloneDeep(subValue, stack))
        })
    }

    const props = isArr ? undefined : keysFunc(value)

    arrayEach(props || value, (subValue, key) => {
        if (props) {
            key = subValue
            subValue = value[key]
        }
        // 递归填充克隆（容易受到调用堆栈限制）
        assignValue(result, key, cloneDeep(subValue, stack))
    })
    return result
}