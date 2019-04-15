/**
 * @name sort.js
 * @author amigo
 * @description some sort realization result
 * 2019-01-21
 */

//生成随机数
export function randomNum(n, num) {
  const arr = [],
    t = num || n
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * t))
  }
  return arr
}
//Time test
function timeTest(fn, arr, ...values) {
  console.time(`${fn.name}_${arr.length}`)
  const result = fn(arr, ...values)
  console.timeEnd(`${fn.name}_${arr.length}`)
  return result
}
//原生数组排序方法
function sort(arr) {
  return arr.sort((a, b) => a - b)
}
timeTest(sort, randomNum(100000))
//冒泡排序
function bubbleSort(arr) {
  var low = 0
  var high = arr.length - 1 //设置变量的初始值
  var tmp, j
  while (low < high) {
    for (j = low; j < high; ++j) {
      //正向冒泡,找到最大者
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
    --high //修改high值, 前移一位
    for (j = high; j > low; --j) {
      //反向冒泡,找到最小者
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tmp
      }
    }
    ++low //修改low值,后移一位
  }
  return arr
}

timeTest(bubbleSort, randomNum(10000))

//选择排序（不稳定）
function selectSort(arr) {
  let minIndex,
    maxIndex,
    temp,
    maxTemp,
    sum = 1,
    len = arr.length
  for (let i = 0; i < len; i++) {
    minIndex = i
    maxIndex = len - i - 1
    for (let j = i + 1; j < len; j++) {
      if (arr[j] <= arr[minIndex]) {
        minIndex = j //排出最小数index
      }
      let m = len - j
      if (m > 0 && arr[m] >= arr[maxIndex]) {
        maxIndex = m //排出最大数index
      }
    }
    temp = arr[i]
    maxTemp = arr[len - i - 1]
    arr[i] = arr[minIndex]
    arr[len - i - 1] = arr[maxIndex]
    arr[minIndex] = temp
    arr[maxIndex] = maxTemp
    sum = len % 2 === 0 ? sum : 0 //判断奇偶=》minIndex与maxIndex比较情况
    if (minIndex + sum == maxIndex) break
  }
  return arr
}

timeTest(selectSort, randomNum(10000))

//插入排序
function insertSort(arr, l = 0, r = arr.length - 1) {
  for (let i = 1 + l; i < r; i++) {
    let temp = arr[i],
      j = i
    while (j > 0 + l && temp < arr[j - 1]) {
      //如果后一个比前一个小，前面的整体后移，跳出循环后插入
      arr[j] = arr[j - 1]
      j--
    }
    if (j != i) arr[j] = temp
  }
  return arr
}
timeTest(insertSort, randomNum(10000))

//递归插入排序
function recurInsertSort(arr) {
  let orr = [],
    brr = [].concat(arr)
  while (brr.length !== 0) {
    const i = brr.length > 30 ? 2 : 1
    var stop = Math.ceil(brr.length / i),
      sortArr = brr.splice(0, stop)
    if (sortArr.length < 32) {
      orr.push(...insertSort(sortArr))
    } else {
      orr.concat(recurInsertSort(sortArr))
    }
  }
  orr = [...insertSort(orr)]
  return orr
}
timeTest(recurInsertSort, randomNum(100000))

//希尔排序
function shellSort(arr) {
  let temp,
    gap = 1,
    len = arr.length
  while (gap < len) {
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}
timeTest(shellSort, randomNum(100000))

//归并排序  赋值法
function mergeSort(arr, l = 0, r = arr.length - 1) {
  // 对于小规模数组, 使用插入排序
  if (r - l <= 15) {
    return insertSort(arr, l, r)
  }
  var mid = Math.floor((l + r) / 2)
  mergeSort(arr, l, mid)
  mergeSort(arr, mid + 1, r)
  if (arr[mid] > arr[mid + 1]) {
    return merge(arr, l, mid, r)
  }
}

function merge(arr, left, mid, right) {
  const result = []
  for (var i = left; i <= right; i++) {
    result[i - left] = arr[i]
  }
  var i = left,
    j = mid + 1
  for (var k = left; k <= right; k++) {
    if (i > mid) {
      arr[k] = result[j - left]
      j++
    } else if (j > right) {
      arr[k] = result[i - left]
      i++
    } else if (result[i - left] < result[j - left]) {
      arr[k] = result[i - left]
      i++
    } else {
      arr[k] = result[j - left]
      j++
    }
  }
  return arr
}

timeTest(mergeSort, randomNum(100000))

//归并排序 数组方法
function mergeSortSlice(arr) {
  if (arr.length == 1) {
    return arr
  }
  var mid = Math.floor(arr.length / 2)
  var left_arr = arr.slice(0, mid),
    right_arr = arr.slice(mid)
  return mergeSlice(mergeSortSlice(left_arr), mergeSortSlice(right_arr))
}

function mergeSlice(left, right) {
  var result = []
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
  return result.concat(left).concat(right)
}

timeTest(mergeSortSlice, randomNum(100000))

//快速排序
function quickSort(arr, l = 0, r = arr.length - 1) {
  if (r - l <= 15) {
    return insertSort(arr, l, r)
  }
  let partitionIndex = partition2(arr, l, r)
  quickSort(arr, l, partitionIndex - 1)
  quickSort(arr, partitionIndex + 1, r)
  return arr
}

function partition(arr, l, r) {
  let randomIndex = Math.ceil(Math.random() * (r - l) + l)
  swap(arr, l, randomIndex)
  let v = arr[l],
    j = l
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < v) {
      swap(arr, ++j, i)
    }
  }
  swap(arr, l, j)
  return j
}

