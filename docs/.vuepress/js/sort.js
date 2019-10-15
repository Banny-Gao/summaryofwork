/**
 * @name sort.js
 * @author amigo
 * @description some sort realization result
 * 2019-01-21
 */
// 辅助函数
export const swap = (arr, i, j) => {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
//生成随机数
export const randomNum = (n, num) => {
  const arr = [],
    t = num || n
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * t))
  }
  return arr
}
//Time test
export const timeTest = (fn, arr, ...values) => {
  console.time(`${fn.name}_${arr.length}`)
  const result = fn(arr, ...values)
  console.timeEnd(`${fn.name}_${arr.length}`)
  return result
}

//原生数组排序方法
export const sort = (arr) => {
  return arr.sort((a, b) => a - b)
}

// timeTest(sort, randomNum(100000))
//冒泡排序
export const bubbleSort = (arr) => {
  let low = 0,
    high = arr.length - 1,
    j
  while (low < high) {
    for (j = low; j < high; ++j) {
      //正向冒泡,找到最大者
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
    }
    --high //修改high值, 前移一位
    for (j = high; j > low; --j) {
      //反向冒泡,找到最小者
      if (arr[j] < arr[j - 1]) swap(arr, j, j - 1)
    }
    ++low //修改low值,后移一位
  }
  return arr
}

// timeTest(bubbleSort, randomNum(10000))

//选择排序（不稳定）
export const selectSort = (arr) => {
  let minIndex
  const len = arr.length
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j //排出最小数index
    }
    swap(arr, i, minIndex)
  }
  return arr
}

// timeTest(selectSort, randomNum(10000))

//插入排序
export const insertSort = (arr, l = 0, r = arr.length - 1) => {
  for (let i = 1 + l; i <= r; i++) {
    const temp = arr[i]
    let j = i
    while (j > 0 + l && temp < arr[j - 1]) {
      //如果后一个比前一个小，前面的整体后移，跳出循环后插入
      arr[j] = arr[j - 1]
      j--
    }
    if (j != i) arr[j] = temp
  }
  return arr
}

// timeTest(insertSort, randomNum(10000))


