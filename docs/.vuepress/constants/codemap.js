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
  console.table(arr)`,
  maxArea: `const max = maxArea([1,8,6,2,5,4,8,3,7])
  console.log(max)`,
  testMaxHeap: `var arr = [2,7,17,3,19,100,36,25,4]
  var heap = new MaxHeap(arr)
  console.table(heap)
  var sortArr = heap.sort()
  console.log(sortArr)`,
  multiply: `var a = multiply('123','45')
  console.log(a)`,
  reverseString: `// 千万级数据量反转
  var arr = new Array(10000000)
  for(let i=0; i < arr.length; i++) {
    arr[i] = Math.random() * 1000
  }
  console.time()
  arr.reverse()
  console.timeEnd()`,
  productExceptSelf: `var result = productExceptSelf ([1,2,3,4])
  console.log(result)`,
  spiralOrder: `var result = spiralOrder([
  	[1,2,3,4],
  	[5,6,7,8],
  	[9,10,11,12],
  	[13,14,15,16]
])
console.log(result)`,
  generateMatrix: `var result = generateMatrix (4)
console.table(result)`,
  merge: `var nums1 = [1,2,3,0,0,0]
  var nums2 = [2,5,6]
  var result = merge(nums1,3,nums2,3)
  console.log(result)`,
  parseInt: `var arr = ['1', '2', '3'].map(parseInt)
  console.log(arr)
  
  var i = parseInt(1 / 0, 19) 
  console.log(i)`,
  Promise: `let promise1 = new FakePromise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  promise1.then(() => {
    return new FakePromise((resolve, reject) => {
		setTimeout(() => {
        	resolve(123)
        }, 1000)
	})
  }).then(res => {
    console.log(res)  //123
    // 返回一个普通值
    return '这里返回一个普通值'
  }).then(res => {
    console.log(res) //1秒后打印出：这里返回一个普通值
  })`,
  cloneDeep: `const testObj = {
    a: 1,
    b: {
        c: 1,
        d: 2
    },
    circle: null,
    e: function() {
        console.log(1);
    }
}
testObj.b.circle = testObj.b;
const result = cloneDeep(testObj)
console.log(result)`,
  asyncRealize: `const asyncFun = () => {
        return generatorRun(function* () {
          const a = yield Promise.resolve(1)
          console.log(a)
          const b = yield new Promise((resolve) => {
            setTimeout(() => {
              resolve(2)
            }, 2000)
          })
          console.log(b)
          const c = yield 3
          console.log(c)
          return a + b + c
        })
      }
    asyncFun()`,
  curry: `const abc = function(a, b, c) {
        return [a, b, c]
      }
       
      const curried = curry(abc)
      
      console.log( curried(1)(2)(3) )
      // => [1, 2, 3]
       
      console.log( curried(1, 2)(3) )
      // => [1, 2, 3]
       
      console.log( curried(1, 2, 3) )
      // => [1, 2, 3]`,
  reorganizeString: `const result = reorganizeString ("xxxcaaadadcccxmwmmm")

  console.log(result)`,
  debounce: `const scrollHandler = function()  {
    console.log(this.scrollY)
  }
  window.onscroll = debounce(scrollHandler, 500)`,
  DFS: `fetch('/nametree.json').then(res => res.json()).then(data => {
    const dfs = new DFS(data)     
    const bfs = new DFS(data)
    console.time('DFS非递归')
    dfs.getValues('name')
    console.timeEnd('DFS非递归')
    console.time('DFS递归')
    dfs.getValuesRecursive('name')
    console.timeEnd('DFS递归')
     console.time('BFS非递归')
    bfs.getValues('name')
    console.timeEnd('BFS非递归')
    console.time('BFS递归')
    bfs.getValuesRecursive('name')
    console.timeEnd('BFS递归')
  })`,
  lengthOfLongestSubstring: `const max = lengthOfLongestSubstring('abcabcbb')
console.log(max)`,
  checkInclusion: `const isCheckIn = checkInclusion ("abcdxabcde", "abcdeabcdx")
console.log(isCheckIn)`,
}

export default codemap
