# 删除排序数组中的重复项

- 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
- 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。 


```javascript
export const removeDuplicates = (nums) => {
  const len = nums.length
  if(!len) return 0
  let i = 0, num = nums[0], count = 0
  i++
  while (nums[i] !== undefined) {
    if(nums[i] === num) {
      nums.splice(i, 1)
      count++
    } else {
      num = nums[i]
      i++
    }
    if(i + count === len) break
  }
  return nums.length
}
```
<CodeTest style="margin-top: 20px;" mode="removeDuplicates" />  

<vTalk />