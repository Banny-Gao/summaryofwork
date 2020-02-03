# 反转字符串

- 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
- 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。


**示例1**
```
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

## 双指针O[1]空间
```javascript
export const reverseString = (nums) => {
  const len = nums.length
  if(!len) return nums
  let i = 0, j = len  - 1
  let temp = null
  for(i,j; i + (len - 1) % 2 <= j;i++,j--) {
    temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
  return nums
}
```
<CodeTest style="margin-top: 20px;" mode="reverseString" />  

<vTalk />