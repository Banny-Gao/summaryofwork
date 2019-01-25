/**
 * @name sort
 * @author amigo
 * @description some sort realization result
 * 2019-01-21
 */
//生成随机数
function randomNum(n) {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n))
  }
  return arr
}
//Time test
function timeTest(fn, arr, ...values) {
  console.time(fn.name)
  const result = fn(arr, ...values)
  console.timeEnd(fn.name)
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
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i],
      j = i
    while (j > 0 && temp < arr[j - 1]) {
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
  let orr = []
  while (arr.length !== 0) {
    const i = arr.length > 30 ? 2 : 1
    var stop = Math.ceil(arr.length / i),
      sortArr = arr.splice(0, stop)
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
function mergeSort(arr, l = 0, r = (arr.length - 1)) {
  var mid = Math.floor((l + r) / 2)
  if (l >= r) return
  // 对于小规模数组, 使用插入排序
  mergeSort(arr, l, mid)
  mergeSort(arr, mid + 1, r)
  return merge(arr, l, mid, r)
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
  };
  var mid = Math.floor(arr.length / 2);
  var left_arr = arr.slice(0, mid),
    right_arr = arr.slice(mid);
  return mergeSlice(mergeSortSlice(left_arr), mergeSortSlice(right_arr));
}

function mergeSlice(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
  return result.concat(left).concat(right);
}

timeTest(mergeSortSlice, randomNum(100000))

//快速排序
function quickSort(arr, l = 0, r = (arr.length - 1)) {
  if (l < r) {
    let partitionIndex = partition2way(arr, l, r)
    quickSort(arr, l, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, r)
    return arr
  }
}

function partition(arr, l, r) {
  let pivot = l,
    index = pivot + 1
  for (let i = index; i <= r; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, pivot, index - 1)
  return index - 1
}

function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

var arr = timeTest(quickSort, randomNum(100000))

function partition2way(arr, l, r) {
  let pivot = arr[l]
  while (l < r) {
    while (l < r && arr[r] > pivot) {
      --r
    }
    arr[l] = arr[r]
    while (l < r && arr[l] <= pivot) {
      ++l
    }
    arr[r] = arr[l]
  }
  arr[l] = pivot
  return l
}