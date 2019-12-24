# 合并两个有序数组

- 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。 

**说明:**
* 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
* 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

**示例1：**
```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

## 双指针
```javascript
/**
 * @param {number[]} arr1
 * @param {number} m
 * @param {number[]} arr2
 * @param {number} n
 * @return {void} Do not return anything, modify arr1 in-place instead.
 */
export const merge = (arr1, m, arr2, n) => {
  const result = []
  let l = 0,
    r = 0,
    index = 0
  while (index < m + n) {
    if (l >= m) {
      result[index] = arr2[r]
      r++
    } else if (r >= n) {
      result[index] = arr1[l]
      l++
    } else if (arr1[l] <= arr2[r] && l < m) {
      result[index] = arr1[l]
      l++
    } else if (arr2[r] < arr2[l] && r < n) {
      result[index] = arr2[r]
      r++
    }
    index++
  }
  return result
}
``` 

<CodeTest style="margin-top: 20px;" mode="merge" />  

<vTalk />