function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function partition2(arr, l, r) {
  let randomIndex = Math.ceil(Math.random() * (r - l) + l)
  swap(arr, l, randomIndex)
  let v = arr[l],
    i = l + 1,
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
timeTest(quickSort, randomNum(1000000))

//三路快排
function quickSort3Ways(arr, l = 0, r = arr.length - 1) {
  if (r - l <= 15) {
    return insertSort(arr, l, r)
  }
  let randomIndex = Math.ceil(Math.random() * (r - l) + l)
  swap(arr, l, randomIndex)
  let v = arr[l],
    lt = l, //arr[l+1,...lt]
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
  quickSort3Ways(arr, l, lt - 1)
  quickSort3Ways(arr, gt, r)
  return arr
}
timeTest(quickSort3Ways, randomNum(1000000, 10))

//堆排序
function heapSort(arr) {
  let len = arr.length
  buildMaxHeap(arr)
  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i)
    heapify(arr, 0, --len)
  }
  return arr
}
//建立大顶堆
function buildMaxHeap(arr) {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}
//堆调整
function heapify(arr, i, len = arr.length) {
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

timeTest(heapSort, randomNum(1000000, 10))

// 计数排序
function countSort(arr) {
  let maxValue = arr[0],
    i = 1
  while (i < arr.length) {
    if (maxValue < arr[i]) {
      maxValue = arr[i]
    }
    i++
  }
  // 根据最大数新建数组，原数组的值作为下标，个数作为值
  let bucket = new Array(maxValue + 1),
    sortIndex = 0,
    len = arr.length,
    bucketLen = maxValue + 1
  for (let j = 0; j < len; j++) {
    if (!bucket[arr[j]]) {
      bucket[arr[j]] = 0
    }
    bucket[arr[j]]++ //计数
  }
  for (let n = 0; n < bucketLen; n++) {
    while (bucket[n] > 0) {
      //取出排序
      arr[sortIndex++] = n
      bucket[n]--
    }
  }
  return arr
}

timeTest(countSort, randomNum(100000))

//桶排序  适用于近乎有序的数组
function bucketSort(arr, l = 0, r = arr.length - 1, bucketSize = 15) {
  if (r - l <= 15) return insertSort(arr, l, r)
  let i,
    min = arr[l],
    max = arr[l + 1]
  for (i = l; i < r; i++) {
    if (arr[i] < min) {
      min = arr[i]
    } else if (arr[i] > max) {
      max = arr[i]
    }
  }
  //初始化桶
  let bucketCount = Math.floor((max - min) / bucketSize) + 1, //桶的个数
    buckets = buildBucket(bucketCount)
  //根据映射分配
  for (let j = l; j < r; j++) {
    let m = Math.floor((arr[j] - min) / bucketSize)
    buckets[m].push(arr[j])
  }
  // 对每个桶再进行桶排序
  i = 0
  return buckets.reduce((result, bucketItem) => {
    insertSort(bucketItem, 0, bucketItem.length).forEach(item => {
      result[i] = item
      i++
    })
    return result
  }, [])
}

function buildBucket(n) {
  let buckets = []
  for (let i = 0; i < n; i++) {
    buckets[i] = []
  }
  return buckets
}
timeTest(bucketSort, randomNum(1000))

//LSD 基数排序
function radixSort(arr) {
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
var arr = timeTest(radixSort, randomNum(1000))