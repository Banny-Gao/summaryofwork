# 除自身以外数组的乘积

- 给定长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。
 
**示例**
```
输入: [1,2,3,4]
输出: [24,12,8,6]
```
  * **说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。**

## 暴力法
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
export const productExceptSelf_overtime = (nums) => {
  const arr = []
  let i = 0
  while(i < nums.length) {
    let sum = 1
    for(let j = 0;j < nums.length; j++) {
      let temp = nums[j]
      if(i === j) temp = 1 
      sum *= temp
    }
    arr.push(sum)
    i++
  }
  return arr
} 
``` 
## 乘积复用
```javascript
export const productExceptSelf = (nums) => {
  const res = [], len = nums.length
  let left = 1, right = 1
  for(let i = 0; i < len; i++) {
    res[i] *= left
    left *= nums[i]
    res[len - 1 - i] *= right
    right *= nums[len - 1 - i]
  }
  return res
} 
```
<CodeTest style="margin-top: 20px;" mode="productExceptSelf" />  

[leetCode题解](https://leetcode-cn.com/problems/product-of-array-except-self/solution/yi-ci-bian-li-qiao-miao-cun-chu-he-ji-suan-zuo-ji-/) 

<vTalk />