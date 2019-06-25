function deepClone(obj) {
  return new Promise(resolve => {
    const {
      port1,
      port2
    } = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}
// @ts-ignore
var obj = {
  a: 1,
  b: {
    c: 'b'
  }
}
// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
(async () => {
  const cloneObj = await deepClone(obj)
})()


// 深度优先
let DFSdeepClone = (obj, visitedArr = []) => {
  let _obj = {}
  const type = Object.prototype.toString.call(obj)
  if ( type === '[object Array]' || type === '[object Object]') {
    let index = visitedArr.indexOf(obj)
    _obj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
    if (~index) { // 判断环状数据
      _obj = visitedArr[index]
    } else {
      visitedArr.push(obj)
      for (let item in obj) {
        _obj[item] = DFSdeepClone(obj[item], visitedArr)
      }
    }
  } else if (type === '[object Function]') {
    _obj = eval('(' + obj.toString() + ')');
  } else {
    _obj = obj
  }
  return _obj
}

// 广度优先
let BFSdeepClone = (obj) => {
  let origin = [obj],
    copyObj = {},
    copy = [copyObj]
    // 去除环状数据
  let visitedQueue = [],
    visitedCopyQueue = []
  while (origin.length > 0) {
    let items = origin.shift(),
      _obj = copy.shift()
    visitedQueue.push(items)
    const type = Object.prototype.toString.call(items)
    if ( type === '[object Array]' || type === '[object Object]') {
      for (let item in items) {
        let val = items[item]
        if (Object.prototype.toString.call(val) === '[object Object]') {
          let index = visitedQueue.indexOf(val)
          if (!~index) {
            _obj[item] = {}
              //下次while循环使用给空对象提供数据
            origin.push(val)
              // 推入引用对象
            copy.push(_obj[item])
          } else {
            _obj[item] = visitedCopyQueue[index]
            visitedQueue.push(_obj)
          }
        } else if (Object.prototype.toString.call(val) === '[object Array]') {
          // 数组类型在这里创建了一个空数组
          _obj[item] = []
          origin.push(val)
          copy.push(_obj[item])
        } else if (Object.prototype.toString.call(val) === '[object Function]') {
          _obj[item] = eval('(' + val.toString() + ')');
        } else {
          _obj[item] = val
        }
      }
      // 将已经处理过的对象数据推入数组 给环状数据使用
      visitedCopyQueue.push(_obj)
    } else if (type === '[object Function]') {
      copyObj = eval('(' + items.toString() + ')');
    } else {
      copyObj = obj
    }
  }
return copyObj
}