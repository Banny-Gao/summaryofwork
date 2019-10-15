# 三数之和

- 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。  
**注意：答案中不可以包含重复的三元组**   
```
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```  
## 暴力超时版
```javascript
export const threeSum_overtime = (nums = []) => {
  if(nums.length < 3) return []
  const sums = [], numMap = {}
  for(let i = 0; i < nums.length - 2; i++) {
    for(let j = i + 1; j < nums.length - 1; j++) {
      const s = nums[i] + nums[j]
      for(let k = j + 1; k < nums.length; k++) {
        const sum = [nums[i], nums[j], nums[k]].sort(),
        f = sum.join() in numMap
        if(nums[k] === -s && !f) {
          sums.push(sum)
          numMap[sum.join()] = 1
        }
      }
    }
  }
  return sums
}
```
## 优化版
```javascript
export const threeSum = (nums = []) => {
  if(nums.length < 3) return []
  nums = nums.sort((a,b) => a - b)
  const sums = [], numMap = {}
  let p = 1
  while (p < nums.length - 1) {
    let i = 0, j = nums.length - 1
    if(nums[i] > 0) return sums
    while(i < p && j > p) {
      const s = nums[i] + nums[p] + nums[j]
      if(s === 0) {
        const sum = [nums[i], nums[p], nums[j]].sort(),
        f = sum.join() in numMap
        if(!f) {
          sums.push([nums[i], nums[p], nums[j]])
          numMap[sum.join()] = 1
        }
        i++
        j--
        while(i < p  && nums[i] === nums[i-1]) i++
        while(j > p && nums[j] === nums[j+1]) j--;
      } 
      else if(s < 0) i++ 
      else j--
    }
    p++
  }
  return sums
}
```
<CodeTest style="margin-top: 20px;" mode="threeSum" />  

**[LeetCode题解](https://leetcode-cn.com/problems/3sum/solution/three-sum-ti-jie-by-wonderful611/)**