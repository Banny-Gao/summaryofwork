# 最接近三数之和

- 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。 

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```  
#  双指针法  

* 先让数组有序，也就是需要先对数组进行排序
* 然后每次固定一个元素，再去寻找另外两个元素，也就是双指针  

```javascript
export const threeSumClosest = (nums, target) => {
  if (nums.length < 3) return
  nums = nums.sort((a, b) => a - b)
  let sum, minDiff = nums[0] + nums[1] + nums[2] - target,
    p = 1
  while (p < nums.length - 1) {
    let i = p - 1,
      j = p + 1
    while (i >= 0 && j < nums.length) {
      sum = nums[i] + nums[p] + nums[j]
      const diff = sum - target
      if (diff === 0) return sum
      if (diff < 0 && Math.abs(diff) > Math.abs(minDiff)) {
        j++
        while (j < nums.length - 1 && nums[j] === nums[j + 1]) j++
        continue
      }
      if (diff > 0 && Math.abs(diff) > Math.abs(minDiff)) {
        i--
        while (i > 0 && nums[i] === nums[i - 1]) i--
        continue
      }
      minDiff = diff
      diff > 0 ? i-- : j++
    }
    p++
  }
  return target + minDiff
}
```
<CodeTest style="margin-top: 20px;" mode="threeSumClosest" />  