//希尔排序
export const shellSort = (arr) => {
  let temp,
    gap = 1
  const len = arr.length
  // 求出起始增量
  while (gap < len) {
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) { // gap为1即排序完成
    for (let i = gap; i < len; i++) { // 据增量分组
      temp = arr[i]
      let j = i - gap
      //如果后一个比前一个小，前面的整体后移，跳出循环后插入
      for (j; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}
// timeTest(shellSort, randomNum(100000))

//归并排序  自顶向下  （原地排序）
export const mergeSort = (arr, l = 0, r = arr.length - 1) => {
  if (r <= l) return //元素一个自身有序，不需要merge
  let mid = ~~((l + r) / 2) // 取中间元素坐标
  mergeSort(arr, l, mid)
  mergeSort(arr, mid + 1, r)
  if (arr[mid] >= arr[mid + 1]) { //对已经有序的两边作merge操作 [1,4,5（mid）  ,2,3,6]
    merge(arr, l, mid, r)
  }
  return arr
}

// 1,4,5  2,3,6 对于单边有序该怎么去合并
export const merge = (arr, left, mid, right) => {
  // 原地排序，需要额外数组来存值
  const result = []
  for (let i = 0; i <= right - left; i++) {
    result[i] = arr[i + left]
  }
  // arr -> [left,...mid,...right]
  //         index 
  // result   1,4,   5    2,3,6
  //          l      mid  r   
  // 比较l,r值，替换index,替换过后l++或者r++，然后index++,考虑l和r边界情况
  let index = left,
    l = left,
    r = mid + 1
  while (index <= right) {
    if (l > mid) {
      arr[index] = result[r - left]
      r++
    } else if (r > right) {
      arr[index] = result[l - left]
      l++
    } else if (result[l - left] < result[r - left]) {
      arr[index] = result[l - left]
      l++
    } else {
      arr[index] = result[r - left]
      r++
    }
    index++
  }
  return arr
}

// timeTest(mergeSort, randomNum(100000))

//快速排序
const quickSort = (arr, l = 0, r = arr.length - 1, way = 1) => {
  if (r <= l) return
  const partitionIndex = way === 1 ? partition1(arr, l, r) : partition2(arr, l, r)
  quickSort(arr, l, partitionIndex - 1, way)
  quickSort(arr, partitionIndex + 1, r, way)
  return arr
}
export const quickSort1 = arr => quickSort(arr)
export const quickSort2 = arr => {
  return quickSort(arr, 0, arr.length - 1, 2)
}

const partition1 = (arr, l, r) => {
  const randomIndex = ~~(Math.random() * (r - l) + l)
  swap(arr, l, randomIndex)
  // [3,0,2,3]
  const v = arr[l] // 1
  let j = l,
    i = l + 1
  for (i; i <= r; i++) {
    if (arr[i] < v) {
      swap(arr, ++j, i)
    }
  }
  swap(arr, l, j)
  return j
}

const partition2 = (arr, l, r) => {
  const randomIndex = ~~(Math.random() * (r - l) + l)
  swap(arr, l, randomIndex)
  const v = arr[l]
  let i = l + 1,
    j = r
  while (true) {
    while (i <= r && arr[i] < v) i++
    while (j >= l + 1 && arr[j] > v) j--
    if (i > j) break
    swap(arr, i, j)
    i++
    j--
  }
  swap(arr, l, j)
  return j
}
// timeTest(quickSort, randomNum(1000000))

//三路快排
export const quickSort3 = (arr, l = 0, r = arr.length - 1) => {
  // 数量少的时候插入排序性能优
  if (r - l <= 15) {
    return insertSort(arr, l, r)
  }
  const randomIndex = ~~(Math.random() * (r - l) + l)
  swap(arr, l, randomIndex)
  const v = arr[l]
  let lt = l, //arr[l+1,...lt]
    gt = r + 1, // arr[gt,...r]
    i = l + 1 // arr[lt+1,...i]
  while (i < gt) {
    if (arr[i] < v) {
      swap(arr, i, ++lt)
      i++
    } else if (arr[i] > v) {
      swap(arr, i, --gt)
    } else {
      i++
    }
  }
  swap(arr, l, lt)
  quickSort3(arr, l, lt)
  quickSort3(arr, gt, r)
  return arr
}
// timeTest(quickSort3, randomNum(1000000, 10))

//堆排序
export const heapSort = (arr) => {
  const len = arr.length
  buildMaxHeap(arr) // 建立大顶推
  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i) //  逆序排，取堆max节点
    heapify(arr, 0, i - 1) // 重新调整堆结构
  }
  return arr
}
//建立大顶堆
const buildMaxHeap = (arr) => {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}
//堆调整
const heapify = (arr, i, len = arr.length) => {
  let l = 2 * i + 1,
    r = 2 * i + 2,
    max = i
  if (l < len && arr[l] > arr[max]) {
    max = l
  }
  if (r < len && arr[r] > arr[max]) {
    max = r
  }
  if (max != i) {
    swap(arr, i, max)
    heapify(arr, max, len)
  }
}

// timeTest(heapSort, randomNum(1000000, 10))

// 计数排序
export const countSort = (arr) => {
  let maxValue = arr[0],
    i = 1
  while (i < arr.length) {
    if (maxValue < arr[i]) {
      maxValue = arr[i]
    }
    i++
  }
  // 根据最大数新建数组，原数组的值作为下标，个数作为值
  const bucket = new Array(maxValue + 1)
  let sortIndex = 0
  for (let j = 0; j < arr.length; j++) {
    if (!bucket[arr[j]]) {
      bucket[arr[j]] = 0
    }
    bucket[arr[j]]++ //计数
  }
  for (let n = 0; n < bucket.length; n++) {
    while (bucket[n] > 0) {
      //取出排序
      arr[sortIndex++] = n
      bucket[n]--
    }
  }
  return arr
}

// timeTest(countSort, randomNum(100000))

//桶排序  适用于近乎有序的数组
export const bucketSort = (arr, l = 0, r = arr.length - 1, bucketSize = 15) => {
  if (r - l <= 15) return insertSort(arr, l, r)
  let min = arr[l],
    max = arr[l + 1]
  for (let i = l; i <= r; i++) {
    if (arr[i] < min) {
      min = arr[i]
    } else if (arr[i] > max) {
      max = arr[i]
    }
  }
  //初始化桶
  const bucketCount = ~~((max - min) / bucketSize) + 1, //桶的个数
    buckets = []
  let m = 0
  for (m; m < bucketCount; m++) {
    buckets[m] = []
    buckets[m].insert = function(node){
      const len = this.length
      let i = 0
      if(len === 0) this[i] = node
      while(i < len) {
        if(node <= this[i]) {
          this.unshift(node)
          break
        }
        if(this[i] < node && !this[i+1]) {
          i++
          this.splice(i,0,node)
          break
        } else if(this[i] <= node && node <= this[i + 1]) {
          i++
          this.splice(i,0,node)
          break
        }
        i++
      }
    }
  }
  //根据映射分配
  for (l; l <= r; l++) {
    m = ~~((arr[l] - min) / bucketSize)
    buckets[m].insert(arr[l])
  }
  // 对每个桶再进行桶排序
  // let index = 0
  arr = buckets.reduce((result, item) => {
    result.push(...item)
    return result
  }, [])
  return arr
}

// timeTest(bucketSort, randomNum(1000))

//LSD 基数排序
export const radixSort = (arr) => {
  let maxNum = arr[0],
    mod = 10,
    dev = 1
  arr.forEach(v => {
    if (v > maxNum) maxNum = v
  })
  const maxDight = String(maxNum).length
  for (let i = 0; i < maxDight; i++, mod *= 10, dev *= 10) {
    const buckets = []
    for (let j = 0; j < arr.length; j++) {
      const index = ~~((arr[j] % mod) / dev)
      if (!Array.isArray(buckets[index])) buckets[index] = []
      buckets[index].push(arr[j])
    }
    arr = buckets.reduce((r, v) => [...r, ...v], [])
  }
  return arr
}
// var arr = timeTest(radixSort, randomNum(1000))