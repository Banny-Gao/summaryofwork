# 只出现一次的数字

- 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

- **说明:** 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例1** 
```
输入: [4,1,2,1,2]
输出: 4
```

## 暴力破解

```js
export const singleNumber_sort = nums => {
  nums = nums.sort()
  let i = 0
  
  while (i < nums.length - 1) {
    if (nums[i] === null) {
      i++
      continue
    }

    let j = i + 1
    while (j < nums.length && nums[i] !== nums[j]) j++

    if (j === nums.length) return nums[i]
    else nums[j] = null

    i++
  }
  return nums[i]
}
```

## 位运算

```js
export const singleNumber = nums => {
  let result = null

  for (let i = 0; i < nums.length; i++) result ^= nums[i]

  return result
}
```

<CodeTest style="margin-top: 20px;" mode="singleNumber" />  

<vTalk />