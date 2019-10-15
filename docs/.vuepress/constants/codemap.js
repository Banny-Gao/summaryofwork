const codemap = {
  reduce: `console.time();
const arr = (function(){
  let a = []
  for(let i = 0;i < 100000000; i++) {
  	a.push(i)
  }
  return []
}())
arr.reduce(function(accumulator, currentValue, index, array) {
  return accumulator + currentValue;
}, 10);
console.timeEnd();
console.table({a: 1})
console.warn("it's warning")
console.error('there is a error')`,
  twoSum: `const sum = sumFoo([8, 0, 3, 2, 4], 10)
console.log(sum)`,
  findMedianSortedArrays: `console.time()
const nums1 = [-4, -1, 0, 2, 2, 3, 9], nums2 = [3, 4, 4, 8, 9]
const result = findMedianSortedArrays(nums1, nums2)
console.log(result)
console.timeEnd()`,
  longestPalindrome: `console.time()
const s = longestPalindrome('ababc')
console.log(s)
console.timeEnd()`,
  atoi: `console.time()
const result = atoi('  -172817d saojda 233')
console.log(result)
console.timeEnd()`,
  longestCommonPrefix: `console.time()
const result = longestCommonPrefix(["flower","flow","flight"])
console.log(result)
console.timeEnd()`,
  threeSum: `console.time()
const result = threeSum([-1, 0, 1, 2, -1, -4])
console.log(result)
console.timeEnd()`,
  threeSumClosest: `var a = threeSumClosest([-1,2,-1, -4], 1)
console.log(a)`,
  testSort: `// 十万级数据量排序时间测试
timeTest(sort, randomNum(100000))`,
  testBubbleSort: `//  万级数据量排序时间测试
timeTest(bubbleSort, randomNum(10000))`,
  testSelectSort: `//  万级数据量排序时间测试
timeTest(selectSort, randomNum(10000))`,
  testInsertSort: `//  万级数据量排序时间测试
  timeTest(insertSort, randomNum(10000))`,
  testShellSort: `//  十万级数据量排序时间测试
  timeTest(shellSort, randomNum(100000))`,
  testMergeSort: `//  十万级数据量排序时间测试
  timeTest(mergeSort, randomNum(100000))`,
  testQuickSort: `//  百万级数据量排序时间测试
  timeTest(quickSort1, randomNum(1000000))`,
  testQuickSort3: `//  千万级大量重复数据排序时间测试
  timeTest(quickSort3, randomNum(10000000,10))`,
  testHeapSort: `//  百万级数据量排序时间测试
  timeTest(heapSort, randomNum(1000000))`,
  testCountSort: `//  千万级大量数据排序时间测试
  timeTest(countSort, randomNum(10000000,10))`,
  testBucketSort: `//  百万数据排序时间测试
  timeTest(bucketSort, randomNum(1000000))`,
  testRadixSort: `timeTest(radixSort, randomNum(1000))`,
  isValid: `const valid = isValid("(([]){})")
  console.log(valid)`,
  removeDuplicates: `var arr = [0,0,2,3,3,4]
  var c = removeDuplicates(arr)
  console.log(c)
  console.table(arr)`
}

export default codemap