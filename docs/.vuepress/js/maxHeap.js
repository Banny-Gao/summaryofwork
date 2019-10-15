/**
 *@author Amigo
 @description MaxHeap
 *   
 */

import {
  randomNum
} from './sort'
//实现一个最大堆
class MaxHeap {
  constructor(len) {
    this.data = new Array(len + 1)
    this.capacity = len //堆容量
    this.count = 0 // 堆中元素的个数
    this.sortArr = [] //排序数组
  }
  shiftUp(k) {
    //向上调整堆
    while (k > 1 && this.data[Math.floor(k / 2)] < this.data[k]) {
      this.swap(this.data, Math.floor(k / 2), k)
      k = Math.floor(k / 2)
    }
  }
  shiftDown(k) {
    //向下调整堆
    while (k * 2 <= this.count) {
      let j = k * 2
      if (j + 1 <= this.count && this.data[j + 1] > this.data[j]) j++
      if (this.data[k] >= this.data[j]) break
      this.swap(this.data, k, j)
      k = j
    }
  }
  size() {
    return this.count
  }
  insert(item) {
    //往堆添加元素
    if (this.count + 1 > this.capacity) throw Error('超过限制长度')
    this.data[++this.count] = item
    this.shiftUp(this.count)
  }
  getData() {
    //获取堆中的元素
    let arr = []
    if (!this.count) return arr
    arr = []
      .concat(this.data)
      .splice(1)
      .filter(item => item !== undefined)
    return arr
  }
  extractMax() {
    //取出最大数
    if (this.count === 0) return
    const ret = this.data[1]
    this.swap(this.data, 1, this.count--)
    this.shiftDown(1)
    return ret
  }
  getMax() {
    if (this.count) return this.data[1]
  }
  heapSort() {
    //堆排序
    if (this.sortArr.length !== 0) return this.sortArr
    const len = this.count
    for (let i = 0; i < len; i++) {
      if (i !== undefined) this.sortArr.push(this.extractMax())
    }
    return this.sortArr
  }
  swap(arr, m, n) {
    let temp = arr[m]
    arr[m] = arr[n]
    arr[n] = temp
  }
  heapify(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.data[i + 1] = arr[i]
    }
    this.count = arr.length
    for (let j = Math.floor(this.count / 2); j >= 1; j--) {
      this.shiftDown(j)
    }
    this.sortArr = this.getData()
  }
}

console.time('HeapSort_Class')
const maxHeap = new MaxHeap(100000)
for (let i = 0; i < 100000; i++) {
  maxHeap.insert(Math.floor(Math.random() * 100))
}
maxHeap.heapSort()
console.timeEnd('HeapSort_Class')

console.time('HeapSortHeapifyt_Class')
const maxHeap1 = new MaxHeap(100000)
maxHeap1.heapify(randomNum(100000, 10))
console.timeEnd('HeapSortHeapifyt_Class')